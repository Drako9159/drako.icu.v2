import { useConfigsStore } from "../../store/configs";
import themeLibrary from "../../theme/theme";
import { Link } from "react-router-dom";
import styles from "./PostHead.module.css";
import languageLibrary from "../../languages/language";

import pickArrow from "../../assets/icons/arrowDown.png";

export default function PostHead() {
  const language = useConfigsStore((state) => state.configs.language);
  const theme = useConfigsStore((state) => state.configs.theme);
  const color = themeLibrary(theme);
  const strings = languageLibrary(language);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Link className={styles.button} to="/blog" aria-label="My Blog">
          <div>
            <img
              style={
                theme === "night"
                  ? { filter: "contrast(1%)" }
                  : { filter: "none" }
              }
              src={pickArrow}
            ></img>
          </div>
          <p style={color.textEnable}>{strings.posts.text1}</p>
        </Link>
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
