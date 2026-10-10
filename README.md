# DolceVita Travel

A single-page travel agency website about Italy, created by Alberto Giordani for the front-end practicum using plain HTML5 and CSS3. No JavaScript, framework, package installation, or build process is required.

## Open the website

Open `index.html` in your browser, or use VS Code's Live Server if installed. The photos use local files. Google Fonts requires an internet connection; Georgia and Arial provide fallback fonts.

## Files

- `index.html`: page structure, six tour packages, three testimonials, and planning links.
- `css/style.css`: colour variables, typography, Flexbox, Grid, hover effects, keyboard focus, and responsive styles.
- `images/tuscany-hero.jpg`: the hero background photo.
- `images/rome.jpg`, `images/venice.jpg`, `images/florence.jpg`, `images/amalfi.jpg`, `images/cinque-terre.jpg`, and `images/sicily.jpg`: the six tour photos.

## Features and structure

| Requirement | Implementation |
| --- | --- |
| Single page | Internal links target `#home`, `#tours`, `#testimonials`, and `#plan` |
| Semantic structure | `header`, `nav`, `main`, `section`, and `footer`; tour packages use `article` |
| Exactly one `h1` | The hero heading; section titles use `h2` and tour titles use `h3` |
| Destination photo hero | A Tuscany background photo with a dark overlay behind the light text |
| Tour packages | Six Italian destinations, each with days, nights, and a fictional starting price per person in dollars |
| Testimonials | Three fictional sample reviews using `figure`, `blockquote`, and `figcaption` |
| Plan your trip CTA | Hero and tour links lead to the planning section; its final link opens an email draft |
| Global border-box | `* { box-sizing: border-box; }` applies to all HTML elements |
| CSS custom properties | Colours are declared in `:root` and used with `var()` |
| CSS Grid | Responsive columns for the tour and testimonial grids |
| Flexbox | Header, navigation, card content and footers, testimonials, planning panel, and footer |

Grid arranges cards in rows and columns. Flexbox arranges items within components; growing card content and `margin-top: auto` help align durations, prices, and testimonial captions.

## Visual identity

The palette refers to the Italian flag through green, red, and a pale background, with darker shades for text and buttons.

| CSS variable | Value | Purpose |
| --- | --- | --- |
| `--flag-white` | `#f4f9ff` | Page and card backgrounds; light text on dark areas |
| `--color-text` | `#202b25` | Main text |
| `--color-muted` | `#52645a` | Supporting text |
| `--flag-red` | `#cd212a` | Buttons, highlights, links, and focus outlines |
| `--flag-red-dark` | `#a61922` | Red button hover background |
| `--flag-green` | `#008c45` | Branding and navigation CTA border |
| `--flag-green-dark` | `#006b35` | Planning panel background and light button text |
| `--color-soft` | `#eee9df` | Testimonials section and light button hover background |
| `--color-border` | `#cad8d0` | Borders and separators |
| `--color-shadow` | `rgba(32, 43, 37, 0.18)` | Card hover shadows |
| `--color-overlay` | `rgba(32, 43, 37, 0.72)` | Dark layer over the hero photo |

**Bodoni Moda** (weight 400) is used for the brand name and `h1`/`h2` headings. **Lato** (weights 400 and 700) is used for body text, tour headings, navigation, and buttons. Both are loaded through a Google Fonts stylesheet in the HTML.

Tour cards and testimonials move 5px upward and left and gain a shadow on hover. Both changes use a 0.5-second `ease-in` transition.

## Responsive layout

The CSS is mobile-first. Media queries add columns and adjust typography and spacing as the viewport widens.

| Viewport width | Tour columns | Testimonial columns |
| --- | --- | --- |
| Below 768px | 1 | 1 |
| 768px to below 1024px | 2 | 1 |
| 1024px and above | 3 | 3 |

The content container has a maximum width of 1160px. Images scale within their containers; tour images use a 3:2 aspect ratio and `object-fit: cover`. Navigation and card footers wrap when needed. Grid tracks use `minmax(0, 1fr)`, and long text can wrap with `overflow-wrap: anywhere`.

## Accessibility and manual checks

The HTML declares English as the page language and provides descriptive alternative text for the tour photos. The hero background is decorative. Links have visible keyboard focus outlines, with light outlines in the hero and planning panel. A dark overlay improves text contrast over the hero photo.

Before presenting:

- Check every navigation and planning link.
- Navigate through links with Tab and activate them with Enter.
- Check phone, tablet, and desktop widths, including around 768px and 1024px, for horizontal scrolling or clipped content.
- Check image loading, text readability, and behaviour when zooming.

These are verification steps, not a claim that all accessibility or responsive checks have passed.

## Git and teamwork

Repository: [Alberto-Giordani/DolceVita-Travel](https://github.com/Alberto-Giordani/DolceVita-Travel).

Keep real, small commits after coherent changes, with messages describing what changed. Each teammate implements their own code in their own repository while the group stays aligned on the project concept and visual direction.

## Demonstration content

Offers, durations, prices, names, and testimonials are fictional project content. Photo credit links to Unsplash in the footer.

The planning link uses `mailto:?subject=DolceVita%20Travel%20trip`. It opens a draft with the subject “DolceVita Travel trip” when an email handler is configured. No recipient address is supplied. The website does not submit enquiries, book trips, or take payments.
