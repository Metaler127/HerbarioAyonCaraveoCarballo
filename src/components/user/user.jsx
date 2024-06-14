import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLogin, setClientToken } from "../../services/apiServices";
import useUserStore from "../global/userStore";

function User() {
  const [formLogin, setFormLogin] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { setToken, token } = useUserStore((state) => state);

  async function handleLogin() {
    try {
      const response = await fetchLogin(formLogin);
      window.localStorage.setItem("token", response.token);
      setClientToken(response.token);
      setToken(true);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormLogin((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <div className="bg-[#474747] h-full overflow-auto flex-col pt-24">
      <div className="flex flex-col items-center py-12">
        <div className="flex flex-col">
          <img
            className="h-20 w-auto "
            src="https://tailwindui.com/img/logos/mark.svg?color=green&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Iniciar Sesion{" "}
          </h2>
        </div>

        <div className="mt-10 w-[75vh]">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white "
              >
                Correo electronico{" "}
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Contraseña
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                className="flex w-full justify-center rounded-md bg-green-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleLogin}
              >
                Entrar
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-400">
            No tienes cuenta?{" "}
            <a
              onClick={() => {
                navigate("/usercreate");
              }}
              className="font-semibold leading-6 text-green-400 hover:text-green-700"
            >
              Crea tu cuenta
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default User;
