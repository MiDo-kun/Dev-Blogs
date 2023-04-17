import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";
import { useCookies } from 'react-cookie';

export default function CreatePost() {
  const BLOG_ENDPOINT = import.meta.env.VITE_BLOG_ENDPOINT;
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [cookies] = useCookies();

  async function createNewPost(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);

    const token = cookies.token;
    const response = await fetch(BLOG_ENDPOINT + '/post', {
      method: 'POST',
      headers: {
        Origin: BLOG_ENDPOINT,
        Authentication: `Bearer ${token}`
      },
      body: data,
      credentials: 'include',
      // mode: 'no-cors',
    });

    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <form onSubmit={createNewPost}>
      <input type="title"
        placeholder={'Title'}
        value={title}
        onChange={ev => setTitle(ev.target.value)} />
      <input type="summary"
        placeholder={'Summary'}
        value={summary}
        onChange={ev => setSummary(ev.target.value)} />
      <input type="file"
        onChange={ev => setFiles(ev.target.files)} />
      <Editor value={content} onChange={setContent} />
      <button type="submit" style={{ marginTop: '5px' }} >Create post</button>
    </form>
  );
}