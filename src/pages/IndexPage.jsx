import Post from "../Post";
import { useEffect, useState } from "react";

export default function IndexPage() {
  const BLOG_ENDPOINT = import.meta.env.VITE_BLOG_ENDPOINT;
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(BLOG_ENDPOINT + '/post').then(response => {
      response.json().then(posts => {
        setPosts(posts);
      });
    });
  }, []);
  return (
    <>
      {posts.length > 0 && posts.map(post => (
        <Post key={post._id} {...post} />
      ))}
    </>
  );
}