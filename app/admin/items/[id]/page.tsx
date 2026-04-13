import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { createAdminSupabaseClient } from '@/lib/supabase/server';
import { formatDate } from '@/lib/utils';
import StatusBadge from '@/components/StatusBadge';
import AdminItemEditor from '@/components/admin/AdminItemEditor';
import type { Item } from '@/types';

async function getItem(id: string): Promise<Item | null> {
    const supabase = await createAdminSupabaseClient();
    const { data, error } = await supabase
        .from('items')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !data) return null;
    return data as Item;
}

export default async function AdminItemDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const item = await getItem(id);

    if (!item) notFound();

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            {/* Back link */}
            <Link
                href="/admin"
                className="inline-flex items-center gap-2 text-sm text-slate-500
                   hover:text-navy-800 transition-colors mb-8"
            >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M10 3L5 8l5 5" stroke="currentColor"
                        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back to Dashboard
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Image */}
                <div>
                    <div className="rounded-sm overflow-hidden bg-slate-100 border
                          border-slate-200 aspect-[4/3] relative">
                        {item.image_url ? (
                            <Image
                                src={item.image_url}
                                alt={`Photo of ${item.title}`}
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
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
                                <span className="text-sm text-slate-400">No photo submitted</span>
                            </div>
                        )}
                    </div>
                    {item.image_url && (
                        <p className="mt-2 text-xs text-slate-400 truncate">
                            {item.image_url}
                        </p>
                    )}
                </div>

                {/* Details */}
                <div className="space-y-6">

                    {/* Header */}
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-600
                               text-xs font-semibold rounded-sm">
                                {item.category}
                            </span>
                            <StatusBadge status={item.status} />
                        </div>
                        <h1 className="font-display text-2xl text-navy-800">
                            {item.title}
                        </h1>
                    </div>

                    {/* Meta grid */}
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
                                Location Found
                            </dt>
                            <dd className="text-navy-800 font-medium">{item.location}</dd>
                        </div>
                        <div>
                            <dt className="text-slate-400 text-xs font-medium uppercase
                             tracking-wide mb-0.5">
                                Submitted
                            </dt>
                            <dd className="text-navy-800 font-medium">
                                {formatDate(item.created_at)}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-slate-400 text-xs font-medium uppercase
                             tracking-wide mb-0.5">
                                Last Updated
                            </dt>
                            <dd className="text-navy-800 font-medium">
                                {formatDate(item.updated_at)}
                            </dd>
                        </div>
                    </dl>

                    {/* Editable description */}
                    <AdminItemEditor
                        itemId={item.id}
                        initialDescription={item.description}
                    />

                    {/* Submitter info */}
                    <div className="bg-white border border-slate-200 rounded-sm p-4">
                        <h2 className="text-xs font-semibold text-slate-500 uppercase
                           tracking-wide mb-3">
                            Submitted By
                        </h2>
                        <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-400 w-12">Name</span>
                                <span className="text-sm text-navy-800 font-medium">
                                    {item.submitter_name}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-400 w-12">Email</span>
                                <a
                                    href={`mailto:${item.submitter_email}`}
                                    className="text-sm text-amber hover:underline underline-offset-2"
                                >
                                    {item.submitter_email}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Item ID */}
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-sm">
                        <p className="text-xs text-slate-400">
                            Item ID:{' '}
                            <span className="font-mono text-slate-500">{item.id}</span>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}