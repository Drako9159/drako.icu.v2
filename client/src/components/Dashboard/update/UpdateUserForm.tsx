import axios from "axios";
import { updateBlocked, updateOneUser, updateRole } from "../../../api/user";
import styles from "./UpdateUserForm.module.css";
import { useState, ChangeEvent, FormEvent } from "react";
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
  const setNotify = useToastStore((state) => state.setNotify);
  const [formValues, setFormValues] = useState({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    blocked: user.blocked,
  });

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const response = await updateOneUser(user.id, {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
      });
      const responseRole = await updateRole(user.id, {
        role: formValues.role,
      });
      const responseBlocked = await updateBlocked(user.id, {
        blocked: formValues.blocked === "false" ? false : true,
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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="id"
          id="id"
          disabled={true}
          defaultValue={user.id}
        />

        <label htmlFor="firstName">Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          required
          placeholder="Anthony"
          defaultValue={user.firstName}
          onChange={handleChange}
        />

        <label htmlFor="lastName">LastName</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          required
          placeholder="Maldonado"
          defaultValue={user.lastName}
          onChange={handleChange}
        />

        <label htmlFor="role">Role</label>
        <select
          id="role"
          name="role"
          required
          defaultValue={user.role}
          onChange={handleChange}
        >
          <option value="public">public</option>
          <option value="admin">admin</option>
        </select>

        <label htmlFor="blocked">Blocked</label>
        <select
          id="blocked"
          name="blocked"
          required
          defaultValue={user.blocked}
          onChange={handleChange}
        >
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
