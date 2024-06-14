import React, { useEffect } from "react";
import Lupa from "../../assets/lupa";
import SimboloMas from "../../assets/simboloMas";
import Usuario from "../../assets/usuario";
import { useModalStore } from "../global/modalStore";
import "../../App.css";
import { setClientToken } from "../../services/apiServices";
import { useNavigate } from "react-router-dom";
import useUserStore from "../global/userStore";

function Navbar() {
  const navigate = useNavigate();
  const { setToken, token } = useUserStore((state) => state);

  const { setShowAgregarObservacion } = useModalStore((state) => state);
  function handleClick() {
    setShowAgregarObservacion(true);
  }

  useEffect(() => {
    const storageToken = window.localStorage.getItem("token");
    if (storageToken) {
      console.log(storageToken);
      setClientToken(storageToken);
      setToken(true);
    }
  }, []);

  return (
    <div className="bg-[#1E1E1E] absolute top-0 w-full flex h-16 text-center items-center p-10 space-between z-10">
      <picture
        className="w-64 h-20 hover:scale-110"
        onClick={() => navigate("/")}
      >
        <img
          className="object-scale-down w-full h-full"
          src="\src\assets\logo.png"
        />
      </picture>
      <div className="text-white flex items-center gap-4 bg-[#767676] rounded-lg justify-between w-1/2 h-14 p-6 m-56">
        <input
          className="input-custom bg-[#767676] w-[80%]"
          placeholder="Buscar planta..."
          type="text"
        />
        <button className="hover:scale-125">
          <Lupa />
        </button>
      </div>

      <div className="text-white flex items-center gap-4 -mr-36 ml-50">
        {token && (
          <button onClick={handleClick} className="hover:scale-110">
            <SimboloMas />
          </button>
        )}

        <button
          className="hover:scale-110 flex items-center mb-2.5"
          onClick={() => {
            navigate(!token ? "/login" : "/user");
          }}
        >
          <Usuario />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
