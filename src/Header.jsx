// import { Link } from "react-router-dom";
// import { useContext, useEffect, } from "react";
// import { UserContext } from "./UserContext";

export default function Header() {
  // const { setUserInfo, userInfo } = useContext(UserContext);
  // const BLOG_ENDPOINT = import.meta.env.VITE_BLOG_ENDPOINT;

  // useEffect(() => {
  //   fetch(BLOG_ENDPOINT + '/profile', {
  //     method: 'GET',
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     credentials: 'include',
  //   }).then(response => {
  //     response.json().then(userInfo => {
  //       setUserInfo(userInfo);
  //     })
  //   });
  // }, []);


  // function logout() {
  //   fetch(BLOG_ENDPOINT + '/logout', {
  //     credentials: 'include',
  //     method: 'POST',
  //   });
  //   setUserInfo(null);
  // }

  // const username = userInfo?.username;
  // return (
  //   <header>
  //     {/* <Link to="/" className="logo">Blogs</Link> */}
  //     <nav>
  //       {username && (
  //         <>
  //           {/* <Link to="/create">Create new post</Link> */}
  //           <span onClick={logout}>Logout ({username})</span>
  //         </>
  //       )}
  //       {!username && (
  //         <>
  //           {/* <Link to="/login">Login</Link> */}
  //           {/* <Link to="/register">Register</Link> */}
  //         </>
  //       )}
  //     </nav>
  //   </header>
  // );
  return (
    <header className="my-10 text-white">
      <div className="flex gap-3">
        <img src="/profile.jpg" alt="Profile Picture" className="w-24 h-24 rounded-full border-2 border-slate-400" />
        <div className="flex flex-col w-2/3 justify-around">
          <div>
            <h1 className="text-2xl font-semibold tracking-wide">Jerson Dela Cerna</h1>
            <h3 className="text-sm ml-[.04rem] text-gray-200">A self-taught web developer.</h3>
          </div>
          <div className="flex gap-2 ml-[.04rem] text-xs tracking-wide">
            {/* Social Media Accounts should go here */}
            <span className="text-blue-400 cursor-pointer hover:underline">Portfolio</span>
            <span className="text-slate-400 cursor-pointer hover:underline">|</span>
            <span className="text-blue-400 cursor-pointer hover:underline">Github</span>
            <span className="text-slate-400 cursor-pointer hover:underline">|</span>
            <span className="text-blue-400 cursor-pointer hover:underline">LinkedIn</span>
          </div>
        </div>
      </div>
      {/* <div>
        Hi There! Welcome to my dev docs where you can find all of my notes
      </div> */}
    </header>
  )
}