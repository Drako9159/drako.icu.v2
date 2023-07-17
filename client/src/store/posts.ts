import { create } from "zustand";

export interface PostData {
  id: string;
  category: string;
  tag: string;
  filename: string;
  language: string;
  color: string;
  title: string;
  image: string;
  description: string;
  createdAt: string;
  readTime: string;
  author: string;
}



interface PostsStoreState {
  posts: PostData[];
  setPosts: (posts: PostData[]) => void;
}

export const usePostStore = create<PostsStoreState>((set) => ({
  posts: [],
  setPosts: (posts) => set((state) => ({ ...state, posts })),
}));
