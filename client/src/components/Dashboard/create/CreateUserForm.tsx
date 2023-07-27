import axios from "axios";
import { createUser } from "../../../api/auth";
import { useToastStore } from "../../../store/toastNotify";
import ChargeAnimation from "../../Layouts/ChargeAnimation/ChargeAnimation";
import styles from "./CreateUserForm.module.css";
import { useRef } from "react";
export default function CreateUserForm({ setElement }: { setElement: any }) {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const setNotify = useToastStore((state) => state.setNotify);

  async function handleCreateUser(e: React.FormEvent) {
    e.preventDefault();
    const firsNameValue = firstNameRef.current?.value;
    const lastNameValue = lastNameRef.current?.value;
    const emailValue = emailRef.current?.value;
    const passwordValue = passwordRef.current?.value;

    const prepare = {
      firstName: firsNameValue,
      lastName: lastNameValue,
      email: emailValue,
      password: passwordValue,
    };

    try {
      const response = await createUser(prepare);
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
      <form onSubmit={handleCreateUser}>
        <label htmlFor="firstName">Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          required={true}
          placeholder="Anthony"
          ref={firstNameRef}
        />

        <label htmlFor="lastName">LastName</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          required={true}
          placeholder="Jaramillo"
          ref={lastNameRef}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          required={true}
          placeholder="anthony@mail.com"
          ref={emailRef}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="******"
          ref={passwordRef}
        />

        <button>Create</button>
      </form>
    </div>
  );
}
