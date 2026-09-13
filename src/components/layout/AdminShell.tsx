'use client';
import { useState } from 'react';
import AdminTopbar from './AdminTopbar';
import AdminSidebar from './AdminSidebar';

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      <div className="flex">
        <AdminSidebar
          isMobileOpen={isMobileOpen}
          onCloseMobile={() => setIsMobileOpen(false)}
        />
        <div className="flex-1 flex flex-col min-w-0">
          <AdminTopbar onToggleMobile={() => setIsMobileOpen((prev) => !prev)} />
          <main className="flex-1 p-3 sm:p-5 md:p-6 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
