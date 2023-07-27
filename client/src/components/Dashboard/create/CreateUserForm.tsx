import axios from "axios";
import { createUser } from "../../../api/auth";
import { useToastStore } from "../../../store/toastNotify";
import ChargeAnimation from "../../Layouts/ChargeAnimation/ChargeAnimation";
import styles from "./CreateUserForm.module.css";
import { useState, ChangeEvent, FormEvent } from "react";
export default function CreateUserForm({ setElement }: { setElement: any }) {
  const setNotify = useToastStore((state) => state.setNotify);

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const response = await createUser(formValues);
      if (response.status === 201) {
        setElement("Users");
        setNotify({ color: "green", message: "User created" });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setNotify({ color: "red", message: error.response?.data.message });
      }
    }
  }

  return (
    <div className={styles.containerCreateUserForm}>
      <ChargeAnimation />
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          required={true}
          placeholder="Anthony"
          onChange={handleChange}
        />

        <label htmlFor="lastName">LastName</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          required={true}
          placeholder="Maldonado"
          onChange={handleChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          required={true}
          placeholder="anthony@mail.com"
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="******"
          onChange={handleChange}
        />

        <button>Create</button>
      </form>
    </div>
  );
}
