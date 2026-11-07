# Dark portfolio redesign — review and validation

Completed locally on November 7, 2026. This is the visual replacement requested after the React migration, not the earlier cream/green design. No push or deployment was performed.

## Visual baseline and implementation

The original Jekyll commit `86654f93ecc573e16266e3a3aff137b48cfdb1f5` supplies the visual baseline: active `soft_lavender` theme, portrait/sidebar, substantial project cards, and screenshot/video galleries. Its source defines indigo `#22223B`, dusty grape `#4A4E69`, warm text `#F2E9E4`, almond `#C9ADA7`, and lilac `#9A8C98`.

The new system retains that identity while adding a lavender interaction accent, tonal panels, self-hosted Manrope/IBM Plex Sans typography, a responsive portrait/profile component, and large project galleries with authored implementation highlights. Experience has a chronological timeline; Skills groups real technologies and links to supporting projects. Personal interests, Christian faith, preaching, club leadership, development setup, and personal links remain. Instagram was restored from the original author configuration.

React, TypeScript, Vite, Markdown project files, the content schema, generated HTML routes, and deployment infrastructure remain. Listing payloads now include the existing small project Markdown bodies so showcase highlights reuse authored material instead of maintaining a second source of claims. All 13 projects, eight original project screenshots, eleven video references, and five experience entries/photos are preserved. New responsive image derivatives reduce thumbnail and mobile downloads; original media remains available.

## Executed checks

- `npm run check:content`: passed for 13 projects, five experience entries, five skill groups, profile, and navigation.
- `npm run build`: passed TypeScript, client compilation, React prerendering and static validation: 20 independent HTML pages, 13 project-detail routes, and 754 internal references.
- `npm run test:browser`: **nine passed** against the final build. Coverage includes direct routes/refresh, no-JavaScript content, native non-autoplay video/error recovery, deferred full-size images, gallery keyboard selection/enlargement/Escape/focus return, visible gallery focus, dark-first and persistent theme settings, and layout checks at 320/390/768/1440px.
- Twelve axe-core scans across six representative routes in both themes found no automated WCAG A/AA violations. This does not establish complete WCAG conformance.
- Phone regression checks confirm the featured project title and at least 120px of media fit the initial 390×844 viewport; full introductory paragraphs remain below the feature on phones.
- Lighthouse on the final local production homepage: **97 performance, 100 accessibility, 100 best practices, 100 SEO**. Mobile lab metrics: FCP 0.8s, LCP 2.6s, total blocking time 70ms, CLS 0.001. Lab results may differ on the deployed site and visitors’ devices.
- Impeccable source detector: no findings. Provenance scan: 62 rasters, zero missing records. `git diff --check`: passed.

## Independent critique and audit

Two independent assessments reviewed the implementation. The design review used actual desktop, phone, tablet, project-detail, experience, skills, light-theme and media-error captures. It requested a phone first-viewport correction. The technical audit found a clipped gallery focus indicator.

Both were fixed and verified: the featured title precedes phone media, the full introduction follows the feature, and the gallery frame paints a visible focus ring outside its clipped image. A final design verdict scored the listed composition fix resolved with no visible introduced regressions (`ship` at that scope). The technical reviewer separately verified the focus fix resolved in both themes. Design documentation was rewritten in `DESIGN.md` and `.impeccable/design.json` and checked against the source tokens.

The external Impeccable concept service was unavailable after the permitted retry; no remote challenger boards or approved image comp were used. The explicit owner brief, original visual baseline, recorded code-first workflow and local skill references governed the work.

## Limits and preview

Cloudinary playback and the external Talbook demo remain unverified because of environment network restrictions. Original URLs and direct-file recovery links are retained. The tested error state is intentionally simulated; it is not evidence that a remote host is available. Browser testing used Chromium emulation, not physical phones or a screen reader.

Run `npm ci` if dependencies are not installed, then `npm run dev` for development. For production output, run `npm run build` followed by `npm run preview`. The site remains unpublished until explicitly approved.
