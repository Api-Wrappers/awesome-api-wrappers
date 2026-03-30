# Contributing to Awesome API Wrappers

Thank you for helping improve this list. Please take a moment to review these guidelines before submitting.

---

## Adding an Entry

1. Fork the repository
2. Add your entry to the correct category section in `README.md`
3. Follow the formatting rules below
4. Submit a pull request with a clear title (e.g. `Add stripe-go to Payments & Finance`)

---

## Entry Format

```markdown
- [repo-name](https://github.com/owner/repo) `Language` – Short description of what it wraps and what makes it useful.
```

**Examples:**

```markdown
- [discord.js](https://github.com/discordjs/discord.js) `TypeScript` – Feature-rich Discord API library for Node.js covering gateway events, REST, and voice.
- [tweepy](https://github.com/tweepy/tweepy) `Python` – The go-to Python wrapper for the Twitter/X API, supporting OAuth 1.0a, OAuth 2.0, and streaming.
```

**Rules:**

- Use the repository name as the link text, not a marketing name
- Use the full GitHub URL as the link target
- Language tag must be one of: `TypeScript`, `JavaScript`, `Python`, `Go`, `Rust`, `Java`, `C#`, `Ruby`, `PHP`, `Swift`, `Kotlin`
- Description must be a single sentence ending with a period
- No marketing language ("best", "amazing", "powerful")
- Keep descriptions under 120 characters
- Use an em dash (`–`) not a hyphen (`-`) to separate the link from the description

---

## Inclusion Criteria

Your submission **must** meet all of these:

- [ ] Actively maintained — has commits or releases within the past 12 months
- [ ] Has documentation — at minimum a README with usage examples
- [ ] Not experimental — stable enough for production use or clearly labeled otherwise
- [ ] Wraps a public API — not a general HTTP client or SDK generator

Your submission **should ideally** have:

- [ ] Published package (npm, PyPI, crates.io, etc.)
- [ ] Type safety (TypeScript definitions, Python type hints, etc.)
- [ ] Test coverage

---

## What Not to Submit

- General HTTP clients (Axios, Requests, Reqwest)
- SDK generators (OpenAPI Generator, Kiota)
- Abandoned repositories (no activity in 2+ years)
- Duplicate entries for the same API in the same language
- Your own brand-new project with no users yet (wait until it has some adoption)
- Repos you haven't personally used or vetted

---

## Adding a New Category

If the API you're adding doesn't fit any existing category, you may propose a new one. The category must contain at least 3 entries to justify its existence. Add the category to the Contents table at the top of `README.md` as well.

---

## Pull Request Checklist

Before submitting, verify:

- [ ] Entry is placed in the correct section (alphabetically within the section where possible)
- [ ] Formatting matches existing entries exactly
- [ ] The repository link resolves and the project meets inclusion criteria
- [ ] No existing entry for this repo already exists in the list
- [ ] PR title follows the pattern: `Add <repo-name> to <Category>`
