import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="my-10 mx-auto text-white border-1 border-white">
      <div className="flex gap-3">
        <img src="/profile.jpg" alt="Profile Picture" className="w-28 h-28 rounded-full border-2 border-slate-400 hover:ring-2 hover:ring-blue-400 hover:cursor-pointer" onClick={() => navigate('/')} />
        <div className="flex flex-col w-2/3 justify-around">
          <div>
            <h1 className="text-[1.8rem] font-black tracking-wider text-yellow-500">Jerson Dela Cerna</h1>
            <h3 className="text-base ml-[.04rem] text-red-500">A self-taught web developer.</h3>
          </div>
          <div className="flex gap-2 ml-[.04rem] -mt-3 text-sm">
            <a href="https://jerson-dela-cerna.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Portfolio</a>
            <span className="text-slate-400 cursor-pointer hover:underline">|</span>
            <a href="https://github.com/MiDo-kun" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Github</a>
            <span className="text-slate-400 cursor-pointer hover:underline">|</span>
            <a href="https://www.linkedin.com/in/dela-cerna-jerson-768359253/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">LinkedIn</a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;