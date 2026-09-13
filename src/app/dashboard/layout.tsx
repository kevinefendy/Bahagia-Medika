import DashboardShell from '@/components/layout/DashboardShell';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute role="patient">
      <DashboardShell>{children}</DashboardShell>
    </ProtectedRoute>
  );
}
