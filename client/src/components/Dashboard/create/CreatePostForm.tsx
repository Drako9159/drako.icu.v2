import { createOneUser } from "../../../api/user";
import styles from "./CreatePostForm.module.css";
import { useRef } from "react";
export default function CreatePostForm() {
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

    const response = await createOneUser(prepare);
    if (response.status === 201) {
      alert("user created");
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleCreateUser}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          required={true}
          placeholder="New Blog"
        />

        <label htmlFor="category">Category</label>
        <input
          type="text"
          name="category"
          id="category"
          required={true}
          placeholder="Education"
        />

        <label htmlFor="tag">Tag</label>
        <input
          type="text"
          name="tag"
          id="tag"
          required={true}
          placeholder="Javascript"
        />

        <label htmlFor="language">Language</label>
        <select id="language">
          <option value="es">es - spanish</option>
          <option value="en">en - english</option>
        </select>

        <label htmlFor="read_time">Read time</label>
        <textarea
          name="read_time"
          id="read_time"
          required={true}
          placeholder="15 min read"
        />

        <label htmlFor="author">Author</label>
        <input
          type="text"
          name="author"
          id="author"
          required={true}
          placeholder="Frederic Hobbs"
        />

        <label htmlFor="date">Date</label>
        <input
          type="text"
          name="date"
          id="date"
          required={true}
          placeholder="Ene 14, 2023"
        />

        <button>Create</button>
      </form>
    </div>
  );
}
