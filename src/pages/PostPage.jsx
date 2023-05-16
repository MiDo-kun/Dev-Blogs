import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { Link } from 'react-router-dom';

export default function PostPage() {
  const BLOG_ENDPOINT = import.meta.env.VITE_BLOG_ENDPOINT;

  const [postInfo, setPostInfo] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(BLOG_ENDPOINT + `/posts/${id}`)
      .then(response => {
        response.json().then(postInfo => {
          setPostInfo(postInfo);
        });
      });

    fetch(BLOG_ENDPOINT + '/posts')
      .then(response => {
        response.json().then(posts => {
          setAllPosts(posts);
        });
      });
  }, []);

  const handleBack = () => {
    navigate('/');
  };

  if (!postInfo) return '';

  const datePosted = new Date(postInfo.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  // Find the index of the current post in the list of all posts
  const currentIndex = allPosts.findIndex(post => post._id === postInfo._id);

  // Get the next post, or null if there is no next post
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <div className="mx-auto w-[445px] mt-10">
      <div className="mb-5 text-white">
      {!allPosts && <p className="text-xs text-gray-200">Fetching Blogs...</p>}
        <h1 className="text-xl font-semibold text-amber-400">{postInfo.title}</h1>
        <div className="text-sm my-1 ml-[.04rem] text-red-500">At {datePosted}</div>
      </div>
      {userInfo.id === postInfo.author._id && (
        <div className="flex justify-center text-white">
          <Link to={`/edit/${postInfo._id}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            <span>Edit</span>
          </Link>
        </div>
      )}

      <div className="text-base text-justify" dangerouslySetInnerHTML={{ __html: postInfo.content }} />
      <div className="flex justify-between mt-3">
        <button className="flex items-center text-blue-400 mt-3 hover:underline" onClick={handleBack}>
          Back
        </button>
        {nextPost && (
          <a href={`${window.location.origin}/post/${nextPost._id}`} className="flex items-center text-blue-400 hover:underline" onClick={() => window.location.href = `${window.location.origin}/post/${nextPost._id}`}>
            Next
          </a>
        )}
      </div>
    </div>
  );
}