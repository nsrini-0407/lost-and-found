// import Link from 'next/link';
// import { notFound } from 'next/navigation';
// import Image from 'next/image';
// import { createServerSupabaseClient } from '@/lib/supabase/server';
// import { formatDate } from '@/lib/utils';
// import StatusBadge from '@/components/StatusBadge';
// import ClaimForm from '@/components/ClaimForm';
// import type { Item } from '@/types';

// // Generate metadata for SEO
// export async function generateMetadata({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const supabase = await createServerSupabaseClient();
//   const { data } = await supabase
//     .from('items')
//     .select('title')
//     .eq('id', params.id)
//     .single();

//   return {
//     title: data?.title ?? 'Item Details',
//   };
// }

// async function getItem(id: string): Promise<Item | null> {
//   const supabase = await createServerSupabaseClient();
//   const { data, error } = await supabase
//     .from('items')
//     .select('*')
//     .eq('id', id)
//     .eq('status', 'approved')  // Only show approved items publicly
//     .single();

//   if (error || !data) return null;
//   return data as Item;
// }

// export default async function ItemDetailPage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const item = await getItem(params.id);

//   if (!item) notFound();

//   const isClaimed = item.status === 'claimed';

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-10 animate-fade-in">
//       {/* Back link */}
//       <Link
//         href="/items"
//         className="inline-flex items-center gap-2 text-sm text-slate-500
//                    hover:text-navy-800 transition-colors mb-8"
//         aria-label="Back to all items"
//       >
//         <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
//           <path d="M10 3L5 8l5 5" stroke="currentColor"
//                 strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//         </svg>
//         Back to Browse
//       </Link>

//       <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
//         {/* Image column */}
//         <div className="lg:col-span-3">
//           <div className="rounded-sm overflow-hidden bg-slate-100 border border-slate-200
//                           aspect-[4/3] relative">
//             {item.image_url ? (
//               <Image
//                 src={item.image_url}
//                 alt={`Photo of ${item.title}`}
//                 fill
//                 sizes="(max-width: 1024px) 100vw, 60vw"
//                 className="object-cover"
//                 priority
//               />
//             ) : (
//               <div className="absolute inset-0 flex flex-col items-center
//                               justify-center text-slate-400 gap-3">
//                 <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
//                   <rect x="4" y="10" width="40" height="28" rx="2"
//                         stroke="#cbd5e1" strokeWidth="2" />
//                   <circle cx="18" cy="22" r="5" stroke="#cbd5e1" strokeWidth="2" />
//                   <path d="M4 32l10-9 9 8 7-6 14 9" stroke="#cbd5e1"
//                         strokeWidth="2" strokeLinejoin="round" />
//                 </svg>
//                 <span className="text-sm text-slate-400">No photo available</span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Details column */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Header */}
//           <div>
//             <div className="flex items-start justify-between gap-3 mb-2">
//               <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-600
//                                text-xs font-semibold rounded-sm">
//                 {item.category}
//               </span>
//               <StatusBadge status={item.status} />
//             </div>
//             <h1 className="font-display text-2xl text-navy-800 mt-2">{item.title}</h1>
//           </div>

//           {/* Meta grid */}
//           <dl className="grid grid-cols-2 gap-4 p-4 bg-white border border-slate-200
//                          rounded-sm text-sm">
//             <div>
//               <dt className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-0.5">
//                 Date Found
//               </dt>
//               <dd className="text-navy-800 font-medium">
//                 {formatDate(item.date_found)}
//               </dd>
//             </div>
//             <div>
//               <dt className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-0.5">
//                 Location
//               </dt>
//               <dd className="text-navy-800 font-medium">{item.location}</dd>
//             </div>
//             <div className="col-span-2">
//               <dt className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-0.5">
//                 Submitted
//               </dt>
//               <dd className="text-navy-800 font-medium">
//                 {formatDate(item.created_at)}
//               </dd>
//             </div>
//           </dl>

//           {/* Description */}
//           <div>
//             <h2 className="text-sm font-semibold text-navy-800 mb-2">Description</h2>
//             <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
//           </div>

