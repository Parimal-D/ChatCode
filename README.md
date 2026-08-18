# Chat Application

A full-stack chat application built with Next.js, MongoDB, and NextAuth. It provides authenticated chat features with Google/GitHub sign-in, persistent user data, and Cloudinary image support.

## Tech Stack

* Next.js 14
* React
* TypeScript
* MongoDB
* Mongoose
* NextAuth
* Tailwind CSS
* Cloudinary
* Radix UI

## Project Structure

```text
app/
├── (auth)/
├── (home)/
├── api/
├── chat/
├── globals.css
└── favicon.ico

components/       # Reusable UI components
lib/              # Database and utility functions
models/           # Mongoose models
public/           # Static assets
types/             # TypeScript types

auth.ts           # NextAuth configuration
auth.config.ts    # Authentication authorization
middleware.ts     # Route protection
next.config.mjs
package.json
```

## Features

* Google authentication
* GitHub authentication
* Protected routes
* Chat interface
* MongoDB user persistence
* Mongoose data models
* Cloudinary image hosting
* Responsive UI with Tailwind CSS
* Next.js API routes

## Getting Started

### Install

```bash id="m6p4k1"
npm install
```

### Environment Variables

Create a `.env.local` file:

```env id="7q8w2e"
AUTH_GITHUB_ID=your_github_client_id
AUTH_GITTHUB_SECRET=your_github_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
AUTH_SECRET=your_auth_secret

MONGODB_URI=your_mongodb_connection_string

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

> `AUTH_GITTHUB_SECRET` matches the variable name currently used by the project. Verify it in `auth.ts` before changing it.

### Development

```bash id="9w5m2r"
npm run dev
```

Open `http://localhost:3000`.

### Production

```bash id="x4k7p2"
npm run build
npm start
```

## Authentication

Unauthenticated users are redirected to the login page when accessing protected routes such as `/chat`.

Authentication is configured in `auth.ts`, with route protection handled through `auth.config.ts` and `middleware.ts`.

## Database

MongoDB is used for persistent data storage through Mongoose.

The database connection is handled by utilities in:

```text id="2f3r8w"
lib/
```

## Environment Variables

Make sure all required authentication, MongoDB, and Cloudinary credentials are configured before starting the application.
