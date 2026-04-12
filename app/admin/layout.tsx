export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="bg-navy-800 border-b border-navy-700 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <span className="text-amber text-xs font-semibold tracking-wider uppercase">
              Admin
            </span>
            <p className="text-white font-semibold text-sm">
              Lost and Found Dashboard
            </p>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}