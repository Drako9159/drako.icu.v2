import { useEffect, useState } from "react";
import { deleteOnePost, getPostsList } from "../../../api/post";
import styles from "./ListPost.module.css";
export default function ListPost() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);
  async function getUsers() {
    const response = await getPostsList();
    if (response.status === 200) {
      setPosts(response.data.posts);
    }
  }

  async function deletePost(id: string) {
    if(!confirm("Do you want delete this post?")) {
      return;
    }
    const response = await deleteOnePost(id);
    if (response.status === 204) {
      getUsers();
    }
  }

  return (
    <div className={styles.container}>
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
              <button>Update</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
