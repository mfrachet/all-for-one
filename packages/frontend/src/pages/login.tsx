import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import googleSrc from "../assets/google.png";
import crewSrc from "../assets/crew.webp";
import { useEffect, useState } from "react";
import { useAudio } from "../modules/misc/hooks/useAudio";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [shouldStart, setShouldStart] = useState(false);
  const { ready } = useAudio("/shire.mp3", shouldStart);

  const [shouldAnimate, setShouldAnimate] = useState(false);

  const handleClick = () => {
    localStorage.setItem("jwt", nanoid());

    navigate("/");
  };

  useEffect(() => {
    if (!ready) return;

    setTimeout(() => {
      setShouldAnimate(true);
    }, 6000);
  }, [ready]);

  if (!ready)
    return (
      <div className="flex justify-center items-center h-full w-full">
        <button
          className="bg-gray-100 border border-gray-400 rounded-md p-2 hover:bg-gray-200 active:bg-gray-300"
          onClick={() => setShouldStart(true)}
        >
          👋 Team ! Should we start?
        </button>
      </div>
    );

  return (
    <main className="flex justify-center items-center h-full relative w-full">
      <div>
        <div
          className={`transition-all duration-1000 absolute inset-0 z-10 ${
            shouldAnimate ? "bg-black/50" : ""
          }`}
        />
        <img
          src={crewSrc}
          className={
            "animate-unscale fixed inset-0 w-full h-full object-cover scale-110"
          }
        />
      </div>

      <div
        className="w-96 relative z-20 animate-fadeIn opacity-0"
        style={{ animationDelay: "8s" }}
      >
        <h1 className="text-7xl font-bold text-center pb-4 text-white drop-shadow-md">
          All for One
        </h1>
        <button
          onClick={handleClick}
          className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md bg-white text-gray-700 font-medium hover:bg-gray-100 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
        >
          <img className="w-5 h-5 mr-2" src={googleSrc} alt="Google logo" />
          Login with Google
        </button>
      </div>
    </main>
  );
};
