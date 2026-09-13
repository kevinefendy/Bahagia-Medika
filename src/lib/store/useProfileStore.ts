import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProfileData {
  fullName: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  address: string;
  avatarUrl: string;
}

interface ProfileState {
  profile: ProfileData | null;
  setProfile: (data: ProfileData) => void;
  updateProfile: (data: Partial<ProfileData>) => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (data) => set({ profile: data }),
      updateProfile: (data) =>
        set((state) => ({
          profile: state.profile
            ? { ...state.profile, ...data }
            : data as ProfileData,
        })),
    }),
    { name: 'bahagia-medika-profile' }
  )
);
