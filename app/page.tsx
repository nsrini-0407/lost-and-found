import Link from 'next/link';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import ItemCard from '@/components/ItemCard';
import type { Item } from '@/types';

async function getRecentItems(): Promise<Item[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('items')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(6);

  if (error) {
    console.error('Failed to fetch recent items:', error);
    return [];
  }
  return data ?? [];
}

export default async function HomePage() {
  const recentItems = await getRecentItems();

  return (
    <div className="animate-fade-in">

      {/* ── Hero ── */}
      <section className="bg-navy relative overflow-hidden" aria-labelledby="hero-heading">

        {/* Decorative geometric background shapes */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {/* Large circle top right */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full
                          border border-amber/10" />
          <div className="absolute top-8 -right-8 w-56 h-56 rounded-full
                          border border-amber/6" />
          {/* Grid dots pattern bottom left */}
          <svg className="absolute bottom-0 left-0 opacity-5"
               width="200" height="200" viewBox="0 0 200 200">
            {Array.from({ length: 8 }, (_, row) =>
              Array.from({ length: 8 }, (_, col) => (
                <circle
                  key={`${row}-${col}`}
                  cx={col * 26 + 13}
                  cy={row * 26 + 13}
                  r="2"
                  fill="#E8A23C"
                />
              ))
            )}
          </svg>
          {/* Diagonal line accent */}
          <svg className="absolute top-0 right-64 opacity-5"
               width="120" height="400" viewBox="0 0 120 400">
            <line x1="0" y1="400" x2="120" y2="0"
                  stroke="#E8A23C" strokeWidth="1"/>
            <line x1="40" y1="400" x2="160" y2="0"
                  stroke="#E8A23C" strokeWidth="1"/>
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-20 md:py-28 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left: text content */}
            <div>
              <p className="text-amber text-[11px] font-medium tracking-[0.14em]
                            uppercase mb-4">
                Found something? Lost something?
              </p>
              <h1 id="hero-heading"
                  className="font-display text-5xl md:text-7xl text-white
                             leading-[1.06] mb-5">
                School Lost<br />
                &amp; <em className="text-amber not-italic">Found</em>
              </h1>
              <p className="text-white/50 text-base leading-relaxed max-w-md mb-10">
                Browse items turned in by students and staff. Submit what you found.
                Claim what belongs to you.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/items"
                      className="px-5 py-3 bg-amber text-navy text-sm font-semibold
                                 rounded-sm hover:bg-amber/90 transition-colors">
                  Browse Items
                </Link>
                <Link href="/submit"
                      className="px-5 py-3 bg-white/8 text-white/80 text-sm font-medium
                                 rounded-sm border border-white/12
                                 hover:bg-white/14 transition-colors">
                  Submit a Found Item
                </Link>
              </div>
            </div>

            {/* Right: illustrated lost items graphic */}
            <div className="hidden lg:flex items-center justify-center">
              <svg width="380" height="300" viewBox="0 0 380 300"
                   fill="none" aria-hidden="true">

                {/* Background card stack effect */}
                <rect x="60" y="40" width="260" height="200" rx="12"
                      fill="white" fillOpacity="0.03" stroke="white"
                      strokeOpacity="0.06" strokeWidth="1"/>
                <rect x="50" y="32" width="260" height="200" rx="12"
                      fill="white" fillOpacity="0.02" stroke="white"
                      strokeOpacity="0.04" strokeWidth="1"/>

                {/* Main card */}
                <rect x="70" y="50" width="240" height="180" rx="10"
                      fill="white" fillOpacity="0.06" stroke="white"
                      strokeOpacity="0.12" strokeWidth="1"/>

                {/* Card image area */}
                <rect x="84" y="64" width="212" height="100" rx="6"
                      fill="white" fillOpacity="0.04" stroke="white"
                      strokeOpacity="0.08" strokeWidth="1"/>

                {/* Backpack illustration inside card */}
                <g transform="translate(160, 90)">
                  {/* Bag body */}
                  <rect x="-30" y="-20" width="60" height="50" rx="8"
                        fill="#E8A23C" fillOpacity="0.2"
                        stroke="#E8A23C" strokeOpacity="0.6" strokeWidth="1.5"/>
                  {/* Bag top */}
                  <path d="M-15 -20v-8a15 15 0 0130 0v8"
                        stroke="#E8A23C" strokeOpacity="0.6" strokeWidth="1.5"
                        fill="none"/>
                  {/* Pocket */}
                  <rect x="-20" y="5" width="40" height="18" rx="4"
                        fill="none" stroke="#E8A23C" strokeOpacity="0.4"
                        strokeWidth="1.2"/>
                  {/* Zipper */}
                  <path d="M-20 14h40" stroke="#E8A23C" strokeOpacity="0.4"
                        strokeWidth="1" strokeDasharray="3 2"/>
                </g>

                {/* Card text lines */}
                <rect x="84" y="175" width="120" height="8" rx="2"
                      fill="white" fillOpacity="0.15"/>
                <rect x="84" y="190" width="80" height="6" rx="2"
                      fill="white" fillOpacity="0.08"/>

                {/* Status badge on card */}
                <rect x="258" y="172" width="48" height="18" rx="4"
                      fill="#E8A23C" fillOpacity="0.2"
                      stroke="#E8A23C" strokeOpacity="0.4" strokeWidth="1"/>
                <rect x="264" y="178" width="36" height="6" rx="2"
                      fill="#E8A23C" fillOpacity="0.5"/>

                {/* Floating item icons around the card */}

                {/* Keys — top left */}
                <g transform="translate(28, 80)">
                  <circle cx="0" cy="0" r="22"
                          fill="white" fillOpacity="0.05"
                          stroke="white" strokeOpacity="0.1" strokeWidth="1"/>
                  <circle cx="0" cy="-4" r="7"
                          stroke="#E8A23C" strokeOpacity="0.7" strokeWidth="1.5"
                          fill="none"/>
                  <path d="M0 3v8M-3 8h6" stroke="#E8A23C" strokeOpacity="0.7"
                        strokeWidth="1.5" strokeLinecap="round"/>
                </g>

                {/* Phone — bottom right */}
                <g transform="translate(342, 190)">
                  <circle cx="0" cy="0" r="22"
                          fill="white" fillOpacity="0.05"
                          stroke="white" strokeOpacity="0.1" strokeWidth="1"/>
                  <rect x="-8" y="-13" width="16" height="26" rx="3"
                        stroke="#E8A23C" strokeOpacity="0.7" strokeWidth="1.5"
                        fill="none"/>
                  <path d="M-2 10h4" stroke="#E8A23C" strokeOpacity="0.7"
                        strokeWidth="1.5" strokeLinecap="round"/>
                </g>

                {/* Book — top right */}
                <g transform="translate(348, 80)">
                  <circle cx="0" cy="0" r="22"
                          fill="white" fillOpacity="0.05"
                          stroke="white" strokeOpacity="0.1" strokeWidth="1"/>
                  <rect x="-10" y="-12" width="20" height="24" rx="2"
                        stroke="#E8A23C" strokeOpacity="0.7" strokeWidth="1.5"
                        fill="none"/>
                  <path d="M-6 -4h12M-6 2h8M-6 8h10"
                        stroke="#E8A23C" strokeOpacity="0.5" strokeWidth="1.2"
                        strokeLinecap="round"/>
                </g>

                {/* Watch — bottom left */}
                <g transform="translate(28, 190)">
                  <circle cx="0" cy="0" r="22"
                          fill="white" fillOpacity="0.05"
                          stroke="white" strokeOpacity="0.1" strokeWidth="1"/>
                  <circle cx="0" cy="0" r="9"
                          stroke="#E8A23C" strokeOpacity="0.7" strokeWidth="1.5"
                          fill="none"/>
                  <path d="M0 -5v5l3 3" stroke="#E8A23C" strokeOpacity="0.7"
                        strokeWidth="1.3" strokeLinecap="round"/>
                  <rect x="-4" y="-13" width="8" height="5" rx="1.5"
                        stroke="#E8A23C" strokeOpacity="0.4" strokeWidth="1.2"
                        fill="none"/>
                  <rect x="-4" y="8" width="8" height="5" rx="1.5"
                        stroke="#E8A23C" strokeOpacity="0.4" strokeWidth="1.2"
                        fill="none"/>
                </g>

                {/* Connecting dashed lines from icons to card */}
                <path d="M50 80 Q70 80 84 90" stroke="white" strokeOpacity="0.08"
                      strokeWidth="1" strokeDasharray="3 3" fill="none"/>
                <path d="M320 190 Q310 185 310 185" stroke="white" strokeOpacity="0.08"
                      strokeWidth="1" strokeDasharray="3 3" fill="none"/>
              </svg>
            </div>

          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b border-slate-200 bg-white">
        {[
          {
            val: String(recentItems.length > 0 ? '24+' : '0'),
            label: 'Items listed',
            icon: (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <rect x="2" y="2" width="6" height="6" rx="1.5"
                      stroke="#E8A23C" strokeWidth="1.3"/>
                <rect x="10" y="2" width="6" height="6" rx="1.5"
                      stroke="#E8A23C" strokeWidth="1.3"/>
                <rect x="2" y="10" width="6" height="6" rx="1.5"
                      stroke="#E8A23C" strokeWidth="1.3"/>
                <rect x="10" y="10" width="6" height="6" rx="1.5"
                      stroke="#E8A23C" strokeWidth="1.3"/>
              </svg>
            ),
          },
          {
            val: '8',
            label: 'Returned this month',
            icon: (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <circle cx="9" cy="9" r="7" stroke="#E8A23C" strokeWidth="1.3"/>
                <path d="M6 9l2.5 2.5 4-4.5" stroke="#E8A23C"
                      strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ),
          },
          {
            val: '< 2',
            label: 'Days to review',
            icon: (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <circle cx="9" cy="9" r="7" stroke="#E8A23C" strokeWidth="1.3"/>
                <path d="M9 5v4.5L11.5 12" stroke="#E8A23C"
                      strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            ),
          },
          {
            val: '30',
            label: 'Days items are held',
            icon: (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <rect x="2" y="3" width="14" height="13" rx="2"
                      stroke="#E8A23C" strokeWidth="1.3"/>
                <path d="M6 2v2M12 2v2M2 8h14" stroke="#E8A23C"
                      strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            ),
          },
        ].map(({ val, label, icon }) => (
          <div key={label} className="px-5 py-5 border-r border-slate-200 last:border-r-0
                                      flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-amber-pale flex items-center
                            justify-center flex-shrink-0">
              {icon}
            </div>
            <div>
              <p className="font-display text-2xl text-navy leading-none">{val}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── How it works ── */}
      <section className="bg-white border-b border-slate-200"
               aria-labelledby="how-it-works-heading">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 id="how-it-works-heading"
              className="font-display text-2xl text-navy-800 mb-10 text-center">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Someone submits a found item',
                desc: 'A student or staff member fills out the form with a photo, description, and where it was found.',
                iconBg: 'bg-blue-50',
                iconStroke: '#185FA5',
                icon: (
                  <svg width="26" height="26" viewBox="0 0 26 26"
                       fill="none" aria-hidden="true">
                    <rect x="3" y="5" width="20" height="17" rx="2.5"
                          stroke="#185FA5" strokeWidth="1.5"/>
                    <path d="M8 10h10M8 14h6" stroke="#185FA5"
                          strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M9 5V3.5a4 4 0 018 0V5" stroke="#185FA5" strokeWidth="1.5"/>
                    <circle cx="19" cy="8" r="4" fill="#185FA5" fillOpacity="0.15"
                            stroke="#185FA5" strokeWidth="1.2"/>
                    <path d="M17.5 8l1.2 1.2 2-2" stroke="#185FA5"
                          strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
              },
              {
                step: '02',
                title: 'Admin reviews and approves',
                desc: 'Staff verify the submission and publish it to the public listing for everyone to see.',
                iconBg: 'bg-amber-50',
                iconStroke: '#854F0B',
                icon: (
                  <svg width="26" height="26" viewBox="0 0 26 26"
                       fill="none" aria-hidden="true">
                    <circle cx="13" cy="13" r="10" stroke="#854F0B" strokeWidth="1.5"/>
                    <path d="M8.5 13l3 3 6-7" stroke="#854F0B"
                          strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
              },
              {
                step: '03',
                title: 'Owner files a claim',
                desc: 'The rightful owner sees the listing and submits identifying information to reclaim their item.',
                iconBg: 'bg-teal-50',
                iconStroke: '#0F6E56',
                icon: (
                  <svg width="26" height="26" viewBox="0 0 26 26"
                       fill="none" aria-hidden="true">
                    <circle cx="13" cy="10" r="4.5" stroke="#0F6E56" strokeWidth="1.5"/>
                    <path d="M5 23c0-4.4 3.6-8 8-8s8 3.6 8 8"
                          stroke="#0F6E56" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M16 14l3 3-3 3" stroke="#0F6E56"
                          strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
              },
            ].map(({ step, title, desc, iconBg, icon }) => (
              <div key={step}
                   className="bg-white border border-slate-200 rounded-sm p-6
                              hover:border-slate-300 hover:shadow-card
                              transition-all duration-200 relative group">
                {/* Step number watermark */}
                <span className="absolute top-4 right-5 font-display text-4xl
                                 font-bold text-slate-100 group-hover:text-slate-200
                                 transition-colors select-none"
                      aria-hidden="true">
                  {step}
                </span>
                {/* Icon */}
                <div className={`w-12 h-12 ${iconBg} rounded-sm flex items-center
                                 justify-center mb-5`}>
                  {icon}
                </div>
                <h3 className="font-semibold text-navy-800 mb-2 text-sm leading-snug">
                  {title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Connector arrows between steps on desktop */}
          <div className="hidden md:flex items-center justify-center gap-0 mt-6
                          pointer-events-none" aria-hidden="true">
            <div className="flex-1" />
            <svg width="48" height="16" viewBox="0 0 48 16" fill="none">
              <path d="M0 8h40M34 3l10 5-10 5" stroke="#E8A23C"
                    strokeOpacity="0.4" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="flex-1" />
            <svg width="48" height="16" viewBox="0 0 48 16" fill="none">
              <path d="M0 8h40M34 3l10 5-10 5" stroke="#E8A23C"
                    strokeOpacity="0.4" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="flex-1" />
          </div>
        </div>
      </section>

      {/* ── Recent items ── */}
      <section className="max-w-6xl mx-auto px-4 py-14"
               aria-labelledby="recent-heading">
        <div className="flex items-baseline justify-between mb-8">
          <div>
            <h2 id="recent-heading" className="font-display text-2xl text-navy-800">
              Recently added
            </h2>
            <p className="text-slate-400 text-sm mt-0.5">
              Items waiting to be claimed
            </p>
          </div>
          <Link href="/items"
                className="text-sm text-amber font-medium hover:underline
                           inline-flex items-center gap-1">
            View all items
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M4 7h6M7 4l3 3-3 3" stroke="currentColor"
                    strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {recentItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recentItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          // Empty state with illustration
          <div className="border border-dashed border-slate-200 rounded-sm
                          py-20 text-center bg-white">
            <div className="mx-auto mb-6 w-20 h-20 relative">
              {/* Stacked cards illustration */}
              <div className="absolute inset-2 bg-slate-100 rounded-sm
                              rotate-6 border border-slate-200" />
              <div className="absolute inset-2 bg-slate-50 rounded-sm
                              -rotate-3 border border-slate-200" />
              <div className="absolute inset-2 bg-white rounded-sm
                              border border-slate-200 flex items-center
                              justify-center">
                <svg width="28" height="28" viewBox="0 0 28 28"
                     fill="none" aria-hidden="true">
                  <circle cx="14" cy="14" r="6" stroke="#cbd5e1" strokeWidth="1.5"/>
                  <path d="M10 14l3 3 5-5" stroke="#cbd5e1"
                        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <p className="text-navy-800 font-medium mb-1">No items listed yet</p>
            <p className="text-slate-400 text-sm">Check back soon or submit a found item.</p>
            <Link href="/submit"
                  className="inline-block mt-5 px-4 py-2 bg-amber text-navy
                             text-sm font-semibold rounded-sm hover:bg-amber/90
                             transition-colors">
              Submit a Found Item
            </Link>
          </div>
        )}
      </section>

      {/* ── Call to action banner ── */}
      <section className="bg-navy-800 border-t border-navy-700">
        <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row
                        items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Icon */}
            <div className="w-14 h-14 rounded-sm bg-amber/10 border border-amber/20
                            flex items-center justify-center flex-shrink-0">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <path d="M14 3L4 8v7c0 5.5 4.3 10.7 10 12 5.7-1.3 10-6.5 10-12V8L14 3z"
                      stroke="#E8A23C" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M10 14l3 3 5-5" stroke="#E8A23C"
                      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold mb-0.5">
                Found something on campus?
              </p>
              <p className="text-white/50 text-sm">
                Turn it in and help a fellow student get it back.
              </p>
            </div>
          </div>
          <Link href="/submit"
                className="flex-shrink-0 px-6 py-3 bg-amber text-navy font-semibold
                           text-sm rounded-sm hover:bg-amber/90 transition-colors">
            Submit a Found Item
          </Link>
        </div>
      </section>

    </div>
  );
}