import { useMutation } from "@tanstack/react-query";
import queryClient from "../config/queryClient";

function useAddComment(api, id, comment) {
  async function addComment() {
    if (!comment) return alert("Empty Comment Value!");

    const token = localStorage.getItem("token");
    const data = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ "comment": comment })
    }

    const response = await fetch(`${api}/posts/${id}/comment`, data);

    if (!response.ok) {
      return new Error("You are not logged in");
    }

    queryClient.invalidateQueries('userComments')

    return response.ok;
  }

  return useMutation({
    mutationFn: addComment,
    onError: function () {
      alert("Connection Error!");
    },
  })

}


export default useAddComment;