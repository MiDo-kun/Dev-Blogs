import UserComment from './UserComment';
import { useParams } from 'react-router-dom';
import usePostComments from "../../hooks/usePostComments";
import ScreenLoader from "../ScreenLoader";
import useAddComment from "../../hooks/useAddComment";
import { useState } from 'react';
import useAdminAuth from '../../hooks/useAdminAuth';

function CommentSection() {
  const BLOG_ENDPOINT = import.meta.env.VITE_BLOG_ENDPOINT;
  const { id } = useParams();
  const { comments, isLoading, isError } = usePostComments(BLOG_ENDPOINT, id);
  const [comment, setComment] = useState('');
  const addNewComment = useAddComment(BLOG_ENDPOINT, id, comment);
  const { role } = useAdminAuth(BLOG_ENDPOINT);

  if (isLoading || !role) {
    return (<ScreenLoader />)
  }

  if (isError) {
    return (alert("Error Occured!"));
  }

  function handlePostComment(event) {
    event.preventDefault();
    addNewComment.mutate(BLOG_ENDPOINT, id, comment);
    if (comment.length !== 0) {
      // Reset the comment value after 100 milliseconds 
      setTimeout(() => setComment(""), 100);
    }
  }

  function handleGoogleAuth(event) {
    event.preventDefault();
    window.location.href = `${BLOG_ENDPOINT}/auth/google`;
  }

  return (
    <>
      <section className="pt-8 mb-10">
        <h2 className="pb-3 text-lg font-bold text-white">
          Discussion ({comments.length})
        </h2>

        {/* Login With Google */}
        {!role.user &&
          <div className="py-4 flex justify-center w-full">
            <button
              onClick={handleGoogleAuth}
              className="px-4 py-2 border flex gap-2 border-blue-400 rounded-lg text-white text-sm hover:bg-blue-300 hover:border-slate-900  hover:shadow transition duration-150">
              <img className="w-5 h-5" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
              <span>Login with Google</span>
            </button>
          </div>
        }

        {role.user &&
          <form className="mb-6">
            <div className="pt-4 pb-2 px-4 mb-2 bg-inherit rounded-lg rounded-t-lg border border-gray-400">
              <label className="sr-only">Your comment</label>
              <textarea id="comment" rows={3}
                value={comment}
                onChange={ev => setComment(ev.target.value)}
                className="px-0 w-full text-sm bg-inherit text-white border-0 focus:ring-0 focus:outline-none"
                placeholder="Write a comment..." required></textarea>
            </div>
            <button
              onClick={handlePostComment}
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-yellow-400 border-[1.5px] border-gray-400 rounded-md active:bg-slate-700 hover:ring-2 focus:ring-primary-200 outline-none">
              Post a comment
            </button>
          </form>
        }

        {comments.map(comment => {
          return <UserComment key={comment._id} {...comment} postId={id} />
        })}
      </section>
    </>
  );
}


export default CommentSection;