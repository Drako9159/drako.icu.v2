import { PostRepository } from "domain/repository/PostRespository";
import IPost from "../interface/IPost";
import PostModel from "../model/PostModel";

function deletePost(id: string): PostRepository {
  const findByIdAndDelete = PostModel.findOneAndDelete({ _id: id });
  return findByIdAndDelete;
}
function findByIdAndDelete(id: string): PostRepository {
  const findByIdAndDelete = PostModel.findByIdAndDelete({ _id: id });
  return findByIdAndDelete;
}
