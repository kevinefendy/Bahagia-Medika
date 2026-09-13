'use client';
import { useNotificationStore } from '@/lib/store/useNotificationStore';
import NotificationCard from '@/components/cards/NotificationCard';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';

export default function NotificationPage() {
  const { notifications, markAsRead, markAllAsRead } = useNotificationStore();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Notifikasi</h1>
        {notifications.some(n => !n.isRead) && (
          <Button variant="ghost" size="sm" onClick={markAllAsRead}>
            Tandai Semua Dibaca
          </Button>
        )}
      </div>
      {notifications.length === 0 ? (
        <EmptyState title="Belum ada notifikasi." />
      ) : (
        <div className="space-y-2">
          {notifications.map(n => (
            <NotificationCard key={n.id} notification={n} onRead={markAsRead} />
          ))}
        </div>
      )}
    </div>
  );
}
