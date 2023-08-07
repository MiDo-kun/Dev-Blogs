import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function PostPage() {
  const BLOG_ENDPOINT = import.meta.env.VITE_BLOG_ENDPOINT;
  const [cookie] = useCookies();
  const [authenticated, isAuthenticated] = useState(false);
  const [postInfo, setPostInfo] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [datePosted, setDatePosted] = useState(Date);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = cookie.token;
    fetch(BLOG_ENDPOINT + '/auth/post', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      },
    }).then(response => response.ok && isAuthenticated(true));

    fetch(BLOG_ENDPOINT + `/posts/${id}`)
      .then(response => {
        response.json().then(postInfo => {
          console.log(postInfo);
          setPostInfo(postInfo);

          postInfo.createdAt = new Date(datePosted).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

          setDatePosted(postInfo.createdAt);

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

  if (!authenticated) return (
    <div className="flex flex-wrap content-center  mt-5">
      <svg className="inine-block animate-spin -ml-1 mr-1 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p className="text-sm text-gray-200">Fetching Blog...</p>
    </div>
  )

  // Find the index of the current post in the list of all posts
  const currentIndex = allPosts.findIndex(post => post._id === postInfo._id);

  // Get the next post, or null if there is no next post
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <div className="mx-auto w-[445px] mt-10">
      {authenticated &&
        <div className="flex justify-center gap-3 text-center text-white text-md">
          <Link to={`/edit/${id}`}>
            <span className="text-blue-500">Edit</span>
          </Link>
          <Link to={`/edit/${id}`}>
            <span className="text-red-500">Delete</span>
          </Link>
        </div>
      }
      {postInfo &&
        <>
          <div className="mb-5 text-white">
            <h1 className="text-xl font-semibold text-amber-400">{postInfo.title}</h1>
            <div className="text-sm my-1 ml-[.04rem] text-red-500">at {datePosted}</div>
          </div>
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
        </>
      }

    </div>
  );
}