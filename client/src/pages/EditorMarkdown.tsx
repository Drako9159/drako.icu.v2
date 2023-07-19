import React, { useState } from "react";
import { marked } from "marked";
import TurndownService from "turndown";

const EditorMarkdown: React.FC = () => {
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [markdownConverted, setMarkdownConverted] = useState<string>("");

  const handleMarkdownChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const content = event.target.value;
    setMarkdownContent(content);

    marked.use({
      mangle: false,
      headerIds: false,
    });

    const htmlContent = marked(content);
    console.log(htmlContent);

    const turndownService = new TurndownService();
    const markdownConverted = turndownService.turndown(htmlContent);
    setMarkdownConverted(markdownConverted);
  };

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <textarea
          value={markdownContent}
          onChange={handleMarkdownChange}
          style={{ width: "100%", height: 300 }}
        />
      </div>
      <div
        style={{ color: "#000000" }}
        dangerouslySetInnerHTML={{ __html: marked(markdownContent) }}
      />
      <div style={{ marginBottom: 10 }}>
        <textarea
          value={markdownConverted}
          readOnly
          style={{ width: "100%", height: 300 }}
        ></textarea>
      </div>
    </div>
  );
};

export default EditorMarkdown;
