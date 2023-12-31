import { useState } from "react";
import styles from "./DashboardNav.module.css";
import iconMenu from "../../assets/icons/dashboard/menu.svg";
import { logoutUser } from "../../api/auth";
import { useAuthStore } from "../../store/auth";
import { useToastStore } from "../../store/toastNotify";
import axios from "axios";
export default function DashboardNav({
  setElement,
  element,
}: {
  setElement: any;
  element: any;
}) {
  const [activeButton, setActiveButton] = useState<boolean>(false);
  const [navIn, setNavIn] = useState<any>(null);
  const logout = useAuthStore((state) => state.logout);
  const setNotify = useToastStore((state) => state.setNotify);
  
  function handleClick() {
    setActiveButton(!activeButton);
    if (activeButton) {
      setNavIn(styles.navIn);
    } else {
      setNavIn(styles.navOut);
    }
  }

  async function handleLogout() {
    try {
      await logoutUser();
      logout();
      setNotify({ color: "green", message: "Logout successfully" });
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        setNotify({ color: "red", message: error.response?.data.message });
      }
    }
  }

  return (
    <div className={styles.containerDashboardNav}>
      <h2 className={styles.title}>{element}</h2>
      <div className={styles.nav}>
        <div className={styles.actions} onClick={() => handleClick()}>
          <img src={iconMenu} alt="btn-nav" />
        </div>
        <nav className={`${styles.navOut} ${navIn}`}>
          <ul>
            <li
              onClick={() => {
                setElement("Users");
              }}
            >
              Users
            </li>
            <li
              onClick={() => {
                setElement("Posts");
              }}
            >
              Posts
            </li>
            <li
              onClick={() => {
                setElement("Create-User");
              }}
            >
              Create-User
            </li>
            <li
              onClick={() => {
                setElement("Create-Post");
              }}
            >
              Create-Post
            </li>
            <li onClick={() => handleLogout()}>Logout</li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
