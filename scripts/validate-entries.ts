import { readFileSync } from "node:fs";
import { join } from "node:path";

const README_PATH = join(process.cwd(), "README.md");

const REQUIRED_CATEGORIES = [
  "Payments",
  "Communication",
  "Media / Entertainment",
  "Gaming",
  "Anime / Manga",
  "Social",
  "Cloud / Infrastructure",
  "AI / ML",
  "Developer Tools",
  "Misc",
];

const TABLE_HEADER = [
  "Name",
  "API",
  "Language",
  "Official / community",
  "Package link",
  "GitHub link",
  "Notes",
];

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

const NOTES_MAX_LENGTH = 170;

interface Row {
  lineNum: number;
  cells: string[];
  raw: string;
}

interface CategoryTable {
  headingLine: number;
  headerLine: number;
  separatorLine: number;
  rows: Row[];
}

interface Violation {
  lineNum: number;
  section: string;
  message: string;
}

function stripCodeBlocks(markdown: string): string {
  return markdown.replace(/```[\s\S]*?```/g, (match) =>
    "\n".repeat((match.match(/\n/g) ?? []).length)
  );
}

function splitTableRow(line: string): string[] | null {
  const trimmed = line.trim();
  if (!trimmed.startsWith("|") || !trimmed.endsWith("|")) return null;
  return trimmed
    .slice(1, -1)
    .split("|")
    .map((cell) => cell.trim());
}

function isSeparatorRow(cells: string[]): boolean {
  return cells.length > 0 && cells.every((cell) => /^:?-{3,}:?$/.test(cell));
}

function getFirstMarkdownLink(cell: string): { text: string; url: string } | null {
  const match = cell.match(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/);
  if (!match) return null;
  return { text: match[1], url: match[2] };
}

function parseGitHubRepo(url: string): { owner: string; repo: string } | null {
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

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function hasMarketingLanguage(value: string): string | null {
  for (const word of MARKETING_WORDS) {
    const pattern = new RegExp(`\\b${escapeRegExp(word)}\\b`, "i");
    if (pattern.test(value)) return word;
  }
  return null;
}

function readReadme(): string {
  try {
    return readFileSync(README_PATH, "utf-8");
  } catch {
    console.error(`Error: could not read ${README_PATH}`);
    process.exit(1);
  }
}

function findCategoryTables(lines: string[]): {
  tables: Map<string, CategoryTable>;
  violations: Violation[];
} {
  const tables = new Map<string, CategoryTable>();
  const violations: Violation[] = [];
  let inCategories = false;
  let categoryOrder: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      inCategories = line.trim() === "## Categories";
      continue;
    }

    if (!inCategories || !line.startsWith("### ")) continue;

    const category = line.slice(4).trim();
    categoryOrder.push(category);

    if (!REQUIRED_CATEGORIES.includes(category)) {
      violations.push({
        lineNum: i + 1,
        section: category,
        message: `unexpected category; allowed categories are: ${REQUIRED_CATEGORIES.join(", ")}`,
      });
    }

    let headerIdx = i + 1;
    while (headerIdx < lines.length && lines[headerIdx].trim() === "") {
      headerIdx++;
    }

    const header = splitTableRow(lines[headerIdx] ?? "");
    if (!header) {
      violations.push({
        lineNum: i + 1,
        section: category,
        message: "category must start with a markdown table",
      });
      continue;
    }

    if (header.join("\u0000") !== TABLE_HEADER.join("\u0000")) {
      violations.push({
        lineNum: headerIdx + 1,
        section: category,
        message: `table header must be: | ${TABLE_HEADER.join(" | ")} |`,
      });
    }

    const separatorIdx = headerIdx + 1;
    const separator = splitTableRow(lines[separatorIdx] ?? "");
    if (!separator || !isSeparatorRow(separator)) {
      violations.push({
        lineNum: separatorIdx + 1,
        section: category,
        message: "table header must be followed by a markdown separator row",
      });
    }

    const rows: Row[] = [];
    let rowIdx = separatorIdx + 1;
    while (rowIdx < lines.length) {
      const rowLine = lines[rowIdx];
      if (rowLine.startsWith("### ") || rowLine.startsWith("## ")) break;
      if (rowLine.trim() === "") break;

      const cells = splitTableRow(rowLine);
      if (!cells) {
        violations.push({
          lineNum: rowIdx + 1,
          section: category,
          message: "expected a markdown table row",
        });
      } else {
        rows.push({ lineNum: rowIdx + 1, cells, raw: rowLine });
      }

      rowIdx++;
    }

    tables.set(category, {
      headingLine: i + 1,
      headerLine: headerIdx + 1,
      separatorLine: separatorIdx + 1,
      rows,
    });
  }

  const missing = REQUIRED_CATEGORIES.filter((category) => !tables.has(category));
  for (const category of missing) {
    violations.push({
      lineNum: 1,
      section: category,
      message: "required category is missing",
    });
  }

  const expectedOrder = REQUIRED_CATEGORIES.join("\u0000");
  const actualOrder = categoryOrder.join("\u0000");
  if (actualOrder !== expectedOrder) {
    violations.push({
      lineNum: 1,
      section: "Categories",
      message: `categories must appear in this order: ${REQUIRED_CATEGORIES.join(", ")}`,
    });
  }

  return { tables, violations };
}

