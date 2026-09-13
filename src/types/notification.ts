export type NotificationType = 'appointment' | 'reminder' | 'chat' | 'informasi';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  relatedAppointmentId?: string;
  createdAt: string;
}
