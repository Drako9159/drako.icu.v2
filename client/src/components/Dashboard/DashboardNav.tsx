import { useState } from "react";
import styles from "./DashboardNav.module.css";
import iconMenu from "../../assets/icons/dashboard/menu.svg";

export default function Nav() {
  const [activeButton, setActiveButton] = useState<boolean>(false);
  const [navIn, setNavIn] = useState<any>(null);

  function handleClick() {
    setActiveButton(!activeButton);

    if (activeButton) {
      setNavIn(styles.navIn);
    } else {
      setNavIn(styles.navOut);
    }
  }
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Titulo</h2>
      <div className={styles.nav}>
        <div className={styles.actions} onClick={() => handleClick()}>
          <img src={iconMenu} alt="btn-nav" />
        </div>
        <nav className={`${styles.navOut} ${navIn}`}>
          <ul>
            <li>Users</li>

            <li>Posts</li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
