'use client';

import { useState } from 'react';

interface Claim {
  id: string;
  item_title: string;
  claimant_name: string;
  claimant_email: string;
  description: string;
  status: string;
  created_at: string;
}

interface ClaimActionsProps {
  initialClaims: Claim[];
}

export default function ClaimActions({ initialClaims }: ClaimActionsProps) {
  const [claims, setClaims] = useState<Claim[]>(initialClaims);
  const [loading, setLoading] = useState<string | null>(null);

  const handleDecision = async (
    claimId: string,
    decision: 'approved' | 'denied',
    claimantName: string,
    itemTitle: string
  ) => {
    setLoading(claimId);
    try {
      const res = await fetch(`/api/admin/claims/${claimId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: decision }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed to update claim');

      if (decision === 'approved') {
        alert(`Claim approved. ${claimantName} can now collect "${itemTitle}" from the office.`);
      } else {
        alert(`Claim denied for ${claimantName} on "${itemTitle}".`);
      }

      // Remove this claim and all other claims for the same item
      // since approving one auto-denies the rest on the server
      if (decision === 'approved') {
        setClaims((prev) =>
          prev.filter((c) => c.item_title !== itemTitle)
        );
      } else {
        setClaims((prev) => prev.filter((c) => c.id !== claimId));
      }

    } catch (err) {
      alert('Something went wrong: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(null);
    }
  };

  if (claims.length === 0) {
    return (
      <tr>
        <td colSpan={7}
            className="px-4 py-10 text-center text-slate-400 text-sm">
          No pending claims
        </td>
      </tr>
    );
  }

  return (
    <>
      {claims.map((claim) => (
        <tr key={claim.id} className="hover:bg-slate-50 transition-colors">
          <td className="px-4 py-3 font-medium text-navy-800 whitespace-nowrap">
            {claim.item_title}
          </td>
          <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
            {claim.claimant_name}
          </td>
          <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
            {claim.claimant_email}
          </td>
          {/* Description column — shows ownership proof */}
          <td className="px-4 py-3 text-slate-600 text-xs max-w-xs">
            <p className="line-clamp-3 leading-relaxed">{claim.description}</p>
          </td>
          <td className="px-4 py-3">
            <span className="px-2 py-0.5 rounded-sm text-xs font-semibold
                             bg-blue-100 text-blue-800">
              Pending
            </span>
          </td>
          <td className="px-4 py-3 text-slate-400 text-xs whitespace-nowrap">
            {new Date(claim.created_at).toLocaleDateString()}
          </td>
          <td className="px-4 py-3">
            <div className="flex gap-2">
              <button
                onClick={() => handleDecision(
                  claim.id,
                  'approved',
                  claim.claimant_name,
                  claim.item_title
                )}
                disabled={loading === claim.id}
                className="px-2.5 py-1 bg-teal-50 text-teal-700 text-xs
                           font-semibold rounded-sm hover:bg-teal-100
                           border border-teal-200 transition-colors
                           disabled:opacity-50"
              >
                {loading === claim.id ? 'Saving...' : 'Approve'}
              </button>
              <button
                onClick={() => handleDecision(
                  claim.id,
                  'denied',
                  claim.claimant_name,
                  claim.item_title
                )}
                disabled={loading === claim.id}
                className="px-2.5 py-1 bg-red-50 text-red-700 text-xs
                           font-semibold rounded-sm hover:bg-red-100
                           border border-red-200 transition-colors
                           disabled:opacity-50"
              >
                Deny
              </button>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}