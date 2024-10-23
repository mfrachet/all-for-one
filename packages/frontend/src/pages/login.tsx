import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import googleSrc from "../assets/google.png";

export const LoginPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.setItem("jwt", nanoid());

    navigate("/dashboard");
  };

  return (
    <main className="flex justify-center items-center h-full">
      <div className="w-72">
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
