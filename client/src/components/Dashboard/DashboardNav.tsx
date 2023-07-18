import { useState } from "react";
import styles from "./DashboardNav.module.css";
import iconMenu from "../../assets/icons/dashboard/menu.svg";

export default function DashboardNav({ setElement, element }: { setElement: any, element: any }) {
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
      <h2 className={styles.title}>{element}</h2>
      <div className={styles.nav}>
        <div className={styles.actions} onClick={() => handleClick()}>
          <img src={iconMenu} alt="btn-nav" />
        </div>
        <nav className={`${styles.navOut} ${navIn}`}>
          <ul>
            <li onClick={() => {setElement("Users")}}>Users</li>
            <li onClick={() => {setElement("Posts")}}>Posts</li>
            <li onClick={() => {setElement("Create-User")}}>Create-User</li>
            <li onClick={() => {setElement("Create-Post")}}>Create-Post</li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
