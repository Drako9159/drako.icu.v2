import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { useEffect } from "react";

export default function Test() {
  const { quill, quillRef } = useQuill();
  useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {
        quill.root.innerHTML;
      });
    }
  }, [quill]);
  return (
    <div
      style={{
        width: 500,
        height: 300,
      }}
    >
      <div ref={quillRef}></div>
    </div>
  );
}
