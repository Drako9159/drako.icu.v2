export interface IPost {
  _id: string;
  title: string;
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
  createdAt: Date;
  updatedAt: Date;
  save(): string;
}


