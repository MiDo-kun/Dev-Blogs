import { useQuery } from '@tanstack/react-query';

function useAdminAuth(api) {
  const { data, isLoading } = useQuery({
    queryKey: ['admin'],
    queryFn: async function () {
      const token = localStorage.getItem('token');
      const data = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      const response = await fetch(`${api}/auth/profile`, data);
      console.clear();
      return response.json();
    }
  })
  return { role: data, isLoading };
}

export default useAdminAuth;