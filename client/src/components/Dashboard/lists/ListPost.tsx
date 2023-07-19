import { useEffect, useState } from "react";
import { deleteOnePost, getOnePost, getPostsList } from "../../../api/post";
import styles from "./ListPost.module.css";
import UpdatePostForm from "../update/UpdatePostForm";
import ChargeAnimation from "../../Layouts/ChargeAnimation/ChargeAnimation";
export default function ListPost() {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({});
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isCharge, setIsCharge] = useState<boolean>(true);

  useEffect(() => {
    getPosts();
  }, []);
  async function getPosts() {
    const response = await getPostsList();
    if (response.status === 200) {
      setPosts(response.data.posts);
      setIsCharge(false)
    }
  }

  async function deletePost(id: string) {
    if (!confirm("Do you want delete this post?")) {
      return;
    }
    setIsCharge(true)
    const response = await deleteOnePost(id);
    if (response.status === 204) {
      getPosts();
      setIsCharge(false)
    }
  }

  async function handleUpdate(id: string) {
    setIsCharge(true)
    const response = await getOnePost(id);
    if (response.status === 200) {
      setPost(response.data.post);
      setIsUpdating(true);
      setIsCharge(false)
    }
  }

  return (
    <div className={styles.container}>
      <ChargeAnimation delay={isCharge}/>
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
      {isUpdating ? (
        <UpdatePostForm
          post={post}
          setIsUpdating={setIsUpdating}
          getPosts={getPosts}
          setIsCharge={setIsCharge}
        />
      ) : (
        ""
      )}
    </div>
  );
}
