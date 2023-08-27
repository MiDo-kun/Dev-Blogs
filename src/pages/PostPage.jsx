import { useNavigate, useParams } from "react-router-dom";
import CommentSection from "../sections/comments/CommentSection";
import AdminOptions from "./AdminOptions";
import useGetPostById from './../hooks/useGetPostById';
import ScreenLoader from "../sections/ScreenLoader";
import MetaData from "../../MetaData";

const PostPage = () => {
  const navigate = useNavigate('');
  const { id } = useParams();
  const BLOG_ENDPOINT = import.meta.env.VITE_BLOG_ENDPOINT;
  const { postInfo, isLoading } = useGetPostById(BLOG_ENDPOINT, id);


  if (isLoading) {
    return (<ScreenLoader />);
  }

  const datePosted = new Date(postInfo.updatedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="mx-auto px-[8px] mt-10">
      <MetaData {...postInfo} />
      <AdminOptions />
      <div className="mb-5 mx text-white">
        <h1 className="text-xl font-semibold text-amber-400">
          {postInfo.title}
        </h1>
        <div className="text-sm my-1 ml-[.04rem] text-red-500">
          at {datePosted}
        </div>
      </div>
      <div className="ql-editor"
        dangerouslySetInnerHTML={{ __html: postInfo.content }} >
      </div>
      <div className="flex justify-between mt-3"
        onClick={() => navigate('/')}>
        <button className="flex items-center text-blue-400 mt-3 hover:underline">
          Back
        </button>
        {/* <a href={`${window.location.origin}/post/${nextPost._id}`} className="flex items-center text-blue-400 hover:underline" onClick={() => window.location.href = `${window.location.origin}/post/${nextPost._id}`}>
          Next
        </a> */}
      </div>
      <CommentSection />
    </div>
  );
}

export default PostPage;