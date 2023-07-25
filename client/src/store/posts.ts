import { create } from "zustand";

export interface PostData {
  id: string;
  category: string;
  tag: string;
  language: string;
  color: string;
  title: string;
  image: string;
  description: string;
  read_time: string;
  author: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

interface PostsStoreState {
  status: number;
  isLoading: boolean;
  posts: PostData[];
  setPosts: (posts: PostData[]) => void;
  setStatus: (status: number) => void;
}

export const usePostStore = create<PostsStoreState>((set) => ({
  status: 200,
  isLoading: true,
  posts: [],
  setPosts: (posts) => set((state) => ({ ...state, posts, isLoading: false })),
  setStatus: (status) => set((state) => ({ ...state, status, isLoading: false})),
}));
