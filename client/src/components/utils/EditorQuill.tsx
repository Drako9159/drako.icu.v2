import React, { useState, useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

const MyEditor = () => {
  const { quill, quillRef } = useQuill();
  const [content, setContent] = useState("");

  useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {
        setContent(quill.root.innerHTML);
        // console.log("Text change!");
        // console.log(quill.getText());
        // console.log(quill.getContents());
        // console.log(quill.root.innerHTML);
        // console.log(quillRef.current.firstChild.innerHTML);
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
    if (quill) {
      const range = quill.getSelection();
      const backquote = "`";
      quill.insertText(range?.index || 0, backquote);
    }
  }

  return (
    <div
      style={{
        width: 500,
        height: 400,
        minWidth: 320,
        margin: "5px",
        marginBottom: "100px",
      }}
    >
      <button style={{ marginBottom: "5px" }} onClick={() => handleInsertImg()}>
        Insert img
      </button>
      <button style={{ marginBottom: "5px" }} onClick={() => insertBackquote()}>
        backquote
      </button>
      <div ref={quillRef}></div>
    </div>
  );
};

export default MyEditor;
