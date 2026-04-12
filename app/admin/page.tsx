import { createAdminSupabaseClient } from '@/lib/supabase/server';
import AdminItemRow from '@/components/admin/AdminItemRow';
import ClaimActions from '@/components/admin/ClaimActions';
import type { Item } from '@/types';

async function getDashboardData() {
  const supabase = await createAdminSupabaseClient();

  const { data: items } = await supabase
    .from('items')
    .select('*')
    .order('created_at', { ascending: false });

  const { data: claims } = await supabase
    .from('claims')
    .select('*, item:items(title)')
    .eq('status', 'pending')
    .order('created_at', { ascending: false });

  return {
    items: (items ?? []) as Item[],
    claims: (claims ?? []) as any[],
  };
}

export default async function AdminDashboard() {
  const { items, claims } = await getDashboardData();

  const stats = {
    total:    items.length,
    pending:  items.filter((i) => i.status === 'pending').length,
    approved: items.filter((i) => i.status === 'approved').length,
    claimed:  items.filter((i) => i.status === 'claimed').length,
    rejected: items.filter((i) => i.status === 'rejected').length,
  };

  const claimsForClient = claims.map((c) => ({
    id:             c.id,
    item_title:     c.item?.title ?? '—',
    claimant_name:  c.claimant_name,
    claimant_email: c.claimant_email,
    description:    c.description,
    status:         c.status,
    created_at:     c.created_at,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Stats */}
      <section aria-label="Summary statistics" className="mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { label: 'Total Items', value: stats.total,    color: 'text-navy-800' },
            { label: 'Pending',     value: stats.pending,  color: 'text-blue-600' },
            { label: 'Approved',    value: stats.approved, color: 'text-teal-600' },
            { label: 'Claimed',     value: stats.claimed,  color: 'text-violet-600' },
            { label: 'Rejected',    value: stats.rejected, color: 'text-red-600'  },
          ].map(({ label, value, color }) => (
            <div key={label}
                 className="bg-white border border-slate-200 rounded-sm p-4">
              <p className={`text-2xl font-bold font-display ${color}`}>{value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Items table */}
      <section aria-labelledby="items-table-heading" className="mb-12">
        <h2 id="items-table-heading"
            className="font-display text-xl text-navy-800 mb-4">
          All Submissions
        </h2>
        <div className="bg-white border border-slate-200 rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm" aria-label="Item submissions">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  {['Item', 'Category', 'Date Found', 'Status', 'Submitted By', 'Actions'].map((h) => (
                    <th key={h}
                        className="text-left px-4 py-3 text-xs font-semibold
                                   text-slate-500 uppercase tracking-wide"
                        scope="col">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((item) => (
                  <AdminItemRow key={item.id} item={item} />
                ))}
                {items.length === 0 && (
                  <tr>
                    <td colSpan={6}
                        className="px-4 py-10 text-center text-slate-400 text-sm">
                      No submissions yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Claims table */}
      <section aria-labelledby="claims-table-heading">
        <h2 id="claims-table-heading"
            className="font-display text-xl text-navy-800 mb-4">
          Pending Claim Requests
        </h2>
        <div className="bg-white border border-slate-200 rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm" aria-label="Claim requests">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  {['Item', 'Claimant', 'Email', 'Description', 'Status', 'Submitted', 'Actions'].map((h) => (
                    <th key={h}
                        className="text-left px-4 py-3 text-xs font-semibold
                                   text-slate-500 uppercase tracking-wide"
                        scope="col">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <ClaimActions initialClaims={claimsForClient} />
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}