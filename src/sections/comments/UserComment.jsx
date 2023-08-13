import { useState } from "react";
import CommentSettings from "./CommentSettings";
import UserProfile from "./UserProfile";
import UserReply from "./UserReply";
import CommentTextBox from "./CommentTextBox";


const UserComment = () => {
  const [textBox, showTextBox] = useState(false);

  const toggleTextbox = () => {
    showTextBox(!textBox);
  }

  return (
    <article className="py-4 mb-3 ml-2 bg-inherit text-base rounded-lg">
      <footer className="flex justify-between items-center mb-2">
        <UserProfile />
        <CommentSettings />
      </footer>
      <p className="text-[15px] text-gray-300">
        Very straight-to-point article. Really worth time reading. Thank you! But tools are just the
        instruments for the UX designers. The knowledge of the design tools are as important as the
        creation of the design strategy.;
      </p>
      <div className="flex items-center my-4 space-x-4" >
        <button
          onClick={toggleTextbox}
          type="button"
          className="flex items-center text-sm text-blue-500 hover:underline">
          <svg aria-hidden="true" className="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
          Reply
        </button>
      </div>

      {textBox &&
        <CommentTextBox text={"Reply"} rows={1}/>
      }
      <UserReply />
      <UserReply />
    </article>
  )
}

export default UserComment;