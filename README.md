# DolceVita Travel

A basic single-page travel agency website about Italy, built for the practicum with plain HTML5 and CSS3. No JavaScript, framework, package installation, or build process is needed to run the website.

## Open the website

Open `index.html` in your browser, or use VS Code's Live Server if you already have it installed. All photos are included locally.

## Files

- `index.html`: semantic page structure, six tours, testimonials, and planning links.
- `css/style.css`: palette, typography, Flexbox, Grid, responsive layout, and keyboard focus.
- `images/`: the six destination photos.

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


## Demonstration content

Offers, durations, prices, names, and testimonials are fictional project content. The website does not book trips or take payments.
