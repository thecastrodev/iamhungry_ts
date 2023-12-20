//Main.tsx

import { useNavigate } from "react-router-dom";
import UXFoodsLogo from "../../assets/UXFoods.png";

function Main() {
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate("/register");
  };
  const gotToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-700 rounded-md shadow-md text-gray-100">
      <div className="flex justify-center">
        <a href="https://uxsoftware.com.br" target="_blank">
          <img
            src={UXFoodsLogo}
            className="logo max-w-36 m-4"
            alt="UXFoods logo"
          />
        </a>
      </div>

      <header className="grid grid-cols-1">
        <p className="text-xl font-semibold my-4 mx-auto">Main components</p>
        <button className="bg-slate-400 my-1 p-2" onClick={gotToLogin}>
          Login
        </button>
        <button className="bg-slate-400 my-1 p-2" onClick={goToRegister}>
          Register
        </button>
      </header>

      <footer className="mt-4">
        Development by{" "}
        <a href="https://linkedin.com/in/thecastrodev" target="_blank">
          @thecastrodev
        </a>
      </footer>
    </div>
  );
}

export default Main;
