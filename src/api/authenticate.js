async function authenticateUser(username, password) {
  const BLOG_ENDPOINT = import.meta.env.VITE_BLOG_ENDPOINT;
  const response = await fetch(BLOG_ENDPOINT + '/auth/login', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ username, password })
  });

  return response.json();
}

export default authenticateUser;