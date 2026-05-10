import { readFileSync } from "node:fs";
import { join } from "node:path";

const README_PATH = join(process.cwd(), "README.md");

const ALLOWED_LANGUAGES = new Set([
  "TypeScript",
  "JavaScript",
  "Python",
  "Go",
  "Rust",
  "Java",
  "C#",
  "Ruby",
  "PHP",
  "Swift",
  "Kotlin",
]);

const MARKETING_WORDS = [
  "best",
  "amazing",
  "powerful",
  "blazing",
  "incredible",
  "ultimate",
  "revolutionary",
  "cutting-edge",
  "seamless",
  "world-class",
];

const DESCRIPTION_MAX_LENGTH = 120;

interface Violation {
  section: string;
  lineNum: number;
  entry: string;
  issues: string[];
}

interface EntryMeta {
  name: string;
  repoKey: string | null;
  lineNum: number;
  entry: string;
}

// Strip fenced code blocks while preserving line count (so line numbers stay accurate)
function stripCodeBlocks(markdown: string): string {
  return markdown.replace(/```[\s\S]*?```/g, (match) =>
    "\n".repeat((match.match(/\n/g) ?? []).length)
  );
}

// Entry lines can wrap. Continuation lines are indented with two spaces.
// - [name](url) – Description that is
//   long and wraps here. `Lang` · `Official`
function joinEntryLines(
  lines: string[],
  startIdx: number
): { joined: string; endIdx: number } {
  let joined = lines[startIdx];
  let i = startIdx + 1;
  while (i < lines.length && lines[i].startsWith("  ")) {
    joined += " " + lines[i].trim();
    i++;
  }
  return { joined, endIdx: i - 1 };
}

function parseGitHubRepo(
  url: string
): { owner: string; repo: string } | null {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" || parsed.hostname !== "github.com") {
      return null;
    }

    const parts = parsed.pathname.replace(/^\/|\/$/g, "").split("/");
    if (parts.length !== 2 || !parts[0] || !parts[1]) return null;

    return { owner: parts[0], repo: parts[1] };
  } catch {
    return null;
  }
}

function parseEntryMeta(joined: string, lineNum: number): EntryMeta | null {
  const match = joined.match(/^- \[([^\]]+)\]\((https?:\/\/[^)]+)\)/);
  if (!match) return null;

  const repo = parseGitHubRepo(match[2]);

  return {
    name: match[1],
    repoKey: repo
      ? `${repo.owner.toLowerCase()}/${repo.repo.toLowerCase()}`
      : null,
    lineNum,
    entry: joined,
  };
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function validateEntry(joined: string): string[] {
  const issues: string[] = [];
  const meta = parseEntryMeta(joined, 0);

  // URL must be a full GitHub URL
  const urlMatch = joined.match(/\]\((https?:\/\/[^)]+)\)/);
  if (!urlMatch) {
    issues.push("entry must include a full GitHub URL");
  } else {
    const repo = parseGitHubRepo(urlMatch[1]);
    if (!repo) {
      issues.push(
        `URL must be a full GitHub repository URL, got: ${urlMatch[1]}`
      );
    } else if (meta && meta.name !== repo.repo) {
      issues.push(
        `link text must match repository name \`${repo.repo}\`, got \`${meta.name}\``
      );
    }
  }

  // Must have em dash (–) between link and description, not a hyphen
  if (!joined.includes(") – ")) {
    if (joined.includes(") - ")) {
      issues.push('use an em dash (–) not a hyphen (-) after the link');
    } else {
      issues.push('missing em dash (–) between link and description');
    }
    // Can't meaningfully check the rest without knowing where the description starts
    return issues;
  }

  // Must end with `Language` · `Official` or `Language` · `Community`
  const trailingMatch = joined.match(/`([^`]+)` · `(Official|Community)`$/);
  if (!trailingMatch) {
    issues.push(
      "must end with `Language` · `Official` or `Language` · `Community`"
    );
  } else {
    const lang = trailingMatch[1];
    if (!ALLOWED_LANGUAGES.has(lang)) {
      issues.push(
        `unknown language tag \`${lang}\` — allowed: ${[...ALLOWED_LANGUAGES].join(", ")}`
      );
    }
  }

  // Description must end with a period (immediately before the language tag)
  const beforeTags = joined
    .replace(/\s*`[^`]+` · `(?:Official|Community)`$/, "")
    .trim();
  if (!beforeTags.endsWith(".")) {
    issues.push("description must end with a period");
  }

  const descriptionMatch = beforeTags.match(/\) – (.+)$/);
  if (descriptionMatch) {
    const descriptionLength = descriptionMatch[1].length;
    if (descriptionLength >= DESCRIPTION_MAX_LENGTH) {
      issues.push(
        `description must be under ${DESCRIPTION_MAX_LENGTH} characters (${descriptionLength})`
      );
    }
  }

  // No marketing language
  const lower = joined.toLowerCase();
  for (const word of MARKETING_WORDS) {
    const pattern = new RegExp(`\\b${escapeRegExp(word)}\\b`, "i");
    if (pattern.test(lower)) {
      issues.push(`contains marketing word: "${word}"`);
    }
  }

  return issues;
}

function validateSectionOrder(
  section: string,
  entries: EntryMeta[]
): Violation[] {
  const violations: Violation[] = [];
  const sorted = [...entries].sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
  );

  for (let i = 0; i < entries.length; i++) {
    if (entries[i].name !== sorted[i].name) {
      violations.push({
        section,
        lineNum: entries[i].lineNum,
        entry: entries[i].entry,
        issues: [
          `entries must be sorted alphabetically; expected \`${sorted[i].name}\` here`,
        ],
      });
      break;
    }
  }

  return violations;
}

