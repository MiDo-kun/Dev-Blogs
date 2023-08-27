import { useMutation, } from "@tanstack/react-query";
import queryClient from "../config/queryClient";

function useAddReply(api, postId, commentId) {

  async function addReply(reply) {
    const token = localStorage.getItem("token");
    const data = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ "reply": reply })
    }

    const response = await fetch(`${api}/posts/${postId}/comment/${commentId}/reply`, data);

    if (!response.ok) {
      throw new Error("Cannot add new reply!");
    }

    return queryClient.invalidateQueries('replies', commentId);
  }


  return useMutation({
    mutationFn: addReply,
    onError: function (err) {
      return alert(err.message);
    }
  },
  );
}


export default useAddReply;