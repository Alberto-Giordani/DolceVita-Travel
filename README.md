# DolceVita Travel

A basic single-page travel agency website about Italy, built for the practicum with plain HTML5 and CSS3. No JavaScript, framework, package installation, or build process is needed to run the website.

## Open the website

Open `index.html` in your browser, or use VS Code's Live Server if you already have it installed. All photos are included locally.

## Files

- `index.html`: semantic page structure, six tours, testimonials, and planning links.
- `css/style.css`: palette, typography, Flexbox, Grid, responsive layout, and keyboard focus.
- `images/`: the six destination photos.
- `CREDITS.md`: photographer names and original photo sources.
- `GIT_GUIDE.md`: instructions for committing and pushing from Alberto's PC.

## Required features

| Requirement | Implementation |
| --- | --- |
| Single page | One HTML document with internal navigation anchors |
| Semantic landmarks | Header, labelled navigation, main, sections, and footer |
| Exactly one h1 | The hero heading; section titles use h2 and tour titles use h3 |
| Destination hero | A locally stored photo of Positano on the Amalfi Coast |
| Duration and price | Every tour card shows days, nights, and a sample price per person |
| Testimonials | Three clearly identified fictional sample reviews |
| Plan your trip CTA | Hero and card links reach the planning section; the final CTA opens an email draft |
| Global border-box | Applies to all elements and both pseudo-elements |
| CSS variables | The palette is declared in `:root` and used through `var()` |
| Grid | Tour cards share responsive columns without manual row wrappers |
| Flexbox | Navigation, card content, planning steps, and footer |
| Responsive layout | One, two, or three tour columns as space increases |
| Git commits | Follow the Git guide and continue committing real changes |

## Palette

| CSS variable | Colour | Purpose |
| --- | --- | --- |
| `--color-background` | `#fcf8f2` | Warm ivory page background |
| `--color-surface` | `#ffffff` | Card surfaces |
| `--color-text` | `#292d26` | Main text |
| `--color-muted` | `#62665b` | Supporting text |
| `--color-accent` | `#a6432b` | Terracotta buttons and highlights |
| `--color-accent-dark` | `#86331e` | Button hover state |
| `--color-olive` | `#435640` | Branding and planning panel |
| `--color-soft` | `#eee9df` | Testimonials background |
| `--color-border` | `#ded9ce` | Subtle separators |
| `--color-on-dark` | `#ffffff` | Text on dark backgrounds |

## Explain the layout at assessment

The CSS starts with the mobile layout. At 640px, two tour cards fit comfortably; at 960px, three cards fit. Media queries change the column count as the content gains space.

Grid controls the collection of tours in rows and columns. `minmax(0, 1fr)` gives each column an equal share of space and lets it shrink without being forced wider by its contents.

Flexbox arranges the contents of each card vertically. The content grows with `flex: 1`, and `margin-top: auto` above the duration uses remaining space so the prices align within each row. Navigation and footer links use wrapping Flexbox rows.

The hero image uses `object-fit: cover` to fill its area. A dark overlay improves text readability. The image and cards clip only at their rounded borders; there is no blanket `overflow-x: hidden` on the page.

CSS custom properties keep the colours consistent. Changing the accent variable updates all selectors that use it.

Internal links work by matching an `href`, such as `#plan`, with the target section's `id="plan"`.

## Verification on 6 October 2026

The assistant checked the page locally in headless Chromium:

- No horizontal scrolling at 320, 375, 640, 768, 960, 1024, and 1440px viewport widths.
- One h1, existing navigation targets, and meaningful use of Grid and Flexbox.
- All seven displayed images (including the repeated Amalfi photo) loaded successfully.
- The hero/header planning links reached `#plan`.
- The first Tab key revealed a focused skip link; activating it reached the main content.
- No page errors or failed local image requests during those checks.
- No automated axe accessibility violations at the checked 375px layout.
- Enlarging text to 200% at 375px preserved the page width and heading content after a wrapping correction.

Review the website yourself in your browser before assessment. These checks do not cover every browser, device, assistive technology, or operating system.

## Demonstration content

Offers, durations, prices, names, and testimonials are fictional project content. The website does not book trips or take payments.

The email CTA opens a draft with destination, dates, traveller count, and budget fields. Its recipient is deliberately blank because no real agency email address has been supplied. It requires an email app configured on the visitor's device. Add a real recipient if this becomes an actual agency site.

## AI assistance and teamwork

This implementation was prepared with AI assistance. Alberto should review it, adapt it, and explain its actual HTML and CSS at assessment. Teammates coordinate their broad design direction while implementing their own code in their own repositories.

No GitHub push was performed by the assistant.
