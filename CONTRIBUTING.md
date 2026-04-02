# Contributing to Awesome API Wrappers

Thanks for helping improve this list. Read these guidelines before submitting.

---

## Adding an Entry

1. Fork the repository
2. Add your entry to the correct category in `README.md`
3. Follow the formatting rules below
4. Open a pull request with a clear title — e.g. `Add stripe-go to Payments & Finance`

---

## Entry Format

```markdown
- [repo-name](https://github.com/owner/repo) – Short description. `Language` · `Official`
- [repo-name](https://github.com/owner/repo) – Short description. `Language` · `Community`
```

**Examples:**

```markdown
- [discord.js](https://github.com/discordjs/discord.js) – Feature-rich Discord API library for Node.js covering gateway events, REST, and voice. `TypeScript` · `Community`
- [stripe-node](https://github.com/stripe/stripe-node) – Stripe SDK for Node.js with strong TypeScript support and webhook tooling. `TypeScript` · `Official`
```

**Rules:**

- Use the repository name as the link text, not a marketing or display name
- Use the full GitHub URL as the link target
- Description comes right after the em dash (`–`), before the language tag
- Description must be one sentence ending with a period, under 120 characters
- No marketing language ("best", "amazing", "powerful", "blazing fast")
- Language tag must be one of: `TypeScript`, `JavaScript`, `Python`, `Go`, `Rust`, `Java`, `C#`, `Ruby`, `PHP`, `Swift`, `Kotlin`
- End with `· \`Official\`` if the wrapper is maintained by the API provider, or `· \`Community\`` if independently maintained
- Use an em dash (`–`) not a hyphen (`-`) between the link and the description

---

## Inclusion Criteria

Your submission **must** meet all of these:

- [ ] Actively maintained — commits or releases within the past 12 months
- [ ] Has documentation — at minimum a README with usage examples
- [ ] Not experimental — stable enough for production use, or clearly labeled otherwise
- [ ] Wraps a specific public API — not a general HTTP client or SDK generator

Your submission **should ideally** have:

- [ ] Published package (npm, PyPI, crates.io, etc.)
- [ ] Type safety (TypeScript definitions, Python type hints, etc.)
- [ ] Test coverage

---

## What Not to Submit

- General HTTP clients (Axios, Requests, Reqwest, etc.)
- SDK generators (OpenAPI Generator, Kiota, etc.)
- Abandoned repositories — nothing in 2+ years
- A duplicate entry for an API that already has a listing in the same language
- Your own brand-new project with no users yet — wait until it has some real adoption
- Repos you haven't personally used or vetted

---

## Adding a New Category

If nothing fits, you can propose a new category. It needs at least 3 entries to justify the addition. Also add it to the Contents table at the top of `README.md`.

---

## Pull Request Checklist

- [ ] I have read this file
- [ ] Entry is in the correct section, sorted alphabetically within it
- [ ] Formatting matches existing entries exactly
- [ ] The repository link resolves and the project meets the inclusion criteria above
- [ ] No existing entry for this repo is already in the list
- [ ] PR title follows the pattern: `Add <repo-name> to <Category>`
