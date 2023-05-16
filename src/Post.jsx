import { Link } from "react-router-dom";

export default function Post({ _id, title, cover, createdAt, readingTime }) {

  const datePosted = new Date(createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  return (
    <div className="flex gap-3 mb-5 bg-slate-950 p-5 rounded text-white">
      <div className="w-1/3">
        <Link to={`/post/${_id}`}>
          <img src={cover} alt={title} />
        </Link>
      </div>
      <div className="flex flex-col justify-between w-2/3">
        <Link to={`/post/${_id}`}>
          <h2 className="text-blue-400 hover:underline">{title}</h2>
        </Link>
        <div className="flex gap-3">
          {/* <p className="author font-bold">- {author.username}</p> */}
          <time className="text-xs text-gray-400">{datePosted}</time>
          <span className="text-xs text-gray-400">{readingTime} min. read</span>
        </div>
      </div>
    </div >
  );
}