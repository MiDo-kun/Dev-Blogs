import { useState } from "react";

const CommentSettings = () => {
  const [show, showDropdown] = useState(false);
  const toggleDropDown = () => {
    showDropdown(!show);
  }
  return (
    <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
      onClick={(toggleDropDown)} className="inline-flex p-2 text-sm font-medium text-center text-gray-400 rounded-lg outline-none hover:text-blue-400"
      type="button">
      <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
        </path>
      </svg>
      <span className="sr-only">Comment settings</span>
      {show &&
        <div className="mt-4 -ml-36">
          <div id="dropdownComment1" className="absolute  z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow"> <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownMenuIconHorizontalButton">
            <li>
              <a href="#"
                className="block py-2 px-4 hover:bg-gray-100">Remove</a>
            </li>
          </ul>
          </div>
        </div>
      }
    </button>
  )
}

export default CommentSettings;