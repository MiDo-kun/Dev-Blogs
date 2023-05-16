import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const BLOG_ENDPOINT = import.meta.env.VITE_BLOG_ENDPOINT;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  async function login(ev) {
    ev.preventDefault();
    const response = await fetch(BLOG_ENDPOINT + '/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (response.ok) {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert('wrong credentials');
    }
  }

  if (redirect) {
    alert("Login Sucessfully!");
    return <Navigate to={'/'} />
  }

  return (
    <form className="flex flex-col w-4/6 mx-auto text-white text-center" onSubmit={login}>
      <h1 className="text-2xl font-bold my-4">Login</h1>
      <input type="text"
        className="px-2 py-1 my-2"
        placeholder="Username"
        value={username}
        onChange={ev => setUsername(ev.target.value)} />
      <input type="password"
        className="px-2 py-1 my-1"
        placeholder="Password"
        value={password}
        onChange={ev => setPassword(ev.target.value)} />
      <button type="submit" className="w-1/3 mx-auto mt-3 outline outline-1 outline-gray-500 px-2 py-1 font-bold text-sm hover:text-black hover:bg-gray-400">Login</button>
    </form>
  );
}