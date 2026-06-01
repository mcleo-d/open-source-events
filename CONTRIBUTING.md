# Contributing to UK Open Source Events

Thank you for helping keep this list accurate and useful. Contributions are welcome from anyone — you do not need to be an event organiser to submit or correct a listing.

## How to add an event

### 1. Clone the repository

```bash
git clone https://github.com/mcleo-d/open-source-events.git
cd open-source-events
npm install
```

### 2. Copy the event template

```bash
cp src/content/events/_template.md src/content/events/my-event-name.md
```

Use a short, lowercase, hyphen-separated filename that matches the event name, e.g. `state-of-open-con.md`. The filename becomes the URL slug (`/events/my-event-name/`).

### 3. Fill in the frontmatter

Open the new file and fill in every required field. Optional fields are commented out — uncomment and complete any that apply.

| Field | Required | Description | Example |
|---|---|---|---|
| `title` | Yes | Full event name | `"State of Open Con 2026"` |
| `start_date` | Yes | Start date in `YYYY-MM-DD` format | `"2026-02-04"` |
| `end_date` | Yes | End date — same as `start_date` for single-day events | `"2026-02-05"` |
| `city` | Yes | Host city | `London` |
| `country` | No | Host country (defaults to `United Kingdom`) | `United Kingdom` |
| `format` | Yes | One of `in-person`, `hybrid`, or `virtual` | `in-person` |
| `topics` | Yes | List of topic tags, at least one | `[open source, community]` |
| `price` | Yes | One of `free` or `paid` | `free` |
| `url` | Yes | Canonical event website URL | `https://stateofopencon.com` |
| `summary` | Yes | One sentence describing the event | `"A conference for..."` |
| `venue` | No | Venue name | `"ExCeL London"` |
| `org` | No | Organising body | `"OpenUK"` |
| `cfp_url` | No | Call for proposals URL | `https://example.com/cfp` |
| `cfp_deadline` | No | CFP closing date (free text) | `"31 January 2026"` |
| `code_of_conduct_url` | No | Event-specific code of conduct URL | `https://example.com/coc` |
| `twitter` | No | Twitter/X handle without `@` | `stateofopencon` |

You may also add an extended description in Markdown below the frontmatter `---` closing delimiter. This text appears on the event detail page.

### 4. Run the content validator

```bash
npm run validate:content
```

Expected output:

```
✓ my-event-name.md
N event(s) valid.
```

Fix any validation errors reported before opening a pull request.

### 5. Open a pull request

Push your branch and open a pull request against `main`. The PR title should follow the format:

```
feat(events): add <Event Name>
```

Include a brief description and a link to the event website.

## Scope

This project lists **UK-based** open source events — conferences, summits, and meetups held in the United Kingdom, or events with significant UK community participation that are held virtually. If you are unsure whether an event qualifies, open a draft PR and ask.

## Code of Conduct

This project follows the [Contributor Covenant 2.1](CODE_OF_CONDUCT.md). By participating you agree to abide by its terms. Reports can be sent to [james.mcleod@narvi.co.uk](mailto:james.mcleod@narvi.co.uk).

## Licence

Contributions are made under the [MIT Licence](LICENSE). By submitting a pull request you confirm that you have the right to contribute the content under these terms.
