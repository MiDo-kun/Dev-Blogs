import CommentSettings from './CommentSettings';

const UserReply = () => {
  return (
    <article className="px-3 py-1 my-2 ml-6 text-base bg-inherit rounded-lg outline-none">
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-white"><img
            className="mr-2 w-6 h-6 rounded-full"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            alt="Jese Leos" />Jese Leos</p>
          <p className="text-sm text-gray-600">
            <time title="February 12th, 2022">Feb. 12, 2022</time>
          </p>
        </div>
        <CommentSettings />
      </footer>
      <p className="text-[15px] text-gray-300">Much appreciated! Glad you liked it ☺️</p>
    </article>
  );
}

export default UserReply;