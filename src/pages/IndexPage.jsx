import Post from '../sections/Post'
import { useEffect, useState } from "react";

function getReadingTime(content) {
  const wordsPerMinute = 200; // Average reading speed in words per minute
  const wordCount = content.split(/\s+/).length; // Split the content into words and count them
  const readingTime = Math.ceil(wordCount / wordsPerMinute); // Calculate the reading time in minutes
  return readingTime;
}

const IndexPage = () => {
  const BLOG_ENDPOINT = import.meta.env.VITE_BLOG_ENDPOINT;
  const postsPerPage = 5;

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(BLOG_ENDPOINT + '/posts').then(response => {
      response.json().then(posts => {
        setPosts(posts);
      });
    }).catch(() => {
      alert("Connection Error")
      location.reload();
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
      {currentPosts.length > 0 ? (
        currentPosts.map(post => (
          <Post key={post._id} {...post} readingTime={getReadingTime(post.content)} />
        ))) :
        <div className="flex flex-wrap justify-center mt-5">
          <svg className="inine-block animate-spin -ml-1 mr-1 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-sm text-gray-200">Fetching All Blogs...</p>
        </div>}
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

export default IndexPage;