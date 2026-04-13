import type { Metadata } from 'next';
import { Montserrat, Rubik } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});


export const metadata: Metadata = {
  title: {
    default: 'Lost and Found | L&F Services',
    template: '%s | L&F Services',
  },
  description:
    'Browse, submit, and claim lost items at Westview High School.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.variable} suppressHydrationWarning>
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <footer className="mt-16 border-t border-slate-200 bg-white">
          <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row
                  items-center justify-between gap-3">
            <p className="text-sm text-slate-500">
              &copy; {new Date().getFullYear()} L & F Services
            </p>
            <div className="flex items-center gap-6">
              <p className="text-xs text-slate-400">
                Items held for 30 days. Contact the main office for assistance.
              </p>
              <a
                href="/references"
                className="text-xs text-slate-400 hover:text-amber transition-colors
                   underline underline-offset-2"
              >
                References &amp; Licenses
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}