import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'References & Licenses',
};

const TECHNOLOGIES = [
  {
    name: 'Next.js',
    version: '15',
    license: 'MIT',
    url: 'https://nextjs.org',
    author: 'Vercel, Inc.',
    description:
      'React framework providing server-side rendering, App Router, API routes, and file-based routing.',
  },
  {
    name: 'React',
    version: '19',
    license: 'MIT',
    url: 'https://react.dev',
    author: 'Meta Platforms, Inc.',
    description:
      'JavaScript library for building user interfaces using components and declarative rendering.',
  },
  {
    name: 'TypeScript',
    version: '5',
    license: 'Apache 2.0',
    url: 'https://www.typescriptlang.org',
    author: 'Microsoft Corporation',
    description:
      'Strongly typed superset of JavaScript that compiles to plain JavaScript, enabling static type checking.',
  },
  {
    name: 'Tailwind CSS',
    version: '4',
    license: 'MIT',
    url: 'https://tailwindcss.com',
    author: 'Tailwind Labs, Inc.',
    description:
      'Utility-first CSS framework for rapidly building custom user interfaces using class-based styling.',
  },
  {
    name: 'Supabase',
    version: '2',
    license: 'Apache 2.0',
    url: 'https://supabase.com',
    author: 'Supabase, Inc.',
    description:
      'Open-source Firebase alternative providing PostgreSQL database, file storage, and authentication.',
  },
  {
    name: '@supabase/ssr',
    version: '0.5',
    license: 'MIT',
    url: 'https://github.com/supabase/supabase-js',
    author: 'Supabase, Inc.',
    description:
      'Supabase client helpers for server-side rendering environments including Next.js App Router.',
  },
  {
    name: 'Zod',
    version: '3',
    license: 'MIT',
    url: 'https://zod.dev',
    author: 'Colin McDonnell',
    description:
      'TypeScript-first schema validation library used for both client-side form validation and server-side API input validation.',
  },
  {
    name: 'React Hook Form',
    version: '7',
    license: 'MIT',
    url: 'https://react-hook-form.com',
    author: 'Beier (Bill) Luo',
    description:
      'Performant form state management library for React with minimal re-renders and built-in validation support.',
  },
  {
    name: '@hookform/resolvers',
    version: '3',
    license: 'MIT',
    url: 'https://github.com/react-hook-form/resolvers',
    author: 'React Hook Form',
    description:
      'Validation resolver adapters for React Hook Form, used to connect Zod schemas to form validation.',
  },
  {
    name: 'Resend',
    version: '4',
    license: 'MIT',
    url: 'https://resend.com',
    author: 'Resend, Inc.',
    description:
      'Transactional email API used to send HTML email notifications for item approvals, rejections, and claim decisions.',
  },
  {
    name: 'date-fns',
    version: '3',
    license: 'MIT',
    url: 'https://date-fns.org',
    author: 'Sasha Koss and Lesha Koss',
    description:
      'Modern JavaScript date utility library used for formatting dates displayed on item cards and detail pages.',
  },
  {
    name: 'clsx',
    version: '2',
    license: 'MIT',
    url: 'https://github.com/lukeed/clsx',
    author: 'Luke Edwards',
    description:
      'Tiny utility for constructing conditional className strings, used throughout components for dynamic styling.',
  },
  {
    name: 'Rubik',
    version: 'Variable',
    license: 'Open Font License 1.1',
    url: 'https://fonts.google.com/specimen/Rubik',
    author: 'Hubert and Fischer, Meir Sadan, Cyreal',
    description:
      'Sans-serif typeface with slightly rounded corners used as the primary font throughout the application.',
  },
  {
    name: 'PostgreSQL',
    version: '15',
    license: 'PostgreSQL License',
    url: 'https://www.postgresql.org',
    author: 'PostgreSQL Global Development Group',
    description:
      'Open-source relational database system used as the backend data store via Supabase.',
  },
];

