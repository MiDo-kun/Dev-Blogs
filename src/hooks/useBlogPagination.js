import { useQuery } from '@tanstack/react-query';

function useBlogPagination(api, page = 0, search = '') {
  const { isLoading, data, isError, refetch } = useQuery({
    queryKey: ['page', page],
    queryFn: async function () {
      const response = await fetch(`${api}/posts?page=${page}&search=${search}`);
      if (!response.ok)
        throw new Error("Fetching Blog Posts Failed");

      const json = await response.json();
      const posts = json.posts;
      return posts;
    },

    keepPreviousData: true
  })


  return { posts: data, isLoading, isError, refetch };
}


export default useBlogPagination;