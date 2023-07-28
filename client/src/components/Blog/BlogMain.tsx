import styles from "./BlogMain.module.css";
import { Link } from "react-router-dom";
import themeLibrary from "../../theme/theme";
import { usePostStore } from "../../store/posts";
import { useState } from "react";
import { useConfigsStore } from "../../store/configs";
import ChargeAnimationStatic from "../Layouts/ChargeAnimation/ChargeAnimationStatic";

export default function BlogMain() {
  const [loaded, setLoaded] = useState(false);
  const theme = useConfigsStore((state) => state.configs.theme);
  const color = themeLibrary(theme);
  const posts = usePostStore((state) => state.posts);

  return (
    <div className={styles.containerBlogMain}>
      {posts.map((e: any) => {
        return (
          <Link
            key={e.id}
            className={styles.Link}
            to={`/blog/${e.slug}`}
            aria-label={e.title}
          >
            <div className={styles.card}>
              <div className={styles.head}>
                {loaded ? null : (
                  <div className={styles.loadingPick}>
                    <ChargeAnimationStatic />
                  </div>
                )}

                <img
                  style={
                    loaded
                      ? { outlineColor: `${e.color}` }
                      : { display: "none" }
                  }
                  alt={e.title}
                  className={styles.pick}
                  src={e.image}
                  onLoad={() => setLoaded(true)}
                  draggable={false}
                />
              </div>
              <div className={styles.body}>
                <p style={color.textDisable}>
                  {e.date} - {e.read_time}
                </p>
              </div>
              <div style={color.textEnable} className={`${styles.footer}`}>
                <h2>{e.title}</h2>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
