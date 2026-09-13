export type UserRole = 'patient' | 'admin';

export interface AuthUser {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  phoneNumber?: string;
  birthDate?: string;
  address?: string;
  avatarUrl?: string;
}
