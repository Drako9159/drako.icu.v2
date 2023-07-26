import { useAuthStore } from "../../../store/auth";
import styles from "./DashboardLogin.module.css";
import { loginUser } from "../../../api/auth";
import { FormEvent, useRef } from "react";

export default function DashboardLogin() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const setAuth = useAuthStore((state) => state.setAuth);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const emailValue = emailRef.current?.value;
    const passwordValue = passwordRef.current?.value;
    const response = await loginUser(
      emailValue as string,
      passwordValue as string
    );

    setAuth(response.data.jwt, {
      id: response.data.user.id,
      firstName: response.data.user.firstName,
      lastName: response.data.user.lastName,
      email: response.data.user.email,
      role: response.data.user.role,
      createdAt: response.data.user.createdAt,
    });
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
          ref={emailRef}
          required
        />

        <input
          type="password"
          placeholder="******"
          name="password"
          id="password"
          ref={passwordRef}
          required
        />

        <button>Submit</button>
      </form>
    </div>
  );
}
