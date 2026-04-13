'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { CATEGORIES } from '@/types';
import { cn } from '@/lib/utils';

const PILL_CATEGORIES = ['All', ...CATEGORIES];

export default function SearchBar() {
  const params = useSearchParams();

  const currentCategory = params.get('category') ?? '';
  const currentSort     = params.get('sort') === 'oldest' ? 'oldest' : 'newest';
  const currentQuery    = params.get('q') ?? '';

  const activeCategory = currentCategory || 'All';

  return (
    <div className="bg-white border border-slate-200 rounded-sm p-4">

      {/* Category pills */}
      <div
        className="flex gap-2 mb-4 flex-wrap"
        role="group"
        aria-label="Filter by category"
      >
        {PILL_CATEGORIES.map((cat) => {
          const val = cat === 'All' ? '' : cat;
          const isActive = activeCategory === cat;
          const href = `/items?${new URLSearchParams({
            ...(currentQuery && { q: currentQuery }),
            ...(val && { category: val }),
            sort: currentSort,
            page: '1',
          }).toString()}`;

          return (
            <a
              key={cat}
              href={href}
              className={cn(
                'px-3 py-1.5 text-xs font-medium rounded-full border transition-colors cursor-pointer no-underline',
                isActive
                  ? 'bg-navy text-white border-navy'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              )}
              aria-pressed={isActive}
            >
              {cat}
            </a>
          );
        })}
      </div>

      {/* Search form */}
      <form
        method="GET"
        action="/items"
        role="search"
        aria-label="Search and filter lost items"
      >
        {/* Preserve category across keyword searches */}
        {currentCategory && (
          <input type="hidden" name="category" value={currentCategory} />
        )}

        <div className="flex flex-col sm:flex-row gap-3">

          {/* Keyword search */}
          <div className="flex-1 relative">
            <label htmlFor="search-query" className="sr-only">
              Search items
            </label>
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"
            >
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M11 11l3 3" stroke="currentColor"
                    strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              id="search-query"
              type="search"
              name="q"
              defaultValue={currentQuery}
              placeholder="Search by title, description..."
              className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-sm
                         text-sm focus:outline-none focus:border-amber focus:ring-1
                         focus:ring-amber placeholder:text-slate-400"
              aria-label="Search keywords"
            />
          </div>

          {/* Sort */}
          <div>
            <label htmlFor="sort-by" className="sr-only">Sort by</label>
            <select
              id="sort-by"
              name="sort"
              defaultValue={currentSort}
              className="w-full sm:w-36 px-3 py-2.5 border border-slate-200 rounded-sm
                         text-sm focus:outline-none focus:border-amber focus:ring-1
                         focus:ring-amber bg-white text-navy-800"
              aria-label="Sort items"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>

          {/* Reset pagination on new search */}
          <input type="hidden" name="page" value="1" />

          {/* Submit */}
          <button
            type="submit"
            className="px-5 py-2.5 bg-amber text-navy font-semibold text-sm
                       rounded-sm hover:bg-amber/90 transition-colors"
            aria-label="Apply search filters"
          >
            Search
          </button>

        </div>

        {/* Clear filters */}
        {(currentQuery || currentCategory || currentSort !== 'newest') && (
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-slate-500">Filters applied</span>
            <a
              href="/items"
              className="text-xs text-amber font-medium hover:underline"
              aria-label="Clear all filters"
            >
              Clear all
            </a>
          </div>
        )}

      </form>
    </div>
  );
}