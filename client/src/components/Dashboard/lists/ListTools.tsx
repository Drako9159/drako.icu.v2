import { searchOnePost } from "../../../api/post";
import styles from "./ListTools.module.css";
import { useState, useRef, useEffect, FormEvent } from "react";
import { getPostsList } from "../../../api/post";
import { useLoadingStore } from "../../../store/loading";

export default function ListTools({ setPosts }: { setPosts: any }) {
  const [page, setPage] = useState(0);

  const setIsLoading = useLoadingStore((state) => state.setIsLoading);

  useEffect(() => {
    
    getPosts();
  }, [page]);

  async function getPosts() {
    try {
      setIsLoading(true);
      const response = await getPostsList(page);
      if (response.status === 200) {
        setPosts(response.data.posts);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const searchRef = useRef<HTMLInputElement>(null);

  async function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const searchValue = searchRef.current?.value;
    if (searchValue === "") return getPosts();
    const response = await searchOnePost(searchValue as string);
    setPosts(response.data.results);
    setIsLoading(false);
  }

  return (
    <div className={styles.containerListTools}>
      <div className={styles.search}>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="search title"
            ref={searchRef}
          />
          <button type="submit">search</button>
        </form>
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
