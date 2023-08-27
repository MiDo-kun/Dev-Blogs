import Editor from "../sections/Editor";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import usePostDataById from "../hooks/useGetPostById";
import ScreenLoader from "../sections/ScreenLoader";
import useUpdatePost from "../hooks/useUpdatePost";
import useAdminAuth from "../hooks/useAdminAuth";

function EditPost() {
  const { id } = useParams();
  const BLOG_ENDPOINT = import.meta.env.VITE_BLOG_ENDPOINT;
  const { postInfo, isError } = usePostDataById(BLOG_ENDPOINT, id);

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState();

  const { role } = useAdminAuth(BLOG_ENDPOINT);

  // Remount the component if postInfo has been fetched
  useEffect(() => {
    if (postInfo) {
      setTitle(postInfo.title);
      setSummary(postInfo.summary);
      setContent(postInfo.content);
    }

    if (role) {
      if (role.user !== 'admin') {
        window.location.href = "/";
      }
    }

  }, [postInfo, role]);

  // Custom hook with react query that will update specific post
  const postUpdate = useUpdatePost(BLOG_ENDPOINT);

  function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.set('id', id);
    formData.set('title', title);
    formData.set('summary', summary);
    formData.set('content', content);

    if (files?.[0]) {
      formData.set('file', files?.[0]);
    }

    // Perform Mutation here
    postUpdate.mutate(formData);
  }

  if (isError) {
    return (alert("Fetching Blog Post Failed"));
  }


  if (postInfo) {
    return (
      <form className="mt-10 flex flex-col" onSubmit={onSubmit}>
        {/* Title */}
        <input type="title"
          className="block w-full px-3 py-2 mb-4 border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-base text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
          placeholder={'Title'}
          value={title}
          onChange={ev => setTitle(ev.target.value)} />
        {/* Summary */}
        <input type="summary"
          className="block w-full px-3 py-2 mb-4 border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-base text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
          placeholder={'Summary'}
          value={summary}
          onChange={ev => setSummary(ev.target.value)} />
        {/* Background Image */}
        <input type="file"
          className="block mb-4 w-full text-base  border-[2px] rounded-md cursor-pointer text-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400"
          onChange={ev => setFiles(ev.target.files)} />
        {/* Content */}
        <Editor onChange={setContent} value={content} />
        {/* Submit Button */}
        <div className="mx-auto">
          <button type="submit"
            className="font-medium rounded-lg text-base px-5 py-2 mt-4 text-center mr-2 mb-2 border-[2px] border-blue-500 text-blue-500 focus:ring-4 focus:outline-none hover:text-white hover:bg-blue-500 focus:ring-blue-800">
            Update Post
          </button>
        </div>
      </form>
    )
  }

  return (<ScreenLoader />)
}


export default EditPost;