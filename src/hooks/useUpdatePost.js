import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

function useUpdatePost(api) {
  const queryClient = useQueryClient();
  const navigate = useNavigate('/');

  async function updatePost(formData) {
    const token = localStorage.getItem('token');

    const data = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData,

    }

    const response = await fetch(`${api}/posts`, data);

    if (!response.ok) {
      throw new Error("Invalid Request!");
    }

    return response.json();

  }

  return useMutation({
    mutationFn: updatePost,
    onSuccess: function () {
      queryClient.invalidateQueries("blogData");
      navigate('/');
    },
    onError: () => {
      alert("Invalid Request");
      navigate('/');
    }
  })
}
export default useUpdatePost;