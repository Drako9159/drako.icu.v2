
import styles from "./UpdatePostForm.module.css";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

import { useEffect, useRef, useState } from "react";
import { updateOnePost } from "../../../api/post";
export default function UpdatePostForm({
  post,
  setIsUpdating,
  getPosts,
  setIsCharge,
}: {
  post: any;
  setIsUpdating: any;
  getPosts: any;
  setIsCharge: any;
}) {
  const { quill, quillRef } = useQuill();
  const [content, setContent] = useState("");

  useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {
        // console.log("Text change!");
        // console.log(quill.getText());
        // console.log(quill.getContents());
        // console.log(quill.root.innerHTML);
        // console.log(quillRef.current.firstChild.innerHTML);
        setContent(quill.root.innerHTML);
      });
      quill.root.innerHTML = post.content;
    }
  }, [quill]);

  function handleInsertImg() {
    const url = prompt("Por favor, ingresa la URL de la imagen:");
    if (url && quill) {
      const altText = prompt(
        "Por favor, ingresa el texto alternativo (alt) para la imagen:"
      );
      const range = quill.getSelection();
      quill.insertEmbed(range!.index, "image", url);
      const imageElement = quill.getLeaf(range!.index)[0].domNode;
      imageElement.alt = altText;
    }
  }

  const titleRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const tagRef = useRef<HTMLInputElement>(null);
  const languageRef = useRef<HTMLSelectElement>(null);
  const colorRef = useRef<HTMLSelectElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const readTimeRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  async function handleUpdatePost(e: React.FormEvent) {
    e.preventDefault();
    const titleValue = titleRef.current?.value;
    const categoryValue = categoryRef.current?.value;
    const tagValue = tagRef.current?.value;
    const languageValue = languageRef.current?.value;
    const colorValue = colorRef.current?.value;
    const imageValue = imageRef.current?.value;
    const descriptionValue = descriptionRef.current?.value;

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
      content: content,
    };

    setIsCharge(true);
    const response = await updateOnePost(post.id, prepare);
    if (response.status === 200) {
      alert("post updated");
      getPosts();
      setIsUpdating(false);
      setIsCharge(false);
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleUpdatePost}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          required={true}
          placeholder="New Blog"
          ref={titleRef}
          defaultValue={post.title}
        />

        <label htmlFor="category">Category</label>
        <input
          type="text"
          name="category"
          id="category"
          required={true}
          placeholder="Education"
          ref={categoryRef}
          defaultValue={post.category}
        />

        <label htmlFor="tag">Tag</label>
        <input
          type="text"
          name="tag"
          id="tag"
          required={true}
          placeholder="Javascript"
          ref={tagRef}
          defaultValue={post.tag}
        />

        <label htmlFor="language">Language</label>
        <select id="language" ref={languageRef} defaultValue={post.language}>
          <option value="es">es - spanish</option>
          <option value="en">en - english</option>
        </select>

        <label htmlFor="color">Color</label>
        <select id="color" ref={colorRef} defaultValue={post.color}>
          <option value="green">green</option>
          <option value="blue">blue</option>
          <option value="pink">pink</option>
          <option value="red">red</option>
          <option value="orange">orange</option>
        </select>

        <label htmlFor="read_time">Read Time</label>
        <input
          type="text"
          name="read_time"
          id="read_time"
          required={true}
          placeholder="15 min read"
          ref={readTimeRef}
          defaultValue={post.read_time}
        />

        <label htmlFor="image">Image</label>
        <input
          type="text"
          name="image"
          id="image"
          required={true}
          placeholder="http://image.webp"
          ref={imageRef}
          defaultValue={post.image}
        />

        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          required={true}
          placeholder="About the blog"
          ref={descriptionRef}
          defaultValue={post.description}
        />

        <label htmlFor="author">Author</label>
        <input
          type="text"
          name="author"
          id="author"
          required={true}
          placeholder="Frederic Hobbs"
          ref={authorRef}
          defaultValue={post.author}
        />

        <label htmlFor="date">Date</label>
        <input
          type="text"
          name="date"
          id="date"
          required={true}
          placeholder="Ene 14, 2023"
          ref={dateRef}
          defaultValue={post.date}
        />

        <div className={styles.actions}>
          <button disabled={content === "" ? true : false}>Update</button>
          <button type="button" onClick={() => setIsUpdating(false)}>
            Cancel
          </button>
        </div>
      </form>

      <div
        style={{
          width: 500,
          height: 400,
          minWidth: 320,
          margin: "5px",
          marginBottom: "100px",
        }}
      >
        <button
          style={{ marginBottom: "5px" }}
          onClick={() => handleInsertImg()}
        >
          Insert img
        </button>
        <div ref={quillRef}></div>
      </div>
    </div>
  );
}
