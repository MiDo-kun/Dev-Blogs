const CommentTextBox = ({ text, rows }) => {
  return (
    <form className="mb-6">
      <div className="pt-4 pb-2 px-4 mb-2 bg-inherit rounded-lg rounded-t-lg border border-gray-400">
        <label className="sr-only">Your comment</label>
        <textarea id="comment" rows={rows}
          className="px-0 w-full text-sm bg-inherit text-white border-0 focus:ring-0 focus:outline-none"
          placeholder="Write a comment..." required></textarea>
      </div>
      <button type="submit"
        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-yellow-400 border-[1.5px] border-white rounded-md focus:bg-slate-700  hover:ring-2 focus:ring-primary-200">
        {text}
      </button>
    </form>
  )
}


export default CommentTextBox;