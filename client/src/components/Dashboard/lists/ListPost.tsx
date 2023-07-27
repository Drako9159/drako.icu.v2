import { useEffect, useState } from "react";
import {
  deleteOnePost,
  getOnePost,
  getPostsList,
  searchOnePost,
} from "../../../api/post";
import styles from "./ListPost.module.css";
import UpdatePostForm from "../update/UpdatePostForm";
import ChargeAnimation from "../../Layouts/ChargeAnimation/ChargeAnimation";
import ListTools from "./ListTools";
import { useLoadingStore } from "../../../store/loading";
import { useToastStore } from "../../../store/toastNotify";
import axios from "axios";
export default function ListPost() {
  const [posts, setPosts] = useState<object[]>([]);
  const [post, setPost] = useState<object>({});
  const [page, setPage] = useState<number>(0);
  const [active, setActive] = useState<boolean>(false);

  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const setNotify = useToastStore((state) => state.setNotify);
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);

  useEffect(() => {
    getPosts();
  }, [page, active]);

  // GET POSTS
  async function getPosts() {
    setIsLoading(true);
    try {
      const response = await getPostsList(page, active);
      setPosts(response.data.posts);
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        setNotify({ color: "red", message: error.response?.data.message });
      }
    }
    setIsLoading(false);
  }

  // DELETE POST
  async function deletePost(id: string) {
    if (!confirm("Do you want delete this post?")) {
      return;
    }
    setIsLoading(true);
    try {
      await deleteOnePost(id);
      getPosts();
      setNotify({ color: "green", message: "Post updated" });
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        setNotify({ color: "red", message: error.response?.data.message });
      }
    }
    setIsLoading(false);
  }

  // SEARCH POST
  async function searchPost(title: string) {
    if (title === "") return getPosts();
    setIsLoading(true);
    try {
      const response = await searchOnePost(title);
      setPosts(response.data.results);
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        setNotify({ color: "red", message: error.response?.data.message });
      }
    }
    setIsLoading(false);
  }

  async function handleUpdate(id: string) {
    setIsLoading(true);
    try {
      const response = await getOnePost(id);
      setPost(response.data.post);
      setIsUpdating(true);
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        setNotify({ color: "red", message: error.response?.data.message });
      }
    }
    setIsLoading(false);
  }

  return (
    <div className={styles.containerListPost}>
      <ChargeAnimation />
      <div>
        {posts.map((e: any) => {
          return (
            <div key={e.id} className={styles.element}>
              <div>
                <p>Id: {e.id}</p>
                <p>Title: {e.title}</p>
                <p>Tag: {e.tag}</p>
                <p>Category: {e.category}</p>
                <p>Author: {e.author}</p>
                <p>Description: {e.description}</p>
                <p>Language: {e.language}</p>
                <p>Date: {e.date}</p>
                <p>Public: {e.is_public ? "active" : "inactive"}</p>
                <p>Color: {e.color}</p>
                <p>ReadTime: {e.read_time}</p>
              </div>
              <div className={styles.actions}>
                <button onClick={() => deletePost(e.id)}>Delete</button>
                <button onClick={() => handleUpdate(e.id)}>Update</button>
              </div>
            </div>
          );
        })}
      </div>

      <ListTools
        setPosts={setPosts}
        page={page}
        setPage={setPage}
        active={active}
        setActive={setActive}
        searchPost={searchPost}
      />

      {isUpdating ? (
        <UpdatePostForm
          post={post}
          setIsUpdating={setIsUpdating}
          getPosts={getPosts}
        />
      ) : (
        ""
      )}
    </div>
  );
}