//           {/* Claim form or claimed notice */}
//           <div className="bg-white border border-slate-200 rounded-sm p-5">
//             {isClaimed ? (
//               <div className="text-center py-4">
//                 <StatusBadge status="claimed" className="mb-3" />
//                 <p className="text-slate-500 text-sm">
//                   This item has been claimed by its owner.
//                 </p>
//               </div>
//             ) : (
//               <>
//                 <h2 className="font-semibold text-navy-800 mb-1">Is this yours?</h2>
//                 <p className="text-xs text-slate-500 mb-5">
//                   Submit a claim below. A staff member will review it and
//                   contact you within 1-2 school days.
//                 </p>
//                 <ClaimFormWrapper itemId={item.id} itemTitle={item.title} />
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Client wrapper to handle claim success state without full page reload
// function ClaimFormWrapper({
//   itemId, itemTitle,
// }: {
//   itemId: string;
//   itemTitle: string;
// }) {
//   // This is a server component file, so we use a client boundary
//   // In practice, ClaimForm is already a client component
//   return (
//     <ClaimForm
//       itemId={itemId}
//       itemTitle={itemTitle}
//       onSuccess={() => {
//         // Handled inside ClaimForm with local state
//       }}
//     />
//   );
// }
// import Link from 'next/link';
// import { notFound } from 'next/navigation';
// import Image from 'next/image';
// import { createServerSupabaseClient } from '@/lib/supabase/server';
// import { formatDate } from '@/lib/utils';
// import StatusBadge from '@/components/StatusBadge';
// import ClaimForm from '@/components/ClaimForm';
// import type { Item } from '@/types';

// // Generate metadata for SEO
// export async function generateMetadata({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const supabase = await createServerSupabaseClient();
//   const { data } = await supabase
//     .from('items')
//     .select('title')
//     .eq('id', params.id)
//     .single();

//   return {
//     title: data?.title ?? 'Item Details',
//   };
// }

// async function getItem(id: string): Promise<Item | null> {
//   const supabase = await createServerSupabaseClient();
//   const { data, error } = await supabase
//     .from('items')
//     .select('*')
//     .eq('id', id)
//     .eq('status', 'approved')  // Only show approved items publicly
//     .single();

//   if (error || !data) return null;
//   return data as Item;
// }

// export default async function ItemDetailPage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const item = await getItem(params.id);

//   if (!item) notFound();

//   const isClaimed = item.status === 'claimed';

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-10 animate-fade-in">
//       {/* Back link */}
//       <Link
//         href="/items"
//         className="inline-flex items-center gap-2 text-sm text-slate-500
//                    hover:text-navy-800 transition-colors mb-8"
//         aria-label="Back to all items"
//       >
//         <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
//           <path d="M10 3L5 8l5 5" stroke="currentColor"
//                 strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//         </svg>
//         Back to Browse
//       </Link>

//       <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
//         {/* Image column */}
//         <div className="lg:col-span-3">
//           <div className="rounded-sm overflow-hidden bg-slate-100 border border-slate-200
//                           aspect-[4/3] relative">
//             {item.image_url ? (
//               <Image
//                 src={item.image_url}
//                 alt={`Photo of ${item.title}`}
//                 fill
//                 sizes="(max-width: 1024px) 100vw, 60vw"
//                 className="object-cover"
//                 priority
//               />
//             ) : (
//               <div className="absolute inset-0 flex flex-col items-center
//                               justify-center text-slate-400 gap-3">
//                 <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
//                   <rect x="4" y="10" width="40" height="28" rx="2"
//                         stroke="#cbd5e1" strokeWidth="2" />
//                   <circle cx="18" cy="22" r="5" stroke="#cbd5e1" strokeWidth="2" />
//                   <path d="M4 32l10-9 9 8 7-6 14 9" stroke="#cbd5e1"
//                         strokeWidth="2" strokeLinejoin="round" />
//                 </svg>
//                 <span className="text-sm text-slate-400">No photo available</span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Details column */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Header */}
//           <div>
//             <div className="flex items-start justify-between gap-3 mb-2">
//               <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-600
//                                text-xs font-semibold rounded-sm">
//                 {item.category}
//               </span>
//               <StatusBadge status={item.status} />
//             </div>
//             <h1 className="font-display text-2xl text-navy-800 mt-2">{item.title}</h1>
//           </div>

//           {/* Meta grid */}
//           <dl className="grid grid-cols-2 gap-4 p-4 bg-white border border-slate-200
//                          rounded-sm text-sm">
//             <div>
//               <dt className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-0.5">
//                 Date Found
//               </dt>
//               <dd className="text-navy-800 font-medium">
//                 {formatDate(item.date_found)}
//               </dd>
//             </div>
//             <div>
//               <dt className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-0.5">
//                 Location
//               </dt>
//               <dd className="text-navy-800 font-medium">{item.location}</dd>
//             </div>
//             <div className="col-span-2">
//               <dt className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-0.5">
//                 Submitted
//               </dt>
//               <dd className="text-navy-800 font-medium">
//                 {formatDate(item.created_at)}
//               </dd>
//             </div>
//           </dl>

//           {/* Description */}
//           <div>
//             <h2 className="text-sm font-semibold text-navy-800 mb-2">Description</h2>
//             <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
//           </div>

