import { create } from "zustand";

interface Notify {
  color: string;
  message: string;
}

interface ToastStoreState {
  notify: Notify;
  setNotify: (notify: Notify) => void;
}

export const useToastStore = create<ToastStoreState>((set) => ({
  notify: {
    color: "blue",
    message: "Welcome",
  },
  setNotify: (notify) => set((state) => ({ ...state, notify })),
}));
