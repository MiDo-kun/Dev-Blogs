function LoginPage() {
  const BLOG_ENDPOINT = import.meta.env.VITE_BLOG_ENDPOINT;
  window.location.href = `${BLOG_ENDPOINT}/auth/google`;
}

export default LoginPage;