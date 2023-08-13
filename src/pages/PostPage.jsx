import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import { Link, useNavigate, useParams } from "react-router-dom";
import ScreenLoader from "../sections/ScreenLoader";
import CommentSection from "../sections/comments/CommentSection";

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
    })
      .then(response => {
        response.ok && isAuthenticated(true)
      }).catch(err => console.log(err))

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

  // return (<CommentSection />);

  if (!postInfo) {
    return (<ScreenLoader />)
  }

  return (
    <div className="mx-auto px-[8px] mt-10">
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
          <div className="mb-5 mx text-white">
            <h1 className="text-xl font-semibold text-amber-400">{postInfo.title}</h1>
            <div className="text-sm my-1 ml-[.04rem] text-red-500">at {datePosted}</div>
          </div>
          <div className="ql-editor" dangerouslySetInnerHTML={{ __html: postInfo.content }} >
          </div>
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

          <CommentSection />
        </>
      }
    </div>
  );
}

export default PostPage;