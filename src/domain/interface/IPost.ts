export interface IPost {
  _id: string;
  title: string;
  slug: string;
  category: string;
  tag: string;
  language: string;
  color: string;
  image: string;
  description: string;
  read_time: string;
  author: string;
  date: string;
  content: string;
  is_public: boolean;
  createdAt: Date;
  updatedAt: Date;
  save(): string;
}


