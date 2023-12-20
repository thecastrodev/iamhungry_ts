// src/components/LoginForm.tsx
import React from "react";
import UXFoodsLogo from "../../assets/UXFoods.png";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-6 bg-gray-700 rounded-md shadow-md">
        <div className="flex justify-center">
          <a href="https://uxsoftware.com.br" target="_blank">
            <img
              src={UXFoodsLogo}
              className="logo max-w-36 m-4"
              alt="UXFoods logo"
            />
          </a>
        </div>
        <h2 className="text-2xl font-semibold mb-6 text-gray-100">Login</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-200"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-200"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-400 text-white mt-2 p-2 rounded-md justify-center w-full"
            >
              Login
            </button>
          </div>
        </form>

        {/* <Route path="register" element={<RegisterForm />} /> */}

        <div className="mt-4 text-white">
          <p>
            Ainda não tem uma conta?{" "}
            <a onClick={goToRegister} className="text-blue-500 cursor-pointer">
              Criar conta
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
