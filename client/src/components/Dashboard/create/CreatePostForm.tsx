import styles from "./CreatePostForm.module.css";

import { useEffect, useRef, useState } from "react";
import { createOnePost } from "../../../api/post";
import ChargeAnimation from "../../Layouts/ChargeAnimation/ChargeAnimation";
import EditorMarked from "../../utils/EditorMarked";
export default function CreatePostForm({ setElement }: { setElement: any }) {
  const [content, setContent] = useState("");
  const [isCharge, setIsCharge] = useState<boolean>(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const tagRef = useRef<HTMLInputElement>(null);
  const languageRef = useRef<HTMLSelectElement>(null);
  const colorRef = useRef<HTMLSelectElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const isPublicRef = useRef<HTMLSelectElement>(null);

  const readTimeRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  async function handleCreatePost(e: React.FormEvent) {
    e.preventDefault();
    const titleValue = titleRef.current?.value;
    const categoryValue = categoryRef.current?.value;
    const tagValue = tagRef.current?.value;
    const languageValue = languageRef.current?.value;
    const colorValue = colorRef.current?.value;
    const descriptionValue = descriptionRef.current?.value;
    const imageValue = imageRef.current?.value;

    const isPublicValue = isPublicRef.current?.value === "false" ? false : true;

    const readTimeValue = readTimeRef.current?.value;
    const authorValue = authorRef.current?.value;
    const dateValue = dateRef.current?.value;

    const prepare = {
      title: titleValue,
      category: categoryValue,
      tag: tagValue,
      language: languageValue,
      color: colorValue,
      image: imageValue,
      description: descriptionValue,
      read_time: readTimeValue,
      author: authorValue,
      date: dateValue,
      is_public: isPublicValue,
      content: content,
    };

    setIsCharge(true);
    const response = await createOnePost(prepare);
    if (response.status === 201) {
      alert("post created");
      setIsCharge(false);
      setElement("Posts");
    }
  }

  return (
    <div className={styles.containerPostForm}>
      <ChargeAnimation delay={isCharge} />
      <form onSubmit={handleCreatePost}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            required={true}
            placeholder="New Blog"
            ref={titleRef}
          />

          <label htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            id="category"
            required={true}
            placeholder="Education"
            ref={categoryRef}
          />

          <label htmlFor="tag">Tag</label>
          <input
            type="text"
            name="tag"
            id="tag"
            required={true}
            placeholder="Javascript"
            ref={tagRef}
          />

          <label htmlFor="language">Language</label>
          <select id="language" ref={languageRef} name="language">
            <option value="es">es - spanish</option>
            <option value="en">en - english</option>
          </select>

          <label htmlFor="color">Color</label>
          <select id="color" ref={colorRef} name="color">
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
            required={true}
            placeholder="15 min read"
            ref={readTimeRef}
          />

          <label htmlFor="is_public">Public</label>
          <select id="is_public" ref={isPublicRef} name="is_public">
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
            required={true}
            placeholder="http://image.webp"
            ref={imageRef}
          />

          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            required={true}
            placeholder="About the blog"
            ref={descriptionRef}
          />

          <label htmlFor="author">Author</label>
          <input
            type="text"
            name="author"
            id="author"
            required={true}
            placeholder="Frederic Hobbs"
            ref={authorRef}
          />

          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            id="date"
            required={true}
            ref={dateRef}
            
          />

          <button disabled={content === "" ? true : false}>Create</button>
        </div>
      </form>
      <EditorMarked content={content} setContent={setContent} />
    </div>
  );
}
