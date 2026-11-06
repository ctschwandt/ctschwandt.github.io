---
name: "Cole Schwandt’s portfolio"
description: "A scholarly, content-first portfolio for technical work."
colors:
  paper: "#f7f8f5"
  surface: "#edf0eb"
  ink: "#242d28"
  secondary: "#59645c"
  accent: "#285b45"
  accent-hover: "#173b2c"
  line: "#cdd5cc"
  selection: "#d2e2d4"
  focus: "#276b50"
  dark-paper: "#1b231f"
  dark-surface: "#252f29"
  dark-ink: "#e8ede7"
  dark-secondary: "#afbdb1"
  dark-accent: "#a5d2b7"
  dark-accent-hover: "#cee9d7"
  dark-line: "#46534a"
  dark-selection: "#375b46"
  dark-focus: "#a5d2b7"
typography:
  display:
    fontFamily: "'Source Serif 4', Georgia, serif"
    fontSize: "clamp(2.25rem, 3.8vw, 3.25rem)"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "'Source Serif 4', Georgia, serif"
    fontSize: "1.875rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.018em"
  title:
    fontFamily: "'Source Serif 4', Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  body:
    fontFamily: "'Source Sans 3', 'Segoe UI', sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  lead:
    fontFamily: "'Source Sans 3', 'Segoe UI', sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'Source Sans 3', 'Segoe UI', sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
  caption:
    fontFamily: "'Source Sans 3', 'Segoe UI', sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  navigation:
    fontFamily: "'Source Sans 3', 'Segoe UI', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  component-label:
    fontFamily: "'Source Sans 3', 'Segoe UI', sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
  action:
    fontFamily: "'Source Sans 3', 'Segoe UI', sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 600
    lineHeight: 1.6
rounded:
  square: "0"
spacing:
  "2": "0.5rem"
  "3": "0.75rem"
  "4": "1rem"
  "5": "1.25rem"
  "6": "1.5rem"
  "8": "2rem"
  "10": "2.5rem"
  "12": "3rem"
  "14": "3.5rem"
components:
  text-link:
    textColor: "{colors.accent}"
    typography: "{typography.action}"
  text-link-hover:
    textColor: "{colors.accent-hover}"
  navigation:
    textColor: "{colors.secondary}"
    typography: "{typography.navigation}"
    padding: "0.6rem 0"
  navigation-current:
    textColor: "{colors.accent}"
  native-select:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.secondary}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "0.3rem 1.5rem 0.3rem 0.5rem"
  project-entry:
    textColor: "{colors.ink}"
    padding: "1.5rem 0"
  technology-list:
    textColor: "{colors.secondary}"
    typography: "{typography.label}"
  dialog-close:
    textColor: "{colors.ink}"
    typography: "{typography.component-label}"
    padding: "{spacing.2}"
  media-error:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    padding: "{spacing.4}"
---

# Design System: Cole Schwandt’s portfolio

## Overview

**Creative North Star: "A personal technical report"**

The portfolio uses the calm, readable character of a university faculty page and technical publication. Real work, precise descriptions and direct links carry the presentation. Serif headings establish the document hierarchy; sans-serif prose and aligned metadata keep it easy to scan.

The interface is restrained and professional. Neutral paper, charcoal ink, a single muted green accent and thin dividing rules support compact content. Native controls and ordinary browser navigation preserve familiar reading and interaction behavior across light and dark appearances.

**Key Characteristics:**
- Scholarly serif headings and readable sans-serif prose.
- One muted green accent with semantic light and dark counterparts.
- Flat, open sections separated by thin rules.
- Compact metadata, direct links and native controls.
- Responsive reading columns and visible keyboard focus.

## Colors

The palette keeps a quiet green undertone in its neutral surfaces and reserves stronger green for interaction. The frontmatter records the actual light and dark values; dark-prefixed entries are counterparts of the same semantic roles, not additional accents.

### Primary

- **Muted forest green** (`accent`): ordinary links, text actions and current navigation. `accent-hover` deepens the link color in light appearance; the dark counterpart becomes lighter on hover.
- **Focus green** (`focus`): visible keyboard outlines. Dark appearance shares its focus value with the dark accent.
- **Selection green** (`selection`): selected text background, paired with the current ink color.

### Neutral

- **Quiet paper** (`paper`): the document canvas, appearance selector and enlarged-image dialog.
- **Recessed surface** (`surface`): image letterboxing, code blocks and media error messages.
- **Charcoal ink** (`ink`): headings, primary prose and project titles. Dark appearance uses pale ink on deep green-charcoal paper.
- **Secondary ink** (`secondary`): dates, technologies, captions, supporting descriptions and inactive navigation.
- **Hairline green-gray** (`line`): section dividers, row borders and native selector/dialog outlines.

Print rules replace the screen colors with white paper, black ink and links, dark gray supporting text and pale gray rules. The native video surface remains dark; the enlarged-image backdrop is translucent dark green-black. These contextual values are not a second interface palette. Sidecar tonal strips are generated panel previews, not additional application tokens.

**The One Accent Rule.** Use green to identify interaction and state; keep prose, metadata and structural rules in their neutral roles.

## Typography

**Display Font:** Source Serif 4, with Georgia and serif fallbacks.

**Body Font:** Source Sans 3, with Segoe UI and sans-serif fallbacks.

**Code Font:** the native monospace stack, followed by Cascadia Code, Source Code Pro and monospace.

**Character:** Regular-weight serif headings give the site a scholarly document voice. Sans-serif body text, small labels and restrained semibold emphasis preserve a clear information hierarchy. Source Serif 4 and Source Sans 3 are locally bundled in regular and semibold weights.

### Hierarchy

