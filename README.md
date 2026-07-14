# Parfum Site — Full-Stack Perfume Store

A full-stack perfume storefront with product discovery, a persistent shopping cart, customer registration, a demo checkout, and a separate administrator product-management experience.

The project combines a polished React interface with an Express/SQLite API and can be run entirely on a local machine without an external database service.

## Features

### Customer experience

- Responsive luxury-themed landing page
- Product catalogue backed by the API
- Shop browsing and product details
- Category, brand, price, and stock information
- Persistent cart stored in browser localStorage
- Quantity controls with stock-aware limits
- Customer registration and login
- Checkout form, shipping summary, and demo payment screen
- About and brand-story pages

### Administration

- Separate administrator login flow
- Role-aware client route protection
- Product list dashboard
- Create, edit, and delete product operations
- Product image, stock, category, brand, and price management

## Technology stack

| Layer | Technology |
| --- | --- |
| Frontend | React 19, Vite, React Router 7 |
| UI | CSS, responsive layouts, React Icons |
| Backend | Node.js, Express 5 |
| Database | SQLite 3 |
| Authentication utilities | bcryptjs dependency; current routes use the legacy prototype flow described below |

## Architecture

```text
parfum-site/
├── client/
│   ├── src/components/       # Navbar and protected-route components
│   ├── src/context/          # Persistent cart state
│   ├── src/pages/            # Storefront, auth, cart, checkout, and admin pages
│   └── vite.config.js        # /api proxy to localhost:5000
└── server/
    ├── routes/auth.js        # Registration and login endpoints
    ├── routes/products.js    # Product CRUD API
    ├── db.js                 # SQLite connection
    ├── initDb.js             # Initial schema and demo admin
    └── index.js              # Express entry point and production static hosting
```

## Getting started

### Requirements

- Node.js 18 or newer
- npm

### 1. Start the API

```bash
git clone https://github.com/stardust07a/parfum-site.git
cd parfum-site/server
npm install
npm run initdb
node migrateRole.js
node migrateProductImage.js
npm run dev
```

The API runs at `http://localhost:5000`.

The two migration commands are safe to rerun: SQLite reports that an existing column is already present, and the scripts continue.

### 2. Start the frontend

In a second terminal:

```bash
cd parfum-site/client
npm install
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`.

### Production-style local run

Build the client and start Express:

```bash
cd client
npm run build
cd ../server
npm start
```

Express serves `client/dist` and falls back to the React application for client-side routes.

## API

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Create a customer account |
| `POST` | `/api/auth/login` | Sign in and return user/role data |
| `GET` | `/api/products` | List products |
| `GET` | `/api/products/:id` | Read one product |
| `POST` | `/api/products` | Create a product |
| `PUT` | `/api/products/:id` | Update a product |
| `DELETE` | `/api/products/:id` | Delete a product |

Products contain name, brand, category, price, stock, image, and creation-time information.

## Cart and checkout behavior

Cart lines and quantities are stored in localStorage, survive a page refresh, and respect the stock value returned by the API. The checkout adds a fixed shipping amount and clears the cart after the demo order action. No real payment provider or order API is connected.

## Current limitations and security notes

- Authentication is prototype-level: passwords are currently queried as plain text and must not be used for real accounts.
- The seeded `admin / admin123` account is development-only.
- Admin protection is primarily client-side; product mutation endpoints need server-side authentication and role authorization.
- Checkout is a UI demonstration—there is no payment gateway, order table, email, or fulfilment process.
- Product images may be stored as large request payloads; production storage should use an object store/CDN.
- The SQLite database is suitable for a demo, not a horizontally scaled deployment.
- Automated API, component, and end-to-end tests are not included.

## Recommended production improvements

- Hash passwords and issue secure sessions or short-lived tokens
- Protect all write endpoints with server-side role checks
- Add request validation, rate limiting, and structured error responses
- Persist orders and checkout state on the server
- Upload images to external storage
- Add tests and CI for client builds and API routes

## Author

Built by **Aziz** as a full-stack e-commerce portfolio project.
