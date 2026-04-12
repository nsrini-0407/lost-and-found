// Skeleton loading placeholder for ItemCard
// Shown while items are fetching to prevent layout shift

export default function SkeletonCard() {
  return (
    <article
      className="bg-white rounded-sm shadow-card overflow-hidden"
      aria-hidden="true"   // hidden from screen readers during load
      aria-label="Loading item"
    >
      {/* Image placeholder */}
      <div className="aspect-[4/3] skeleton" />

      <div className="p-4 space-y-3">
        {/* Category chip */}
        <div className="h-4 w-20 skeleton rounded-sm" />
        {/* Title */}
        <div className="h-5 w-3/4 skeleton rounded-sm" />
        {/* Description lines */}
        <div className="space-y-1.5">
          <div className="h-3.5 skeleton rounded-sm" />
          <div className="h-3.5 w-5/6 skeleton rounded-sm" />
        </div>
        {/* Footer */}
        <div className="flex justify-between pt-1">
          <div className="h-3 w-24 skeleton rounded-sm" />
          <div className="h-4 w-16 skeleton rounded-sm" />
        </div>
      </div>
    </article>
  );
}