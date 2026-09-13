import Navbar from './Navbar';
import Sidebar from './Sidebar';
import BottomNavigation from './BottomNavigation';

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-h-[calc(100vh-64px)] min-w-0">
          <div className="p-3 sm:p-5 md:p-6 pb-24 md:pb-6 min-w-0">
            {children}
          </div>
        </main>
      </div>
      <BottomNavigation />
    </div>
  );
}
