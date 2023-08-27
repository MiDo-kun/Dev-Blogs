import { useState } from "react";
import useBlogPagination from "../hooks/useBlogPagination";

function SearchBar() {
  const [text, setText] = useState('');
  const BLOG_ENDPOINT = import.meta.env.VITE_BLOG_ENDPOINT;
  const searchBlogs = useBlogPagination(BLOG_ENDPOINT, 0, text);

  function handleSubmit(ev) {
    ev.preventDefault();
    searchBlogs.refetch();
  }

  return (
    <form className="mb-6">
      <div className="flex uppercase">
        <div className="relative w-full">
          <input onChange={(ev) => setText(ev.target.value)} type="search" id="search-dropdown" className="block px-4 py-2.5 w-full z-20 text-base text-gray-900 bg-gray-50 rounded-lg border-l-gray-50 border-l-2 border border-gray-300 outline-none  dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Blogs..." required />

          <button
            onClick={handleSubmit}
            type="submit" className="text-white absolute right-2.5 bottom-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div>
      </div>
    </form>
  )
}


export default SearchBar;