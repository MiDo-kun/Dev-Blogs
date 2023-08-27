import { useMutation } from "@tanstack/react-query";
import queryClient from "../config/queryClient";

function useRemoveComment(api, postId, commentId) {
  async function removeComment() {

    const token = localStorage.getItem("token");
    const data = {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${token}`
      },
    }

    const response = await fetch(`${api}/posts/${postId}/comment/${commentId}`, data);
    if (!response.ok) {
      return new Error("You are not allowed to remove the comment!");
    }

    queryClient.invalidateQueries('comments')

    return response.ok;
  }

  return useMutation({
    mutationFn: removeComment,
    onError: function (err) {
      alert(err.message);
    },
  })
}


export default useRemoveComment;