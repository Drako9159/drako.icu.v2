import { useState } from "react";
import { Link } from "react-router-dom";
import pickDay from "../../assets/icons/sunAll.png";
import pickNight from "../../assets/icons/sunWhite.png";
import { useConfigsStore } from "../../../store/configs";
import styles from "./Header.module.css";
import languageLibrary from "../../../languages/language";
import themeLibrary from "../../../theme/theme";

export default function Header({ activeLink }: { activeLink: string }) {
  const language = useConfigsStore((state) => state.configs.language);
  const strings = languageLibrary(language);

  const [btn, setBtn] = useState(styles.notActive);
  const [isActiveButton, setActiveButton] = useState(styles.hamburgerNotActive);
  const [animationDay, setAnimationDay] = useState("");
  const [animationNight, setAnimationNight] = useState("");

  const setTheme = useConfigsStore((state) => state.setTheme);
  const theme = useConfigsStore((state) => state.configs.theme);
  const color = themeLibrary(theme);

  function handleClickHamburger() {
    if (isActiveButton === styles.hamburgerNotActive) {
      setActiveButton(styles.hamburgerActive);
      setBtn(styles.active);
    } else {
      setActiveButton(styles.hamburgerNotActive);
      setBtn(styles.notActive);
    }
  }

  function handleTheme() {
    setAnimationDay(styles.pickDayAnimationOn);
    setAnimationNight(styles.pickNightAnimationOn);
    if (theme === "night") {
      setTheme({ theme: "day" });

      localStorage.setItem(
        "configs",
        JSON.stringify(useConfigsStore.getState().configs)
      );
    } else {
      setTheme({ theme: "night" });

      localStorage.setItem(
        "configs",
        JSON.stringify(useConfigsStore.getState().configs)
      );
    }
  }

  return (
    <div className={styles.container}>
      <div
        className={`${styles.title} ${
          theme === "night" ? styles.titleNight : styles.titleDay
        }`}
      >
        <Link className={styles.linkTitle} to="/" aria-label="Home Page">
          <h3 style={color.textEnable}>{strings.header.home}</h3>
        </Link>
      </div>

      <div
        className={`${styles.nav} ${
          theme === "night" ? styles.navNight : styles.navDay
        }`}
      >
        <ul>
          <li>
            <Link
              className={`${styles.linksDesktop}  ${
                activeLink === "blog" && theme === "night"
                  ? styles.activeLinkNight
                  : activeLink === "blog" && theme === "day"
                  ? styles.activeLinkDay
                  : ""
              } `}
              to="/blog"
              aria-label="My Blog"
            >
              <h3>{strings.header.nav[0]}</h3>
            </Link>
          </li>
          {/* <li>
            <Link className={styles.linksDesktop} to="/">
              <h3>{strings.header.nav[1]}</h3>
            </Link>
          </li> */}
          {/* <li>
            <Link className={styles.linksDesktop} to="/">
              <h3> {strings.header.nav[2]}</h3>
            </Link>
          </li> */}
          {/* <li>
            <Link className={styles.linksDesktop} to="/">
              <h3>{strings.header.nav[3]}</h3>
            </Link>
          </li> */}
          {/* <li>
            <Link className={styles.linksDesktop} to="/">
              <h3>{strings.header.nav[4]}</h3>
            </Link>
          </li> */}
          {/* <li>
            <Link className={styles.linksDesktop} to="/">
              <h3>{strings.header.nav[5]}</h3>
            </Link>
          </li> */}
          <li>
            <Link
              className={`${styles.linksDesktop}  ${
                activeLink === "about" && theme === "night"
                  ? styles.activeLinkNight
                  : activeLink === "about" && theme === "day"
                  ? styles.activeLinkDay
                  : ""
              } `}
              to="/about"
              aria-label="About me"
            >
              <h3> {strings.header.nav[6]}</h3>
            </Link>
          </li>
        </ul>
      </div>

      <div className={styles.buttons}>
        <div className={styles.iconDayOrNight}>
          <div
            className={`${styles.dayOrNight} ${
              theme === "night" ? styles.setNight : styles.setDay
            }`}
            onClick={handleTheme}
          >
            <img
              alt="day-night"
              draggable={false}
              className={
                /////////////////////////////////////
                `${styles.pickDayAnimation} ${
                  theme === "night" ? styles.pickDay : animationDay
                }`
              }
              src={pickDay}
            ></img>
            <img
              alt="night-day"
              draggable={false}
              className={` ${styles.pickNightAnimation} ${
                theme === "day" ? styles.pickNight : animationNight
              }`}
              src={pickNight}
            ></img>
          </div>
        </div>

        <div
          className={`${styles.containerBtn} ${
            theme === "night"
              ? styles.containerBtnNight
              : styles.containerBtnDay
          }`}
          onClick={handleClickHamburger}
        >
          <div className={`${styles.btn} ${btn}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className={styles.icon}>
          <svg className={styles.svg} viewBox={"0 0 10 10"}>
            <defs>
              <circle
                id={"circle"}
                cx={5}
                cy={5}
                r="4"
                fill={"transparent"}
                strokeWidth={"0.5"}
              ></circle>
            </defs>

            <use
              xlinkHref={"#circle"}
              stroke={color.colorLogo.a}
              strokeDasharray={"0,2.09,8.38,30"}
            />
            <use
              xlinkHref={"#circle"}
              stroke={color.colorLogo.b}
              strokeDasharray={"0,10.47,8.38,30"}
            />
            <use
              xlinkHref={"#circle"}
              stroke={color.colorLogo.c}
              strokeDasharray={"2.09,16.75,6.3"}
            />
          </svg>
          <p
            className={`${styles.logo} ${
              theme === "night" ? styles.logoNight : styles.logoDay
            }`}
          >
            a
          </p>
        </div>
      </div>

      <div
        className={`${styles.hamburgerNav} ${isActiveButton} ${
          theme === "night" ? styles.hamburgerNavNight : styles.hamburgerNavDay
        }`}
      >
        <ul>
          <li>
            <Link className={styles.linksDesktop} to="/" aria-label="Home Page">
              <div className={styles.iconDayOrNightMobile}>
                <div
                  className={`${styles.dayOrNight} ${
                    theme === "night" ? styles.setNight : styles.setDay
                  }`}
                  onClick={handleTheme}
                >
                  <img
                    alt="day-night"
                    draggable={false}
                    className={`${styles.pickDayAnimation} ${
                      theme === "night" ? styles.pickDay : animationDay
                    }`}
                    src={pickDay}
                  ></img>
                  <img
                    alt="night-day"
                    draggable={false}
                    className={` ${styles.pickNightAnimation} ${
                      theme === "day" ? styles.pickNight : animationNight
                    }`}
                    src={pickNight}
                  ></img>
                </div>
              </div>
            </Link>
          </li>

          <li>
            <Link className={styles.linksDesktop} to="/blog" aria-label="My Blog">
              <h3>{strings.header.nav[0]}</h3>
            </Link>
          </li>
          {/* <li>
            <Link className={styles.linksDesktop} to="/">
              <h3>{strings.header.nav[1]}</h3>
            </Link>
          </li> */}
          {/* <li>
            <Link className={styles.linksDesktop} to="/">
              <h3> {strings.header.nav[2]}</h3>
            </Link>
          </li> */}
          {/* <li>
            <Link className={styles.linksDesktop} to="/">
              <h3> {strings.header.nav[3]}</h3>
            </Link>
          </li> */}
          {/* <li>
            <Link className={styles.linksDesktop} to="/">
              <h3> {strings.header.nav[4]}</h3>
            </Link>
          </li> */}
          {/* <li>
            <Link className={styles.linksDesktop} to="/">
              <h3> {strings.header.nav[5]}</h3>
            </Link>
          </li> */}
          <li>
            <Link className={styles.linksDesktop} to="/about" aria-label="About me">
              <h3>{strings.header.nav[6]}</h3>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
