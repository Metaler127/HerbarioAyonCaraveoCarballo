import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MySlider from "../descripcion/slide";
import { fetchPlanta } from "../../services/apiServices"; // Asegúrate de que la ruta sea correcta

function Descripcion() {
  const { plantaId } = useParams();
  const [selectedObservacion, setSelectedObservacion] = useState(null);
  const [arrayPlantas, setArrayPlantas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const plantaData = await fetchPlanta(id);
        setSelectedObservacion(plantaData.Data); // Asigna los datos de la planta a selectedPlanta
        console.log(plantaData.Data);
        console.log(plantaData.Data.img);
      } catch (error) {
        console.error("Error fetching planta data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="bg-[#474747] h-full w-full p-4 pt-24 flex overflow-auto justify-center items-center gap-4">
      <div className="bg-white w-full h-full grid grid-cols-3 rounded-md">
        <div className="bg-white flex-auto justify-center rounded-md">
          <MySlider img={selectedObservacion?.img} />
        </div>
        <div className="col-span-2">
          {selectedObservacion ? (
            <>
              <div className="w-auto text-5xl pl-5 pb-7">
                {selectedObservacion.planta.nombreComun}
              </div>
              <div className="pl-5 pb-7">
                Nombre cientifico: {selectedObservacion.planta.nombreCientifico}
              </div>
              <div className="pl-5 mb-7">
                Fecha de la colecta: {selectedObservacion.fechaColecta}
              </div>
              <div className="pl-5 mb-7">
                Longitud: {selectedObservacion.longitud}
              </div>
              <div className="pl-5 mb-7">
                Latitud: {selectedObservacion.latitud}
              </div>
              <div className="pl-5 mb-7">
                Habitat: {selectedObservacion.planta.habitat}
              </div>
              <div className="pl-5 mb-7">
                Familia: {selectedObservacion.planta.familia}
              </div>
              <div className="pl-5 mb-7">
                Ciudad: {selectedObservacion.localidad}
              </div>
              <div className="pl-5 mb-7">
                País: {selectedObservacion.ubicacion}
              </div>
              <div className="pl-5 mb-7">
                Fisiografia: {selectedObservacion.fisiografia}
              </div>
              <div className="pl-5 mb-4">Informacion de la planta:</div>
              <div className="pl-5 text-justify mb-3 mr-5">
                {selectedObservacion.planta.infoAdicional}
              </div>
              <div className="w-full flex justify-center items-center pt-2">
                <button className="bg-red-700 text-white w-20 h-10 border-2 rounded-md">
                  Eliminar
                </button>
                <button className="bg-gray-600 text-white w-20 h-10 border-2 rounded-md">
                  Editar
                </button>
              </div>
            </>
          ) : (
            <div>Cargando datos...</div>
          )}
        </div>
      </div>
      <div className="bg-white w-[30%] h-full overflow-y-auto rounded-md">
        <div>
          <img
            className="w-full"
            src="https://via.placeholder.com/400x300"
            alt="Palo Verde"
          />
          <div className="px-6 pt-4 pb-2 flex items-center justify-center">
            <div className="mr-2">
              <svg
                className="w-6 h-6 text-green-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <div className="text-sm flex flex-col ">
              <p className="text-gray-900 leading-none justify-center">
                Carlos Adrian C.
              </p>
              <p className="text-gray-600 justify-center">
                Fecha de publicación: 26/05/2024
              </p>
            </div>
          </div>
        </div>
        <div>
          <img
            className="w-full"
            src="https://via.placeholder.com/400x300"
            alt="Palo Verde"
          />
          <div className="px-6 pt-4 pb-2 flex items-center justify-center">
            <div className="mr-2">
              <svg
                className="w-6 h-6 text-green-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <div className="text-sm flex flex-col ">
              <p className="text-gray-900 leading-none justify-center">
                Carlos Adrian C.
              </p>
              <p className="text-gray-600 justify-center">
                Fecha de publicación: 26/05/2024
              </p>
            </div>
          </div>
        </div>
        <div>
          <img
            className="w-full"
            src="https://via.placeholder.com/400x300"
            alt="Palo Verde"
          />
          <div className="px-6 pt-4 pb-2 flex items-center justify-center">
            <div className="mr-2">
              <svg
                className="w-6 h-6 text-green-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <div className="text-sm flex flex-col ">
              <p className="text-gray-900 leading-none justify-center">
                Carlos Adrian C.
              </p>
              <p className="text-gray-600 justify-center">
                Fecha de publicación: 26/05/2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Descripcion;
