import IPost from "../interface/IPost";
import PostModel from "../model/PostModel";

/*
export interface PostRepository {
  findByIdAndDelete: (id: string) => IPost;
}*/


export interface PostRepository {
  findByIdAndDelete: (id: string) => IPost | null; // Puedes devolver null si el post no se encuentra
}