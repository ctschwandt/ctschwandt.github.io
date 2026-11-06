# Cole Schwandt’s portfolio

A content-driven portfolio built with React, TypeScript, and Vite for [ctschwandt.github.io](https://ctschwandt.github.io/). Projects live in Markdown; biography, experience, skills, and links live in JSON. The production build generates a complete HTML document for every page.

## Develop locally

Use Node.js **22.12 or newer** and npm. Ruby, Bundler, and Jekyll are no longer needed. From the repository root:

```sh
npm ci
npm run dev
```

Vite prints the local server address. Content changes reload the page. Use `npm install` when intentionally changing dependencies and commit both `package.json` and `package-lock.json`; use `npm ci` for normal setup and CI.

```sh
npm run typecheck       # TypeScript validation
npm run check:content   # Validate Markdown, JSON, URLs, and local media
npm run build           # Typecheck, generate static pages, and check the output
npm run check:site      # Recheck an existing dist/ build
npm run preview        # Serve the production build
```

`npm test` runs content validation. For browser checks, install Playwright’s Chromium once with `npx playwright install chromium`, then run `npm run test:browser`. On Linux, Playwright may also require its documented browser system dependencies. Browser checks are separate from the production build.

`check:site` checks generated routes, local links and fragments, assets, metadata, sitemap entries, and accidental template content. It does **not** establish external website or video availability.

## Where to edit content

| Change | Location |
| --- | --- |
| Projects | `src/content/projects/*.md` |
| Biography, education, social links, development setup | `src/content/profile.json` |
| Work and research experience | `src/content/experience.json` |
| Skills | `src/content/skills.json` |
| Navigation | `src/content/navigation.json` |
| Images, videos, résumé | `public/` |
| Typography, colors, spacing, responsive styles | `src/styles/main.css` |

Keep claims factual. The five brief additional projects intentionally remain short because the old site supplied no further implementation details. See [the migration record](docs/content-migration.md) for provenance and known gaps.

## Add a project

1. Create `src/content/projects/my-project.md`. Use lowercase words separated by hyphens; the filename becomes `/projects/my-project/`.
2. Add YAML front matter and a nonempty Markdown description.
3. Add optional media under `public/` or use HTTPS media URLs.
4. Run `npm run build`, inspect the result, and commit the content and assets.

The build discovers project files automatically. An ordinary new project requires no JSX, routing, CSS, or configuration edits. A minimal file is:

```md
---
title: My project
summary: A concise, factual description of what I implemented.
---

## Implementation

Describe the problem, your contribution, and the technical details worth exploring.
```

This complete example demonstrates every supported metadata field. Its paths and URLs are illustrative; replace them with actual files and destinations before adding it to the content directory.

```md
---
title: My project
summary: A concise description of the project and my contribution.
technologies:
  - C++
  - OpenGL
year: "2026"
order: 80
featured: false
github: https://github.com/your-account/your-project
demo: https://your-project.example.com/
images:
  - src: /images/projects/my-project.png
    alt: A description of the information visible in the screenshot
    caption: An optional explanation of the screenshot.
videos:
  - src: /videos/my-project.mp4
    poster: /images/projects/my-project-poster.jpg
    caption: A demonstration of the implemented behavior.
links:
  - label: Technical notes
    url: https://your-site.example.com/notes/
---

## Overview

Explain what the project does and why it is technically interesting.

## Implementation

- Describe what you personally implemented.
- Explain a supported technical decision.

## Limitations

State relevant limitations without inventing results or measurements.
```

| Field | Meaning and default |
| --- | --- |
| `title` | Required nonempty project name. |
| `summary` | Required nonempty summary for listings and page metadata. |
| `technologies` | Optional string list; defaults to `[]`. |
| `year` | Optional display label, quoted string or number. Omit when unknown. |
| `order` | Optional finite number; defaults to `100`. Lower values appear first; ties sort by title. |
| `featured` | Optional boolean; defaults to `false`. Marks a project for the homepage selection. |
| `github` | Optional HTTPS source repository URL. |
| `demo` | Optional HTTPS demonstration URL. |
| `images` | Optional `{src, alt, caption?}` list. Nonempty alternative text is required; captions are optional. |
| `videos` | Optional `{src, poster?, caption}` list. Descriptive captions are required; posters are optional. |
| `links` | Optional `{label, url}` list for additional HTTPS or root-relative destinations. |

Only `title`, `summary`, and a Markdown body are required. Lists default to empty. A text-only project has a complete layout; never insert empty URLs or placeholder media to satisfy optional fields. Validation errors identify the file and field.

Start body headings at `##`; the page supplies its own `h1`. Standard paragraphs, lists, links, code blocks, and tables are supported. Raw HTML is escaped rather than executed. Put project images and videos in front matter instead of embedding HTML players.

### Screenshots and videos

`public/images/projects/example.png` is referenced as `/images/projects/example.png`, never `/public/images/...`. Root-relative media must exist; content validation catches missing files.

Existing assets have responsive WebP derivatives recorded in `src/image-assets.ts`; originals remain available. New images fall back to their supplied path automatically, so an optimizer or manifest edit is **not** required to add a project. Resize and compress new assets sensibly. When replacing an existing image with generated derivatives, regenerate those derivatives or remove its mapping in `src/image-assets.ts` to avoid showing stale artwork.

Multiple assets appear in document order. Videos use native controls without autoplay. Keep clips compressed and provide posters where possible. Existing Cloudinary URLs are preserved. Remote media can become unavailable independently of the site; the interface also provides the original video link. Supply captions/transcripts for meaningful audio and explain otherwise unclear visual behavior in the project text.

## Update other information

### Experience

Edit `src/content/experience.json`. Array order is display order; keep it reverse chronological. Example entry:

```json
{
  "id": "unique-role-id",
  "role": "Role title",
  "organization": "Organization",
  "location": "City, State",
  "start": "June 2026",
  "end": "Present",
  "summary": "A concise description of the work.",
  "bullets": ["A factual responsibility or contribution."],
  "image": "/images/experience/example.jpg"
}
```

`location` and `image` are optional; other fields are required. IDs must be unique and should remain stable because `/experience/#unique-role-id` can be linked directly. Local images must exist in `public/`. Substantial research details can live in project Markdown while the experience entry stays concise.

### Skills

Edit `src/content/skills.json`. Each object has a `title` and an `items` array. Add a category or skill without touching components. Categories and values appear in file order; there are no numeric proficiency ratings.

### Biography, education, contact, and résumé

Edit `src/content/profile.json`. `intro` and `personal` contain paragraphs; `interests` contains strings. `social` and `personalLinks` contain `{label, url}` objects. Education, club leadership, and development setup live here too. When graduation changes, update education and any biography paragraph mentioning it.

No public email or real résumé was verified during migration, so neither is populated. Once Cole provides approved details, add optional `email` and/or `resume` strings to this JSON file. Put the real PDF at, for example, `public/files/cole-schwandt-resume.pdf`, then set `"resume": "/files/cole-schwandt-resume.pdf"`. Set `email` to the actual approved address without a `mailto:` prefix. Links render only when values are supplied; no component edit is needed. Do not revive the fictional template CV as a résumé.

### Navigation

Edit `src/content/navigation.json`; each entry has `label` and `href`. Reorder, rename, or link to existing generated routes or HTTPS destinations. Adding a navigation entry does **not** create a top-level page. A new custom page needs a React implementation and route in `src/entry-server.tsx`; project pages are generated automatically.

## Design and theme

`src/styles/main.css` centralizes light/dark colors, fonts, spacing, line lengths, and content width as CSS custom properties. Change `:root` tokens and their dark-theme equivalents together. Source Serif 4 and Source Sans 3 are self-hosted through Fontsource packages, without runtime Google Fonts requests. If changing fonts, update imports and family tokens.

The theme control supports system, light, and dark modes. Explicit choices persist locally; system mode follows the operating system. Preserve visible focus, contrast, reduced-motion support, and readable line lengths when changing styles.

`PRODUCT.md`, `DESIGN.md`, and `.impeccable/` capture product/design decisions. Repository-local Impeccable installations are retained in `.agents/skills/impeccable/` and `.github/skills/impeccable/`; routine content editing requires neither reinstallation nor skill execution.

## Static rendering architecture

Vite builds browser assets and `src/entry-server.tsx`. `scripts/build.ts` gets the route list, renders React with `renderToString`, and writes each page into `dist/`. `src/entry-client.tsx` activates that markup with `hydrateRoot`.

Main routes are `/`, `/projects/`, `/experience/`, and `/skills/`. Markdown projects become `/projects/<filename>/index.html`. `/about/` and `/about.html` remain homepage aliases. A genuine `404.html` handles missing pages; it is not a routing workaround. Navigation uses ordinary links without React Router or a GitHub Pages fallback. Content and metadata are available before JavaScript runs.

The build generates canonical URLs, Open Graph/Twitter metadata, a sitemap, robots configuration, and `.nojekyll`. Production uses `https://ctschwandt.github.io` with Vite base `/`. `public/social-preview.png` supplies the social preview. If changing domains, update `siteUrl` in `src/entry-server.tsx`, the origin in `scripts/check-site.ts`, and Vite’s base when needed.

Do not commit generated `dist/`, temporary server bundles, dependencies, or browser reports.

## Deploy to GitHub Pages

`.github/workflows/deploy.yml` installs from the lockfile, validates content, typechecks, builds, validates static output, and runs Chromium behavior and accessibility tests. Pull requests and pushes to `main` **validate only**. Publication is manual until Cole approves deployment.

Before the first approved deployment:

1. In repository **Settings → Pages**, set **Source** to **GitHub Actions**.
2. Configure the `github-pages` environment with a required reviewer where the repository plan supports it. The deployment job uses this environment.
3. Review and merge the intended changes normally. Merging alone does not deploy.
4. After deployment approval, open **Actions → Validate and deploy portfolio → Run workflow** and select `main`.
5. Approve the environment deployment if required, then inspect the workflow and published routes.

The workflow uploads `dist/` and deploys with the official Pages actions. The address stays `https://ctschwandt.github.io/`. No backend, database, API keys, or hosting credentials are required. Local builds do not publish anything.

Future content updates use the same validated, approved manual deployment flow. Automatic publication can be added later if Cole explicitly chooses it.

## Repository layout

```text
src/
  content/           Editable Markdown and JSON
  components/        Shared layout, media, entries, theme control
  pages/             About, projects, experience, skills, not-found
  styles/main.css    Tokens and responsive styles
  content-loader.ts  Build-time parsing and validation
  entry-server.tsx   Routes, rendered HTML, metadata
  entry-client.tsx   Hydration
scripts/             Build and validation tools
public/              Media, social preview, optional résumé
docs/                Migration record
.github/workflows/   Validation and approved deployment
```

The inherited Academic Pages examples are not part of the new publication. Original license attribution remains in `LICENSE`; see [the migration record](docs/content-migration.md).
