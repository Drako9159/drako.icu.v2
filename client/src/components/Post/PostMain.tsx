import { useConfigsStore } from "../../store/configs";
import handleThemePost from "./colors/handleThemePost";
import styles from "./PostMain.module.css";
import { PostContent } from "../../pages/Post";

export default function PostMain({ post }: { post: PostContent }) {
  const theme = useConfigsStore((state) => state.configs.theme);

  return (
    <div
      className={`${styles.containerPostMain} ${
        theme === "night"
          ? styles.containerPostMainNight
          : styles.containerPostMainDay
      } ${handleThemePost(post.color).containerPostMain}  `}
      dangerouslySetInnerHTML={{ __html: post.content }}
    ></div>
  );
}
