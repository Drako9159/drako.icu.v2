import { useEffect, useState } from "react";
import { deleteOneUser, getUsersList } from "../../../api/user";
import styles from "./ListUser.module.css";
import UpdateUserForm from "../update/UpdateUserForm";
import ChargeAnimation from "../../Layouts/ChargeAnimation/ChargeAnimation";
export default function ListUser() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isCharge, setIsCharge] = useState<boolean>(true);

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    const response = await getUsersList();
    if (response.status === 200) {
      setUsers(response.data.users);
      setIsCharge(false)
    }
  }

  function handleUpdate(e: object) {
    setIsCharge(true)
    setIsUpdating(true);
    setUser(e);
    setIsCharge(false)
  }

  async function deleteUser(id: string) {
    if (!confirm("Do you want delete this user?")) {
      return;
    }
    setIsCharge(true)
    const response = await deleteOneUser(id);
    if (response.status === 204) {
      getUsers();
      setIsCharge(false)
    }
  }

  return (
    <div className={styles.container}>
      <ChargeAnimation delay={isCharge} />
      <div>
        {users.map((e: any) => {
          return (
            <div key={e.id} className={styles.element}>
              <div>
                <p>Id: {e.id}</p>
                <p>Name: {e.firstName}</p>
                <p>LastN: {e.lastName}</p>
                <p>Email: {e.email}</p>
                <p>Type: {e.type}</p>
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
          setIsCharge={setIsCharge}
        />
      ) : (
        ""
      )}
    </div>
  );
}
