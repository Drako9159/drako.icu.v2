import styles from "./HomePageMain.module.css";
import languageLibrary from "../../languages/language";
import { useConfigsStore } from "../../store/configs";
import themeLibrary from "../../theme/theme";
import { Link } from "react-router-dom";
import pickCard1Night from "../../assets/home/images/moon.png";
import pickCard1Day from "../../assets/home/images/dino.png";
import arrowDown from "../../assets/home/images/arrowDown.png";

export default function HomePageMain() {
  const language = useConfigsStore((state) => state.configs.language);
  const theme = useConfigsStore((state) => state.configs.theme);
  const color = themeLibrary(theme);
  const strings = languageLibrary(language);

  return (
    <div className={styles.card1}>
      <div className={styles.card1Left}>
        <h2 style={color.textEnable} className={styles.animation1}>
          {strings.home.text}
        </h2>
        <Link
          className={`${styles.button1Card1} ${
            theme === "night"
              ? styles.button1Card1Night
              : styles.button1Card1Day
          }`}
          to="/blog"
          aria-label="My Blog"
        >
          {strings.home.button1}
        </Link>
        <Link
          className={`${styles.button2Card1} ${
            theme === "night"
              ? styles.button2Card1Night
              : styles.button2Card1Day
          }`}
          to="/about"
          aria-label="About me"
        >
          {strings.home.button2}
        </Link>

        <Link
          className={`${styles.button3Card1} ${
            theme === "night"
              ? styles.button3Card1Night
              : styles.button3Card1Day
          }`}
          to="/about"
          aria-label="About me"
        >
          <img
            alt="arrow-down"
            src={arrowDown}
            draggable={false}
            className={`${styles.arrowDown} ${
              theme === "night" ? styles.arrowDownNight : ""
            }`}
          ></img>
          {strings.home.button3}
        </Link>
      </div>

      <div className={styles.card1Right}>
        <img
          alt="front-image-home"
          className={styles.pickCard1}
          draggable={false}
          src={theme === "night" ? pickCard1Night : pickCard1Day}
        ></img>
      </div>
    </div>
  );
}
