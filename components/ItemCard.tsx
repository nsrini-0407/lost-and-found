import Link from 'next/link';
import Image from 'next/image';
import { formatDate, truncate } from '@/lib/utils';
import StatusBadge from './StatusBadge';
import type { Item } from '@/types';

// Each category gets a distinct tinted background for the image placeholder.
// This gives visual variety to the grid even when items have no photo.
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

interface ItemCardProps {
  item: Item;
}

export default function ItemCard({ item }: ItemCardProps) {
  // Pick the tinted color for this item's category, fall back to slate
  const placeholderBg = CATEGORY_COLORS[item.category] ?? 'bg-slate-50';

  return (
    <article
      className="group bg-white rounded-3xl border border-slate-200/80
                 hover:border-slate-300 hover:shadow-card-hover
                 transition-all duration-200 overflow-hidden animate-fade-in"
    >
      <Link
        href={`/items/${item.id}`}
        className="block"
        aria-label={`View details for ${item.title}`}
      >
        {/* ── Image area ── */}
        <div
          className={`aspect-[4/3] relative overflow-hidden
                      ${item.image_url ? 'bg-slate-100' : placeholderBg}`}
        >
          {item.image_url ? (
            <Image
              src={item.image_url}
              alt={`Photo of ${item.title}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
            />
          ) : (
            // Placeholder icon — color inherits from the tinted background
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                width="40" height="40" viewBox="0 0 40 40"
                fill="none" aria-hidden="true"
                className="opacity-30"
              >
                <rect x="4" y="10" width="32" height="22" rx="2"
                      stroke="currentColor" strokeWidth="1.5" />
                <circle cx="15" cy="19" r="3" stroke="currentColor" strokeWidth="1.5" />
                <path d="M4 26l8-6 6 5 5-4 9 7"
                      stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </div>
          )}

          {/* Category chip */}
          <span
            className="absolute top-2 left-2 px-2 py-0.5 bg-navy/75 text-white
                       text-[10px] font-medium tracking-wide rounded-sm backdrop-blur-sm"
          >
            {item.category}
          </span>
        </div>

        {/* ── Card body ── */}
        <div className="p-4">
          <h3 className="font-medium text-navy-800 text-[14px] leading-snug mb-1.5">
            {item.title}
          </h3>

          <p className="text-slate-500 text-[13px] leading-relaxed mb-3">
            {truncate(item.description, 80)}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-[11px]">
              Found {formatDate(item.date_found)}
            </span>
            <StatusBadge status={item.status} />
          </div>
        </div>
      </Link>
    </article>
  );
}