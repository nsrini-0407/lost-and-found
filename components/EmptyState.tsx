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
      className="flex flex-col items-center justify-center py-20 text-center px-4"
      role="status"
      aria-live="polite"  
    >
      {/* Stacked cards illustration */}
      <div className="relative w-24 h-24 mb-8" aria-hidden="true">
        {/* Back cards */}
        <div className="absolute inset-3 bg-slate-100 border border-slate-200
                        rounded-sm rotate-6" />
        <div className="absolute inset-3 bg-slate-50 border border-slate-200
                        rounded-sm -rotate-3" />
        {/* Front card with magnifying glass */}
        <div className="absolute inset-3 bg-white border border-slate-200
                        rounded-sm flex items-center justify-center shadow-card">
          <svg width="36" height="36" viewBox="0 0 36 36"
               fill="none" aria-hidden="true">
            {/* Photo placeholder lines */}
            <rect x="4" y="4" width="28" height="20" rx="2"
                  stroke="#e2e8f0" strokeWidth="1.5"/>
            <path d="M4 18l7-5 5 4 4-3 8 6"
                  stroke="#e2e8f0" strokeWidth="1.5" strokeLinejoin="round"/>
            <circle cx="10" cy="11" r="2.5" stroke="#e2e8f0" strokeWidth="1.5"/>
            {/* Magnifying glass overlaid */}
            <circle cx="23" cy="25" r="7" fill="white" stroke="#E8A23C"
                    strokeWidth="1.5"/>
            <circle cx="23" cy="25" r="4" stroke="#E8A23C"
                    strokeWidth="1.3" strokeDasharray="2.5 1.5"/>
            <path d="M28.5 30.5l4 4" stroke="#E8A23C"
                  strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      <h3 className="font-display text-xl text-navy-800 mb-2">{title}</h3>
      <p className="text-slate-500 max-w-sm leading-relaxed text-sm">{message}</p>

      {action && (
        <a
          href={action.href}
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5
                     bg-amber text-navy font-semibold text-sm rounded-sm
                     hover:bg-amber/90 transition-colors"
        >
          {action.label}
          <svg width="14" height="14" viewBox="0 0 14 14"
               fill="none" aria-hidden="true">
            <path d="M4 7h6M7 4l3 3-3 3" stroke="currentColor"
                  strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      )}
    </div>
  );
}