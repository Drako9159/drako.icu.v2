import { searchOnePost } from "../../../api/post";
import styles from "./ListTools.module.css";
import { useState, useRef, useEffect } from "react";
import { ChangeEvent } from "react";
import { getPostsList } from "../../../api/post";

export default function ListTools({ setPosts }: { setPosts: any }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function getPosts() {
      const response = await getPostsList(page);
      if (response.status === 200) {
        setPosts(response.data.posts);
      }
    }
    getPosts();
  }, [page]);


  //e: ChangeEvent<HTMLInputElement>

//   useEffect(() => {
//     async function searchPost() {
//       const response = await searchOnePost(search);
//       if (response.status === 200) {
//         setPosts(response.data.posts);
//       }
//     }
//     searchPost();
//   }, [search]);

  return (
    <div className={styles.containerListTools}>
      <div className={styles.search}>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="search title"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className={styles.pagination}>
        <p>page: {page}</p>
        <button onClick={() => setPage(page === 0 ? page : page - 1)}>
          back
        </button>
        <button onClick={() => setPage(page + 1)}>next</button>
      </div>
    </div>
  );
}
