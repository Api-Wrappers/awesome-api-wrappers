# Awesome API Wrappers [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> A curated list of API wrappers and SDKs that are actually pleasant to use.

Raw HTTP APIs are manageable at first, but the repetitive parts add up fast:
authentication, retries, pagination, rate limits, serialization, versioning, and
error handling.

This list focuses on wrappers and SDKs that make those problems smaller. The bar
is simple: good docs, visible maintenance, useful API coverage, and an
interface that feels natural in the language it targets.

This is intentionally selective. The goal is not to list every API client on
GitHub. The goal is to surface the ones people can realistically start with and
trust.

`Official` means maintained by the API provider. `Community` means maintained
independently.

---

## Contents

- [Maintainer Picks](#maintainer-picks)
- [By Category](#by-category)
- [Inclusion Criteria](#inclusion-criteria)
- [Contributing](#contributing)
- [Related Lists](#related-lists)
- [Contributors](#contributors)

---

## Maintainer Picks

A few standout projects with strong docs, solid maintenance, and a good track
record in real-world use.

- [discord.js](https://github.com/discordjs/discord.js) – Mature Discord
  library for Node.js with broad feature coverage and a large ecosystem.
  `TypeScript` · `Community`
- [discord.py](https://github.com/Rapptz/discord.py) – Async-first Discord
  wrapper with solid docs and a long history of production use. `Python` ·
  `Community`
- [octokit.js](https://github.com/octokit/octokit.js) – GitHub SDK with REST
  and GraphQL clients, pagination helpers, and plugin support. `TypeScript` ·
  `Official`
- [stripe-node](https://github.com/stripe/stripe-node) – Stripe Node SDK with
  strong TypeScript support and good webhook tooling. `TypeScript` · `Official`
- [tweepy](https://github.com/tweepy/tweepy) – Established Python client for
  the Twitter/X API with OAuth and streaming support. `Python` · `Community`
- [twurple](https://github.com/twurple/twurple) – Well-rounded Twitch library
  covering Helix, EventSub, chat, and auth flows. `TypeScript` · `Community`

---

## By Category

### 🤖 AI & Machine Learning

- [anthropic-sdk-python](https://github.com/anthropics/anthropic-sdk-python) –
  Python SDK for the Claude API. `Python` · `Official`
- [anthropic-sdk-typescript](https://github.com/anthropics/anthropic-sdk-typescript)
  – TypeScript SDK for the Claude API. `TypeScript` · `Official`
- [cohere-python](https://github.com/cohere-ai/cohere-python) – Python SDK for
  generation, embeddings, and classification. `Python` · `Official`
- [groq-python](https://github.com/groq/groq-python) – Python SDK for Groq API
  access and LLM inference. `Python` · `Official`
- [huggingface.js](https://github.com/huggingface/huggingface.js) – JavaScript
  and TypeScript SDK for Hugging Face services. `TypeScript` · `Official`
- [huggingface_hub](https://github.com/huggingface/huggingface_hub) – Python
  client for the Hugging Face Hub, downloads, and inference APIs. `Python` ·
  `Official`
- [openai-node](https://github.com/openai/openai-node) – Node.js SDK for the
  OpenAI API. `TypeScript` · `Official`
- [openai-python](https://github.com/openai/openai-python) – Python SDK for the
  OpenAI API. `Python` · `Official`

### 💬 Communication & Messaging

- [discord.js](https://github.com/discordjs/discord.js) – Discord API library
  for Node.js. `TypeScript` · `Community`
- [discord.py](https://github.com/Rapptz/discord.py) – Async Discord API
  wrapper for Python. `Python` · `Community`
- [discordgo](https://github.com/bwmarrin/discordgo) – Go bindings for the
  Discord API. `Go` · `Community`
- [node-slack-sdk](https://github.com/slackapi/node-slack-sdk) – Slack SDK for
  Node.js. `TypeScript` · `Official`
- [python-slack-sdk](https://github.com/slackapi/python-slack-sdk) – Slack SDK
  for Python. `Python` · `Official`
- [python-telegram-bot](https://github.com/python-telegram-bot/python-telegram-bot)
  – Telegram Bot API wrapper with a full bot framework. `Python` · `Community`
- [serenity](https://github.com/serenity-rs/serenity) – Async Discord library
  for Rust. `Rust` · `Community`
- [twilio-node](https://github.com/twilio/twilio-node) – Twilio helper library
  for Node.js. `TypeScript` · `Official`
- [twilio-python](https://github.com/twilio/twilio-python) – Twilio helper
  library for Python. `Python` · `Official`

### 🛠 Developer Platforms

- [go-github](https://github.com/google/go-github) – Popular Go client for the
  GitHub REST API, maintained by Google. `Go` · `Community`
- [octocrab](https://github.com/XAMPPRocky/octocrab) – Extensible async GitHub
  client for Rust. `Rust` · `Community`
- [octokit.js](https://github.com/octokit/octokit.js) – GitHub SDK for
  JavaScript and TypeScript. `TypeScript` · `Official`
- [PyGithub](https://github.com/PyGithub/PyGithub) – Python library for the
  GitHub REST API. `Python` · `Community`

### 🌐 Social Media

- [node-twitter-api-v2](https://github.com/PLhery/node-twitter-api-v2) –
  Full-featured Twitter/X API v2 client for Node.js. `TypeScript` · `Community`
- [praw](https://github.com/praw-dev/praw) – Python Reddit API Wrapper with an
  idiomatic object model. `Python` · `Community`
- [tweepy](https://github.com/tweepy/tweepy) – Python wrapper for the
  Twitter/X API with OAuth and streaming support. `Python` · `Community`

### 💳 Payments & Finance

- [plaid-node](https://github.com/plaid/plaid-node) – Plaid client library for
  Node.js. `TypeScript` · `Official`
- [plaid-python](https://github.com/plaid/plaid-python) – Plaid client library
  for Python. `Python` · `Official`
- [stripe-node](https://github.com/stripe/stripe-node) – Stripe SDK for
  Node.js. `TypeScript` · `Official`
- [stripe-python](https://github.com/stripe/stripe-python) – Stripe SDK for
  Python. `Python` · `Official`

### 🗺 Maps & Location

- [mapbox-sdk-js](https://github.com/mapbox/mapbox-sdk-js) – JavaScript SDK for
  Mapbox APIs. `TypeScript` · `Official`

### 🎬 Media & Entertainment

- [tmdb-wrapper](https://github.com/Api-Wrappers/tmdb-wrapper) – Typed TMDB API
  wrapper. `TypeScript` · `Community`

### 🎮 Gaming

- [helix](https://github.com/nicklaw5/helix) – Go client for the Twitch Helix
  API. `Go` · `Community`
- [igdb-wrapper](https://github.com/Api-Wrappers/igdb-wrapper) – Type-safe IGDB
  client with a fluent query builder. `TypeScript` · `Community`
- [twurple](https://github.com/twurple/twurple) – Twitch API library covering
  Helix, EventSub, Chat, and more. `TypeScript` · `Community`

### 📺 Anime & Manga

- [anilist-wrapper](https://github.com/Api-Wrappers/anilist-wrapper) – AniList
  GraphQL API wrapper for Node.js. `TypeScript` · `Community`
- [AnilistPython](https://github.com/ReZeroE/AnilistPython) – Python library
  for the AniList GraphQL API. `Python` · `Community`

---

## Inclusion Criteria

Projects listed here should:

- be actively maintained
- have documentation with a usable quickstart
- provide meaningful coverage of a real API
- work with the current upstream API
- offer an interface that is reasonably idiomatic for the language

Strong positives:

- published package on a common registry
- typed models or type hints
- examples that cover real workflows
- tests
- recent releases or visible issue activity
- a history of keeping up with upstream API changes

Projects may be removed if they become unmaintained, fall behind the upstream
API, or no longer provide a good developer experience.

---

## Contributing

Contributions are welcome, but please keep the bar high.

Before opening a PR:

- make sure the project meets the inclusion criteria
- place it in the most relevant category
- keep the description short and factual
- avoid duplicates
- sort entries alphabetically within sections

If you're submitting your own project, that's completely fine — just be clear
about its maintenance status and documentation quality.

---

## Related Lists

- [Awesome Node.js](https://github.com/sindresorhus/awesome-nodejs)
- [Awesome Python](https://github.com/vinta/awesome-python)

---

## Contributors

Thanks to everyone who has contributed.

[![Contributors](https://contrib.rocks/image?repo=Api-Wrappers/awesome-api-wrappers)](https://github.com/Api-Wrappers/awesome-api-wrappers/graphs/contributors)
