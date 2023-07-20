import { useConfigsStore } from "../../store/configs";
import ChargeAnimation from "../Layouts/ChargeAnimation/ChargeAnimation";
import NotRequest from "../Layouts/400BadRequest/400BadRequest";
import handleThemePost from "./colors/handleThemePost";
import styles from "./PostMain.module.css";
import { PostContent } from "../../pages/Post";

export default function PostMain({
  post,
  status,
  isLoading,
  colorPost,
}: {
  post: PostContent;
  status: number;
  isLoading: boolean;
  colorPost: string;
}) {
  const theme = useConfigsStore((state) => state.configs.theme);
  if (isLoading) return <ChargeAnimation delay={isLoading} />;

  if (status >= 400) {
    return <NotRequest status={status} />;
  }

  return (
    <div
      className={`${styles.containerPostMain} ${
        theme === "night"
          ? styles.containerPostMainNight
          : styles.containerPostMainDay
      } ${handleThemePost("green").containerPostMain}`}
      dangerouslySetInnerHTML={{ __html: post.content }}
    ></div>
  );
}
