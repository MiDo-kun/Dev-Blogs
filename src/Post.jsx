import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

export default function Post({ _id, title, summary, cover, createdAt, author }) {
  const BLOG_ENDPOINT = import.meta.env.VITE_BLOG_ENDPOINT;

  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={BLOG_ENDPOINT + "/" + cover} alt="" />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <div className="info">
          <p className="author">{author.username}</p>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </div>
        <p className="summary">{summary}</p>
      </div>
    </div >
  );
}