export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 selection:bg-[var(--color-primary)] selection:text-white">
      {children}
    </div>
  );
}
