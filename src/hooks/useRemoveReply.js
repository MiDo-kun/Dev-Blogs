import queryClient from "../config/queryClient";
import { useMutation } from "@tanstack/react-query";

function useRemoveReply(api, postId, commentId) {
  async function removeReply(replyId) {
    const token = localStorage.getItem("token");
    const data = {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }

    const response = await fetch(`${api}/posts/${postId}/comment/${commentId}/reply/${replyId}`, data);

    if (!response.ok) return alert("Connot remove reply!");

    return queryClient.invalidateQueries(['replies'], commentId);
  }

  return useMutation({
    mutationFn: removeReply,
    onError: function (err) {
      alert(err.message);
    }
  })
}


export default useRemoveReply;