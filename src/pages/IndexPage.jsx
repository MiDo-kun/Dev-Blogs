import Post from '../sections/Post'
import ScreenLoader from '../sections/ScreenLoader';
import useBlogData from '../hooks/useBlogPagination';
import { useState } from 'react';
import SearchBar from '../sections/Search';
import MetaData from '../../MetaData';

function IndexPage() {
  const BLOG_ENDPOINT = import.meta.env.VITE_BLOG_ENDPOINT; const [page, setPage] = useState(0);
  let { posts, isLoading, isError } = useBlogData(BLOG_ENDPOINT, page);

  if (isError) {
    return alert("Connection Error!");
  }

  if (isLoading) {
    return (<ScreenLoader />)
  }

  if (posts) {
    return (
      <>
        {/* Update Meta Tags */}
        <MetaData title={"Dev Blogs"} />
        
        {/* Search Bar Input*/}
        <SearchBar />

        {/* Get All Posts */}
        {posts.map((post) => {
          return (<Post key={post._id} {...post} />)
        })}

        {posts.length === 0 &&
          <h1 className='ml-1 text-red-500'>No Blogs!</h1>
        }

        {/* Pagination */}
        < div className="flex justify-end gap-2 mt-2" >
          {/* Previous Button */}
          < button
            className={`px-2 py-1 rounded-md 
          ${page <= 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400 text-gray-700 hover:text-white'} `}
            onClick={() => { setPage(page - 1) }}
            disabled={page <= 0}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="currentColor" d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6l6 6l1.41-1.41z" /></svg>
          </button>

          {/* Next Button */}
          <button
            className={`px-2 py-1 rounded-md 
          ${posts.length !== 5 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400 text-gray-700 hover:text-white'} `}
            onClick={() => { setPage(page + 1) }}
            disabled={posts.length !== 5}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="currentColor" d="M9.4 18L8 16.6l4.6-4.6L8 7.4L9.4 6l6 6l-6 6Z" /></svg>
          </button>
        </div >
      </>
    );
  }

}

export default IndexPage;