import { Suspense } from 'react';
import Link from 'next/link';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import ItemCard from '@/components/ItemCard';
import SearchBar from '@/components/SearchBar';
import EmptyState from '@/components/EmptyState';
import type { Item } from '@/types';

const PAGE_SIZE = 12;

interface SearchParams {
  q?: string;
  category?: string;
  sort?: string;
  page?: string;
}

async function getItems(params: SearchParams) {
  const supabase = await createServerSupabaseClient();

  const page = Math.max(1, parseInt(params.page ?? '1', 10));
  const from = (page - 1) * PAGE_SIZE;
  const to   = from + PAGE_SIZE - 1;

  let query = supabase
    .from('items')
    .select('*', { count: 'exact' })
    .eq('status', 'approved');

  if (params.q) {
    query = query.or(
      `title.ilike.%${params.q}%,description.ilike.%${params.q}%`
    );
  }

  if (params.category) {
    query = query.eq('category', params.category);
  }

  const ascending = params.sort === 'oldest';
  query = query.order('created_at', { ascending });
  query = query.range(from, to);

  const { data, count, error } = await query;

  if (error) {
    console.error('Failed to fetch items:', error);
    return { items: [], total: 0 };
  }

  return { items: (data ?? []) as Item[], total: count ?? 0 };
}

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;  // Next.js 15 — must be Promise
}) {
  const params = await searchParams;    // await before using

  const { items, total } = await getItems(params);
  const page = parseInt(params.page ?? '1', 10);
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl text-navy-800 mb-1">
          Browse Items
        </h1>
        <p className="text-slate-500 text-sm">
          {total > 0
            ? `${total} item${total !== 1 ? 's' : ''} currently listed`
            : 'No items match your search'}
        </p>
      </div>

      {/* Search + filters */}
      <div className="mb-8">
        <Suspense fallback={<div className="h-16 skeleton rounded-sm" />}>
          <SearchBar />
        </Suspense>
      </div>

      {/* Item grid */}
      {items.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {items.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav
              className="mt-10 flex items-center justify-center gap-2"
              aria-label="Pagination"
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                const sp = new URLSearchParams({
                  ...(params.q        && { q:        params.q }),
                  ...(params.category && { category: params.category }),
                  ...(params.sort     && { sort:     params.sort }),
                  page: p.toString(),
                });
                return (
                  <Link
                    key={p}
                    href={`/items?${sp.toString()}`}
                    className={`w-9 h-9 flex items-center justify-center text-sm
                                rounded-sm border transition-colors
                                ${p === page
                                  ? 'bg-amber border-amber text-navy font-bold'
                                  : 'border-slate-200 text-slate-600 hover:border-slate-300 bg-white'
                                }`}
                    aria-label={`Page ${p}`}
                    aria-current={p === page ? 'page' : undefined}
                  >
                    {p}
                  </Link>
                );
              })}
            </nav>
          )}
        </>
      ) : (
        <EmptyState
          title="No items found"
          message={
            params.q || params.category
              ? 'Try adjusting your search filters or clearing them to see all items.'
              : 'There are no approved items in the lost and found right now. Check back soon.'
          }
          action={
            params.q || params.category
              ? { label: 'Clear filters', href: '/items' }
              : undefined
          }
        />
      )}
    </div>
  );
}