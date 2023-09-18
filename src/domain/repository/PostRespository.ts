import IPost from "../interface/IPost";
import PostModel from "../model/PostModel";

export interface PostRepository {
  findByIdAndDelete: (id: string) => IPost;
}
