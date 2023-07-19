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
  posts: PostData[];
  setPosts: (posts: PostData[]) => void;
}

export const usePostStore = create<PostsStoreState>((set) => ({
  posts: [],
  setPosts: (posts) => set((state) => ({ ...state, posts })),
}));
