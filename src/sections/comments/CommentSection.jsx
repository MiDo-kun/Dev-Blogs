import CommentTextBox from "./CommentTextBox";
import UserComment from './UserComment';

const CommentSection = () => {
  return (
    <>
      <section className="pt-8 mb-10">
        <h2 className="pb-3 text-lg font-bold text-white">Discussion (20)</h2>
        <CommentTextBox text={"Post a Comment"} rows={3} />
        <UserComment />
      </section>
    </>
  );
}


export default CommentSection;