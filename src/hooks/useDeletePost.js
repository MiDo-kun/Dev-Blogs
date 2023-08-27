import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

function useDeletePost(api, id) {
  const queryClient = useQueryClient();
  const navigate = useNavigate('/');

  async function updatePost() {
    const token = localStorage.getItem('token');

    const data = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      },
    }

    const response = await fetch(`${api}/posts/${id}`, data);

    if (!response.ok) {
      navigate('/');
    }

    return response.json();
  }

  return useMutation({
    mutationFn: updatePost,
    onSuccess: function () {
      queryClient.invalidateQueries("blogData");
      navigate('/');
    }
  })
}

export default useDeletePost;