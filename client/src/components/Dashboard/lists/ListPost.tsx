import { useEffect, useState } from "react";
import { deleteOnePost, getOnePost, getPostsList } from "../../../api/post";
import styles from "./ListPost.module.css";
import UpdatePostForm from "../update/UpdatePostForm";
import ChargeAnimation from "../../Layouts/ChargeAnimation/ChargeAnimation";
import ListTools from "./ListTools";
import { useLoadingStore } from "../../../store/loading";
import { useToastStore } from "../../../store/toastNotify";
import axios from "axios";
export default function ListPost() {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({});
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const setNotify = useToastStore((state) => state.setNotify);
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);

  useEffect(() => {
    getPosts();
  }, []);
  async function getPosts() {
    try {
      setIsLoading(true);
      const response = await getPostsList(0);
      if (response.status === 200) {
        setPosts(response.data.posts);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  async function deletePost(id: string) {
    if (!confirm("Do you want delete this post?")) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await deleteOnePost(id);
      if (response.status === 204) {
        getPosts();
        setNotify({ color: "green", message: "Post updated" });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setNotify({ color: "red", message: error.response?.data.message });
      }
    }

    setIsLoading(false);
  }

  async function handleUpdate(id: string) {
    setIsLoading(true);

    const response = await getOnePost(id);
    if (response.status === 200) {
      setPost(response.data.post);
      setIsUpdating(true);
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
      <ListTools setPosts={setPosts} />

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
