import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ScreenLoader from '../sections/ScreenLoader';
import useDeletePost from '../hooks/useDeletePost';
import useAdminAuth from '../hooks/useAdminAuth';

const DeletePost = () => {
  const BLOG_ENDPOINT = import.meta.env.VITE_BLOG_ENDPOINT;
  const { id } = useParams()
  const deletePost = useDeletePost(BLOG_ENDPOINT, id);
  const [called, isCalled] = useState(true);
  const { role } = useAdminAuth(BLOG_ENDPOINT);

  if (!role) return;

  if (called) {
    deletePost.mutate();
    isCalled(false);
  }

  return (<ScreenLoader />)
}

export default DeletePost;
