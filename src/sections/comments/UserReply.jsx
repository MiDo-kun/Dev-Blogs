import ReplySettings from "./ReplySettings";

const UserReply = ({ postId, commentId, _id, user, reply, updatedAt }) => {
  const replyPosted = new Date(updatedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  return (
    <article className="px-3 py-1 my-2 ml-6 text-base bg-inherit rounded-lg outline-none">
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-white"><img
            className="mr-2 w-6 h-6 rounded-full"
            src={user.photo}
            alt={user.name} />{user.name}</p>
          <p className="text-sm text-gray-600">
            <time title="February 12th, 2022">{replyPosted}</time>
          </p>
        </div>
        <ReplySettings userId={user._id} postId={postId} commentId={commentId} replyId={_id} />
      </footer>
      <p className="text-[15px] text-gray-300">
        {reply}
      </p>
    </article>
  );
}

export default UserReply;