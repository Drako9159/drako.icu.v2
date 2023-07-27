import styles from "./ListTools.module.css";
import { useRef, FormEvent } from "react";

export default function ListTools({
  page,
  setPage,
  active,
  setActive,
  searchPost,
}: {
  setPosts: any;
  page: number;
  setPage: (page: number) => void;
  active: boolean;
  setActive: (active: boolean) => void;
  searchPost: (title: string) => void;
}) {
  const searchRef = useRef<HTMLInputElement>(null);
  async function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const searchValue = searchRef.current?.value;
    searchPost(searchValue as string);
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

      <div className={styles.options}>
        <button
          style={{ cursor: "pointer" }}
          onClick={() => setActive(!active)}
        >
          {active ? "Active" : "Inactive"}
        </button>
      </div>
    </div>
  );
}
