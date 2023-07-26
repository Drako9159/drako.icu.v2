import styles from "./DashboardMain.module.css";
import ListPost from "./lists/ListPost";
import CreateUserForm from "./create/CreateUserForm";

import ListUser from "./lists/ListUser";
import CreatePostForm from "./create/CreatePostForm";
import { useToastStore } from "../../store/toastNotify";
export default function DashboardMain({
  setElement,
  element,
}: {
  setElement: any;
  element: any;
}) {
  const setNotify = useToastStore((state) => state.setNotify);
  setNotify({ color: "blue", message: "Logged" });

  return (
    <div className={styles.containerDashboardMain}>
      {element === "Posts" ? (
        <ListPost />
      ) : element === "Users" ? (
        <ListUser />
      ) : element === "Create-User" ? (
        <CreateUserForm setElement={setElement} />
      ) : element === "Create-Post" ? (
        <CreatePostForm setElement={setElement} />
      ) : (
        ""
      )}
    </div>
  );
}
