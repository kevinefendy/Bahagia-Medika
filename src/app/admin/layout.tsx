import AdminShell from '@/components/layout/AdminShell';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute role="admin">
      <AdminShell>{children}</AdminShell>
    </ProtectedRoute>
  );
}
