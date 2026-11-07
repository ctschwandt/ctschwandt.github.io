---
name: "Cole Schwandt’s portfolio"
description: "A personal software showcase with an indigo ground, lavender interactions, and substantial project demonstrations."
colors:
  paper: "#22223b"
  sidebar: "#1c1c30"
  surface: "#292940"
  surface-raised: "#32324c"
  ink: "#f2e9e4"
  secondary: "#bdb9ce"
  accent: "#c7b9f3"
  accent-hover: "#e3d8ff"
  almond: "#c9ada7"
  line: "#4a4e69"
  selection: "#545077"
  focus: "#d2c1ff"
  light-paper: "#f3f1f8"
  light-sidebar: "#eae6f2"
  light-surface: "#fff"
  light-surface-raised: "#eae6f2"
  light-ink: "#292538"
  light-secondary: "#62586f"
  light-accent: "#684b9f"
  light-accent-hover: "#493174"
  light-almond: "#785d57"
  light-line: "#d2cbdc"
  light-selection: "#dcd0f1"
  light-focus: "#684b9f"
typography:
  display:
    fontFamily: "'Manrope', 'Segoe UI', sans-serif"
    fontSize: "clamp(2rem, 3vw, 2.75rem)"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "'Manrope', 'Segoe UI', sans-serif"
    fontSize: "clamp(1.35rem, 2vw, 1.65rem)"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  title:
    fontFamily: "'Manrope', 'Segoe UI', sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  project-title:
    fontFamily: "'Manrope', 'Segoe UI', sans-serif"
    fontSize: "clamp(1.3rem, 1.7vw, 1.65rem)"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  body:
    fontFamily: "'IBM Plex Sans', 'Segoe UI', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  project-prose:
    fontFamily: "'IBM Plex Sans', 'Segoe UI', sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.85
  label:
    fontFamily: "'IBM Plex Sans', 'Segoe UI', sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.65
  caption:
    fontFamily: "'IBM Plex Sans', 'Segoe UI', sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.5
  navigation:
    fontFamily: "'IBM Plex Sans', 'Segoe UI', sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
    lineHeight: 1.65
  action:
    fontFamily: "'IBM Plex Sans', 'Segoe UI', sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.65
  technology:
    fontFamily: "'IBM Plex Sans', 'Segoe UI', sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  thumbnail: "5px"
  tag: "6px"
  navigation: "7px"
  control: "8px"
  media: "10px"
  dialog: "12px"
  panel: "14px"
  showcase: "16px"
  portrait: "50%"
spacing:
  sm: "0.75rem"
  base: "1rem"
  md: "1.25rem"
  panel: "1.5rem"
  lg: "2rem"
  xl: "3rem"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.sidebar}"
    typography: "{typography.action}"
    rounded: "{rounded.control}"
    padding: "0.65rem 1rem"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
    textColor: "{colors.sidebar}"
  button-project:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.paper}"
    rounded: "{rounded.navigation}"
    padding: "0.55rem 0.9rem"
  button-project-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-quiet:
    textColor: "{colors.secondary}"
    rounded: "0"
    typography: "{typography.label}"
  navigation-link:
    textColor: "{colors.secondary}"
    typography: "{typography.navigation}"
    rounded: "{rounded.navigation}"
    padding: "0.65rem 1rem"
  navigation-current:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.accent}"
  technology-chip:
    textColor: "{colors.secondary}"
    typography: "{typography.technology}"
    rounded: "{rounded.tag}"
    padding: "0.25rem 0.6rem"
  project-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
  project-showcase:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.showcase}"
  appearance-select:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tag}"
    padding: "0.4rem 0.5rem"
  image-dialog:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.dialog}"
    padding: "0"
---

# Design System: Cole Schwandt’s portfolio

## Overview

**Creative North Star: "Personal software exhibition"**

A personal software exhibition pairs Cole’s visible photograph and academic profile with substantial demonstrations of his engineering work. Deep indigo grounds, lighter violet panels, warm text, and lavender interactions evolve the original Jekyll identity. Real screenshots and videos supply the visual detail; the interface gives them room beside direct technical descriptions.

Modern sans-serif typography, clear groups, softly rounded panels, and restrained state changes make the portfolio confident and approachable. The owner’s November 2026 redesign brief replaces the former cream/green, serif, technical-report direction. Personal identity and authentic project evidence govern the system across pages.

**Key Characteristics:**

- Indigo and lavender tonal layers with warm, readable text.
- Manrope headings paired with IBM Plex Sans reading text.
- A prominent portrait/profile and substantial project media.
- Clear navigation, contained panels, and concise technical labels.
- Native, keyboard-accessible media with restrained motion.

## Colors

The dark palette retains the original indigo ground, warm text, dusty grape structure, and almond detail while making lavender the interactive accent. Frontmatter values are normative; unprefixed colors describe the default dark theme and `light-` colors describe the explicit light variant.

