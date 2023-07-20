import styles from "./DashboardMain.module.css";
import ListPost from "./lists/ListPost";
import CreateUserForm from "./create/CreateUserForm";

import ListUser from "./lists/ListUser";
import CreatePostForm from "./create/CreatePostForm";
export default function DashboardMain({
  setElement,
  element,
}: {
  setElement: any;
  element: any;
}) {
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
