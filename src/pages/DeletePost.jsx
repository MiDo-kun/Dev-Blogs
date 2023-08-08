import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';

const DeletePost = () => {
  const BLOG_ENDPOINT = import.meta.env.VITE_BLOG_ENDPOINT;
  const { id } = useParams();
  const [cookie] = useCookies();

  const token = cookie.token;
  const data = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  fetch(BLOG_ENDPOINT + `/posts/${id}`, data)
    .then(() => {
      const indexPage = window.location.origin;
      window.location = indexPage;
    }).catch(() => console.log("Connection Error!"));

  return (
    <div className="flex flex-wrap content-center  mt-5">
      <svg className="inine-block animate-spin -ml-1 mr-1 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p className="text-sm text-gray-200">Deleting Blog...</p>
    </div>
  )
}

export default DeletePost;
