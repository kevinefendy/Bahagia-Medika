import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthUser } from '@/types/user';
import { authService } from '@/lib/services/authService';

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { name: string; email: string; phoneNumber: string; password: string }) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const user = await authService.login(email, password);
          set({ user, isAuthenticated: true, isLoading: false });
        } catch {
          set({ isLoading: false, error: 'Email atau password salah.' });
        }
      },
      register: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const user = await authService.register(data);
          set({ user, isAuthenticated: true, isLoading: false });
        } catch {
          set({ isLoading: false, error: 'Gagal membuat akun. Silakan coba lagi.' });
        }
      },
      logout: () => {
        set({ user: null, isAuthenticated: false, error: null });
      },
      clearError: () => set({ error: null }),
    }),
    { name: 'bahagia-medika-auth' }
  )
);
