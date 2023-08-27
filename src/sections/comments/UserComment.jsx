import { useState } from "react";
import CommentSettings from "./CommentSettings";
import UserProfile from "./UserProfile";
import useUsersReplies from "../../hooks/useUsersReplies";
import UserReply from './UserReply';
import useAddReply from "../../hooks/useAddReply";
import useAdminAuth from "../../hooks/useAdminAuth";

const UserComment = ({ _id, user, postId, comment, updatedAt }) => {
  const BLOG_ENDPOINT = import.meta.env.VITE_BLOG_ENDPOINT;
  const [reply, setReply] = useState('');
  const [textBox, showTextBox] = useState(false);
  const { replies } = useUsersReplies(BLOG_ENDPOINT, postId, _id);
  const addReply = useAddReply(BLOG_ENDPOINT, postId, _id);
  const { role } = useAdminAuth(BLOG_ENDPOINT);

  function toggleTextbox() {
    showTextBox(!textBox);
  }

  function handleUserReply(event) {
    event.preventDefault();
    if (!reply) return;

    addReply.mutate(reply);
    setTimeout(() => {
      setReply('')
      showTextBox(false);
    }, 500);
  }

  return (
    <article className="pt-4 mb-3 ml-2 bg-inherit text-base rounded-lg">
      <footer className="flex justify-between items-center mb-2">
        <UserProfile {...user} updatedAt={updatedAt} />
        {(role.user === 'admin' || role._id === user._id) &&
          <CommentSettings commentId={_id} postId={postId} />}
      </footer>

      <p className="text-[15px] text-gray-300">
        {comment}
      </p>

      {role.user &&
        <div className="flex items-center my-4 space-x-4" >
          <button
            onClick={toggleTextbox}
            type="button"
            className="flex items-center text-sm text-blue-500 hover:underline">
            <svg aria-hidden="true" className="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
            Reply
          </button>
        </div>
      }

      {textBox &&
        <form className="mb-6">
          <div className="pt-4 pb-2 px-4 mb-2 bg-inherit rounded-lg rounded-t-lg border border-gray-400">
            <textarea rows={1}
              onChange={(event) => setReply(event.target.value)}
              className="px-0 w-full text-sm bg-inherit text-white border-0 focus:ring-0 focus:outline-none"
              placeholder="Write a comment..." required></textarea>
          </div>
          <button type="submit"
            onClick={handleUserReply}
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-yellow-400 border-[1.5px] border-gray-400 rounded-md focus:bg-slate-700  hover:ring-2 focus:ring-primary-200">
            Reply
          </button>
        </form>
      }

      {replies && replies.map(reply => {
        return (<UserReply
          key={reply._id}
          postId={postId}
          commentId={_id}
          {...reply}
        />)
      })
      }
    </article>
  )
}

export default UserComment;