function validateRow(
  category: string,
  row: Row,
  seenRepos: Map<string, Row>
): Violation[] {
  const violations: Violation[] = [];

  if (row.cells.length !== TABLE_HEADER.length) {
    return [
      {
        lineNum: row.lineNum,
        section: category,
        message: `expected ${TABLE_HEADER.length} table cells, got ${row.cells.length}`,
      },
    ];
  }

  const [name, api, language, ownership, packageLink, githubLink, notes] =
    row.cells;

  const requiredCells = [
    ["Name", name],
    ["API", api],
    ["Language", language],
    ["Official / community", ownership],
    ["Package link", packageLink],
    ["GitHub link", githubLink],
    ["Notes", notes],
  ];

  for (const [label, value] of requiredCells) {
    if (!value.trim()) {
      violations.push({
        lineNum: row.lineNum,
        section: category,
        message: `${label} must not be empty`,
      });
    }
  }

  if (!ALLOWED_LANGUAGES.has(language)) {
    violations.push({
      lineNum: row.lineNum,
      section: category,
      message: `unknown language \`${language}\`; allowed: ${[...ALLOWED_LANGUAGES].join(", ")}`,
    });
  }

  if (ownership !== "Official" && ownership !== "Community") {
    violations.push({
      lineNum: row.lineNum,
      section: category,
      message: "Official / community must be `Official` or `Community`",
    });
  }

  const pkg = getFirstMarkdownLink(packageLink);
  if (!pkg) {
    violations.push({
      lineNum: row.lineNum,
      section: category,
      message: "Package link must be a markdown link to an https URL",
    });
  }

  const github = getFirstMarkdownLink(githubLink);
  if (!github) {
    violations.push({
      lineNum: row.lineNum,
      section: category,
      message: "GitHub link must be a markdown link to an https GitHub repo URL",
    });
  } else {
    const repo = parseGitHubRepo(github.url);
    if (!repo) {
      violations.push({
        lineNum: row.lineNum,
        section: category,
        message: `GitHub link must point to a repository, got ${github.url}`,
      });
    } else {
      const key = `${repo.owner.toLowerCase()}/${repo.repo.toLowerCase()}`;
      const existing = seenRepos.get(key);
      if (existing) {
        violations.push({
          lineNum: row.lineNum,
          section: category,
          message: `duplicate GitHub repository also listed on line ${existing.lineNum}`,
        });
      } else {
        seenRepos.set(key, row);
      }
    }
  }

  if (!notes.endsWith(".")) {
    violations.push({
      lineNum: row.lineNum,
      section: category,
      message: "Notes must be one sentence ending with a period",
    });
  }

  if (notes.length > NOTES_MAX_LENGTH) {
    violations.push({
      lineNum: row.lineNum,
      section: category,
      message: `Notes must be ${NOTES_MAX_LENGTH} characters or fewer (${notes.length})`,
    });
  }

  const marketingWord = hasMarketingLanguage(notes);
  if (marketingWord) {
    violations.push({
      lineNum: row.lineNum,
      section: category,
      message: `Notes contain marketing word: "${marketingWord}"`,
    });
  }

  return violations;
}

function validateTableRows(tables: Map<string, CategoryTable>): Violation[] {
  const violations: Violation[] = [];
  const seenRepos = new Map<string, Row>();

  for (const category of REQUIRED_CATEGORIES) {
    const table = tables.get(category);
    if (!table) continue;

    if (table.rows.length === 0) {
      violations.push({
        lineNum: table.headingLine,
        section: category,
        message: "category table must contain at least one entry",
      });
      continue;
    }

    for (const row of table.rows) {
      violations.push(...validateRow(category, row, seenRepos));
    }

    const names = table.rows.map((row) => row.cells[0] ?? "");
    const sorted = [...names].sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: "base" })
    );
    for (let i = 0; i < names.length; i++) {
      if (names[i] !== sorted[i]) {
        violations.push({
          lineNum: table.rows[i].lineNum,
          section: category,
          message: `entries must be sorted alphabetically; expected \`${sorted[i]}\` here`,
        });
        break;
      }
    }
  }

  return violations;
}

function run(): void {
  const markdown = readReadme();
  const lines = stripCodeBlocks(markdown).split("\n");
  const { tables, violations } = findCategoryTables(lines);

  violations.push(...validateTableRows(tables));

  if (violations.length === 0) {
    console.log("✅  All category tables pass validation.");
    return;
  }

  console.log(`❌  ${violations.length} table validation issue(s):\n`);
  for (const violation of violations) {
    console.log(
      `  Line ${violation.lineNum} [${violation.section}]: ${violation.message}`
    );
  }
  console.log();

  process.exit(1);
}

run();
