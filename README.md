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

