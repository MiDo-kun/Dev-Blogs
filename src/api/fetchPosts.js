async function fetchPosts(api) {
  const response = await fetch(api + '/posts');
  return response.json();
}

export default fetchPosts;