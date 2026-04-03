# TailorCV

TailorCV is an AI-assisted CV builder and job-application platform built with Next.js, TypeScript, Tailwind CSS, and Supabase.

It helps job seekers:

- Create and manage multiple resumes
- Switch between distinct visual templates
- Tailor CV content to a specific job description
- Generate matching cover letters
- Export polished resumes to PDF

It also includes marketing pages for Business, Who We Are, and Pricing, with a modern visual design system.

## Demo Highlights

- Supabase Auth-based signup/login/logout
- Supabase-backed resume CRUD (no localStorage persistence layer)
- AI tailoring endpoint with deterministic fallback when OpenAI key is missing
- Four template renderers:
	- Modern
	- Minimal
	- Corporate
	- Creative
- Job matcher workflow (resume + JD -> tailored output + cover letter)

## Tech Stack

- Framework: Next.js 15 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS v4 + custom theme tokens
- Auth + Database: Supabase (Auth + Postgres)
- AI: OpenAI SDK
- PDF Export: html2pdf.js
- Icons: lucide-react

## Features

### Authentication

- Register and login with Supabase Auth
- Session resolution via `supabase.auth.getUser()`
- Logout via `supabase.auth.signOut()`
- Server-side register route uses Supabase Admin API to avoid dev email rate-limit blockers

### Resume Management

- Create, edit, duplicate, and delete resumes
- Per-user resume isolation in DB
- Automatic demo resume seed for first-time users

### AI Tailoring

- Input: selected resume + target job description
- Output:
	- tailored summary
	- keywords
	- tailored skills
	- experience prompts
	- generated cover letter

### Templates and Export

- Multiple visual templates with unique layouts
- Live preview while editing
- PDF export support

## Project Structure

```text
app/
	api/
		ai/
			cover-letter/route.ts
			tailor/route.ts
		auth/
			register/route.ts
		resumes/
			route.ts
			seed/route.ts
			[id]/route.ts
			[id]/duplicate/route.ts
	business/page.tsx
	dashboard/
		page.tsx
		templates/page.tsx
		job-matcher/page.tsx
		resumes/new/page.tsx
		resumes/[id]/page.tsx
	login/page.tsx
	pricing/page.tsx
	register/page.tsx
	who-we-are/page.tsx

components/
	app-header.tsx
	resume-editor.tsx
	template-preview.tsx
	templates/
		modern-template.tsx
		minimal-template.tsx
		corporate-template.tsx
		creative-template.tsx

lib/
	auth.ts
	resume-store.ts
	supabase.ts
	supabase-admin.ts
	templates.ts
	types.ts

supabase/
	schema.sql
```

## Getting Started

### 1. Clone and install

```bash
git clone <your-repo-url>
cd TailorCV
npm install
```

### 2. Configure environment variables

Copy the example file and fill values:

```bash
cp .env.example .env.local
```

Required variables in `.env.local`:

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Server-only key used by API routes |
| `OPENAI_API_KEY` | Optional | Enables live OpenAI generation |

### 3. Initialize database

Run SQL from [supabase/schema.sql](supabase/schema.sql) in your Supabase SQL editor.

### 4. Start development server

```bash
npm run dev
```

Open:

`http://localhost:3000`

### 5. Build for production

```bash
npm run build
npm run start
```

## Supabase Notes

- `SUPABASE_SERVICE_ROLE_KEY` is used only in server routes (never expose client-side).
- Resume APIs map auth users to profile IDs and upsert into `profiles` before writing resumes.
- Resume IDs are UUIDs to match DB schema.

## Database Schema

Defined in [supabase/schema.sql](supabase/schema.sql):

- `profiles`
	- `id` (uuid, PK)
	- `email` (unique)
	- `full_name`
- `resumes`
	- `id` (uuid, PK)
	- `user_id` (FK -> profiles.id)
	- `title`
	- `content` (jsonb)
	- `template`
	- timestamps
- `cover_letters`
	- `id` (uuid, PK)
	- `resume_id` (FK -> resumes.id)
	- `content`

## API Routes

### AI

- `POST /api/ai/tailor`
	- Request: `{ resume, jobDescription }`
	- Response: `{ summary, keywords, tailoredSkills, tailoredExperience, coverLetter }`
- `POST /api/ai/cover-letter`

### Auth

- `POST /api/auth/register`
	- Creates user via Supabase Admin API with confirmed email (dev-friendly flow)

### Resumes

- `GET /api/resumes?userId=<id>` list user resumes
- `POST /api/resumes` create/update resume
- `DELETE /api/resumes` delete resume
- `GET /api/resumes/:id?userId=<id>` get one resume
- `POST /api/resumes/:id/duplicate` duplicate resume
- `POST /api/resumes/seed` seed demo resume for a user

## Scripts

From [package.json](package.json):

- `npm run dev` - start dev server
- `npm run build` - production build
- `npm run start` - run production server
- `npm run lint` - lint checks

## UI/UX Notes

- Branded landing pages:
	- [app/business/page.tsx](app/business/page.tsx)
	- [app/who-we-are/page.tsx](app/who-we-are/page.tsx)
	- [app/pricing/page.tsx](app/pricing/page.tsx)
- Dynamic nav behavior in [components/app-header.tsx](components/app-header.tsx)
	- Guest: Business / Who we are / Pricing / Log in / Get started
	- Authenticated: Dashboard / Templates / AI Matcher / Log out

## Troubleshooting

### 1) Missing webpack chunk/module errors

Examples:

- `Cannot find module './331.js'`
- `Cannot find module './611.js'`

Fix:

```bash
# stop all node/next processes first
rm -rf .next
rm -rf node_modules/.cache
npm run build
npm run dev
```

On Windows PowerShell:

```powershell
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
if (Test-Path .next) { Remove-Item .next -Recurse -Force }
if (Test-Path node_modules/.cache) { Remove-Item node_modules/.cache -Recurse -Force }
npm run build
npm run dev
```

### 2) `ENOENT ... .next/routes-manifest.json`

Cause: incomplete or stale `.next` output.

Fix: same clean rebuild sequence above.

### 3) Supabase auth errors

- Ensure all env vars are present in `.env.local`.
- Confirm Supabase project URL and keys are valid.
- If signup/login fails, verify the auth provider settings in Supabase dashboard.

## Security

- Keep `.env.local` out of version control.
- Never expose `SUPABASE_SERVICE_ROLE_KEY` in client code.
- Sanitize and validate user input before writing to database.

## Deployment

Recommended: Vercel

1. Push repository to GitHub.
2. Import into Vercel.
3. Add all environment variables from `.env.local`.
4. Deploy.

## Roadmap Ideas

- Supabase Row Level Security policies
- Team workspaces and collaboration
- Custom domain/white-label for enterprise
- Analytics and application tracking dashboard
- Unit/integration tests for API and flows

## License

This repository is proprietary and all rights are reserved.

See [LICENSE](LICENSE) for the full terms.