import { useQuery } from "@tanstack/react-query";

function usePostComments(api, id) {
  async function getAllComments() {
    const response = await fetch(`${api}/posts/${id}/comment`)
    return response.json()
  }

  const { isLoading, data, isError } = useQuery({
    queryKey: ['comments', id],
    queryFn: getAllComments
  })

  return { comments: data, isLoading, isError };
}

export default usePostComments;