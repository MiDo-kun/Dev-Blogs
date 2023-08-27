import { useNavigate, useParams } from "react-router-dom";
import useAdminAuth from "../hooks/useAdminAuth";

function AdminOptions() {
  const { id } = useParams();
  const navigate = useNavigate();

  const BLOG_ENDPOINT = import.meta.env.VITE_BLOG_ENDPOINT;
  const { role, isLoading } = useAdminAuth(BLOG_ENDPOINT);

  if (isLoading) return;
  
  if (role.user === 'admin') {
    return (
      <div className="flex justify-center gap-3 mb-3 text-center text-white text-md cursor-pointer">
        <span className="text-blue-500"
          onClick={() => navigate(`/edit/${id}`)}>
          Edit
        </span>
        <span className="text-red-500"
          onClick={() => navigate(`/delete/${id}`)}>
          Delete
        </span>
      </div>
    )
  }
}

export default AdminOptions;