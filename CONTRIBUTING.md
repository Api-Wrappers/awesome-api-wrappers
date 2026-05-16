# Contributing to Awesome API Wrappers

Thanks for helping improve this list. The goal is to keep it useful for
developers choosing API wrappers for real projects, not to collect every SDK on
GitHub.

---

## Before You Submit

A wrapper must meet all of these requirements:

- actively maintained and compatible with the current upstream API
- documented with installation and usage examples
- licensed
- published or documented through a package page
- linked to a public GitHub repository
- focused on a specific public API
- free of spam, affiliate links, paid placement, and unverifiable claims

Do not submit:

- general HTTP clients such as Axios, Requests, or Reqwest
- SDK generators unless the submitted project is a specific generated wrapper
- abandoned repositories
- duplicate wrappers for the same API and language without a clear reason
- brand-new projects with no docs, no package, or no real usage evidence

---

## How to Add an Entry

1. Fork the repository.
2. Add the row to the best category in `README.md`.
3. Keep the section sorted alphabetically by `Name`.
4. Use factual notes that can be verified from the package page or repository.
5. Open a pull request with a clear title, such as `Add stripe-go to Payments`.

If you are unsure whether a wrapper belongs, open an **Add a wrapper** issue
first.

---

## Entry Format

Every category uses the same table shape:

```markdown
| Name | API | Language | Official / community | Package link | GitHub link | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| repo-name | API name | TypeScript | Official | [npm](https://www.npmjs.com/package/example) | [GitHub](https://github.com/owner/repo) | Short factual note. |
```

### Field Rules

- `Name` should match the repository or package name people search for.
- `API` should name the upstream service, such as Stripe, Discord, or GitHub.
- `Language` should be the primary language developers install the wrapper for.
- `Official / community` must be `Official` or `Community`.
- `Package link` must point to the registry or package documentation page.
- `GitHub link` must point to the source repository.
- `Notes` should be one short factual sentence without marketing language.

Allowed language values:

`TypeScript`, `JavaScript`, `Python`, `Go`, `Rust`, `Java`, `C#`, `Ruby`,
`PHP`, `Swift`, `Kotlin`

Use `TypeScript` for packages that are authored in TypeScript or ship first-class
TypeScript types.

---

## Writing Good Notes

Good notes are specific and verifiable:

- `Typed Node SDK with webhook helpers and broad Stripe API coverage.`
- `Async Rust client for GitHub REST endpoints with typed builders.`
- `Python SDK with sync and async clients, streaming, uploads, and typed helpers.`

Avoid:

- marketing claims like "best", "ultimate", "world-class", or "blazing fast"
- popularity claims unless they are generated automatically
- vague notes like "A good wrapper for the API"
- copied marketing text from a package page

---

## Adding a New Category

Open an issue before adding a category. A new category should have at least
three maintained wrappers and should not overlap heavily with an existing
category.

If accepted, add the category to:

- the `Contents` list in `README.md`
- the `Categories` section in `README.md`
- the Add a wrapper issue template
- the entry validator in `scripts/validate-entries.ts`

---

## Pull Request Checklist

- [ ] I have read this file.
- [ ] The wrapper is maintained.
- [ ] The wrapper has docs with usage examples.
- [ ] The wrapper has a license.
- [ ] The row links to both a package page and a GitHub repository.
- [ ] The row is in the correct category.
- [ ] The category remains sorted alphabetically by `Name`.
- [ ] The note is factual, short, and free of marketing language.
- [ ] The PR does not add stars, downloads, latest release dates, or other manually stale metadata.

Run these checks locally when possible:

```bash
bun run lint
bun run check
```
