import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import { Link, useNavigate, useParams } from "react-router-dom";

const PostPage = () => {
  const BLOG_ENDPOINT = import.meta.env.VITE_BLOG_ENDPOINT;

  const [cookie] = useCookies();
  const [authenticated, isAuthenticated] = useState(false);
  const [postInfo, setPostInfo] = useState(null);
  const [datePosted, setDatePosted] = useState(Date);
  const [nextPost, setNextPost] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const { token } = cookie;
    fetch(BLOG_ENDPOINT + '/auth/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      },
    }).then(response => response.ok && isAuthenticated(true))

    fetch(BLOG_ENDPOINT + `/posts/${id}`)
      .then(response => {
        response.json().then(postInfo => {
          setPostInfo(postInfo);

          postInfo.createdAt = new Date(datePosted).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

          setDatePosted(postInfo.createdAt);
        })
      })
      .catch(() => {
        alert("Connection Error!");
        window.location = window.location.origin;
      })

    fetch(BLOG_ENDPOINT + '/posts')
      .then(response => {
        response.json().then(posts => {
          const currentPostIndex = posts.findIndex(post => post._id == id);
          const nextPostID = currentPostIndex < (posts.length - 1) ? posts[currentPostIndex + 1] : null;
          setNextPost(nextPostID);
        });
      })
  }, []);

  const handleBack = () => {
    navigate('/');
  };

  if (!postInfo)
    return (
      <div className="flex flex-wrap justify-center  mt-5">
        <svg className="inine-block animate-spin -ml-1 mr-1 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-sm text-gray-200">Fetching Content...</p>
      </div>
    )

  return (
    <div className="mx-auto w-[445px] mt-10">
      {authenticated &&
        <div className="flex justify-center gap-3 mb-3 text-center text-white text-md">
          <Link to={`/edit/${id}`}>
            <span className="text-blue-500">Edit</span>
          </Link>
          <Link to={`/delete/${id}`}>
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

export default PostPage;