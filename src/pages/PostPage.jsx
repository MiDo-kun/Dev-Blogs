import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { Link } from 'react-router-dom';

export default function PostPage() {
  const BLOG_ENDPOINT = import.meta.env.VITE_BLOG_ENDPOINT;

  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  const navigateTo = useNavigate();
  useEffect(() => {
    fetch(BLOG_ENDPOINT + `/post/${id}`)
      .then(response => {
        response.json().then(postInfo => {
          setPostInfo(postInfo);
        });
      });
  }, []);

  const handleBack = () => {
    navigateTo('/');
  };

  if (!postInfo) return '';

  const datePosted = new Date(postInfo.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  return (
    <div className="mx-auto w-[445px] mt-10">
      <div className="mb-5 text-white">
        <h1 className="text-xl font-semibold">{postInfo.title}</h1>
        <div className="text-sm my-1 ml-[.04rem]">At {datePosted}</div>
      </div>
      {userInfo.id === postInfo.author._id && (
        <div className="flex justify-center text-white">
          <Link className="" to={`/edit/${postInfo._id}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            <span>Edit</span>
          </Link>
        </div>
      )}

     <div className="text-base text-justify" dangerouslySetInnerHTML={{ __html: postInfo.content }} />
      <button className="flex items-center text-blue-400 mt-3 hover:underline" onClick={handleBack}>
        Back
      </button>
    </div>
  );
}