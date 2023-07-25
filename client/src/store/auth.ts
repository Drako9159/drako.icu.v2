import { create } from "zustand";

interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
}

interface AuthStoreState {
  token: string;
  profile: Profile;
  isAuth: boolean;
  setAuth: (token: string, profile: Profile) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  token: "",
  profile: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    createdAt: "",
  },
  isAuth: false,
  //setToken: (token) => set((state) => ({ ...state, token, isAuth: true })),
  setAuth: (token, profile) =>
    set((state) => ({ ...state, token, profile, isAuth: true })),
  logout: () =>
    set((state) => ({
      ...state,
      token: "",
      isAuth: false,
      profile: { id: "", firstName: "", lastName: "", email: "", role: "", createdAt: "" },
    })),
}));
