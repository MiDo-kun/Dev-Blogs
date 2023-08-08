import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";
import { useCookies } from 'react-cookie';

const CreatePost = () => {
  const BLOG_ENDPOINT = import.meta.env.VITE_BLOG_ENDPOINT;
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [cookie] = useCookies();

  async function createNewPost(ev) {
    ev.preventDefault();
    const token = cookie.token;
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);

    const response = await fetch(BLOG_ENDPOINT + '/posts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: data,
    });

    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <form onSubmit={createNewPost} className="mt-10 flex flex-col">
      <input type="title" className="my-1 px-2 py-1"
        placeholder={'Title'}
        value={title}
        onChange={ev => setTitle(ev.target.value)} />
      <input type="summary" className="my-1 px-2 py-1"
        placeholder={'Summary'}
        value={summary}
        onChange={ev => setSummary(ev.target.value)} />
      <input type="file" className="my-1 text-white"
        onChange={ev => setFiles(ev.target.files)} />
      <Editor value={content} onChange={setContent} />
      <button type="submit" className="w-1/4 mx-auto mt-5 text-white text-sm rounded-sm px-1 py-1 outline outline-gray-400 hover:text-gray-400" >Create post</button>
    </form>
  );
}


export default CreatePost;