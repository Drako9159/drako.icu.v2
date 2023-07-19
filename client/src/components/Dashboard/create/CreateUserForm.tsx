import { createOneUser } from "../../../api/user";
import ChargeAnimation from "../../Layouts/ChargeAnimation/ChargeAnimation";
import styles from "./CreateUserForm.module.css";
import { useRef, useState } from "react";
export default function CreateUserForm({ setElement }: { setElement: any }) {
  const [isCharge, setIsCharge] = useState<boolean>(false);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

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

    setIsCharge(true);
    const response = await createOneUser(prepare);
    if (response.status === 201) {
      alert("user created");
      setIsCharge(false);
      setElement("Users")
    }
  }

  return (
    <div className={styles.container}>
      <ChargeAnimation delay={isCharge} />
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
