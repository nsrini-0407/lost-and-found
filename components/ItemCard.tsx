import Link from 'next/link';
import Image from 'next/image';
import { formatDate, truncate } from '@/lib/utils';
import StatusBadge from './StatusBadge';
import type { Item } from '@/types';

const CATEGORY_COLORS: Record<string, string> = {
  'Electronics':             'bg-blue-50',
  'Clothing':                'bg-rose-50',
  'Accessories':             'bg-amber-50',
  'Books & School Supplies': 'bg-teal-50',
  'Sports Equipment':        'bg-green-50',
  'Keys & ID':               'bg-violet-50',
  'Bags & Backpacks':        'bg-red-50',
  'Other':                   'bg-slate-50',
};

// Small inline SVG icon for each category shown in the chip
function CategoryIcon({ category }: { category: string }) {
  const icons: Record<string, React.ReactNode> = {
    'Electronics': (
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
        <rect x="1" y="2.5" width="8" height="6" rx="1"
              stroke="currentColor" strokeWidth="1"/>
        <path d="M3.5 2.5V2a1.5 1.5 0 013 0v.5" stroke="currentColor" strokeWidth="1"/>
      </svg>
    ),
    'Clothing': (
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
        <path d="M1.5 3L3 1.5h1.5L5 3l.5-1.5H7L8.5 3 7 4.5v5H3v-5L1.5 3z"
              stroke="currentColor" strokeWidth="0.9" strokeLinejoin="round"/>
      </svg>
    ),
    'Accessories': (
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
        <circle cx="5" cy="5" r="3.5" stroke="currentColor" strokeWidth="1"/>
        <circle cx="5" cy="5" r="1.5" stroke="currentColor" strokeWidth="1"/>
        <path d="M5 1v1M5 8v1M1 5h1M8 5h1"
              stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
    'Books & School Supplies': (
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
        <rect x="1.5" y="1" width="7" height="8" rx="1"
              stroke="currentColor" strokeWidth="1"/>
        <path d="M3.5 4h3M3.5 6h2"
              stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
    'Sports Equipment': (
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
        <circle cx="5" cy="5" r="3.5" stroke="currentColor" strokeWidth="1"/>
        <path d="M5 1.5c-1 1-1.5 2-1.5 3.5s.5 2.5 1.5 3.5"
              stroke="currentColor" strokeWidth="0.9" strokeLinecap="round"/>
        <path d="M5 1.5c1 1 1.5 2 1.5 3.5S6 7.5 5 8.5"
              stroke="currentColor" strokeWidth="0.9" strokeLinecap="round"/>
        <path d="M1.5 5h7" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round"/>
      </svg>
    ),
    'Keys & ID': (
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
        <circle cx="4" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1"/>
        <path d="M6 6.5l3.5 3.5M8 8l1-1"
              stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
    'Bags & Backpacks': (
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
        <path d="M2 3h6l.5 6H1.5L2 3z"
              stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
        <path d="M3.5 3V2.5a1.5 1.5 0 013 0V3"
              stroke="currentColor" strokeWidth="1"/>
        <path d="M1.5 5.5h7"
              stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
    'Other': (
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
        <circle cx="5" cy="5" r="3.5" stroke="currentColor" strokeWidth="1"/>
        <path d="M5 3.5v.5l.5 1.5H5M5 7v.5"
              stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
  };
  return <>{icons[category] ?? icons['Other']}</>;
}

interface ItemCardProps {
  item: Item;
}

export default function ItemCard({ item }: ItemCardProps) {
  const placeholderBg = CATEGORY_COLORS[item.category] ?? 'bg-slate-50';

  return (
    <article
      className="group bg-white rounded-sm border border-slate-200/80
                 hover:border-slate-300 hover:shadow-card-hover
                 transition-all duration-200 overflow-hidden animate-fade-in"
    >
      <Link
        href={`/items/${item.id}`}
        className="block"
        aria-label={`View details for ${item.title}`}
      >
        {/* Image area */}
        <div className={`aspect-[4/3] relative overflow-hidden
                        ${item.image_url ? 'bg-slate-100' : placeholderBg}`}>
          {item.image_url ? (
            <Image
              src={item.image_url}
              alt={`Photo of ${item.title}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-[1.02]
                         transition-transform duration-300"
            />
          ) : (
            // Category-specific placeholder illustration
            <div className="absolute inset-0 flex flex-col items-center
                            justify-center gap-3">
              <div className="opacity-20 text-current">
                <svg width="52" height="52" viewBox="0 0 52 52"
                     fill="none" aria-hidden="true">
                  {item.category === 'Electronics' && (
                    <>
                      <rect x="6" y="14" width="40" height="26" rx="4"
                            stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M18 14v-4a8 8 0 0116 0v4"
                            stroke="currentColor" strokeWidth="1.5"/>
                      <circle cx="26" cy="27" r="6"
                              stroke="currentColor" strokeWidth="1.5"/>
                    </>
                  )}
                  {item.category === 'Bags & Backpacks' && (
                    <>
                      <path d="M10 18h32l2 26H8L10 18z"
                            stroke="currentColor" strokeWidth="1.5"
                            strokeLinejoin="round"/>
                      <path d="M18 18v-4a8 8 0 0116 0v4"
                            stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M8 30h36"
                            stroke="currentColor" strokeWidth="1.5"
                            strokeLinecap="round"/>
                    </>
                  )}
                  {item.category === 'Keys & ID' && (
                    <>
                      <circle cx="20" cy="22" r="10"
                              stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M28 30l14 14M38 38l4-4"
                            stroke="currentColor" strokeWidth="1.5"
                            strokeLinecap="round"/>
                    </>
                  )}
                  {item.category === 'Clothing' && (
                    <>
                      <path d="M8 16l8-6h6l4 6 4-6h6l8 6-6 8v20H14V24L8 16z"
                            stroke="currentColor" strokeWidth="1.5"
                            strokeLinejoin="round"/>
                    </>
                  )}
                  {(item.category === 'Books & School Supplies' ||
                    item.category === 'Sports Equipment' ||
                    item.category === 'Accessories' ||
                    item.category === 'Other') && (
                    <>
                      <rect x="8" y="8" width="36" height="36" rx="4"
                            stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M16 22h20M16 30h14"
                            stroke="currentColor" strokeWidth="1.5"
                            strokeLinecap="round"/>
                    </>
                  )}
                </svg>
              </div>
              <span className="text-[10px] font-medium opacity-30 tracking-wide">
                No photo
              </span>
            </div>
          )}

          {/* Category chip with inline icon */}
          <span className="absolute top-2 left-2 inline-flex items-center gap-1
                           px-2 py-0.5 bg-navy/75 text-white text-[10px]
                           font-medium tracking-wide rounded-sm backdrop-blur-sm">
            <CategoryIcon category={item.category} />
            {item.category}
          </span>
        </div>

        {/* Card body */}
        <div className="p-4">
          <h3 className="font-medium text-navy-800 text-[14px] leading-snug mb-1.5">
            {item.title}
          </h3>

          <p className="text-slate-500 text-[12px] leading-relaxed mb-3">
            {truncate(item.description, 75)}
          </p>

          {/* Meta row with icons */}
          <div className="flex items-center gap-3 mb-3 text-slate-400">
            {/* Calendar icon + date */}
            <span className="inline-flex items-center gap-1 text-[11px]">
              <svg width="11" height="11" viewBox="0 0 11 11"
                   fill="none" aria-hidden="true">
                <rect x="1" y="2" width="9" height="8" rx="1.5"
                      stroke="currentColor" strokeWidth="1"/>
                <path d="M4 1v1.5M7 1v1.5M1 5h9"
                      stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
              </svg>
              {formatDate(item.date_found)}
            </span>
            {/* Location icon */}
            {item.location && (
              <span className="inline-flex items-center gap-1 text-[11px]
                               truncate max-w-[90px]">
                <svg width="10" height="11" viewBox="0 0 10 11"
                     fill="none" aria-hidden="true" className="flex-shrink-0">
                  <path d="M5 1a3.5 3.5 0 013.5 3.5C8.5 7 5 10 5 10S1.5 7 1.5 4.5A3.5 3.5 0 015 1z"
                        stroke="currentColor" strokeWidth="1"/>
                  <circle cx="5" cy="4.5" r="1.2"
                          stroke="currentColor" strokeWidth="1"/>
                </svg>
                <span className="truncate">{item.location}</span>
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <StatusBadge status={item.status} />
          </div>
        </div>
      </Link>
    </article>
  );
}