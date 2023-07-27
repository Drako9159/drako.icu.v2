import styles from "./UpdatePostForm.module.css";
import EditorMarked from "../../utils/EditorMarked";
import { useState, ChangeEvent, useEffect, FormEvent } from "react";
import { updateOnePost } from "../../../api/post";
import axios from "axios";
import { useToastStore } from "../../../store/toastNotify";
export default function UpdatePostForm({
  post,
  setIsUpdating,
  getPosts,
}: {
  post: any;
  setIsUpdating: any;
  getPosts: any;
}) {
  const setNotify = useToastStore((state) => state.setNotify);
  const [content, setContent] = useState(post.content);
  const [formValues, setFormValues] = useState<object>({
    title: post.title,
    category: post.category,
    tag: post.tag,
    language: post.language,
    color: post.color,
    image: post.image,
    description: post.description,
    read_time: post.read_time,
    author: post.author,
    date: post.date,
    is_public: post.is_public,
    content: post.content,
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
      const response = await updateOnePost(post.id, formValues);
      if (response.status === 200) {
        getPosts();
        setIsUpdating(false);
        setNotify({ color: "green", message: "Post updated" });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setNotify({ color: "red", message: error.response?.data.message });
      }
    }
  }

  return (
    <div className={styles.containerUpdateForm}>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            placeholder="New Blog"
            defaultValue={post.title}
            onChange={handleChange}
          />

          <label htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            id="category"
            required
            placeholder="Education"
            defaultValue={post.category}
            onChange={handleChange}
          />

          <label htmlFor="tag">Tag</label>
          <input
            type="text"
            name="tag"
            id="tag"
            required
            placeholder="Javascript"
            defaultValue={post.tag}
            onChange={handleChange}
          />

          <label htmlFor="language">Language</label>
          <select
            id="language"
            required
            defaultValue={post.language}
            onChange={handleChange}
            name="language"
          >
            <option value="es">es - spanish</option>
            <option value="en">en - english</option>
          </select>

          <label htmlFor="color">Color</label>
          <select
            id="color"
            required
            defaultValue={post.color}
            onChange={handleChange}
            name="color"
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
            defaultValue={post.read_time}
            onChange={handleChange}
          />

          <label htmlFor="is_public">Public</label>
          <select
            required
            id="is_public"
            name="is_public"
            defaultValue={post.is_public}
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
            defaultValue={post.image}
            onChange={handleChange}
          />

          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            required
            placeholder="About the blog"
            defaultValue={post.description}
            onChange={handleChange}
          />

          <label htmlFor="author">Author</label>
          <input
            type="text"
            name="author"
            id="author"
            required
            placeholder="Frederic Hobbs"
            defaultValue={post.author}
            onChange={handleChange}
          />

          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            id="date"
            required
            defaultValue={post.date}
            onChange={handleChange}
          />

          <div className={styles.actions}>
            <button disabled={content === "" ? true : false}>Update</button>
            <button type="button" onClick={() => setIsUpdating(false)}>
              Cancel
            </button>
          </div>
        </div>
      </form>
      <EditorMarked content={content} setContent={setContent} />
    </div>
  );
}
