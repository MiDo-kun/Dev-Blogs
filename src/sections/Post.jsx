import { useNavigate } from 'react-router-dom';

function Post({ _id, title, cover, content, createdAt }) {
  const navigate = useNavigate();
  const datePosted = new Date(createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  // Passing props from post to postpage
  function navigateToPostPage() {
    navigate(`/post/${_id}`);
  }

  function calculateReadingTime(words, wordsPerMinute = 200) {
    const minutes = words / wordsPerMinute;
    return Math.ceil(minutes); // Round up to the nearest minute
  }
  const totalWords = content.split(/\s+/).length;
  const readingTime = calculateReadingTime(totalWords);

  return (
    <div className="flex gap-3 mb-5 bg-gray-200 p-3 rounded text-white hover:cursor-pointer" onClick={navigateToPostPage}>
      <div className="w-1/3">
        <img src={cover} alt={title} />
      </div>
      <div className="flex flex-col justify-between w-2/3">
        <h2 id="blog-title" className="text-[1.04rem] text-blue-800 mb-1 -ml-[1px] font-extrabold hover:underline">{title}</h2>
        <div className="flex gap-3">
          <time className="text-xs font-semibold text-gray-600">{datePosted}</time>
          <span className="text-xs font-semibold text-gray-600">{readingTime} min. read</span>
        </div>
      </div>
    </div >
  );
}

export default Post;