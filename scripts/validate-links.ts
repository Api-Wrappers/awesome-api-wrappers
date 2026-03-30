import { readFileSync } from "node:fs";
import { join } from "node:path";

const README_PATH = join(process.cwd(), "README.md");
const TIMEOUT_MS = 10_000;
const DELAY_MS = 200; // polite delay between requests

interface LinkResult {
  text: string;
  url: string;
  status: number | null;
  error: string | null;
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

async function checkLink(text: string, url: string): Promise<LinkResult> {
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
    return { text, url, status: res.status, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { text, url, status: null, error: message };
  }
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

  const links = extractLinks(markdown);
  if (links.length === 0) {
    console.log("No links found in README.md.");
    return;
  }

  console.log(`Checking ${links.length} link(s)...\n`);

  const broken: LinkResult[] = [];

  for (const { text, url } of links) {
    const result = await checkLink(text, url);
    if (result.error || (result.status !== null && result.status >= 400)) {
      const reason = result.error ?? `HTTP ${result.status}`;
      console.log(`❌  [${result.text}](${result.url})  →  ${reason}`);
      broken.push(result);
    } else {
      console.log(`✓   [${result.text}](${result.url})  →  ${result.status}`);
    }
    await sleep(DELAY_MS);
  }

  console.log(`\n─────────────────────────────────`);
  if (broken.length === 0) {
    console.log(`✅  All ${links.length} links passed.`);
  } else {
    console.log(`❌  ${broken.length} broken link(s) out of ${links.length}:`);
    for (const r of broken) {
      const reason = r.error ?? `HTTP ${r.status}`;
      console.log(`    • [${r.text}](${r.url}) — ${reason}`);
    }
    process.exit(1);
  }
}

main();
