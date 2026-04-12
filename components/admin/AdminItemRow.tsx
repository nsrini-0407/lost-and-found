'use client';

import { useState } from 'react';
import StatusBadge from '@/components/StatusBadge';
import { formatDate } from '@/lib/utils';
import type { Item, ItemStatus } from '@/types';

interface AdminItemRowProps {
  item: Item;
}

export default function AdminItemRow({ item }: AdminItemRowProps) {
  const [status, setStatus] = useState<ItemStatus>(item.status);
  const [loading, setLoading] = useState(false);

  const updateStatus = async (newStatus: ItemStatus, reason?: string) => {
    setLoading(true);
    try {
      // Uses the new admin API route — auth checked via cookie server-side
      const res = await fetch(`/api/admin/items/${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          rejection_reason: reason,
        }),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error ?? 'Update failed');
      }

      setStatus(newStatus);
    } catch (err) {
      alert('Failed to update item status: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleReject = () => {
    const reason = prompt('Optional: Enter rejection reason (sent to submitter)');
    updateStatus('rejected', reason ?? undefined);
  };

  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-4 py-3">
        <div className="font-medium text-navy-800 leading-tight">{item.title}</div>
        <div className="text-slate-400 text-xs mt-0.5 truncate max-w-[200px]">
          {item.description}
        </div>
      </td>
      <td className="px-4 py-3 text-slate-600">{item.category}</td>
      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
        {formatDate(item.date_found)}
      </td>
      <td className="px-4 py-3">
        <StatusBadge status={status} />
      </td>
      <td className="px-4 py-3">
        <div className="text-slate-600">{item.submitter_name}</div>
        <div className="text-slate-400 text-xs">{item.submitter_email}</div>
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-1.5" role="group" aria-label={`Actions for ${item.title}`}>
          {status === 'pending' && (
            <>
              <button
                onClick={() => updateStatus('approved')}
                disabled={loading}
                className="px-2.5 py-1 bg-teal-50 text-teal-700 text-xs font-semibold
                           rounded-sm hover:bg-teal-100 border border-teal-200
                           transition-colors disabled:opacity-50"
                aria-label={`Approve ${item.title}`}
              >
                {loading ? 'Saving...' : 'Approve'}
              </button>
              <button
                onClick={handleReject}
                disabled={loading}
                className="px-2.5 py-1 bg-red-50 text-red-700 text-xs font-semibold
                           rounded-sm hover:bg-red-100 border border-red-200
                           transition-colors disabled:opacity-50"
                aria-label={`Reject ${item.title}`}
              >
                Reject
              </button>
            </>
          )}
          {status === 'approved' && (
            <button
              onClick={() => updateStatus('claimed')}
              disabled={loading}
              className="px-2.5 py-1 bg-violet-50 text-violet-700 text-xs font-semibold
                         rounded-sm hover:bg-violet-100 border border-violet-200
                         transition-colors disabled:opacity-50"
              aria-label={`Mark ${item.title} as claimed`}
            >
              Mark Claimed
            </button>
          )}
          {(status === 'claimed' || status === 'rejected') && (
            <span className="text-xs text-slate-400 italic">No actions</span>
          )}
        </div>
      </td>
    </tr>
  );
}