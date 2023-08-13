import { Link } from "react-router-dom";

export default function Post({ _id, title, cover, createdAt, readingTime }) {

  const datePosted = new Date(createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  return (
    <div className="flex gap-3 mb-5 bg-gray-200 p-3 rounded text-white">
      <div className="w-1/3">
        <Link to={`/post/${_id}`}>
          <img src={cover} alt={title} />
        </Link>
      </div>
      <div className="flex flex-col justify-between w-2/3">
        <Link to={`/post/${_id}`}>
          <h2 id="blog-title" className="text-[1.04rem] text-blue-800 mb-1 -ml-[1px] font-extrabold hover:underline">{title}</h2>
        </Link>
        <div className="flex gap-3">
          {/* <p className="author font-bold">- {author.username}</p> */}
          <time className="text-xs font-semibold text-gray-600">{datePosted}</time>
          <span className="text-xs font-semibold text-gray-600">{readingTime} min. read</span>
        </div>
      </div>
    </div >
  );
}