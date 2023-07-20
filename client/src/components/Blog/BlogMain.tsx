import styles from "./BlogMain.module.css";
import { Link } from "react-router-dom";
import NotRequest from "../Layouts/400BadRequest/400BadRequest";
import ChargeAnimation from "../Layouts/ChargeAnimation/ChargeAnimation";
import themeLibrary from "../../theme/theme";
import { usePostStore } from "../../store/posts";
import { useState, useEffect } from "react";
import { useConfigsStore } from "../../store/configs";
import ChargeAnimationStatic from "../Layouts/ChargeAnimation/ChargeAnimationStatic";

export default function BlogMain({
  status,
  isLoading,
}: {
  status: number;
  isLoading: boolean;
}) {
  const [loaded, setLoaded] = useState(false);

  // useEffect(() => {
  //   setIsImageLoaded(true);
  // }, [isImageLoaded]);

  const theme = useConfigsStore((state) => state.configs.theme);
  const color = themeLibrary(theme);
  const posts2 = usePostStore((state) => state.posts);

  if (isLoading) return <ChargeAnimation delay={false} />;

  if (status === 0) {
    return <ChargeAnimation delay={false} />;
  }

  if (status >= 400) {
    return <NotRequest status={status} />;
  }

  return (
    <div className={styles.containerBlogMain}>
      {posts2.map((e: any) => {
        return (
          <Link
            key={e.id}
            className={styles.Link}
            to={`/blog/${e.id}`}
            aria-label={e.title}
          >
            <div className={styles.card}>
              <div className={styles.head}>
                {/* <img
                  src={e.image}
                  alt={e.title}
                  className={styles.pick}
                  style={{ outlineColor: `${e.color}` }}
                ></img> */}

                {loaded ? null : (
                  
                  <div className={styles.loadingPick}><ChargeAnimationStatic /></div>
                  
                )}

                <img
                  style={loaded ? {} : { display: "none", outlineColor: `${e.color}` }}
                  alt={e.title}
                  className={styles.pick}
                  src={e.image}
                  onLoad={() => setLoaded(true)}
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
