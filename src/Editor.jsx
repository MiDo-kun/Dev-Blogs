import '../highlight.js';
import ReactQuill from "react-quill";
import '../styles/markdown-styles.css'
import 'react-quill/dist/quill.snow.css'


const Font = ReactQuill.Quill.import('formats/font'); // <<<< ReactQuill exports it
Font.whitelist = ['Sans Serif', 'Monospace', 'Poppins']; // allow ONLY these fonts and the default

const Editor = ({ value, onChange }) => {
  const modules = {
    syntax: true,
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: Font.whitelist }],
      ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      [{ script: "sub" }, { script: "super" }],
    ],
  };

  return (
    <ReactQuill
      value={value}
      theme={'snow'}
      onChange={onChange}
      modules={modules} />
  );
}

export default Editor;