### Primary

- **Lavender** (`accent`): links, selected media, current navigation, primary actions, and selected technical emphasis.
- **Pale lavender** (`accent-hover`): the brighter response for general links and primary buttons.
- **Focus lavender** (`focus`): the global keyboard outline, separate from hover treatment.

### Secondary

- **Almond** (`almond`): small profile-detail icons; a quiet warm counterpoint to lavender.

### Neutral

- **Indigo ground** (`paper`): the page and screenshot/video stages.
- **Deep indigo** (`sidebar`): the header, portrait surround, compact profile panel, and code blocks.
- **Violet panel** (`surface`): project cards, experience and skills groups, and personal information panels.
- **Raised violet** (`surface-raised`): current navigation, skill chips, and media-error panels.
- **Warm white** (`ink`): headings, primary copy, and strong text.
- **Soft lilac** (`secondary`): descriptions, metadata, dates, and secondary navigation.
- **Dusty grape** (`line`): panel edges, separators, timeline connectors, and resting thumbnail outlines.
- **Selection violet** (`selection`): selected text behind the normal foreground.

The light variant uses a pale violet page, white cards, deep violet text, and a darker purple accent. The theme selector offers Dark, Light, and System; first visits default to Dark. A stored explicit choice persists when local storage is available, and System follows changes to the operating-system preference.

**The Semantic Theme Rule.** Use the existing semantic CSS properties for surfaces, text, and interactions so each component follows the selected theme. Keep original screenshot and video pixels unchanged.

## Typography

**Display Font:** Manrope, with Segoe UI and sans-serif fallbacks.

**Body Font:** IBM Plex Sans, with Segoe UI and sans-serif fallbacks.

**Code Font:** ui-monospace, Cascadia Code, monospace; limited to authored code and code blocks.

Manrope’s compact headings give project names a clear silhouette; IBM Plex Sans supports detailed implementation notes and personal information. Fonts are self-hosted. Manrope loads weights 400, 600, and 700; IBM Plex Sans loads 400, 500, and 600.

### Hierarchy

- **Display:** the frontmatter `display` role supplies page titles. On phones at the shell breakpoint, ordinary page titles resolve to (2rem).
- **Headline:** the fluid `headline` role supplies section headings. The `title` role supplies ordinary third-level headings.
- **Project title:** the `project-title` role gives showcase names stronger weight; project-detail titles use (clamp(2rem, 3vw, 3rem)), a tighter line height (1.12), and a width limit (22ch), changing to (2.25rem) at the project mobile breakpoint.
- **Body:** ordinary reading uses the `body` role. Showcase summaries use (0.9375rem) with line height (1.7); implementation bullets use (0.875rem) with line height (1.65).
- **Project prose:** the `project-prose` role gives technical case studies extra line spacing. Main prose is limited to (70ch); project summary text to (68ch).
- **Label and caption:** secondary information uses `label` and `caption`. Gallery captions use (0.75rem) with line height (1.6).
- **Navigation and action:** dedicated frontmatter roles distinguish medium-weight navigation from semibold primary actions. Technology tags use the smaller `technology` role and preserve authored capitalization.

**The Reading Pair Rule.** Use Manrope for headings and IBM Plex Sans for interface and reading text. Reserve monospace for code rather than turning the portfolio into a simulated terminal.

## Layout

The header and page share a centered container capped at (1440px). Wide screens leave total horizontal space of (5rem) outside that container. The main grid starts (2.75rem) below the header, with a profile column (224px), a gap (3rem), and a flexible content column. The profile is sticky with a top inset (2rem), except on desktop viewports no taller than (750px). The header has a minimum height (78px).

At (1200px) and below, the profile narrows to (200px), the column gap becomes (2rem), and the portrait shrinks from (160px) to (144px). At (1060px) and below, the profile becomes a static, full-width panel above the main content, with two internal columns and a portrait (112px). At (680px) and below, the outer space totals (2.5rem), header navigation wraps below the identity, and the profile becomes a compact horizontal portrait/name group with a portrait (64px). Profile location/education details are hidden in this compact treatment; profile links remain visible.

Showcase cards place media and technical prose side by side at a (1.2fr / 1fr) ratio. At (1150px) and below, these stack with media first; their stage changes from (4 / 3) to (16 / 10). At (700px) and below, showcase titles and technology tags move above the media, followed by technical copy; card spacing and padding contract, detail-page heading/media pairs stack, and screenshot/video grids become one column. Desktop detail galleries, compact project grids, and homepage project grids use two columns. Homepage grids collapse at (680px); the academic summary remains before the featured demonstration, while the full introduction follows it. Experience and skills have their own content-driven adjustments at (1050px), (720px), and (480px).

