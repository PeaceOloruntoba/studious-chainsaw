# Brand Portfolio (Next.js + TypeScript + MongoDB)

A brand portfolio site with:

- Blog with drafts and publishing workflow.
- Admin dashboard with auth (JWT cookies) and Quill editor.
- Media uploads to Cloudinary with default landscape fallback.
- Newsletter subscription (no auth) stored in MongoDB and synced to Brevo (Sendinblue).
- Deployed on Vercel with ESM TypeScript setup.

## Tech Stack

- Next.js 14 (App Router) + React 18 + TypeScript (ESM)
- MongoDB + Mongoose
- JWT (httpOnly cookie)
- Cloudinary (assets)
- Brevo (emails + contacts)

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` (or `.env`) from `.env.example` and fill values:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=super_secret

CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
# Optional default image public id in your Cloudinary
CLOUDINARY_DEFAULT_LANDSCAPE_PUBLIC_ID=sample

# Brevo (formerly Sendinblue) for emails and contacts
BREVO_API_KEY=your-brevo-api-key
BREVO_SENDER_EMAIL=your-email@yourdomain.com
BREVO_SENDER_NAME=Your Brand Name

# Brevo SMTP (alternative to API) for transactional emails
BREVO_EMAIL=your-brevo-email@yourdomain.com
BREVO_PASSWORD=your-brevo-smtp-password

# Optional for server fetch in blog pages
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

3. Run the dev server:

```bash
npm run dev
```

Open http://localhost:3000.

## Auth and Admin

- Register an admin user (one-time) via API:

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@example.com","password":"password","name":"Admin"}'
```

- Login at `/admin/login`.
- After login, access `/admin` to create posts (draft/published), view existing posts and newsletter subscribers.

## Blog

- Public blog list: `/blog` (no auth)
- Public blog detail: `/blog/[slug]` (no auth)
- Public posts are those with `status = published`.

## Newsletter

- Public subscribe endpoint: `POST /api/newsletter/subscribe` with JSON `{ email, name? }`
- Beautiful HTML welcome emails sent via nodemailer + Brevo SMTP with handlebars templates
- Admin list (requires auth) at `GET /api/newsletter/list` and visible in `/admin` dashboard

## Uploads

- Authenticated upload endpoint: `POST /api/upload` (multipart form-data, `file` field). The admin UI uses this endpoint.

## Deployment (Vercel)

- Repo contains `vercel.json` and is ESM by default (`type: module`).
- Set environment variables in Vercel project settings.
- Deploy normally; Next.js build command is `next build`.

## Notes

- ESM only (no CommonJS). `type: module` is set in `package.json`.
- Server auth uses httpOnly cookie `auth_token`.
- Default cover image falls back to Cloudinary `CLOUDINARY_DEFAULT_LANDSCAPE_PUBLIC_ID` if not provided.

## Scripts

- `npm run dev` – start dev server
- `npm run build` – build for production
- `npm start` – start production server locally
- `npm run lint` – Next.js lint