function validateSectionDuplicates(
  section: string,
  entries: EntryMeta[]
): Violation[] {
  const violations: Violation[] = [];
  const seen = new Map<string, EntryMeta>();

  for (const entry of entries) {
    if (!entry.repoKey) continue;

    const existing = seen.get(entry.repoKey);
    if (existing) {
      violations.push({
        section,
        lineNum: entry.lineNum,
        entry: entry.entry,
        issues: [
          `duplicate repository entry also listed on line ${existing.lineNum}`,
        ],
      });
    } else {
      seen.set(entry.repoKey, entry);
    }
  }

  return violations;
}

function run(): void {
  let markdown = "";
  try {
    markdown = readFileSync(README_PATH, "utf-8");
  } catch {
    console.error(`Error: could not read ${README_PATH}`);
    process.exit(1);
  }

  const lines = stripCodeBlocks(markdown).split("\n");
  const violations: Violation[] = [];
  const entriesBySection = new Map<string, EntryMeta[]>();

  // Rather than hardcoding section names, track position in the document.
  // Wrapper entries appear in two places:
  //   ## Maintainer Picks  (a top-level section)
  //   ## By Category       (subsections under this heading)
  // Everything else (Related Lists, Contributors, etc.) is skipped.
  let inMaintainerPicks = false;
  let inByCategory = false;
  let inCategorySubsection = false;
  let currentSection = "";

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      const heading = line.slice(3).trim();
      inMaintainerPicks = heading === "Maintainer Picks";
      inByCategory = heading === "By Category";
      inCategorySubsection = false;
      currentSection = heading;
    } else if (line.startsWith("### ") && inByCategory) {
      inCategorySubsection = true;
      // Strip leading emoji for a readable section name in error output
      currentSection = line.slice(4).replace(/^\S+\s+/, "").trim();
    }

    const inValidatedSection =
      inMaintainerPicks || (inByCategory && inCategorySubsection);

    if (inValidatedSection && line.startsWith("- [")) {
      const { joined, endIdx } = joinEntryLines(lines, i);
      const issues = validateEntry(joined);
      const meta = parseEntryMeta(joined, i + 1);

      if (meta) {
        const sectionEntries = entriesBySection.get(currentSection) ?? [];
        sectionEntries.push(meta);
        entriesBySection.set(currentSection, sectionEntries);
      }

      if (issues.length > 0) {
        violations.push({
          section: currentSection,
          lineNum: i + 1,
          entry: joined,
          issues,
        });
      }
      i = endIdx + 1;
      continue;
    }

    i++;
  }

  for (const [section, entries] of entriesBySection) {
    violations.push(...validateSectionOrder(section, entries));
    violations.push(...validateSectionDuplicates(section, entries));
  }

  if (violations.length === 0) {
    console.log("✅  All entries pass format validation.");
    return;
  }

  console.log(`❌  ${violations.length} entry format violation(s):\n`);
  for (const v of violations) {
    const preview =
      v.entry.length > 100 ? v.entry.slice(0, 100) + "…" : v.entry;
    console.log(`  Line ${v.lineNum} [${v.section}]:`);
    console.log(`    ${preview}`);
    for (const issue of v.issues) {
      console.log(`    → ${issue}`);
    }
    console.log();
  }

  process.exit(1);
}

run();
