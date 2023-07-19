import styles from "./CreatePostForm.module.css";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";


// import 'quill/dist/quill.bubble.css'; // Importa el estilo para el tema "bubble"
// import 'quill/dist/quill.core.css'; // Importa el estilo para el tema "core"

import { useEffect, useRef, useState } from "react";
import { createOnePost } from "../../../api/post";
import ChargeAnimation from "../../Layouts/ChargeAnimation/ChargeAnimation";
export default function CreatePostForm({ setElement }: { setElement: any }) {

  const placeholder = "Compose an epic..."

  const theme = "snow"
  const modules = {
    toolbar: [
      "bold", "italic", "underline", "strike", "link", "image", "blockquote"
    ]
  }
  const formats = ["bold", "italic", "underline", "strike", "link", "image", "blockquote"];


  const { quill, quillRef} = useQuill({theme, modules, formats, placeholder});
  const [content, setContent] = useState("");
  const [isCharge, setIsCharge] = useState<boolean>(false);

  useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {
        // console.log("Text change!");
        // console.log(quill.getText());
        // console.log(quill.getContents());
        console.log(quill.root.innerHTML);
        console.log(quillRef.current.firstChild.innerHTML);
        setContent(quill.root.innerHTML);
      });
      
      
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

  function insertBackquote() {
    if(quill){
      const range = quill.getSelection();
      const backquote = "`";
      quill.insertText(range?.index || 0, backquote)
    }
  }

  const titleRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const tagRef = useRef<HTMLInputElement>(null);
  const languageRef = useRef<HTMLSelectElement>(null);
  const colorRef = useRef<HTMLSelectElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

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
    const response = await createOnePost(prepare);
    if (response.status === 201) {
      alert("post created");
      setIsCharge(false);
      setElement("Posts");
    }
  }

  return (
    <div className={styles.container}>
      <ChargeAnimation delay={isCharge} />
      <form onSubmit={handleCreatePost}>
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
        <select id="language" ref={languageRef}>
          <option value="es">es - spanish</option>
          <option value="en">en - english</option>
        </select>

        <label htmlFor="color">Color</label>
        <select id="color" ref={colorRef}>
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
        />

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
          type="text"
          name="date"
          id="date"
          required={true}
          placeholder="Ene 14, 2023"
          ref={dateRef}
        />

        <button disabled={content === "" ? true : false}>Create</button>
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
        <button
          style={{ marginBottom: "5px" }}
          onClick={() => insertBackquote()}
        >
          backquote
        </button>
        <div ref={quillRef}></div>
      </div>
    </div>
  );
}
