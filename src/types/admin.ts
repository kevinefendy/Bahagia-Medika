export interface AdminStats {
  totalPatients: number;
  appointmentsToday: number;
  activeDoctors: number;
  pendingAppointments: number;
  appointmentsLast7Days: { date: string; count: number }[];
}
