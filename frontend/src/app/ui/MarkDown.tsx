import React from "react";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Adds support for tables and other GitHub-flavored Markdown features
import "react-markdown-editor-lite/lib/index.css";

// Dynamically load the Markdown Editor
const MdEditor = dynamic(() => import("react-markdown-editor-lite"), { ssr: false });

// Props Interface
interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange, placeholder }) => {
  // Handle Markdown content change
  const handleEditorChange = ({ text }: { text: string }) => {
    onChange(text);
  };

  return (
    <div className="markdown-editor">
      <MdEditor
        value={value}
        style={{ height: "500px" }}
        placeholder={placeholder || "Start writing your pitch..."}
        renderHTML={(text) => <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>} // Preview using ReactMarkdown
        onChange={handleEditorChange}
        config={{
          view: {
            menu: true, // Show menu bar
            md: true, // Show Markdown editor
            html: true, // Show live preview side-by-side
          },
        }}
      />
    </div>
  );
};

export default MarkdownEditor;
