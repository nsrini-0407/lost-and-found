import Link from 'next/link';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import ItemCard from '@/components/ItemCard';
import type { Item } from '@/types';

// Fetch the 6 most recently approved items for the home page preview
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
      {/* Hero */}
<section className="bg-navy relative overflow-hidden">
  {/* Decorative rings */}
  <div className="absolute -top-16 -right-20 w-80 h-80 rounded-full
                  border border-amber/10 pointer-events-none" aria-hidden="true" />
  <div className="absolute top-8 -right-4 w-48 h-48 rounded-full
                  border border-amber/6 pointer-events-none" aria-hidden="true" />

  <div className="max-w-6xl mx-auto px-4 py-20 md:py-28 relative">
    <p className="text-amber text-[11px] font-medium tracking-[0.14em]
                  uppercase mb-4">
      Found something? Lost something?
    </p>
    <h1 className="font-display text-5xl md:text-7xl text-white
                   leading-[1.06] mb-5 max-w-xl">
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
</section>

{/* Stats strip */}
<div className="grid grid-cols-2 md:grid-cols-4 border-b border-border bg-white">
  {[
    { val: String(recentItems.length), label: 'Items listed' },
    { val: '—', label: 'Returned this month' },
    { val: '—', label: 'Pending review' },
    { val: '30', label: 'Days items are held' },
  ].map(({ val, label }) => (
    <div key={label}
         className="px-5 py-4 border-r border-border last:border-r-0">
      <p className="font-display text-3xl text-navy leading-none">{val}</p>
      <p className="text-[11px] text-slate-400 mt-1">{label}</p>
    </div>
  ))}
</div>

      {/* How it works */}
      <section
        className="bg-white border-b border-slate-200"
        aria-labelledby="how-it-works-heading"
      >
        <div className="max-w-6xl mx-auto px-4 py-14">
          <h2 id="how-it-works-heading"
              className="font-display text-2xl text-navy-800 mb-10 text-center">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Someone finds an item',
                desc: 'A student or staff member turns in a found item and submits it here.',
              },
              {
                step: '02',
                title: 'Admin reviews & approves',
                desc: 'Staff verify the submission and approve it to appear in the public listing.',
              },
              {
                step: '03',
                title: 'Owner files a claim',
                desc: 'The rightful owner sees the listing and submits identifying information to claim it.',
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-4">
                <span
                  className="text-3xl font-display font-bold text-amber/40 leading-none"
                  aria-hidden="true"
                >
                  {step}
                </span>
                <div>
                  <h3 className="font-semibold text-navy-800 mb-1">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent items */}
      <section
        className="max-w-6xl mx-auto px-4 py-14"
        aria-labelledby="recent-heading"
      >
        <div className="flex items-baseline justify-between mb-8">
          <h2 id="recent-heading" className="font-display text-2xl text-navy-800">
            Recently added
          </h2>
          <Link href="/items" className="text-sm text-amber font-medium hover:underline">
            View all items
          </Link>
        </div>

        {recentItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recentItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-sm py-8 text-center">
            No items listed yet. Check back soon.
          </p>
        )}
      </section>
    </div>
  );
}