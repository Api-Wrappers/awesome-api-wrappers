<h1 align="center">Awesome API Wrappers</h1>

<p align="center">
  A curated list of API wrappers and SDKs focused on developer experience, type safety, maintenance, and real-world usability.
</p>

<p align="center">
  <a href="https://awesome.re"><img alt="Awesome" src="https://awesome.re/badge.svg"></a>
  <a href="https://github.com/Api-Wrappers/awesome-api-wrappers/actions/workflows/validate.yml"><img alt="Validation" src="https://github.com/Api-Wrappers/awesome-api-wrappers/actions/workflows/validate.yml/badge.svg"></a>
  <a href="https://github.com/Api-Wrappers/awesome-api-wrappers/stargazers"><img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/api-wrappers/awesome-api-wrappers"></a>
</p>

Finding an API wrapper is easy. Finding one you can trust in a real project is
harder.

This repo collects wrappers and SDKs that make integration work easier:
authentication, pagination, retries, typed responses, versioning, webhooks,
rate limits, and API-specific workflows. The list is intentionally selective
and favors projects with clear docs, visible maintenance, licenses, package
links, and practical examples.

`Official` means maintained by the API provider. `Community` means maintained
independently.

---

## Contents

- [How to Use This List](#how-to-use-this-list)
- [Api-Wrappers Packages](#api-wrappers-packages)
- [Categories](#categories)
  - [Payments](#payments)
  - [Communication](#communication)
  - [Media / Entertainment](#media--entertainment)
  - [Gaming](#gaming)
  - [Anime / Manga](#anime--manga)
  - [Social](#social)
  - [Cloud / Infrastructure](#cloud--infrastructure)
  - [AI / ML](#ai--ml)
  - [Developer Tools](#developer-tools)
  - [Misc](#misc)
- [How to Get Listed](#how-to-get-listed)
- [What Makes a Good API Wrapper?](#what-makes-a-good-api-wrapper)
- [Contribution Rules](#contribution-rules)
- [Related Lists](#related-lists)

---

## How to Use This List

Use the tables to compare wrappers quickly:

- **API** tells you which upstream service the wrapper targets.
- **Language** helps you find clients for your stack.
- **Official / community** shows whether the API provider maintains it.
- **Package link** takes you to the registry or package documentation.
- **GitHub link** takes you to source, issues, releases, and license details.
- **Notes** call out practical strengths without using unverifiable metrics.

This repo does not track stars, downloads, or latest releases because those
fields get stale quickly unless they are generated automatically.

---

## Api-Wrappers Packages

The organization behind this list also maintains a few TypeScript wrappers.
They are listed here for discoverability, but the main list uses the same
criteria for every project.

| Name | API | Package link | GitHub link | Notes |
| --- | --- | --- | --- | --- |
| anilist-wrapper | AniList | [npm](https://www.npmjs.com/package/@api-wrappers/anilist-wrapper) | [GitHub](https://github.com/Api-Wrappers/anilist-wrapper) | Typed GraphQL workflows for anime, manga, users, staff, characters, and media lists. |
| igdb-wrapper | IGDB | [npm](https://www.npmjs.com/package/@api-wrappers/igdb-wrapper) | [GitHub](https://github.com/Api-Wrappers/igdb-wrapper) | Type-safe APICalypse queries, OAuth helpers, pagination, and image URL utilities. |
| tmdb-wrapper | TMDB | [npm](https://www.npmjs.com/package/@api-wrappers/tmdb-wrapper) | [GitHub](https://github.com/Api-Wrappers/tmdb-wrapper) | Typed movie, TV, search, discover, watch-provider, session, and image workflows. |

---

## Categories

### Payments

| Name | API | Language | Official / community | Package link | GitHub link | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| plaid-node | Plaid | TypeScript | Official | [npm](https://www.npmjs.com/package/plaid) | [GitHub](https://github.com/plaid/plaid-node) | Node client generated from Plaid's OpenAPI definition. |
| plaid-python | Plaid | Python | Official | [PyPI](https://pypi.org/project/plaid-python/) | [GitHub](https://github.com/plaid/plaid-python) | Python client generated from Plaid's OpenAPI definition. |
| stripe-node | Stripe | TypeScript | Official | [npm](https://www.npmjs.com/package/stripe) | [GitHub](https://github.com/stripe/stripe-node) | Typed Node SDK with webhook helpers and broad Stripe API coverage. |
| stripe-python | Stripe | Python | Official | [PyPI](https://pypi.org/project/stripe/) | [GitHub](https://github.com/stripe/stripe-python) | Python SDK with async support, typed models, and webhook helpers. |

### Communication

| Name | API | Language | Official / community | Package link | GitHub link | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| discord.js | Discord | TypeScript | Community | [npm](https://www.npmjs.com/package/discord.js) | [GitHub](https://github.com/discordjs/discord.js) | Mature Discord library with gateway, REST, builders, and voice packages. |
| discord.py | Discord | Python | Community | [PyPI](https://pypi.org/project/discord.py/) | [GitHub](https://github.com/Rapptz/discord.py) | Async-first Discord wrapper with command and extension support. |
| discordgo | Discord | Go | Community | [pkg.go.dev](https://pkg.go.dev/github.com/bwmarrin/discordgo) | [GitHub](https://github.com/bwmarrin/discordgo) | Go bindings for Discord gateway, REST, interactions, and voice workflows. |
| node-slack-sdk | Slack | TypeScript | Official | [npm](https://www.npmjs.com/package/@slack/web-api) | [GitHub](https://github.com/slackapi/node-slack-sdk) | Slack Web API client plus packages for events, OAuth, sockets, and Bolt. |
| python-slack-sdk | Slack | Python | Official | [PyPI](https://pypi.org/project/slack-sdk/) | [GitHub](https://github.com/slackapi/python-slack-sdk) | Python SDK for Slack Web API, OAuth, Socket Mode, and signature handling. |
| python-telegram-bot | Telegram Bot API | Python | Community | [PyPI](https://pypi.org/project/python-telegram-bot/) | [GitHub](https://github.com/python-telegram-bot/python-telegram-bot) | Telegram bot framework with async handlers, jobs, and persistence helpers. |
| serenity | Discord | Rust | Community | [docs.rs](https://docs.rs/serenity/latest/serenity/) | [GitHub](https://github.com/serenity-rs/serenity) | Rust Discord library covering gateway events, REST, commands, and cache support. |
| twilio-node | Twilio | TypeScript | Official | [npm](https://www.npmjs.com/package/twilio) | [GitHub](https://github.com/twilio/twilio-node) | Node helper library for Twilio messaging, voice, Verify, and other APIs. |
| twilio-python | Twilio | Python | Official | [PyPI](https://pypi.org/project/twilio/) | [GitHub](https://github.com/twilio/twilio-python) | Python helper library for Twilio messaging, voice, Verify, and other APIs. |

### Media / Entertainment

| Name | API | Language | Official / community | Package link | GitHub link | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| spotify-web-api-ts-sdk | Spotify Web API | TypeScript | Official | [npm](https://www.npmjs.com/package/@spotify/web-api-ts-sdk) | [GitHub](https://github.com/spotify/spotify-web-api-ts-sdk) | Official TypeScript SDK for Spotify catalog, playback, playlist, and user APIs. |
| spotipy | Spotify Web API | Python | Community | [PyPI](https://pypi.org/project/spotipy/) | [GitHub](https://github.com/spotipy-dev/spotipy) | Lightweight Python client for Spotify endpoints and OAuth flows. |
| tmdb-wrapper | TMDB | TypeScript | Community | [npm](https://www.npmjs.com/package/@api-wrappers/tmdb-wrapper) | [GitHub](https://github.com/Api-Wrappers/tmdb-wrapper) | Typed TMDB v3 client for movies, TV, search, discover, images, and sessions. |

### Gaming

| Name | API | Language | Official / community | Package link | GitHub link | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| helix | Twitch Helix | Go | Community | [pkg.go.dev](https://pkg.go.dev/github.com/nicklaw5/helix/v2) | [GitHub](https://github.com/nicklaw5/helix) | Go client for Twitch Helix endpoints, EventSub verification, and OAuth tokens. |
| igdb-wrapper | IGDB | TypeScript | Community | [npm](https://www.npmjs.com/package/@api-wrappers/igdb-wrapper) | [GitHub](https://github.com/Api-Wrappers/igdb-wrapper) | Type-safe APICalypse queries, OAuth helpers, pagination, and image utilities. |
| twurple | Twitch | TypeScript | Community | [npm](https://www.npmjs.com/package/@twurple/api) | [GitHub](https://github.com/twurple/twurple) | Twitch library covering Helix, EventSub, chat, auth, and PubSub packages. |

### Anime / Manga

| Name | API | Language | Official / community | Package link | GitHub link | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| anilist-wrapper | AniList | TypeScript | Community | [npm](https://www.npmjs.com/package/@api-wrappers/anilist-wrapper) | [GitHub](https://github.com/Api-Wrappers/anilist-wrapper) | Typed GraphQL client for anime, manga, users, staff, characters, and lists. |
| AnilistPython | AniList | Python | Community | [PyPI](https://pypi.org/project/AnilistPython/) | [GitHub](https://github.com/ReZeroE/AnilistPython) | Python library for AniList GraphQL queries and media lookups. |

### Social

| Name | API | Language | Official / community | Package link | GitHub link | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| node-twitter-api-v2 | Twitter/X API | TypeScript | Community | [npm](https://www.npmjs.com/package/twitter-api-v2) | [GitHub](https://github.com/PLhery/node-twitter-api-v2) | TypeScript client for Twitter/X API v1.1, v2, OAuth, streams, and media uploads. |
| praw | Reddit | Python | Community | [PyPI](https://pypi.org/project/praw/) | [GitHub](https://github.com/praw-dev/praw) | Python Reddit API wrapper with an idiomatic object model. |
| tweepy | Twitter/X API | Python | Community | [PyPI](https://pypi.org/project/tweepy/) | [GitHub](https://github.com/tweepy/tweepy) | Python Twitter/X API client with OAuth, streaming, and async support. |

### Cloud / Infrastructure

| Name | API | Language | Official / community | Package link | GitHub link | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| aws-sdk-js-v3 | AWS | TypeScript | Official | [npm](https://www.npmjs.com/package/@aws-sdk/client-s3) | [GitHub](https://github.com/aws/aws-sdk-js-v3) | Modular AWS SDK with per-service clients, middleware, and TypeScript types. |
| boto3 | AWS | Python | Official | [PyPI](https://pypi.org/project/boto3/) | [GitHub](https://github.com/boto/boto3) | Python AWS SDK covering service clients, resources, sessions, and paginators. |
| firebase-admin-node | Firebase Admin | TypeScript | Official | [npm](https://www.npmjs.com/package/firebase-admin) | [GitHub](https://github.com/firebase/firebase-admin-node) | Admin SDK for Firebase Auth, Firestore, Storage, Messaging, and app checks. |

### AI / ML

| Name | API | Language | Official / community | Package link | GitHub link | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| anthropic-sdk-python | Anthropic | Python | Official | [PyPI](https://pypi.org/project/anthropic/) | [GitHub](https://github.com/anthropics/anthropic-sdk-python) | Python SDK with sync and async clients, streaming, and tool-use support. |
| anthropic-sdk-typescript | Anthropic | TypeScript | Official | [npm](https://www.npmjs.com/package/@anthropic-ai/sdk) | [GitHub](https://github.com/anthropics/anthropic-sdk-typescript) | TypeScript SDK with typed requests, streaming, and tool-use support. |
| cohere-python | Cohere | Python | Official | [PyPI](https://pypi.org/project/cohere/) | [GitHub](https://github.com/cohere-ai/cohere-python) | Python SDK for Cohere generation, embeddings, classification, and reranking. |
| groq-python | Groq | Python | Official | [PyPI](https://pypi.org/project/groq/) | [GitHub](https://github.com/groq/groq-python) | Python SDK for Groq chat completions and low-latency inference workflows. |
| huggingface_hub | Hugging Face Hub | Python | Official | [PyPI](https://pypi.org/project/huggingface-hub/) | [GitHub](https://github.com/huggingface/huggingface_hub) | Python client for model, dataset, Space, repository, and inference workflows. |
| openai-node | OpenAI | TypeScript | Official | [npm](https://www.npmjs.com/package/openai) | [GitHub](https://github.com/openai/openai-node) | TypeScript SDK with typed responses, streaming, file uploads, and webhooks. |
| openai-python | OpenAI | Python | Official | [PyPI](https://pypi.org/project/openai/) | [GitHub](https://github.com/openai/openai-python) | Python SDK with sync and async clients, streaming, uploads, and typed helpers. |

### Developer Tools

| Name | API | Language | Official / community | Package link | GitHub link | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| go-github | GitHub REST API | Go | Community | [pkg.go.dev](https://pkg.go.dev/github.com/google/go-github/v74/github) | [GitHub](https://github.com/google/go-github) | Go client for GitHub REST endpoints with request and response types. |
| octocrab | GitHub REST API | Rust | Community | [docs.rs](https://docs.rs/octocrab/latest/octocrab/) | [GitHub](https://github.com/XAMPPRocky/octocrab) | Async Rust client for GitHub REST endpoints with typed builders. |
| octokit.js | GitHub REST and GraphQL APIs | TypeScript | Official | [npm](https://www.npmjs.com/package/octokit) | [GitHub](https://github.com/octokit/octokit.js) | GitHub SDK with REST, GraphQL, pagination, auth, and plugin support. |
| PyGithub | GitHub REST API | Python | Community | [PyPI](https://pypi.org/project/PyGithub/) | [GitHub](https://github.com/PyGithub/PyGithub) | Python library for GitHub repositories, issues, pull requests, users, and orgs. |

### Misc

| Name | API | Language | Official / community | Package link | GitHub link | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| google-maps-services-js | Google Maps Platform | TypeScript | Official | [npm](https://www.npmjs.com/package/@googlemaps/google-maps-services-js) | [GitHub](https://github.com/googlemaps/google-maps-services-js) | Node client for geocoding, directions, distance matrix, elevation, and Places. |
| gridnews-sdk | GridNews | TypeScript | Official | [npm](https://www.npmjs.com/package/@gridnews/sdk) | [GitHub](https://github.com/gridnews/sdk) | Typed REST and streaming client for GridNews market news, press releases, and sentiment. |
| mapbox-sdk-js | Mapbox | TypeScript | Official | [npm](https://www.npmjs.com/package/@mapbox/mapbox-sdk) | [GitHub](https://github.com/mapbox/mapbox-sdk-js) | JavaScript SDK for Mapbox web services including geocoding and uploads. |

---

## How to Get Listed

1. Check that the wrapper meets the [contribution rules](#contribution-rules).
2. Open an issue with the **Add a wrapper** template if you want feedback first.
3. Add the wrapper to the most specific category in `README.md`.
4. Keep the row factual, short, and easy to verify from the package and repo links.
5. Open a pull request using the template.

New categories should be proposed only when at least three maintained wrappers
fit the category and do not fit an existing section.

---

## What Makes a Good API Wrapper?

A good API wrapper should reduce integration work without hiding important API
behavior. Strong candidates usually have:

- clear install and quickstart docs
- typed requests and responses, or idiomatic type hints for the language
- practical coverage of auth, pagination, retries, errors, and rate limits
- examples for real workflows, not only trivial requests
- tests or generated clients that track the upstream API
- visible maintenance and recent compatibility work
- a license that allows developers to use the project safely

---

## Contribution Rules

Submissions must:

- be maintained and work with the current upstream API
- have documentation with usage examples
- have a license
- link to both a package page and a GitHub repository
- describe a wrapper or SDK for a specific public API
- avoid spam, affiliate links, paid placement, and unverifiable claims

Submissions should not include:

- general HTTP clients
- SDK generators without a specific wrapped API
- abandoned repositories
- duplicate wrappers for the same API and language unless there is a clear reason
- stars, downloads, latest release dates, or other fields that are not generated automatically

Read [CONTRIBUTING.md](CONTRIBUTING.md) for the full format and review process.

---

## Related Lists

- [Public APIs](https://github.com/public-apis/public-apis) — if you are looking for APIs to integrate with
- [Awesome Go](https://github.com/avelino/awesome-go)
- [Awesome Node.js](https://github.com/sindresorhus/awesome-nodejs)
- [Awesome Python](https://github.com/vinta/awesome-python)

---

## Contributors

Thanks to everyone who has contributed.

[![Contributors](https://contrib.rocks/image?repo=Api-Wrappers/awesome-api-wrappers)](https://github.com/Api-Wrappers/awesome-api-wrappers/graphs/contributors)
