import { useQuery } from "@tanstack/react-query";

function useUsersReplies(api, postId, commentId) {

  async function getAllUserReply() {
    const token = localStorage.getItem("token");
    const data = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }

    const response = await fetch(`${api}/posts/${postId}/comment/${commentId}`, data);

    if (!response.ok) {
      return new Error("Connection Error!");
    }

    return response.json();
  }


  const { data, isLoading, isError } = useQuery({
    queryKey: ['replies', commentId],
    queryFn: getAllUserReply
  });


  return { replies: data, isLoading, isError };
}

export default useUsersReplies;