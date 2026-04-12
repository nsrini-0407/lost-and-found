# School Lost and Found

A full-stack web application for managing a school lost and found system.
Built for the FBLA Website Coding & Development competition.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (PostgreSQL + Storage)
- Resend (transactional email)
- Zod (validation)
- React Hook Form

## Local Setup

### 1. Install dependencies

npm install

### 2. Configure environment variables

Copy .env.local.example to .env.local and fill in all values.

Required variables:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- RESEND_API_KEY
- EMAIL_FROM
- ADMIN_EMAIL
- ADMIN_SECRET_KEY (any long random string)
- NEXT_PUBLIC_APP_URL (http://localhost:3000 for local)

### 3. Set up Supabase

1. Create a project at supabase.com
2. Run the SQL in README under "Database Schema" in the SQL Editor
3. Create a storage bucket named "item-images" (public, 5MB limit)

### 4. Run locally

npm run dev

Open http://localhost:3000

Admin dashboard: http://localhost:3000/admin
Admin login key: the ADMIN_SECRET_KEY value from your .env.local

## Security Features

- Zod validation on all inputs (client + server)
- HTML tag stripping to prevent XSS
- Rate limiting on submission endpoints
- HTTP-only cookie for admin session
- Supabase Row Level Security
- Service role key never exposed client-side
- Security headers via middleware
- Image type and size validation server-side

## Accessibility

- WCAG 2.1 AA compliant color contrast
- Semantic HTML throughout
- ARIA labels on all interactive elements
- Full keyboard navigation
- Screen reader announcements for dynamic content
- Alt text on all images

## Project Structure

See folder structure in documentation.