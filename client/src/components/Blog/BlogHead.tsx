import { useConfigsStore } from "../../store/configs";
import styles from "./BlogHead.module.css";
import themeLibrary from "../../theme/theme";
import languageLibrary from "../../languages/language";

export default function BlogHead() {
  const language = useConfigsStore((state) => state.configs.language);
  const theme = useConfigsStore((state) => state.configs.theme);
  const color = themeLibrary(theme);
  const strings = languageLibrary(language);

  return (
    <div className={styles.containerBlogHead}>
      <div className={styles.left}>
        <h1 style={color.textEnable} className={styles.animation1}>
          {strings.blog.text1} <br></br>
        </h1>
        <h1 style={color.textDisable} className={styles.animation2}>
          {strings.blog.text2}
        </h1>
      </div>
      <div className={styles.right}>
        <div className={styles.logotype}>
          <h2 style={color.textEnable} className={styles.logoHead}>
            antonio
          </h2>
          <div style={color.textEnable} className={styles.logosSub}>
            <h2>a</h2>
            <h2>a</h2>
            <h2>a</h2>
            <h2>a</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
