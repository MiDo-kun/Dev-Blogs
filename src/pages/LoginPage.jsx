import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useCookies } from "react-cookie";

export default function LoginPage() {
  const BLOG_ENDPOINT = import.meta.env.VITE_BLOG_ENDPOINT;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const [, setCookie] = useCookies();

  async function login(event) {
    event.preventDefault();
    const response = await fetch(BLOG_ENDPOINT + '/auth/login', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
    if (response.ok) {
      response.json().then(userInfo => {
        const maxAge = new Date(new Date().getTime() + userInfo.maxAge);
        setCookie('token', userInfo.token, { expires: maxAge });
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert('Wrong Credentials!');
    }
  }

  if (redirect) {
    alert("Login Sucessfully!");
    return <Navigate to={'/'} />
  }

  return (
    <form className="flex flex-col w-4/6 mx-auto text-center" onSubmit={login}>
      <h1 className="text-2xl font-bold my-4 text-red-500">Developer's <br /> Authentication Page</h1>
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
      <button type="submit" className="w-1/3 mx-auto mt-3 border-2  border-white-400 px-2 py-1 font-black text-lg text-white hover:text-black hover:bg-gray-400">Login</button>
    </form>
  );
}