const SOURCES = [
  {
    title: 'Web Content Accessibility Guidelines (WCAG) 2.1',
    author: 'W3C Web Accessibility Initiative',
    url: 'https://www.w3.org/TR/WCAG21/',
    description:
      'Guidelines followed for accessible color contrast ratios, keyboard navigation, ARIA labeling, and semantic HTML structure.',
  },
  {
    title: 'Next.js App Router Documentation',
    author: 'Vercel, Inc.',
    url: 'https://nextjs.org/docs/app',
    description:
      'Official documentation referenced for Server Components, dynamic routing, middleware, API routes, and font optimization.',
  },
  {
    title: 'Supabase Documentation — Row Level Security',
    author: 'Supabase, Inc.',
    url: 'https://supabase.com/docs/guides/auth/row-level-security',
    description:
      'Documentation referenced for implementing RLS policies to restrict public database access to approved items only.',
  },
  {
    title: 'Supabase Documentation — Storage',
    author: 'Supabase, Inc.',
    url: 'https://supabase.com/docs/guides/storage',
    description:
      'Documentation referenced for setting up the item-images storage bucket, upload policies, and public URL generation.',
  },
  {
    title: 'Zod Documentation',
    author: 'Colin McDonnell',
    url: 'https://zod.dev',
    description:
      'Documentation referenced for schema definition, transform functions used for XSS sanitization, and safeParse validation.',
  },
  {
    title: 'OWASP Cross Site Scripting Prevention Cheat Sheet',
    author: 'OWASP Foundation',
    url: 'https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html',
    description:
      'Security guidelines followed for input sanitization, HTML tag stripping, and output encoding to prevent XSS attacks.',
  },
  {
    title: 'MDN Web Docs — HTTP Cookies',
    author: 'Mozilla Foundation',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies',
    description:
      'Reference used for implementing HTTP-only cookies for admin session authentication to prevent JavaScript token access.',
  },
  {
    title: 'Resend Documentation',
    author: 'Resend, Inc.',
    url: 'https://resend.com/docs',
    description:
      'Documentation referenced for API key setup, email sending, and HTML email template formatting.',
  },
  {
    title: 'FBLA Website Coding and Development Guidelines 2025-2026',
    author: 'National Future Business Leaders of America',
    url: 'https://www.fbla.org',
    description:
      'Official competition guidelines defining the required features, judging rubric, and presentation requirements for this project.',
  },
];

export default function ReferencesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 animate-fade-in">
      {/* Header */}
      <div className="mb-12">
        <p className="text-amber text-[11px] font-medium tracking-[0.14em]
                      uppercase mb-2">
          Westview Lost and Found
        </p>
        <h1 className="font-display text-4xl text-navy-800 mb-4">
          References &amp; Licenses
        </h1>
        <p className="text-slate-500 leading-relaxed max-w-2xl">
          This page documents all third-party libraries, frameworks, fonts, and
          external sources used in the development of this application, along
          with their respective licenses and authors.
        </p>
      </div>

      {/* Technologies & Licenses */}
      <section aria-labelledby="tech-heading" className="mb-16">
        <h2
          id="tech-heading"
          className="font-display text-2xl text-navy-800 mb-2"
        >
          Technologies &amp; Licenses
        </h2>
        <p className="text-slate-500 text-sm mb-6">
          All libraries and frameworks used in this project are open-source.
        </p>

        <div className="border border-slate-200 rounded-sm overflow-hidden bg-white">
          <table className="w-full text-sm" aria-label="Technology licenses">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {['Package', 'Author', 'License', 'Purpose'].map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="text-left px-4 py-3 text-xs font-semibold
                               text-slate-500 uppercase tracking-wide"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {TECHNOLOGIES.map((tech) => (
                <tr
                  key={tech.name}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="font-medium text-navy-800">
                      {tech.name}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      v{tech.version}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600 text-xs">
                    {tech.author}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-2 py-0.5 bg-teal-50
                                     text-teal-700 text-xs font-semibold
                                     rounded-sm border border-teal-100">
                      {tech.license}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-xs
                                 max-w-xs leading-relaxed">
                    {tech.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Sources & References */}
      <section aria-labelledby="sources-heading">
        <h2
          id="sources-heading"
          className="font-display text-2xl text-navy-800 mb-2"
        >
          Sources &amp; References
        </h2>
        <p className="text-slate-500 text-sm mb-6">
          External documentation and guidelines consulted during development.
        </p>

        <div className="space-y-4">
          {SOURCES.map((source) => (
            <div
              key={source.title}
              className="bg-white border border-slate-200 rounded-sm p-5
                         hover:border-slate-300 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-medium text-navy-800 text-sm mb-0.5">
                    {source.title}
                  </h3>
                  <p className="text-xs text-slate-400 mb-2">
                    {source.author}
                  </p>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {source.description}
                  </p>
                </div>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-xs text-amber font-medium
                             hover:underline underline-offset-2"
                  aria-label={`Visit source: ${source.title}`}
                >
                  Visit source
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MIT License text */}
      <section aria-labelledby="mit-heading" className="mt-16">
        <h2
          id="mit-heading"
          className="font-display text-2xl text-navy-800 mb-4"
        >
          MIT License
        </h2>
        <p className="text-slate-500 text-sm mb-4">
          The majority of packages used in this project are distributed under
          the MIT License, reproduced below.
        </p>
        <div className="bg-slate-50 border border-slate-200 rounded-sm p-6
                        font-mono text-xs text-slate-600 leading-relaxed
                        whitespace-pre-wrap">
{`MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`}
        </div>
      </section>
    </div>
  );
}