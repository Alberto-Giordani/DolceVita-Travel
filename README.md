# DolceVita Travel

A travel agency website about Italy, created by Alberto Giordani for the web development practicum.

Assignment 1 introduced the HTML/CSS site. Assignment 2 rebuilt it with React, Vite, and Tailwind CSS. Assignment 3 adds an Express API, a real Postgres database, authentication, and public deployments.

The current version is developed on the `week-3-backend` branch in the existing repository.

## Live project

- [Website](https://dolcevita-travel.vercel.app)
- [API health check](https://dolcevita-travel.onrender.com/api/health)
- [Tours API](https://dolcevita-travel.onrender.com/api/tours)
- [Current source code](https://github.com/Alberto-Giordani/DolceVita-Travel/tree/week-3-backend)

The frontend is hosted on Vercel, the backend on Render, and the Postgres database on Neon. The free Render service can take time to wake up after inactivity.

## Features

- Tuscany photo hero, Italian flag-inspired colours, Bodoni Moda headings, and Lato body text.
- Six tours loaded from the database, with photos, descriptions, durations, and starting prices in dollars.
- Category filter: All, Cities, or Coast.
- A controlled traveller stepper on each card, allowing 1 to 8 travellers.
- Individual tour pages at `/tours/:slug`, including loading and missing-tour messages.
- Signup, login, sign out, and sessions that persist across page refreshes.
- Header account controls and an animated mobile navigation menu.
- Sample testimonials and a Plan your trip section with an email-draft link.
- Mobile-first layouts using Tailwind, CSS Grid, and Flexbox.

## Technology

The frontend uses JavaScript, React, React Router, Vite, and Tailwind CSS 4. The backend uses Node.js, Express, Drizzle ORM, the `postgres` driver, and Better Auth. Drizzle Kit manages the database schema.

## Project structure

| Path | Purpose |
| --- | --- |
| `client/src/App.jsx` | Shared header and footer, plus page routes |
| `client/src/components/MainContent.jsx` | Homepage, API request, and category filter |
| `client/src/components/TourCard.jsx` | Tour card, details link, and traveller-count state |
| `client/src/components/TravellerStepper.jsx` | Controlled traveller-count buttons |
| `client/src/components/TourDetails.jsx` | Loads one tour using its URL slug |
| `client/src/components/Header.jsx` | Branding, navigation, and mobile menu |
| `client/src/components/HeaderAccount.jsx` | Session state and sign-out controls |
| `client/src/components/SignUp.jsx` and `Login.jsx` | Controlled authentication forms |
| `client/src/lib/auth-client.js` | Better Auth client shared by components |
| `client/src/data/testimonials.js` | Sample testimonial data |
| `client/src/index.css` | Tailwind import and custom theme variables |
| `client/public/images/` | Public tour photographs |
| `client/images/` | Hero photograph imported by Vite |
| `client/vite.config.js` | React, Tailwind, and local API proxy |
| `client/vercel.json` | Production API proxy and React route fallback |
| `server/src/index.js` | Express server, middleware, and route registration |
| `server/src/routes/tours.js` | Tour list and individual-tour API routes |
| `server/src/auth.js` | Better Auth configuration |
| `server/src/db/index.js` | Postgres connection and Drizzle instance |
| `server/src/db/schema.js` | Tours and authentication table definitions |
| `server/src/db/tours.data.js` | Original tour data used by the seed script |
| `server/src/db/seed.js` | Inserts the six tours into the database |
| `server/drizzle.config.js` | Drizzle Kit configuration |
| `server/.env.example` | Environment-variable template with placeholders |

## Run locally

Development environment used: Node.js 22.16.0 and npm 11.5.2. A Postgres database is also required; a separate Neon project can be used for a new local setup.

### 1. Clone and install

```bash
git clone --branch week-3-backend https://github.com/Alberto-Giordani/DolceVita-Travel.git
cd DolceVita-Travel
npm --prefix client ci
npm --prefix server ci
```

### 2. Configure the backend

From the repository root:

```bash
cp server/.env.example server/.env
```

Edit `server/.env` with your own database connection string and a random authentication secret:

```dotenv
DATABASE_URL="your_postgres_connection_string"
PORT=3000
BETTER_AUTH_SECRET="your_random_authentication_secret"
BETTER_AUTH_URL="http://localhost:3000"
CLIENT_URL="http://localhost:5173"
```

Generate a secret locally with:

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

Keep that secret in your environment configuration. The `.gitignore` excludes `.env` files while allowing the placeholder `.env.example` to be committed.

### 3. Prepare your database

For a new database, run these commands from the repository root:

```bash
cd server
npm run db:push
npm run db:seed
```

`db:push` applies the schema. `db:seed` inserts the six tours. If a tour ID already exists, the current seed script updates its slug only. It does not synchronise every field.

An existing database with the schema and tours already present does not need these commands each time the app starts.

### 4. Start both servers

In the first terminal, from the repository root:

```bash
cd server
npm run dev
```

In a second terminal, from the repository root:

```bash
cd client
npm run dev
```

Open `http://localhost:5173`. The backend listens on `http://localhost:3000`. Use port 5173 for this configuration so it matches `CLIENT_URL`.

## API and database

| Method | Route | Response |
| --- | --- | --- |
| GET | `/api/health` | Server status as JSON |
| GET | `/api/tours` | All tours from Postgres |
| GET | `/api/tours/:slug` | One matching tour, or a 404 JSON error |
| Various | `/api/auth/*` | Authentication endpoints handled by Better Auth |

The `tours` table stores each tour's ID, unique slug, title, description, category, days, nights, price, image path, and image alternative text.

Better Auth uses four additional tables:

| Table | Purpose |
| --- | --- |
| `user` | Name, unique email address, and profile information |
| `account` | Login account information, including the password hash for email/password accounts |
| `session` | Session token, expiry date, and reference to the user |
| `verification` | Verification records used by relevant authentication features |

The `account.userId` and `session.userId` columns reference `user.id`. Email verification is currently disabled, so signup does not require a verification email.

## How the application works

`MainContent` fetches `/api/tours` with `useEffect`. Express queries Postgres through Drizzle and returns JSON. The selected category is stored with `useState`; `.filter()` selects the visible tours and `.map()` renders their cards.

Each `TourCard` owns its traveller count and passes `value` and `onChange` to `TravellerStepper`. The stepper requests changes through that callback. Counts reset when a card unmounts or the page reloads, and are not saved as reservations.

`TourDetails` reads the slug with `useParams()` and fetches `/api/tours/:slug`. Homepage section navigation waits for the tour request to finish before scrolling to the requested section.

Signup and login forms call the Better Auth client. Better Auth hashes passwords, stores authentication records, and manages session cookies. `HeaderAccount` uses `authClient.useSession()` to display the current user and calls `authClient.signOut()` to end the session. Sessions are configured to expire after seven days, with a one-day update interval.

## Deployment configuration

Both hosting services track the `week-3-backend` branch.

| Setting | Vercel frontend | Render backend |
| --- | --- | --- |
| Root directory | `client` | `server` |
| Install/build | Install: `npm ci`; build: `npm run build` | Build: `npm ci` |
| Output/start | Output: `dist` | Start: `npm start` |

Render environment variables:

| Variable | Production value |
| --- | --- |
| `DATABASE_URL` | Private Neon connection string |
| `BETTER_AUTH_SECRET` | Private random authentication secret |
| `BETTER_AUTH_URL` | `https://dolcevita-travel.vercel.app` |
| `CLIENT_URL` | `https://dolcevita-travel.vercel.app` |
| `NODE_ENV` | `production` |

Render supplies the backend port through `PORT`.

During local development, Vite proxies `/api` requests to Express on port 3000. In production, `client/vercel.json` proxies `/api` requests to Render and sends frontend page routes to `index.html`.

The production authentication URL is the Vercel origin because the browser accesses authentication through that proxy. Database credentials and the authentication secret belong on the backend; the frontend does not need them.

## Checks

From the repository root:

```bash
npm --prefix client run build
npm --prefix client run lint
```

Manual checks include signup, login, session persistence after refresh, sign out, category filtering, stepper limits, tour detail links, missing-tour messages, and homepage section navigation. Check mobile, tablet, and desktop layouts for horizontal scrolling. Repeat the authentication and direct-page-refresh checks on the live website.

## Demonstration content and credits

Offers, prices, and testimonials are fictional student-project content. Photography is credited to Unsplash in the footer. The site uses Bodoni Moda and Lato from Google Fonts, with Georgia and Arial as fallbacks.

Testimonials and the hero photograph remain frontend content. Tours and authentication records are stored in Postgres.

The planning link opens an email draft with a subject and no recipient. It sends nothing automatically. The project does not implement bookings or payments.
