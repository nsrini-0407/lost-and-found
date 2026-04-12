interface EmptyStateProps {
  title: string;
  message: string;
  action?: {
    label: string;
    href: string;
  };
}

export default function EmptyState({ title, message, action }: EmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center py-24 text-center px-4"
      role="status"
      aria-live="polite"
    >
      {/* Icon */}
      <div className="w-16 h-16 mb-6 rounded-sm bg-slate-100 flex items-center justify-center">
        <svg
          width="32" height="32" viewBox="0 0 32 32"
          fill="none" aria-hidden="true"
        >
          <rect x="4" y="8" width="24" height="18" rx="1"
                stroke="#94a3b8" strokeWidth="2" />
          <path d="M11 14h10M11 18h6" stroke="#94a3b8"
                strokeWidth="2" strokeLinecap="round" />
          <circle cx="22" cy="10" r="3" fill="#f59e0b" />
        </svg>
      </div>

      <h3 className="font-display text-xl text-navy-800 mb-2">{title}</h3>
      <p className="text-slate-500 max-w-sm leading-relaxed">{message}</p>

      {action && (
        <a
          href={action.href}
          className="mt-6 px-5 py-2.5 bg-amber text-navy font-semibold
                     text-sm rounded-sm hover:bg-amber/90 transition-colors"
        >
          {action.label}
        </a>
      )}
    </div>
  );
}