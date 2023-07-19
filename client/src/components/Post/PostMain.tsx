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
  if (isLoading) return <ChargeAnimation delay={true} />;
  if (status === 0) {
    return <ChargeAnimation delay={true} />;
  }
  if (status >= 400) {
    return <NotRequest status={status} />;
  }

  return (
    <div
      className={`${styles.container} ${
        theme === "night" ? styles.containerNight : styles.containerDay
      } ${handleThemePost(colorPost).container}`}
      dangerouslySetInnerHTML={{ __html: post.content }}
    ></div>
  );
}
