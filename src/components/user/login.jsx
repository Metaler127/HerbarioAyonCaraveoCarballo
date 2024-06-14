import React, { useEffect, useState } from "react";
import axios from "axios";
import Usuario from "../../assets/usuario";
import useUserStore from "../global/userStore";
import { useNavigate } from "react-router-dom";
import { getLogin } from "../../services/apiServices";

function Login() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
  });
  const { setToken } = useUserStore((state) => state);
  const navigate = useNavigate();
  const handleLogOut = () => {
    setToken(false), window.localStorage.removeItem("token"), navigate("/");
  };

  useEffect(() => {
    setToken(true);
    const getLoginUser = async () => {
      try {
        const response = await getLogin();
        console.log("Response getLogin", response);
        setUserData({
          username: response.user.name,
          email: response.user.email,
          rol: response.user.rol,
        });
        console.log(userData.username);
      } catch (error) {
        console.log(error);
      }
    };
    getLoginUser();
  }, []);

  return (
    <div className="bg-[#474747] h-full overflow-auto flex items-center justify-center ">
      <div className="bg-[#214736] text-white w-[30%] h-[60%] flex flex-col gap-y-4 pt-10 items-center rounded-md">
        <Usuario />
        <div className="bg-[#214736] w-auto h-[7%] px-4 flex justify-center items-center text-white rounded-md">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-white">
            {userData.username}
          </h2>
        </div>
        <div className="bg-[#214736] w-auto h-[7%] px-4 flex justify-center items-center text-white rounded-md">
          Correo:
        </div>
        <h2 className="bg-[#214736] w-auto h-[7%] px-4 flex justify-center items-center text-white rounded-md text-xl">
          {userData.email}
        </h2>
        <div className="bg-[#214736] w-auto h-[7%] px-4 flex justify-center items-center text-white rounded-md">
          Rol:
        </div>
        <div className="bg-[#214736] w-auto h-[7%] px-4 flex justify-center items-center text-white rounded-md text-xl">
          {userData.rol}
        </div>
        <button
          onClick={handleLogOut}
          className="flex rounded-md bg-red-600 px-5 py-4 text-white"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

export default Login;
