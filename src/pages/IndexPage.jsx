import Post from "../Post";
import { useEffect, useState } from "react";
import Profile from './../Profile'

export default function IndexPage() {
  const BLOG_ENDPOINT = import.meta.env.VITE_BLOG_ENDPOINT;
  const postsPerPage = 5;

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(BLOG_ENDPOINT + '/post').then(response => {
      response.json().then(posts => {
        setPosts(posts);
      });
    });
  }, []);

  // Calculate the index of the first and last post to display on the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // Get the posts to display on the current page
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Calculate the total number of pages based on the number of posts and posts per page
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Handle pagination button clicks
  const handlePrevClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <Profile />
      {currentPosts.length > 0 ? (
        currentPosts.map(post => (
          <Post key={post._id} {...post} />
        ))) : <p className="text-xs text-gray-200">Fetching Blogs...</p>}
      {totalPages > 1 && (
        <div className="flex justify-end gap-2 mt-2">
          <button
            className={`px-2 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400 text-gray-700 hover:text-white'} `}
            onClick={handlePrevClick}
            disabled={currentPage === 1}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6l6 6l1.41-1.41z" /></svg>
          </button>
          <button
            className={`px-2 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400 text-gray-700 hover:text-white'} `}
            onClick={handleNextClick}
            disabled={currentPage === totalPages}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M9.4 18L8 16.6l4.6-4.6L8 7.4L9.4 6l6 6l-6 6Z" /></svg>
          </button>
        </div>
      )}
    </>
  );
}