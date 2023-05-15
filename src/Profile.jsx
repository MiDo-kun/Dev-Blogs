const Profile = () => {
  return (
    <header className="my-10 mx-auto text-white">
      <div className="flex gap-3">
        <img src="./profile.jpg" alt="Profile Picture" className="w-28 h-28 rounded-full border-2 border-slate-400" />
        <div className="flex flex-col w-2/3 justify-around">
          <div>
            <h1 className="text-3xl font-black tracking-wide">Jerson Dela Cerna</h1>
            <h3 className="text-base ml-[.04rem]">A self-taught web developer.</h3>
          </div>
          <div className="flex gap-2 ml-[.04rem] text-sm">
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

export default Profile;