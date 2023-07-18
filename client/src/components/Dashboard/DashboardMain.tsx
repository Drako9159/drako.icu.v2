import styles from "./DashboardMain.module.css";
import ListPost from "./lists/ListPost";
import CreateUserForm from "./create/CreateUserForm";

import ListUser from "./lists/ListUser";
import CreatePostForm from "./create/CreatePostForm";
export default function DashboardMain({ element }: { element: any }) {
  return (
    <div className={styles.container}>
      {element === "Posts" ? (
        <ListPost />
      ) : element === "Users" ? (
        <ListUser />
      ) : element === "Create-User" ? (
        <CreateUserForm />
      ) : element === "Create-Post" ? (
        <CreatePostForm />
      ) : (
        ""
      )}
    </div>
  );
}
