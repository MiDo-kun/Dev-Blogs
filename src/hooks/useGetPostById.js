import { useQuery } from '@tanstack/react-query';

function useGetPostById(api, id) {

  async function getPostById() {
    const token = localStorage.getItem('token');
    const data = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const response = await fetch(`${api}/posts/${id}`, data);

    if (!response.ok) {
      throw new Error("Fetching Blog Post Failed.");
    }
    const post = await response.json();
    return post;
  }

  const { data, isLoading } = useQuery({
    queryKey: ['post', id],
    queryFn: getPostById,
    onError: function (err) {
      return alert(err.message);
    }
  })

  return { postInfo: data, isLoading };
}

export default useGetPostById;