Use the observed spacing steps in frontmatter for recurring gaps and padding. Panels generally use (1.25rem–2rem) internal space; showcase rows are separated by (2rem), contracting to (1.5rem) on phones. Preserve a flexible main column and wrapping links/tags so long technical names do not force horizontal page overflow.

## Elevation & Depth

Depth comes from indigo-to-violet tonal layers, thin borders, containment, and the darkened image-dialog backdrop. The shipped interface has no box shadows. Cards remain still; the existing small project-entry image zoom is (1.025) over (240ms) with `cubic-bezier(.16, 1, .3, 1)`. The portrait border responds over (180ms ease-out), and the main button background over (150ms ease-out), when hover and unrestricted motion are available. Reduced-motion preference disables animation and transitions globally.

**The Tonal Depth Rule.** Use the established surface layers and fine borders for ordinary grouping. Keep motion tied to an existing hover or selection interaction.

## Shapes

Gently rounded rectangles distinguish interface controls from larger content panels. Tags use the `tag` radius; navigation and showcase actions use `navigation`; main buttons, code blocks, and error messages use `control`. Project media stages use `media`; image dialogs and compact project panels use `dialog`; recurring content cards use `panel`; the large showcase uses `showcase`, reducing to the dialog radius on small screens. Thumbnails use `thumbnail`. The portrait remains circular with a narrow border and an inset frame.

Panel borders are (1px) in the semantic line color. Screenshot stages contain media rather than clipping important interface pixels; thumbnail images may crop to help selection. Native video controls retain their familiar shape.

## Components

### Buttons

Primary actions are compact lavender anchors with deep-indigo text, semibold body type, the control radius, padding (0.65rem 1rem), and a minimum height (42px). Hover uses the accent-hover color. In the light variant, the main primary action uses white text. Showcase project actions use the navigation radius, padding (0.55rem 0.9rem), and minimum height (40px); their hover uses the primary text color as the fill. Quiet and source links stay unfilled and brighten on hover.

All interactive elements share a keyboard outline (2px) in the focus color, offset (5px). Inline SVG icons accompany meaningful labels rather than replacing them.

### Technology and skill chips

Technology tags are outlined, noninteractive labels in secondary text with padding (0.25rem 0.6rem). Skills use filled raised-surface chips within grouped panels. Primary programming languages receive larger Manrope text and a clear lower rule; the site does not display invented proficiency scores.

### Cards and project showcases

Large showcases hold an authentic screenshot/video stage beside project titles, technology tags, a factual summary, up to three authored implementation bullets, and project/source links. Ordinary project cards use the panel radius, a fine border, and (1.5rem) copy padding. Text-only projects retain substantial copy without invented media. Experience and skills groups reuse the panel surface and rounded containment.

### Navigation and profile

The header combines the existing code-mark identity with four text destinations. Default links use secondary text; hover uses primary text over the panel surface; the current page uses lavender over the raised surface. The profile holds the actual portrait, name, academic role, source-backed details, and personal links. Desktop profile links form a vertical list; compact layouts wrap them horizontally.

### Appearance control

A labeled native select sits in the footer, with the tag radius, line border, panel fill, primary text, padding (0.4rem 0.5rem), and minimum height (36px). It becomes available after hydration. Theme changes affect the current page even when storage is unavailable.

### Project media and image dialog

Gallery thumbnails are image links and explicit video buttons, grouped with accessible labels. Selected images use `aria-current`; selected video buttons use `aria-pressed`. A selected thumbnail adopts the accent outline, and selected screenshot previews become fully opaque. Thumbnail dimensions are (64px × 48px), reducing to (56px × 44px) on phones.

Selecting the main screenshot opens a native modal dialog when supported; the original image remains its direct-link fallback. The dialog has a close button, Escape support, a dark backdrop (`rgb(9 9 20 / .9)`), viewport-bounded media, and returns focus to the opener on close. Project videos use native controls, inline playback, no autoplay, and `preload="none"`. Failed video loads display an inline status with the original-file link; no-JavaScript visitors retain image links and direct demonstration links.

## Do's and Don'ts

### Do:

- **Do** use the semantic indigo, lavender, and warm-text palette across both themes.
- **Do** pair Manrope headings with IBM Plex Sans reading and interface text.
- **Do** keep the real profile portrait and personal academic identity prominent.
- **Do** give authentic project screenshots, videos, authored technical bullets, and source links substantial space.
- **Do** preserve keyboard focus, native media controls, direct-link fallbacks, and reduced-motion behavior.
- **Do** use tonal panels, rounded containment, and clear spacing to separate content groups.

### Don't:

- **Don't** restore the rejected cream/green palette or serif technical-report direction.
- **Don't** substitute stock imagery, fabricated screenshots, or simulated terminals for actual work.
- **Don't** reduce substantial project demonstrations to tiny previews and text-only rows.
- **Don't** add unsupported claims, proficiency scores, or generic marketing slogans.
- **Don't** autoplay project demonstrations or force motion on reduced-motion users.
