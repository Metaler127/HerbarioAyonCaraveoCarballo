import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRegister } from "../../services/apiServices";

function UserCreate() {
  /*
  const navigate = useNavigate();
  function handleLogin() {
    navigate("/login");
  }
   */
  const [formRegister, setFormRegister] = useState({
    name: "",
    email: "",
    img: "",
    password: "",
    rol: "Bronze",
  });
  const navigate = useNavigate();
  async function handleRegister() {
    try {
      const response = await fetchRegister(formRegister);
      window.localStorage.setItem("token", response.token);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormRegister((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <div className="bg-[#474747] h-full overflow-auto flex-col pt-24">
      <div className="flex flex-col items-center py-12">
        <div>
          <img
            className="mx-auto h-20 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=green&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Registrarse{" "}
          </h2>
        </div>

        <div className="mt-10 w-[75vh]">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white "
              >
                Nombre(s){" "}
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="Nombre"
                  required
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white "
              >
                Apellido(s){" "}
              </label>
              <div className="mt-2">
                <input
                  id="apellido"
                  name="img"
                  type="text"
                  autoComplete="Apellido"
                  required
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

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
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                className="flex w-full justify-center rounded-md bg-green-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleRegister}
              >
                Crear Cuenta
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-400">
            <a
              href="http://localhost:5173/user"
              className="font-semibold
            leading-6 text-green-400 hover:text-green-700"
            >
              Volver{" "}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
export default UserCreate;