//           {/* Claim form or claimed notice */}
//           <div className="bg-white border border-slate-200 rounded-sm p-5">
//             {isClaimed ? (
//               <div className="text-center py-4">
//                 <StatusBadge status="claimed" className="mb-3" />
//                 <p className="text-slate-500 text-sm">
//                   This item has been claimed by its owner.
//                 </p>
//               </div>
//             ) : (
//               <>
//                 <h2 className="font-semibold text-navy-800 mb-1">Is this yours?</h2>
//                 <p className="text-xs text-slate-500 mb-5">
//                   Submit a claim below. A staff member will review it and
//                   contact you within 1-2 school days.
//                 </p>
//                 <ClaimFormWrapper itemId={item.id} itemTitle={item.title} />
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Client wrapper to handle claim success state without full page reload
// function ClaimFormWrapper({
//   itemId, itemTitle,
// }: {
//   itemId: string;
//   itemTitle: string;
// }) {
//   // This is a server component file, so we use a client boundary
//   // In practice, ClaimForm is already a client component
//   return (
//     <ClaimForm
//       itemId={itemId}
//       itemTitle={itemTitle}
//       onSuccess={() => {
//         // Handled inside ClaimForm with local state
//       }}
//     />
//   );
// }
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { formatDate } from '@/lib/utils';
import StatusBadge from '@/components/StatusBadge';
import ClaimForm from '@/components/ClaimForm';
import type { Item } from '@/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from('items')
    .select('title')
    .eq('id', id)
    .single();

  return {
    title: data?.title ?? 'Item Details',
  };
}

async function getItem(id: string): Promise<Item | null> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('items')
    .select('*')
    .eq('id', id)
    .eq('status', 'approved')
    .single();

  if (error || !data) return null;
  return data as Item;
}

export default async function ItemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getItem(id);

  if (!item) notFound();

  const isClaimed = item.status === 'claimed';

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 animate-fade-in">
      {/* Back link */}
      <a>

      </a>
      <a href="/items"
        className="inline-flex items-center gap-2 text-sm text-slate-500
        hover:text-navy-800 transition-colors mb-8">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M10 3L5 8l5 5" stroke="currentColor"
            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to Browse
      </a>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Image */}
        <div className="lg:col-span-3">
          <div className="rounded-sm overflow-hidden bg-slate-100 border
                          border-slate-200 aspect-[4/3] relative">
            {item.image_url ? (
              <Image
                src={item.image_url}
                alt={`Photo of ${item.title}`}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center
                              justify-center text-slate-400 gap-3">
                <svg width="48" height="48" viewBox="0 0 48 48"
                  fill="none" aria-hidden="true">
                  <rect x="4" y="10" width="40" height="28" rx="2"
                    stroke="#cbd5e1" strokeWidth="2" />
                  <circle cx="18" cy="22" r="5" stroke="#cbd5e1" strokeWidth="2" />
                  <path d="M4 32l10-9 9 8 7-6 14 9" stroke="#cbd5e1"
                    strokeWidth="2" strokeLinejoin="round" />
                </svg>
                <span className="text-sm">No photo available</span>
              </div>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-start justify-between gap-3 mb-2">
              <span className="inline-block px-2 py-0.5 bg-slate-100
                               text-slate-600 text-xs font-semibold rounded-sm">
                {item.category}
              </span>
              <StatusBadge status={item.status} />
            </div>
            <h1 className="font-display text-2xl text-navy-800 mt-2">
              {item.title}
            </h1>
          </div>

          {/* Meta */}
          <dl className="grid grid-cols-2 gap-4 p-4 bg-white border
                         border-slate-200 rounded-sm text-sm">
            <div>
              <dt className="text-slate-400 text-xs font-medium uppercase
                             tracking-wide mb-0.5">
                Date Found
              </dt>
              <dd className="text-navy-800 font-medium">
                {formatDate(item.date_found)}
              </dd>
            </div>
            <div>
              <dt className="text-slate-400 text-xs font-medium uppercase
                             tracking-wide mb-0.5">
                Location
              </dt>
              <dd className="text-navy-800 font-medium">{item.location}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-slate-400 text-xs font-medium uppercase
                             tracking-wide mb-0.5">
                Submitted
              </dt>
              <dd className="text-navy-800 font-medium">
                {formatDate(item.created_at)}
              </dd>
            </div>
          </dl>

          {/* Description */}
          <div>
            <h2 className="text-sm font-semibold text-navy-800 mb-2">
              Description
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Claim section */}
          <div className="bg-white border border-slate-200 rounded-sm p-5">
            {isClaimed ? (
              <div className="text-center py-4">
                <StatusBadge status="claimed" className="mb-3" />
                <p className="text-slate-500 text-sm">
                  This item has been claimed by its owner.
                </p>
              </div>
            ) : (
              <>
                <h2 className="font-semibold text-navy-800 mb-1">
                  Is this yours?
                </h2>
                <p className="text-xs text-slate-500 mb-5">
                  Submit a claim below. A staff member will review it and
                  contact you within 1-2 school days.
                </p>
                <ClaimForm
                  itemId={item.id}
                  itemTitle={item.title}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}