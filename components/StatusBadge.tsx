import { cn } from '@/lib/utils';
import type { ItemStatus, ClaimStatus } from '@/types';

type Status = ItemStatus | ClaimStatus;

const BADGE_STYLES: Record<Status, { bg: string; text: string; label: string }> = {
  pending:  { bg: 'bg-blue-100',   text: 'text-blue-800',   label: 'Pending'  },
  approved: { bg: 'bg-teal-100',   text: 'text-teal-800',   label: 'Approved' },
  claimed:  { bg: 'bg-violet-100', text: 'text-violet-800', label: 'Claimed'  },
  rejected: { bg: 'bg-red-100',    text: 'text-red-800',    label: 'Rejected' },
  denied:   { bg: 'bg-red-100',    text: 'text-red-800',    label: 'Denied'   },
};

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const style = BADGE_STYLES[status] ?? BADGE_STYLES.pending;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5',
        'text-xs font-semibold tracking-wide rounded-sm',
        style.bg, style.text, className
      )}
      aria-label={`Status: ${style.label}`}
    >
      {/* Dot indicator */}
      <span
        className={cn('w-1.5 h-1.5 rounded-full', {
          'bg-blue-500':   status === 'pending',
          'bg-teal-500':   status === 'approved',
          'bg-violet-500': status === 'claimed',
          'bg-red-500':    status === 'rejected' || status === 'denied',
        })}
        aria-hidden="true"
      />
      {style.label}
    </span>
  );
}