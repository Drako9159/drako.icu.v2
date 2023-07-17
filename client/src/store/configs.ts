import { create } from "zustand";

interface ConfigsStoreState {
  configs: {
    theme: string;
    language: string;
  };
  setConfigs: (configs: { theme: string; language: string }) => void;
  setTheme: (theme: { theme: string }) => void;
  setLanguage: (language: { language: string }) => void;
}

export const useConfigsStore = create<ConfigsStoreState>((set) => ({
  configs: {
    theme: "day",
    language: "en",
  },

  setConfigs: (configs) => set((state) => ({ ...state, configs: configs })),

  setTheme: (theme) =>
    set((state) => ({
      ...state,
      configs: {
        theme: theme.theme,
        language: state.configs.language,
      },
    })),

  setLanguage: (language) =>
    set((state) => ({
      ...state,
      configs: {
        theme: state.configs.theme,
        language: language.language,
      },
    })),
}));
