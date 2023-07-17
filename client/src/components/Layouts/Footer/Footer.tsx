import { useNavigate } from "react-router-dom";
import languageLibrary from "../../../languages/language";
import { useConfigsStore } from "../../../store/configs";
import themeLibrary from "../../../theme/theme";
import styles from "./Footer.module.css";
import pickGithub from "../../../assets/icons/footer/github.svg";
import pickTwitter from "../../../assets/icons/footer/twitter.svg";
import pickCountry from "../../../assets/icons/footer/language.png";
import pickLinkedin from "../../../assets/icons/footer/linkedin.svg";

export default function Footer() {
  const language = useConfigsStore((state) => state.configs.language);
  const strings = languageLibrary(language);

  const navigate = useNavigate();
  const theme = useConfigsStore((state) => state.configs.theme);
  const color = themeLibrary(theme);

  function handleLanguage(value: string) {
    useConfigsStore.getState().setLanguage({ language: value });
    localStorage.setItem(
      "configs",
      JSON.stringify(useConfigsStore.getState().configs)
    );
    navigate("/");
  }

  return (
    <>
      <span className={styles.spanDown}></span>
      <div className={`${styles.container}`}>
        <div className={styles.socialMedia}>
          <div className={styles.left}>
            <h2 style={color.textEnable}>{strings.footer.name}</h2>
            <h2 style={color.textDisable}>{strings.footer.legend}</h2>
            <div
              className={`${styles.icons} ${
                theme === "night" ? styles.iconsNight : ""
              }`}
            >
              <a
                target={"_blank"}
                href="https://github.com/Drako9159"
                aria-label="Github"
              >
                <img alt="github" src={pickGithub} draggable={false}></img>
              </a>

              <a
                target={"_blank"}
                href="https://www.linkedin.com/in/antonio-jaramillo-099a77250"
                aria-label="Linkedin"
              >
                <img alt="linkedIn" src={pickLinkedin} draggable={false}></img>
              </a>

              <a
                target={"_blank"}
                href="https://twitter.com/Drako9159"
                aria-label="Twitter"
              >
                <img alt="twitter" src={pickTwitter} draggable={false}></img>
              </a>
            </div>
          </div>
          <div className={styles.right}></div>
        </div>

        <div className={styles.info}>
          <p style={color.textDisable} className={styles.laster}>
            {strings.footer.rights}
          </p>
          <div className={styles.country}>
            <select
              onChange={(e) => handleLanguage(e.target.value)}
              value={language}
              className={`${styles.selector}`}
              style={color.layout}
            >
              <option style={color.textDisable} value={"es"}>
                Spanish
              </option>
              <option style={color.textDisable} value={"en"}>
                English
              </option>
            </select>
            <img
              src={pickCountry}
              alt="world-language"
              draggable={false}
              className={`${theme === "night" ? styles.pickCountryNight : ""}`}
            ></img>
          </div>
        </div>
      </div>
    </>
  );
}
