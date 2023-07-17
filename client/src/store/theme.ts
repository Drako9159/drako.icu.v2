import { create } from "zustand";

interface ThemeStoreState {
  theme: string;

  setTheme: (theme: string) => void;
}

export const useThemeStore = create<ThemeStoreState>((set) => ({
  theme: "day",
  setTheme: (theme) => set((state) => ({ ...state, theme })),
}));
