# DolceVita Travel

A travel agency website about Italy, created by Alberto Giordani for the web development practicum.

Assignment 1 introduced the HTML/CSS site. Assignment 2 rebuilt it with React, Vite, and Tailwind CSS. Assignment 3 added an Express API, a Postgres database, authentication, and public deployments. Assignment 4 adds Stripe Checkout in test mode, verified payment webhooks, and orders saved in the database.

The current version is developed on the `week-4-stripe` branch in the existing repository.

**Payments use Stripe test mode. No real money is charged and no travel reservation is made.**

## Live project

- [Website](https://dolcevita-travel.vercel.app)
- [API health check](https://dolcevita-travel.onrender.com/api/health)
- [Tours API](https://dolcevita-travel.onrender.com/api/tours)
- [Current source code](https://github.com/Alberto-Giordani/DolceVita-Travel/tree/week-4-stripe)

The frontend is hosted on Vercel, the backend on Render, and the Postgres database on Neon. Stripe hosts the checkout page. The free Render service can take time to wake up after inactivity.

## Features

- Tuscany photo hero, Italian flag-inspired colours, Bodoni Moda headings, and Lato body text.
- Six tours loaded from the database, with photos, descriptions, durations, and prices in US dollars.
- Category filter: All, Cities, or Coast.
- Individual tour pages at `/tours/:slug`, including loading and missing-tour messages.
- Signup, login, sign out, and sessions that persist across page refreshes.
- Header account controls and an animated mobile navigation menu.
- Shared booking controls on tour cards and detail pages, allowing 1 to 8 travellers and displaying a total.
- A Book now action that starts Stripe Checkout for a signed-in user.
- Orders and item price snapshots stored in Postgres.
- A signature-verified webhook that confirms payment.
- An order confirmation page that reads the saved status and briefly retries while confirmation is pending.
- Sample testimonials and a Plan your trip section with an email-draft link.
- Mobile-first layouts using Tailwind, CSS Grid, and Flexbox.

## Technology

The frontend uses JavaScript, React, React Router, Vite, and Tailwind CSS 4. The backend uses Node.js, Express, Drizzle ORM, the `postgres` driver, Better Auth, and the Stripe Node SDK. Drizzle Kit manages the database schema.

Checkout is hosted by Stripe. The application does not collect or store card numbers, and this integration does not require a Stripe publishable key or Stripe.js in the frontend.

## Project structure

| Path | Purpose |
| --- | --- |
| `client/src/App.jsx` | Shared header and footer, plus page routes |
| `client/src/components/MainContent.jsx` | Homepage, API request, and category filter |
| `client/src/components/TourCard.jsx` | Tour card, details link, and shared booking controls |
| `client/src/components/TourDetails.jsx` | Loads one tour using its URL slug and displays booking controls |
| `client/src/components/TourBooking.jsx` | Traveller state, displayed total, checkout request, and redirect |
| `client/src/components/TravellerStepper.jsx` | Controlled traveller-count buttons |
| `client/src/components/CheckoutSuccess.jsx` | Order lookup, payment status, and bounded polling |
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
| `server/src/index.js` | Express server, middleware order, and route registration |
| `server/src/auth.js` | Better Auth configuration |
| `server/src/middleware/require-auth.js` | Validates the session and attaches the user to the request |
| `server/src/stripe.js` | Stripe client and test-key validation |
| `server/src/routes/tours.js` | Tour list and individual-tour API routes |
| `server/src/routes/checkout.js` | Validates checkout, reads the database price, and creates the order and Checkout Session |
| `server/src/routes/webhooks.js` | Verifies Stripe events and marks matching pending orders as paid |
| `server/src/routes/orders.js` | Returns an order and its items only to its owner |
| `server/src/db/index.js` | Postgres connection and Drizzle instance |
| `server/src/db/schema.js` | Tours, authentication, orders, and order item table definitions |
| `server/src/db/tours.data.js` | Original tour data used by the seed script |
| `server/src/db/seed.js` | Inserts the six tours into the database |
| `server/drizzle.config.js` | Drizzle Kit configuration |
| `server/.env.example` | Environment-variable template with placeholders |

## Run locally

Development environment used: Node.js 22.16.0 and npm 11.5.2. You also need a Postgres database, a Stripe test environment, and the Stripe CLI. Use your own database and Stripe credentials when cloning the project.

### 1. Clone and install

```bash
git clone --branch week-4-stripe https://github.com/Alberto-Giordani/DolceVita-Travel.git
cd DolceVita-Travel
npm --prefix client ci
npm --prefix server ci
```

### 2. Configure the backend

From the repository root:

```bash
cp server/.env.example server/.env
```

Edit `server/.env` with your own values:

```dotenv
DATABASE_URL="your_postgres_connection_string"
PORT=3000
BETTER_AUTH_SECRET="your_random_authentication_secret"
BETTER_AUTH_URL="http://localhost:3000"
CLIENT_URL="http://localhost:5173"
STRIPE_SECRET_KEY="replace_with_your_stripe_test_secret_key"
STRIPE_WEBHOOK_SECRET="replace_with_your_local_webhook_signing_secret"
```

Generate an authentication secret locally with:

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

Copy your Stripe secret API key from the test environment you will use for checkout. It must begin with `sk_test_`. The local webhook signing secret is obtained in step 4.

The backend refuses to start if the Stripe API key does not start with `sk_test_` or the webhook signing secret does not start with `whsec_`. Replace the placeholders before starting it.

Real credentials belong in `server/.env` or the hosting service's environment settings. The `.gitignore` excludes `.env` files while allowing the placeholder `.env.example` to be committed.

### 3. Prepare your database

For a new database, run from the repository root:

```bash
cd server
npm run db:push
npm run db:seed
```

`db:push` applies the schema, including the orders tables. `db:seed` inserts the six tours. If a tour ID already exists, the current seed script updates its slug only; it does not synchronise every field.

An existing database with the schema and tours already present does not need these commands each time the app starts.

### 4. Start the local Stripe listener

Install the CLI if needed, then authenticate:

```bash
npm install -g @stripe/cli
stripe login
```

Choose the same Stripe test environment as the API key in `server/.env`. Stripe can offer both a named sandbox and a separate Test mode environment; the selected environment must match the key.

In a dedicated terminal, run:

```bash
stripe listen --events checkout.session.completed,checkout.session.async_payment_succeeded --forward-to http://localhost:3000/api/webhooks/stripe
```

Copy the `whsec_â€¦` signing secret printed by the listener into `STRIPE_WEBHOOK_SECRET` in `server/.env`. Keep this terminal running.

### 5. Start the backend and frontend

In a second terminal, from the repository root:

```bash
cd server
npm run dev
```

In a third terminal, from the repository root:

```bash
cd client
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). The backend listens on [http://localhost:3000](http://localhost:3000).

Use port 5173 for this configuration so it matches `CLIENT_URL`. Restart the backend after editing its environment values.

### 6. Make a test purchase

1. Create an account or sign in.
2. Select a tour and between 1 and 8 travellers.
3. Click **Book now** on a tour card or its details page.
4. Check the tour, quantity, and total on Stripe's hosted checkout page.
5. Pay using the following test details:

| Field | Test value |
| --- | --- |
| Card number | `4242 4242 4242 4242` |
| Expiry date | Any future date |
| CVC | Any three digits |
| Cardholder name | A test name |

Stripe redirects to `/checkout/success?order_id=...`. The page shows **Payment confirmed** only when the saved order status is `paid`.

Check the listener for a successful webhook response, the backend for `Order â€¦ marked as paid.`, and the matching order in the database for `status = paid` and a populated `paid_at`.

Use an actual Checkout Session created by this application for the complete test. Generic CLI-generated fixture events do not contain this application's order metadata.

## API routes

| Method | Route | Access and response |
| --- | --- | --- |
| GET | `/api/health` | Public server status as JSON |
| GET | `/api/tours` | Public list of tours from Postgres |
| GET | `/api/tours/:slug` | Public tour lookup; 404 if missing |
| Various | `/api/auth/*` | Authentication endpoints handled by Better Auth |
| GET | `/api/checkout/check-auth` | Development check; returns the signed-in user's name |
| POST | `/api/checkout` | Signed-in user; returns `201` with `orderId` and the Stripe checkout `url` |
| POST | `/api/webhooks/stripe` | Stripe-signed notification; verifies the raw request body |
| GET | `/api/orders/:orderId` | Signed-in owner; returns order details and item snapshots |

The checkout request body contains only the tour ID and traveller quantity:

```json
{
  "tourId": "venice",
  "quantity": 2
}
```

Checkout also requires a matching `CLIENT_URL` origin and a JSON request. The backend validates the tour and quantity, and ignores any browser-supplied price.

Protected routes return `401` when no valid session exists. Order lookup returns `404` for an unknown order or an order belonging to another user. Its responses use `Cache-Control: no-store`.

## Database

The schema defines seven tables:

| Table | Purpose |
| --- | --- |
| `tours` | Tour ID, unique slug, title, description, category, duration, price, image path, and alternative text |
| `user` | Name, unique email address, and profile information |
| `account` | Login account information, including the password hash for email/password accounts |
| `session` | Session token, expiry date, and reference to the user |
| `verification` | Verification records used by relevant authentication features |
| `orders` | Purchase ID, user reference, status, currency, total amount, Stripe Session ID, creation date, and payment date |
| `order_items` | Order and tour references, a title snapshot, quantity, and unit price snapshot |

`orderItems` is the JavaScript export for the SQL table `order_items`. Each order belongs to a user, and each item belongs to an order and references a tour.

The existing `tours.price` values are whole US dollars. Checkout converts them to cents. `orders.totalAmount` and `orderItems.unitPrice` are stored as integer cents, with `usd` as the order currency.

For example, two Venice travellers at $490 each create an item with `unit_price = 49000`, `quantity = 2`, and an order with `total_amount = 98000`.

The title and unit price are copied into the order item at purchase time so later changes to the tour do not rewrite the saved purchase details.

## How the application works

### Tours and authentication

`MainContent` fetches `/api/tours` with `useEffect`. Express queries Postgres through Drizzle and returns JSON. The selected category is stored with `useState`; `.filter()` selects visible tours and `.map()` renders their cards.

`TourDetails` reads the slug with `useParams()` and fetches `/api/tours/:slug`. Homepage section navigation waits for the tour request to finish before scrolling to the requested section.

Signup and login forms call the shared Better Auth client. Better Auth hashes passwords, stores authentication records, and manages session cookies. `HeaderAccount` uses `authClient.useSession()` to display the current user and calls `authClient.signOut()` to end the session.

Sessions are configured to expire after seven days, with a one-day update interval. Email verification is currently disabled, so signup does not require a verification email.

### Checkout and payment confirmation

1. `TourBooking` owns the traveller count and passes `value` and `onChange` to `TravellerStepper`. Clicking Book now sends `tourId` and `quantity` to Express. The controls are disabled while checkout opens.
2. `requireAuth` validates the session with Better Auth and attaches its user to `req.user`. The backend uses that identity when creating the order.
3. The checkout route reads the tour's price from Postgres and calculates the total in cents. It creates a pending order and its item in one database transaction.
4. Express creates a Stripe Checkout Session containing the database price, quantity, and order ID metadata. It saves the Session ID and returns the checkout URL to React.
5. React redirects the browser to Stripe. After payment, Stripe sends a signed event directly to the backend webhook, independently of the browser redirect.
6. The webhook verifies the signature using the raw request body and accepts only test-mode events. For a paid payment Session, it checks the stored Session ID, amount, and currency before changing a matching pending order to `paid` and setting `paidAt`.
7. `CheckoutSuccess` reads `order_id` from the URL and requests the order from the protected lookup route. While the status is pending, it makes up to ten requests, waiting two seconds between completed requests. The timer and request are cancelled when the page unmounts or the order ID changes.

**Only the verified webhook marks an order as paid.** The success page reads the database status; visiting its URL does not confirm payment.

The webhook route is registered before `express.json()` and uses `express.raw()` so Stripe can verify the original request bytes. It uses signature verification instead of a browser login session.

Its update requires `status = pending`, so duplicate notifications do not repeat the transition or overwrite the original payment date. A Stripe idempotency key also protects retries of Session creation for the same order. Separate checkout requests still create separate orders.

## Deployment configuration

Both hosting services track the `week-4-stripe` branch.

| Setting | Vercel frontend | Render backend |
| --- | --- | --- |
| Root directory | `client` | `server` |
| Install/build | Install: `npm ci`; build: `npm run build` | Build: `npm ci` |
| Output/start | Output: `dist` | Start: `npm start` |

### Render environment variables

| Variable | Value on the deployed backend |
| --- | --- |
| `DATABASE_URL` | Private Neon connection string |
| `BETTER_AUTH_SECRET` | Private random authentication secret |
| `BETTER_AUTH_URL` | `https://dolcevita-travel.vercel.app` |
| `CLIENT_URL` | `https://dolcevita-travel.vercel.app` |
| `NODE_ENV` | `production` |
| `STRIPE_SECRET_KEY` | Stripe test API key beginning with `sk_test_` |
| `STRIPE_WEBHOOK_SECRET` | Signing secret from the public Stripe webhook destination, beginning with `whsec_` |

Render supplies the backend port through `PORT`. When entering individual variables in its dashboard, enter the key and raw value separately, without surrounding quotation marks. Save and redeploy after configuration changes.

The application remains in Stripe test mode even though its hosting environment is production.

### Public Stripe webhook

In the same Stripe test environment as the API key:

1. Open Workbench â†’ Webhooks and create an event destination.
2. Select **Your account**, **Snapshot** payloads, and these events:
   - `checkout.session.completed`
   - `checkout.session.async_payment_succeeded`
3. Choose **Webhook endpoint** and enter:

   `https://dolcevita-travel.onrender.com/api/webhooks/stripe`

4. Copy that destination's signing secret into Render's `STRIPE_WEBHOOK_SECRET`, then redeploy.

| Credential | Local backend | Deployed backend |
| --- | --- | --- |
| `STRIPE_SECRET_KEY` | Test API key for the chosen environment | Can use the same test API key |
| `STRIPE_WEBHOOK_SECRET` | Secret printed by `stripe listen` | Secret shown on the public destination in Stripe |

These two webhook signing secrets are different. Keep the CLI secret in the local `.env` and the public destination secret in Render.

### Proxies and frontend routes

During local development, Vite proxies `/api` requests to Express on port 3000. In production, `client/vercel.json` proxies `/api` requests to Render and sends frontend page routes to `index.html`.

The production authentication URL is the Vercel origin because the browser accesses authentication through that proxy. The checkout success and cancellation URLs also use `CLIENT_URL`.

Database credentials, authentication secrets, and Stripe secrets belong on the backend. This frontend does not need those values or a Stripe publishable key.

## Checks

From the repository root:

```bash
npm --prefix client run build
npm --prefix client run lint
```

Manual checks:

- Signup, login, session persistence after refresh, and sign out.
- Category filtering, stepper limits, tour detail links, missing-tour messages, and homepage section navigation.
- Mobile, tablet, and desktop layouts without horizontal scrolling.
- Signed-out checkout blocked before an order is created.
- Checkout from both a tour card and a details page, with the correct quantity and total.
- Successful test payment followed by a paid order confirmation.
- An existing order visible only to its owner; signed-out lookup returns 401 and another account receives 404.
- Pending confirmation stays pending until the webhook updates the order; the page offers Check again after automatic polling stops.
- Invalid webhook signatures return 400.
- Direct refresh of tour and confirmation URLs on the deployed website.

For the deployed payment test, stop the local Stripe listener first. Make a purchase from the Vercel website, then check all three:

1. The browser returns to **Payment confirmed** on the Vercel URL.
2. The public Stripe destination's **Event deliveries** tab shows the matching `checkout.session.completed` delivery with **200 OK**.
3. The matching Neon order has `status = paid` and a populated `paid_at`.

The deployed test flow was manually verified on 25 October 2026.

### Troubleshooting

| Symptom | Check |
| --- | --- |
| Backend exits with `STRIPE_WEBHOOK_SECRET must contain your webhook signing secret` | The variable must exist and its value must begin exactly with `whsec_`. Check the key name, placeholder values, quotes, whitespace, and whether the saved values were deployed. |
| Backend exits with the Stripe test-key error | `STRIPE_SECRET_KEY` must contain a test API key beginning with `sk_test_`. |
| Checkout displays a generic error | Check the backend log entry beginning `Checkout creation failed:` for the actual cause. |
| Public webhook returns 400 | Check the public destination signing secret and raw-body middleware order. |
| Confirmation remains pending | Check event delivery in the matching Stripe environment and backend logs. Allow time for the free Render service to wake up. |
| Success URL shows Page not found | The React route must be `/checkout/success`, matching the backend redirect URL. |
| Browser shows connection refused on localhost | Confirm the frontend is running on port 5173 and the backend on port 3000. |
| Health check works after a failed deployment | Confirm the latest commit is actually live; an older healthy deployment can still be serving requests. |

### Current limits

The checkout supports one tour per order, with 1 to 8 travellers. There is no cart, departure-date selection, availability management, refund flow, or order-history page.

Orders currently use `pending` and `paid` statuses. Cancellation or a failed checkout creation can leave a pending order; expiry and failure cleanup are not implemented. The success page does not treat a pending status as a failed payment.

The booking count belongs to each rendered `TourBooking` component. It resets when that component unmounts or the page reloads, and it is not automatically carried from a card to its separate details page.

During Assignment 4, `npm audit` reported a remaining esbuild advisory through the Drizzle Kit dependency chain. The application does not use esbuild's development-server feature. Review current audit output before changing dependencies; the proposed forced fix during setup involved a breaking Drizzle Kit downgrade.

## Demonstration content and credits

Offers, prices, and testimonials are fictional student-project content. Stripe transactions are test transactions, and no actual trip is reserved.

Photography is credited to Unsplash in the footer. The site uses Bodoni Moda and Lato from Google Fonts, with Georgia and Arial as fallbacks.

Testimonials and the hero photograph remain frontend content. Tours, authentication records, orders, and order items are stored in Postgres.

The planning link opens an email draft with a subject and no recipient. It sends nothing automatically.