- **Display:** the frontmatter display role is the default page heading. At the narrow breakpoint, ordinary page headings use (2.5rem) and project headings use (2.25rem).
- **Headline:** the default section heading uses the headline role; specific prose, secondary sections and narrow layouts use smaller serif headings where established in the stylesheet.
- **Title:** project and research headings use the title role; project listing titles become (1.375rem) on narrow screens.
- **Body:** the body role is the default prose style. Long-form content is limited to (70ch), with the introduction held to (56ch).
- **Lead:** the lead role supports page introductions and project summaries; these use (1.125rem) at the narrow breakpoint.
- **Label / caption:** technology lists and the footer use the label size; figure captions use the tighter caption line height. Supporting notes, dates, small actions and the dialog close control use the component-label role.
- **Navigation / action:** main navigation uses the navigation role. Standalone text actions use semibold; recurring project-resource links and section actions reduce to regular weight and the component-label size.
- **Code:** inline code uses the monospace stack at (0.85em); code blocks retain horizontal overflow when needed.

**The Reading Hierarchy Rule.** Use serif type for document headings and sans-serif type for prose, metadata and controls; use size and spacing before adding weight.

## Layout

The shared container is centered and limited to (1100px), with total horizontal gutters of (5rem). The medium breakpoint is (1000px), where total gutters become (4rem). At (720px), total gutters become (2.5rem), the header stacks, and the existing navigation remains visible across the available width.

Layouts use CSS grid for aligned content and flex wrapping for links and metadata. Introduction, project-image rows, research summaries, experience rows and skill groups use purpose-specific columns on larger screens, then collapse to one column at the narrow breakpoint. The standard image and video galleries are two columns and become one column on narrow screens. A single-image gallery is limited to (780px).

The spacing entries record repeated quarter-rem values in the actual declarations, keyed by quarter-rem count. Compact controls and metadata use the smaller intervals; rows commonly use (1.5rem) or (2rem) block padding; major sections use larger intervals. These describe the built rhythm rather than a requirement to consume every declared CSS spacing variable. Unused declarations are not part of this recorded system.

Long-form reading and listing widths remain distinct: the outer container supports aligned rows and media, while prose uses the reading width. The footer wraps into a small grid on narrow screens. Print removes screen gutters and avoids splitting project and experience rows.

## Elevation & Depth

The interface has no box shadows or animated elevation. Open sections, thin rules and the recessed surface tone separate content. The native enlarged-image dialog is the only modal layer: paper and a thin border sit above a translucent backdrop (`rgb(8 16 11 / .84)`). State changes are immediate; the stylesheet also disables transitions and animations for reduced-motion preferences.

**The Flat Document Rule.** Use rules, whitespace and surface tone to establish structure; reserve the modal layer for enlarged project media.

## Shapes

The interface uses straight edges and rectangular media. The appearance selector explicitly has square corners; project entries remain open rows with a bottom rule rather than enclosed cards. Borders and dividers are thin (1px). Media preserve their own proportions through deliberate containment or cropping; project screenshots in galleries use contain behavior rather than ornamental clipping.

Keyboard focus is an offset outline (2px, with a 5px offset) in the current focus color. It is a functional state, not elevation or decoration.

## Components

### Text links

Direct, compact actions use green text and a small inline SVG arrow (14px). The base action is semibold; contexts such as project resources use regular weight. Hover changes the green and adds an underline. Ordinary inline links remain underlined, with underline thickness increasing on hover. All keyboard interactions retain the shared focus outline.

### Native controls

The appearance selector uses a visible text label, paper background, secondary ink, thin rule border, square corners and a minimum height (38px). Its native options are System, Light and Dark. The control is enabled after hydration; an explicit preference persists when browser storage is available, while System follows the operating system.

The dialog close button is a transparent, borderless text control with an inline SVG close mark, compact padding and a minimum target height (44px). It uses the shared focus outline. The shipped button has no additional hover animation or custom active treatment.

### Navigation

The name link uses the serif face; the visible main navigation uses the sans-serif navigation role. Inactive links use secondary ink, while hover and the current page use green. The current page also has a thin underline separated from its baseline (0.6rem). At the narrow breakpoint, the header stacks and navigation text becomes (0.9375rem); it remains directly available without a menu toggle.

### Project rows and metadata

Project entries are open articles separated by a bottom rule. A serif title, plain technology list, summary and resource links form the reading order. The image variant adds a contained screenshot column (260px), reduced to (220px) at the medium breakpoint and stacked below the copy at the narrow breakpoint. Titles start in ink and become green and underlined on hover.

Technology labels form a wrapping text list in secondary ink, with no chip background, enclosing border or pill treatment. Experience rows use the same flat structure with aligned dates, description and optional image; skill groups align a serif category heading beside a wrapping list.

### Project media

Screenshot thumbnails are ordinary links to the original files. JavaScript enhances them with a native dialog that restores focus to the opener when closed; Escape, the close control and backdrop interaction dismiss it. The dialog keeps the original image visible with contain behavior and a caption where available.

Videos use native controls, no autoplay and no preload. A local project screenshot supplies a poster when one is available. Captions retain an original-file link; a failed video becomes a bordered, recessed-surface status message with a direct link to its original file.

## Do's and Don'ts

### Do:

- **Do** keep headings scholarly, prose readable and metadata compact.
- **Do** preserve semantic light and dark color roles and the shared visible focus treatment.
- **Do** use thin rules, whitespace and aligned columns to organize substantive content.
- **Do** retain native controls, direct media-file links and responsive reading widths.

### Don't:

- **Don't** add an oversized marketing hero, decorative effects or animation spectacle.
- **Don't** turn technology metadata into skill scores or decorative badges.
- **Don't** replace open content rows with ornamental card elevation.
- **Don't** use system display faces or glyph characters in place of the shipped serif headings and inline SVG controls.
