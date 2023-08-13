import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import Editor from "../sections/Editor";

export default function EditPost() {
  const BLOG_ENDPOINT = import.meta.env.VITE_BLOG_ENDPOINT;
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [cookie] = useCookies();

  useEffect(() => {
    fetch(BLOG_ENDPOINT + '/posts/' + id)
      .then(response => {
        response.json().then(postInfo => {
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setSummary(postInfo.summary);
        });
      });
  }, []);

  async function updatePost(ev) {
    ev.preventDefault();
    const { token } = cookie;
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);
    if (files?.[0]) {
      data.set('file', files?.[0]);
    }
    const response = await fetch(BLOG_ENDPOINT + '/posts', {
      method: 'PUT',
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
    return <Navigate to={'/post/' + id} />
  }

  return (
    <form onSubmit={updatePost} className="mt-10 flex flex-col">
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
      <Editor onChange={setContent} value={content} />
      <button type="submit" onClick={() => alert("Content Sent!")} className="w-1/4 mx-auto mt-5 text-white text-sm rounded-sm px-1 py-1 outline outline-gray-400 hover:text-gray-400">Update post</button>
    </form>
  );
}