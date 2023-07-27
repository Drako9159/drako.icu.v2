import { useEffect, useState } from "react";
import { deleteOneUser, getUsersList } from "../../../api/user";
import styles from "./ListUser.module.css";
import UpdateUserForm from "../update/UpdateUserForm";
import ChargeAnimation from "../../Layouts/ChargeAnimation/ChargeAnimation";
import { useLoadingStore } from "../../../store/loading";
import { useToastStore } from "../../../store/toastNotify";
import axios from "axios";
import Logout from "../logout/Logout";
export default function ListUser() {
  const [users, setUsers] = useState<object[]>([]);
  const [user, setUser] = useState<object>({});
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);
  const setNotify = useToastStore((state) => state.setNotify);

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    setIsLoading(true);
    try {
      const response = await getUsersList();
      setUsers(response.data.users);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setNotify({ color: "red", message: error.response?.data.message });
        if(error.response?.status === 401) return Logout()
      }
    }
    setIsLoading(false);
  }

  function handleUpdate(e: object) {
    setIsLoading(true);
    setIsUpdating(true);
    setUser(e);
    setIsLoading(false);
  }

  async function deleteUser(id: string) {
    if (!confirm("Do you want delete this user?")) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await deleteOneUser(id);
      if (response.status === 204) {
        getUsers();
        setNotify({ color: "green", message: "User deleted" });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setNotify({ color: "red", message: error.response?.data.message });
      }
    }
    setIsLoading(false);
  }

  return (
    <div className={styles.containerListUser}>
      <ChargeAnimation />
      <div>
        {users.map((e: any) => {
          return (
            <div key={e.id} className={styles.element}>
              <div>
                <p>Id: {e.id}</p>
                <p>Name: {e.firstName}</p>
                <p>LastN: {e.lastName}</p>
                <p>Email: {e.email}</p>
                <p>Role: {e.role}</p>
                <p>Blocked: {e.blocked ? "blocked" : "unlocked"}</p>
                <p>CreatedAt: {e.createdAt}</p>
                <p>UpdatedAt: {e.updatedAt}</p>
              </div>
              <div className={styles.actions}>
                <button onClick={() => deleteUser(e.id)}>Delete</button>
                <button onClick={() => handleUpdate(e)}>Update</button>
              </div>
            </div>
          );
        })}
      </div>

      {isUpdating ? (
        <UpdateUserForm
          user={user}
          setIsUpdating={setIsUpdating}
          getUsers={getUsers}
        />
      ) : (
        ""
      )}
    </div>
  );
}
