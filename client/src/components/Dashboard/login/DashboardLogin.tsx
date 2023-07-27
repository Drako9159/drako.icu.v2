import { useAuthStore } from "../../../store/auth";
import styles from "./DashboardLogin.module.css";
import { loginUser } from "../../../api/auth";
import { ChangeEvent, FormEvent, useState } from "react";
import { useToastStore } from "../../../store/toastNotify";

export default function DashboardLogin() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const setAuth = useAuthStore((state) => state.setAuth);
  const setNotify = useToastStore((state) => state.setNotify);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const response = await loginUser(formValues.email, formValues.password);

      setAuth(response.data.jwt, {
        id: response.data.user.id,
        firstName: response.data.user.firstName,
        lastName: response.data.user.lastName,
        email: response.data.user.email,
        role: response.data.user.role,
        createdAt: response.data.user.createdAt,
      });
      setNotify({
        color: "green",
        message: `Welcome ${response.data.user.firstName}`,
      });
    } catch (error) {
      if (error instanceof Error) {
        setNotify({ color: "red", message: "Invalid credentials" });
        setFormValues((prev) => ({...prev, password: ""}))
      }
    }
  }

  return (
    <div className={styles.containerDashboardLogin}>
      <form onSubmit={handleSubmit}>
        <h2>Login for admin</h2>
        <input
          type="email"
          placeholder="admin@mail.com"
          name="email"
          id="email"
          value={formValues.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          placeholder="******"
          name="password"
          id="password"
          value={formValues.password}
          onChange={handleChange}
          required
        />

        <button>Submit</button>
      </form>
    </div>
  );
}
