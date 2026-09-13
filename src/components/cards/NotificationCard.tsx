import { Calendar, Bell, MessageCircle, Info } from 'lucide-react';
import type { AppNotification } from '@/types/notification';
import { timeAgo } from '@/lib/utils/format';

const iconMap = {
  appointment: Calendar,
  reminder: Bell,
  chat: MessageCircle,
  informasi: Info,
};

interface NotificationCardProps {
  notification: AppNotification;
  onRead: (id: string) => void;
  onClick?: () => void;
}

export default function NotificationCard({ notification, onRead, onClick }: NotificationCardProps) {
  const Icon = iconMap[notification.type];

  return (
    <button
      onClick={() => {
        onRead(notification.id);
        onClick?.();
      }}
      className={`w-full text-left flex items-start gap-3 p-4 rounded-xl transition-colors ${
        notification.isRead ? 'bg-white' : 'bg-[var(--color-primary-light)]/30'
      }`}
    >
      <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
        notification.isRead ? 'bg-[var(--color-surface)]' : 'bg-[var(--color-primary-light)]'
      }`}>
        <Icon className={`h-5 w-5 ${notification.isRead ? 'text-[var(--color-text-secondary)]' : 'text-[var(--color-primary)]'}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium text-[var(--color-text-primary)]">{notification.title}</p>
          {!notification.isRead && (
            <span className="h-2 w-2 rounded-full bg-[var(--color-primary)] shrink-0 mt-1.5" />
          )}
        </div>
        <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2">{notification.message}</p>
        <p className="text-xs text-[var(--color-text-secondary)] mt-1">{timeAgo(notification.createdAt)}</p>
      </div>
    </button>
  );
}
