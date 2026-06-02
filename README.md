# open-source-events

[![Netlify Status](https://api.netlify.com/api/v1/badges/eb1db3db-800e-48f6-88c1-ac2006767679/deploy-status)](https://app.netlify.com/projects/open-source-events/deploys)
[![Quality](https://github.com/mcleo-d/open-source-events/actions/workflows/quality.yml/badge.svg)](https://github.com/mcleo-d/open-source-events/actions/workflows/quality.yml)

A markdown-driven aggregator for UK open source conferences, deployed via Netlify.

## Live site

**[https://open-source-events.netlify.app](https://open-source-events.netlify.app)**

<!-- TODO: custom domain -->

## Stack

- **Framework:** Astro (static site generator)
- **Content:** Markdown files with YAML frontmatter under `src/content/events/`
- **Deployment:** Netlify (auto-deploy from `main`)

## Contributing

To add or correct an event listing, see [CONTRIBUTING.md](CONTRIBUTING.md). Validate your changes locally before opening a pull request:

```bash
npm run validate:content
```

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

## Licence

[![Licence: MIT](https://img.shields.io/badge/Licence-MIT-yellow.svg)](LICENSE)

MIT © James McLeod, 2026
