import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppNotification } from '@/types/notification';

interface NotificationState {
  notifications: AppNotification[];
  addNotification: (notification: Omit<AppNotification, 'id' | 'isRead' | 'createdAt'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  unreadCount: () => number;
}

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-001',
    type: 'informasi',
    title: 'Hasil Laboratorium Siap',
    message: 'Hasil pemeriksaan Hematologi Lengkap dan Profil Lipid Anda dari Dr. Dewi Anggraini, Sp.JP telah diterbitkan dan dapat diunduh.',
    isRead: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'notif-002',
    type: 'appointment',
    title: 'Konfirmasi Appointment Poli Jantung',
    message: 'Janji temu Anda dengan Dr. Dewi Anggraini, Sp.JP telah dikonfirmasi untuk besok pukul 10:00 WIB di Ruang 204 Lt. 2.',
    isRead: false,
    relatedAppointmentId: 'APT-2026-9901',
    createdAt: new Date(Date.now() - 43200000).toISOString(),
  },
  {
    id: 'notif-003',
    type: 'reminder',
    title: 'Status Resep Farmasi: Siap Diambil',
    message: 'Resep obat Cefixime 200mg telah selesai diracik oleh apoteker dan siap diambil di Loket Farmasi B (Lantai 1).',
    isRead: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: INITIAL_NOTIFICATIONS,
      addNotification: (notification) => {
        const newNotification: AppNotification = {
          ...notification,
          id: Math.random().toString(36).substr(2, 9),
          isRead: false,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          notifications: [newNotification, ...state.notifications],
        }));
      },
      markAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, isRead: true } : n
          ),
        })),
      markAllAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
        })),
      unreadCount: () => get().notifications.filter((n) => !n.isRead).length,
    }),
    { name: 'bahagia-medika-notifications' }
  )
);
