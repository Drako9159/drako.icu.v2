import { useAuthStore } from "../../../store/auth";
import styles from "./DashboardLogin.module.css";
import { loginUser } from "../../../api/auth";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useToastStore } from "../../../store/toastNotify";
import { useLoadingStore } from "../../../store/loading";
import ChargeAnimation from "../../Layouts/ChargeAnimation/ChargeAnimation";

export default function DashboardLogin() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const setAuth = useAuthStore((state) => state.setAuth);
  const setNotify = useToastStore((state) => state.setNotify);
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }

  useEffect(() => {
    setIsLoading(false)
  }, [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true)
    try {
      const response = await loginUser(formValues.email, formValues.password);
   
      if(response.data.user.role !== "admin") {
        setIsLoading(false)
        return setNotify({color: "red", message: "Insufficient permits"})
      }
      setNotify({
        color: "green",
        message: `Welcome ${response.data.user.firstName}`,
      });
      setAuth(response.data.jwt, {
        id: response.data.user.id,
        firstName: response.data.user.firstName,
        lastName: response.data.user.lastName,
        email: response.data.user.email,
        role: response.data.user.role,
        createdAt: response.data.user.createdAt,
      });
      
    } catch (error) {
      if (error instanceof Error) {
        setNotify({ color: "red", message: "Invalid credentials" });
        setFormValues((prev) => ({...prev, password: ""}))
      }
    }
    setIsLoading(false)
  }

  return (
    <div className={styles.containerDashboardLogin}>
      <ChargeAnimation />
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
