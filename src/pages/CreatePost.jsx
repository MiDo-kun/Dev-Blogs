import 'react-quill/dist/quill.snow.css';
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Editor from '../sections/Editor';
import useAdminAuth from "../hooks/useAdminAuth";

function CreatePost() {
  const BLOG_ENDPOINT = import.meta.env.VITE_BLOG_ENDPOINT;
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(BLOG_ENDPOINT + '/auth/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      },
    }).then((response) => !response.ok && setRedirect(true));
  })


  const { role } = useAdminAuth(BLOG_ENDPOINT);
  if (!role) return;
  if (!role.user === 'admin') {
    return <Navigate to={'/'} />
  }

  async function createNewPost(ev) {
    ev.preventDefault();
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
      <input type="title"
        className="block w-full px-3 py-2 mb-4 border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-base text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
        placeholder={'Title'}
        value={title}
        onChange={ev => setTitle(ev.target.value)} />
      <input type="summary"
        className="block w-full px-3 py-2 mb-4 border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-base text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
        placeholder={'Summary'}
        value={summary}
        onChange={ev => setSummary(ev.target.value)} />
      <input type="file"
        className="block mb-4 w-full text-base  border-[2px] rounded-md cursor-pointer text-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400e"
        onChange={ev => setFiles(ev.target.files)} />
      <Editor value={content} onChange={setContent} />
      <div className="mx-auto">
        <button
          type="submit"
          onClick={() => alert("Content Sent!")}
          className="font-medium rounded-lg text-base px-5 py-2 mt-4 text-center mr-2 mb-2 border-[2px] border-blue-500 text-blue-500 focus:ring-4 focus:outline-none hover:text-white hover:bg-blue-500 focus:ring-blue-800" >
          Create post
        </button>
      </div>
    </form>
  );
}


export default CreatePost;