import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Cards() {
  const url =
    "https://herbarioapi-production-7512.up.railway.app/api/observacion";
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    console.log("ENTRO");
    axios
      .get(url)
      .then(function (response) {
        setPublicaciones(response.data.Data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log("Hola", error);
        //alert("An error occurred during login");
      });
  }, []);

  return (
    <div className=" grid grid-cols-4 gap-4">
      {publicaciones &&
        publicaciones.map((publicacion, i) => (
          <MyPlantCard key={i} publicacion={publicacion} />
        ))}
    </div>
  );
}

function MyPlantCard({ publicacion }) {
  return (
    <div
      className="bg-white  lex flex-row flex-wrap max-w-sm rounded overflow-hidden shadow-lg"
      onClick={(e) => {
        console.log("entra");
        window.location.href = `/planta/${publicacion.Data}`;
      }}
      role="button"
    >
      <img
        className="w-full"
        src={`https://herbarioapi-production-7512.up.railway.app${publicacion.img}`}
        alt="imagen bonita"
      ></img>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">
          {publicacion.planta.nombreComun}
        </div>
        <div className="font-bold text-xl mb-2">
          ({publicacion.planta.nombreCientifico})
        </div>
        <p className="text-black text-base">
          {publicacion.planta.infoAdicional}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          Fecha de publicación: {publicacion.fechaColecta}
        </span>
      </div>
    </div>
  );
}

export default Cards;
