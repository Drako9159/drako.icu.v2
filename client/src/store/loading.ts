import { create } from "zustand";

interface LoadingStoreState {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useLoadingStore = create<LoadingStoreState>((set) => ({
  isLoading: true,
  setIsLoading: (isLoading) => set((state) => ({ ...state, isLoading })),
}));
