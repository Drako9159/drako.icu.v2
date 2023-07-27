import styles from "./CreatePostForm.module.css";
import axios from "axios";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { createOnePost } from "../../../api/post";
import ChargeAnimation from "../../Layouts/ChargeAnimation/ChargeAnimation";
import EditorMarked from "../../utils/EditorMarked";
import { useToastStore } from "../../../store/toastNotify";
export default function CreatePostForm({ setElement }: { setElement: any }) {
  const setNotify = useToastStore((state) => state.setNotify);
  const [content, setContent] = useState<string>("");
  const [formValues, setFormValues] = useState<object>({
    title: "",
    category: "",
    tag: "",
    language: "en",
    color: "blue",
    image: "",
    description: "",
    read_time: "",
    author: "",
    date: "",
    is_public: "false",
    content: "",
  });

  useEffect(() => {
    setFormValues((prev) => ({ ...prev, content: content }));
  }, [content]);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const response = await createOnePost(formValues);
      if (response.status === 201) {
        alert("post created");
        setElement("Posts");
      }
      setNotify({ color: "green", message: "Post created" });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setNotify({ color: "red", message: error.response?.data.message });
      }
    }
  }

  return (
    <div className={styles.containerPostForm}>
      <ChargeAnimation />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            placeholder="New Blog"
            onChange={handleChange}
          />

          <label htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            id="category"
            required
            placeholder="Education"
            onChange={handleChange}
          />

          <label htmlFor="tag">Tag</label>
          <input
            type="text"
            name="tag"
            id="tag"
            required
            placeholder="Javascript"
            onChange={handleChange}
          />

          <label htmlFor="language">Language</label>
          <select
            id="language"
            name="language"
            onChange={handleChange}
            defaultValue="en"
            required
          >
            <option value="es">es - spanish</option>
            <option value="en">en - english</option>
          </select>

          <label htmlFor="color">Color</label>
          <select
            id="color"
            name="color"
            onChange={handleChange}
            defaultValue="blue"
            required
          >
            <option value="green">green</option>
            <option value="blue">blue</option>
            <option value="purple">purple</option>
            <option value="red">red</option>
            <option value="orange">orange</option>
            <option value="yellow">yellow</option>
          </select>

          <label htmlFor="read_time">Read Time</label>
          <input
            type="text"
            name="read_time"
            id="read_time"
            required
            placeholder="15 min read"
            onChange={handleChange}
          />

          <label htmlFor="is_public">Public</label>
          <select
            id="is_public"
            name="is_public"
            defaultValue="false"
            required
            onChange={handleChange}
          >
            <option value="true">active</option>
            <option value="false">inactive</option>
          </select>
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input
            type="text"
            name="image"
            id="image"
            required
            placeholder="http://image.webp"
            onChange={handleChange}
          />

          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            required
            placeholder="About the blog"
            onChange={handleChange}
          />

          <label htmlFor="author">Author</label>
          <input
            type="text"
            name="author"
            id="author"
            required
            placeholder="Frederic Hobbs"
            onChange={handleChange}
          />

          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            id="date"
            required
            onChange={handleChange}
          />

          <button disabled={content === "" ? true : false}>Create</button>
        </div>
      </form>
      <EditorMarked content={content} setContent={setContent} />
    </div>
  );
}
