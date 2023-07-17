export interface IPost {
  _id: string;
  title: string;
  category: string;
  tag: string;
  language: string;
  color: string;
  description: string;
  read_time: string;
  author: string;
  date: string;
  content: string;
  save(): string;
}
