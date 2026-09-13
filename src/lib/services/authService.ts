import type { AuthUser, UserRole } from '@/types/user';

const simulateDelay = <T,>(data: T, ms = 800): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));

const MOCK_USERS = [
  { email: 'user@example.com', password: 'password123', role: 'patient' as UserRole, name: 'Kevin Santoso', phoneNumber: '08123456789', birthDate: '1996-05-14', address: 'Jl. Contoh No. 10, Jakarta' },
  { email: 'admin@example.com', password: 'admin123', role: 'admin' as UserRole, name: 'Admin Sari', phoneNumber: '081987654321' },
];

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export const authService = {
  async login(email: string, password: string): Promise<AuthUser> {
    await simulateDelay(null, 800);
    const found = MOCK_USERS.find((u) => u.email === email && u.password === password);
    if (!found) throw new Error('INVALID_CREDENTIALS');
    return {
      id: found.email === 'user@example.com' ? 'usr-patient-001' : (found.email === 'admin@example.com' ? 'usr-admin-001' : crypto.randomUUID()),
      role: found.role,
      name: found.name,
      email: found.email,
      phoneNumber: found.phoneNumber,
      birthDate: found.birthDate,
      address: found.address,
    };
  },

  async register(data: RegisterInput): Promise<AuthUser> {
    await simulateDelay(null, 800);
    return {
      id: crypto.randomUUID(),
      role: 'patient',
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
    };
  },
};
