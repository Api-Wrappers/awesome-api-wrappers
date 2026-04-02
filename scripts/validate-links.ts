import { readFileSync } from "node:fs";
import { join } from "node:path";

const README_PATH = join(process.cwd(), "README.md");
const TIMEOUT_MS = 10_000;
const DELAY_MS = 300;
const STALE_DAYS = 365;

interface LinkResult {
  text: string;
  url: string;
  status: number | null;
  error: string | null;
  archived: boolean | null;
  lastPush: string | null; // ISO date string from GitHub API
}

function extractLinks(markdown: string): { text: string; url: string }[] {
  // Strip fenced code blocks so example URLs inside them are not checked
  // Strip inline images so badge URLs (shields.io, contrib.rocks, etc.) are not checked
  const stripped = markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "");
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
  const links: { text: string; url: string }[] = [];
  let match = linkRegex.exec(stripped);
  while (match !== null) {
    links.push({ text: match[1], url: match[2] });
    match = linkRegex.exec(stripped);
  }
  return links;
}

// Only matches github.com/{owner}/{repo} — ignores org pages, file paths, etc.
function parseGitHubRepo(url: string): { owner: string; repo: string } | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== "github.com") return null;
    const parts = parsed.pathname.replace(/^\//, "").split("/");
    if (parts.length !== 2 || !parts[0] || !parts[1]) return null;
    return { owner: parts[0], repo: parts[1] };
  } catch {
    return null;
  }
}

async function fetchGitHubMeta(
  owner: string,
  repo: string,
  token: string | undefined
): Promise<{ archived: boolean; lastPush: string } | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
    const headers: Record<string, string> = {
      "User-Agent": "awesome-api-wrappers link validator",
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      signal: controller.signal,
      headers,
    });
    clearTimeout(timeout);
    if (!res.ok) return null;
    const data = (await res.json()) as { archived: boolean; pushed_at: string };
    return { archived: data.archived, lastPush: data.pushed_at };
  } catch {
    return null;
  }
}

async function checkLink(
  text: string,
  url: string,
  githubToken: string | undefined
): Promise<LinkResult> {
  let status: number | null = null;
  let error: string | null = null;
  let archived: boolean | null = null;
  let lastPush: string | null = null;

  // HTTP reachability check
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
    const res = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
      headers: { "User-Agent": "awesome-api-wrappers link validator" },
      redirect: "follow",
    });
    clearTimeout(timeout);
    status = res.status;
  } catch (err) {
    error = err instanceof Error ? err.message : String(err);
  }

  // GitHub metadata check for repo URLs
  const ghRepo = parseGitHubRepo(url);
  if (ghRepo) {
    const meta = await fetchGitHubMeta(ghRepo.owner, ghRepo.repo, githubToken);
    if (meta) {
      archived = meta.archived;
      lastPush = meta.lastPush;
    }
  }

  return { text, url, status, error, archived, lastPush };
}

function daysSince(isoDate: string): number {
  return Math.floor(
    (Date.now() - new Date(isoDate).getTime()) / (1000 * 60 * 60 * 24)
  );
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main(): Promise<void> {
  let markdown = "";
  try {
    markdown = readFileSync(README_PATH, "utf-8");
  } catch {
    console.error(`Error: could not read ${README_PATH}`);
    process.exit(1);
  }

  const githubToken = process.env.GITHUB_TOKEN;
  if (!githubToken) {
    console.warn(
      "Warning: GITHUB_TOKEN not set — GitHub API checks will be unauthenticated (60 req/hr limit)\n"
    );
  }

  const links = extractLinks(markdown);
  if (links.length === 0) {
    console.log("No links found in README.md.");
    return;
  }

  console.log(`Checking ${links.length} link(s)...\n`);

  const broken: LinkResult[] = [];
  const archived: LinkResult[] = [];
  const stale: LinkResult[] = [];

  for (const { text, url } of links) {
    const result = await checkLink(text, url, githubToken);

    const httpFailed =
      result.error !== null ||
      (result.status !== null && result.status >= 400);
    const isArchived = result.archived === true;
    const isStale =
      result.lastPush !== null && daysSince(result.lastPush) > STALE_DAYS;

    if (httpFailed) {
      const reason = result.error ?? `HTTP ${result.status}`;
      console.log(`❌  [${result.text}](${result.url})  →  ${reason}`);
      broken.push(result);
    } else if (isArchived) {
      console.log(`🗄️  [${result.text}](${result.url})  →  archived`);
      archived.push(result);
    } else if (isStale) {
      const days = daysSince(result.lastPush!);
      console.log(
        `⚠️  [${result.text}](${result.url})  →  no push in ${days} days`
      );
      stale.push(result);
    } else {
      let note = `${result.status}`;
      if (result.lastPush) {
        const days = daysSince(result.lastPush);
        note += `, last push ${days}d ago`;
      }
      if (result.archived === false) note += `, active`;
      console.log(`✓   [${result.text}](${result.url})  →  ${note}`);
    }

    await sleep(DELAY_MS);
  }

  console.log(`\n─────────────────────────────────`);

  const problems = broken.length + archived.length;

  if (problems === 0 && stale.length === 0) {
    console.log(`✅  All ${links.length} links passed.`);
    return;
  }

  if (broken.length > 0) {
    console.log(`\n❌  Broken (${broken.length}):`);
    for (const r of broken) {
      const reason = r.error ?? `HTTP ${r.status}`;
      console.log(`    • [${r.text}](${r.url}) — ${reason}`);
    }
  }

  if (archived.length > 0) {
    console.log(`\n🗄️  Archived (${archived.length}):`);
    for (const r of archived) {
      console.log(`    • [${r.text}](${r.url})`);
    }
  }

  if (stale.length > 0) {
    console.log(`\n⚠️  Stale — no push in ${STALE_DAYS}+ days (${stale.length}):`);
    for (const r of stale) {
      const days = daysSince(r.lastPush!);
      console.log(`    • [${r.text}](${r.url}) — last push ${days} days ago`);
    }
  }

  if (problems > 0) {
    process.exit(1);
  }
}

main();
