import axios from "axios";
import { updateBlocked, updateOneUser, updateRole } from "../../../api/user";
import styles from "./UpdateUserForm.module.css";
import { useRef } from "react";
import { useToastStore } from "../../../store/toastNotify";
export default function UpdateUserForm({
  user,
  setIsUpdating,
  getUsers,
}: {
  user: any;
  setIsUpdating: any;
  getUsers: any;
}) {
  const idRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLSelectElement>(null);
  const blockedRef = useRef<HTMLSelectElement>(null);
  const setNotify = useToastStore((state) => state.setNotify);

  async function handleUpdateUser(e: React.FormEvent) {
    e.preventDefault();

    const idValue = idRef.current?.value;
    const firstNameValue = firstNameRef.current?.value;
    const lastNameValue = lastNameRef.current?.value;
    const roleValue = roleRef.current?.value;
    const blockedValue = blockedRef.current?.value === "false" ? false : true;

    const prepare = {
      firstName: firstNameValue,
      lastName: lastNameValue,
    };

    try {
      const response = await updateOneUser(idValue as string, prepare);
      const responseRole = await updateRole(idValue as string, {
        role: roleValue as string,
      });
      const responseBlocked = await updateBlocked(idValue as string, {
        blocked: blockedValue,
      });

      if (
        response.status === 200 &&
        responseRole.status === 200 &&
        responseBlocked.status === 200
      ) {
        getUsers();
        setIsUpdating(false);
        setNotify({ color: "green", message: "User updated" });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setNotify({ color: "red", message: error.response?.data.message });
      }
    }
  }

  return (
    <div className={styles.containerUpdateUserForm}>
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

        <label htmlFor="role">Role</label>
        <select id="role" ref={roleRef} defaultValue={user.role}>
          <option value="public">public</option>
          <option value="admin">admin</option>
        </select>

        <label htmlFor="blocked">Blocked</label>
        <select id="blocked" ref={blockedRef} defaultValue={user.blocked}>
          <option value="false">unlocked</option>
          <option value="true">blocked</option>
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
