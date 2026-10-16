# DolceVita Travel

A single-page travel agency website about Italy, created by Alberto Giordani for the front-end practicum. Assignment 2 rebuilds the original HTML/CSS website with **React, Vite, and Tailwind CSS**, preserving its content and visual identity.

The React version is developed on the `week-2-react` branch in the existing repository.

## Run locally

Development environment used: Node.js **22.16.0** and npm **11.5.2**.

For a new local copy:

```bash
git clone https://github.com/Alberto-Giordani/DolceVita-Travel.git
cd DolceVita-Travel
git switch week-2-react
npm ci
npm run dev
```

Open the Local URL printed by Vite. Use the Vite development server rather than opening `index.html` directly or using Live Server.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Generate the production site in `dist/` |
| `npm run preview` | Preview the production build after building |
| `npm run lint` | Check JavaScript and JSX with ESLint |

## Page content

- Tuscany destination-photo hero with a dark overlay and the page's only `h1`.
- Six tour packages showing a photo, description, duration, and starting price per person in dollars.
- A category filter: **All**, **Cities**, or **Coast**.
- An independent traveller stepper on every card, allowing **1 to 8** travellers.
- Three fictional testimonials, labelled as sample reviews.
- A â€œPlan your tripâ€ section with an email-draft link.
- A footer with internal navigation, author credit, and an Unsplash photo credit.

## Components and data

`src/App.jsx` renders `Header`, `MainContent`, and `Footer`. `MainContent` contains the hero, filtered tour grid, testimonials, and planning section.

| File | Responsibility |
| --- | --- |
| `src/components/Header.jsx` | Branding and main navigation |
| `src/components/Hero.jsx` | Hero photograph, heading, and planning link |
| `src/components/MainContent.jsx` | Main landmark, category state, and tour grid |
| `src/components/TourCard.jsx` | Reusable card and its traveller-count state |
| `src/components/TravellerStepper.jsx` | Controlled decrease/increase buttons and displayed count |
| `src/components/Testimonials.jsx` | Reviews rendered from their data array |
| `src/components/PlanYourTrip.jsx` | Planning call to action |
| `src/components/Footer.jsx` | Footer branding, links, and credits |
| `src/data/tours.js` | Six tour objects with stable IDs, categories, durations, prices, and imported images |
| `src/data/testimonials.js` | Three sample review objects |
| `src/index.css` | Tailwind import and custom theme variables |
| `src/main.jsx` | Mounts the React application and imports the stylesheet |
| `images/` | Six destination photos and the Tuscany hero photo |
| `public/favicon.svg` | Browser-tab icon |

The project uses JavaScript and JSX, with hardcoded data and no backend.

## How the React interactions work

### Category filter

`MainContent` stores the selected category with `useState('All')`. Clicking a filter button calls `setFilter(category)`. During the next render, `visibleTours` is calculated using `.filter()`, and `.map()` renders the matching `TourCard` components.

`visibleTours` is derived from the data and selected category rather than stored as another state variable. Stable `tour.id` values provide React keys. The selected button has red text and `aria-pressed="true"`; all filter buttons have green borders.

### Controlled traveller stepper

Each `TourCard` stores its own count with `useState(1)` and passes it to the stepper:

```jsx
<TravellerStepper value={travellers} onChange={setTravellers} />
```

`TravellerStepper` receives its value through props. Clicking a button calculates the requested number and calls `onChange`; the parent updates state and passes the new value back. The stepper has no separate count state.

The buttons are disabled at the limits, and `Math.max()` / `Math.min()` keep changes within range. Count updates use `aria-live="polite"`.

Counts are independent between cards. If filtering removes a card and later displays it again, that card starts at 1. Reloading the page resets all counts. Counts are demonstration selections, not saved reservations.

## Styling and responsiveness

Tailwind CSS 4 is connected through `@tailwindcss/vite` in `vite.config.js`. The active stylesheet imports Tailwind with `@import "tailwindcss";`.

Custom `@theme` variables define the Italian flag-inspired palette, Bodoni Moda heading font, Lato body font, overlay colour, and card shadow. Google Fonts requires an internet connection; Georgia and Arial are the fallbacks.

Grid arranges the tours and testimonials. Flexbox handles navigation, card internals, the planning panel, and footer layout. Cards and testimonials have a 0.5-second `ease-in` transition for `translate` and `box-shadow`.

Layouts are mobile-first, using unprefixed classes followed by `md:` and `lg:` variants:

| Default viewport width | Tour columns | Testimonial columns |
| --- | --- | --- |
| Below 768px | 1 | 1 |
| 768px to below 1024px | 2 | 1 |
| 1024px and above | 3 | 3 |

These pixel equivalents use Tailwind's default breakpoints with the default browser font size. Navigation and card controls wrap when needed. Tour images use a 3:2 aspect ratio and `object-cover`.

Tailwind's [Preflight](https://tailwindcss.com/docs/preflight) supplies global `box-sizing: border-box`, including pseudo-elements.

## Demonstration content and credits

Offers, prices, names, and testimonials are fictional student-project content. Photography is credited to Unsplash in the footer.

The planning link is `mailto:?subject=DolceVita%20Travel%20trip`. With a configured email handler, it opens a draft with a subject and no recipient. It sends nothing automatically. There is no booking system, payment processing, or backend.
