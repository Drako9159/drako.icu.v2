import { ChangeEvent, useEffect, useState } from "react";
import { marked } from "marked";
import TurndownService from "turndown";
import styles from "./EditorMarked.module.css";

export default function EditorMarked({
  content,
  setContent,
}: {
  content: string;
  setContent: any;
}) {
  const [markdownContent, setMarkdownContent] = useState<string>(
    content ? htmlToMarkdown(content) : ""
  );
 

  marked.use({
    mangle: false,
    headerIds: false,
  });

  /*
  useEffect(() => {
    setMarkdownContent(content ? htmlToMarkdown(content) : "");
  }, [content]);*/
  
  function htmlToMarkdown(html: any) {
    const turndownService = new TurndownService();
    turndownService.addRule("code", {
      filter: "code",
      replacement: function (content) {
        return "`" + content + "`";
      },
    });
    return turndownService.turndown(html);
    // return new TurndownService().turndown(html);
  }

  function handleMarkdownChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const markdown = e.target.value;
    setMarkdownContent(markdown);
    const htmlContent = marked(markdown);
    // const turndownService = new TurndownService();
    // const htmlToMarkdown = turndownService.turndown(htmlContent);
    // setMarkdownConverted(htmlToMarkdown);
    setContent(htmlContent);
  }

  return (
    <div className={styles.containerEditorMarked}>
      <div className={styles.editor}>
        <textarea value={markdownContent} onChange={handleMarkdownChange} />
      </div>
      <div className={styles.panel}>
        <div dangerouslySetInnerHTML={{ __html: marked(markdownContent) }} />
      </div>
    </div>
  );
}
