import { updateOneUser } from "../../../api/user";
import styles from "./UpdateUserForm.module.css";
import { useRef } from "react";
export default function UpdateUserForm({
  user,
  setIsUpdating,
  getUsers,
  setIsCharge
}: {
  user: any;
  setIsUpdating: any;
  getUsers: any;
  setIsCharge: any;
}) {
  const idRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);

  async function handleUpdateUser(e: React.FormEvent) {
    e.preventDefault();
    const idValue = idRef.current?.value;
    const firstNameValue = firstNameRef.current?.value;
    const lastNameValue = lastNameRef.current?.value;
    const typeValue = typeRef.current?.value;

    const prepare = {
      firstName: firstNameValue,
      lastName: lastNameValue,
      type: typeValue,
    };
    setIsCharge(true)
    const response = await updateOneUser(idValue as string, prepare);
    if (response.status === 200) {
      alert("user updated");
      getUsers();
      setIsUpdating(false);
      setIsCharge(false)
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleUpdateUser}>
        <input
          type="text"
          name="id"
          id="id"
          disabled={true}
          ref={idRef}
          defaultValue={user.id}
        />

        <label htmlFor="firstName">Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          required={true}
          placeholder="Anthony"
          ref={firstNameRef}
          defaultValue={user.firstName}
        />

        <label htmlFor="lastName">LastName</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          required={true}
          placeholder="Jaramillo"
          ref={lastNameRef}
          defaultValue={user.lastName}
        />

        <label htmlFor="type">Type</label>
        <select id="type" ref={typeRef} defaultValue={user.type}>
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>

        <div className={styles.actions}>
          <button>Update</button>
          <button type="button" onClick={() => setIsUpdating(false)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
