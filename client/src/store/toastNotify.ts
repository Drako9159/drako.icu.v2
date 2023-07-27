import { create } from "zustand";

interface Notify {
  color: string;
  message: string;
}

interface ToastStoreState {
  active: boolean;
  notify: Notify;
  setNotify: (notify: Notify) => void;
  deactivate: (active: boolean) => void;
}

export const useToastStore = create<ToastStoreState>((set) => ({
  active: false,
  notify: {
    color: "blue",
    message: "Welcome",
  },
  setNotify: (notify) => set((state) => ({ ...state, notify, active: true })),
  deactivate: (active) => set((state) => ({ ...state, active })),
}));
