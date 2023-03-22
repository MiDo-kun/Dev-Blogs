import ReactQuill from "react-quill";

export default function Editor({ value, onChange }) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  };
  return (
    <div className="content">
      <ReactQuill
        value={value}
        theme={'snow'}
        onChange={onChange}
        modules={modules} />
    </div>
  );
}

// import React from "react";
// import ReactQuill from "react-quill";
// import EditorToolbar, { modules, formats } from "./pages/EditorToolbar";
// import "react-quill/dist/quill.snow.css";
// // import "./styles.css";

// export const Editor = () => {
//   const [state, setState] = React.useState({ value: null });
//   const handleChange = value => {
//     setState({ value });
//   };
//   return (
//     <div className="content">
//       <EditorToolbar />
//       <ReactQuill
//         theme="snow"
//         value={state.value}
//         onChange={handleChange}
//         placeholder={"Write something awesome..."}
//         modules={modules}
//         formats={formats}
//       />
//     </div>
//   );
// };

// export default Editor;