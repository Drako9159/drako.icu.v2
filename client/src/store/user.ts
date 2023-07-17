import { create } from "zustand";

interface UserStoreState {
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  type: string;
  setUser: (user: object) => void;
}

export const useUserStore = create<UserStoreState>((set) => ({
  firstName: "",
  lastName: "",
  email: "",
  createdAt: "",
  updatedAt: "",
  type: "",
  setUser: (user) => set((state) => ({ ...state, user })),
}));
