import { create } from 'zustand';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

interface UIState {
  isSearchOpen: boolean;
  isChatWidgetOpen: boolean;
  activeModal: string | null;
  toasts: Toast[];
  setSearchOpen: (open: boolean) => void;
  setChatWidgetOpen: (open: boolean) => void;
  toggleChatWidget: () => void;
  openModal: (id: string) => void;
  closeModal: () => void;
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIState>()((set, get) => ({
  isSearchOpen: false,
  isChatWidgetOpen: false,
  activeModal: null,
  toasts: [],
  setSearchOpen: (open) => set({ isSearchOpen: open }),
  setChatWidgetOpen: (open) => set({ isChatWidgetOpen: open }),
  toggleChatWidget: () => set((state) => ({ isChatWidgetOpen: !state.isChatWidgetOpen })),
  openModal: (id) => set({ activeModal: id }),
  closeModal: () => set({ activeModal: null }),
  addToast: (toast) => {
    const id = Math.random().toString(36).substr(2, 9);
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }));
    setTimeout(() => {
      get().removeToast(id);
    }, 4000);
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
