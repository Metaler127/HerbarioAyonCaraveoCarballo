import React, { useEffect, useState } from "react";
import { useModalStore } from "../global/modalStore";
import Lupa from "../../assets/lupa";
import icon from "../../assets/camara.svg";
import { FaLeaf } from "react-icons/fa";
import {
  fetchObservacion,
  fetchPlantasTodas,
} from "../../services/apiServices";
import SearchBar from "./searchbar";
import MapAdd from "../MapView/mapAdd";

function Add() {
  const [arrayPlantas, setArrayPlantas] = useState([]);
  const [filterPlantas, setArrayFilter] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [imageUrl, setImageUrl] = useState(null);

  const { setShowAgregarObservacion, setShowAgregarPlanta } = useModalStore(
    (state) => state
  );

  const handleClick = () => {
    setShowAgregarObservacion(false);
  };

  const handleClickPlanta = () => {
    setShowAgregarPlanta(true);
    setShowAgregarObservacion(false);
  };

  const handleMarkerClick = ({ lat, lng }) => {
    console.log(coords);
    setCoords({
      lat: lat.toFixed(6),
      lng: lng.toFixed(6),
    });
    setObserData((prevData) => ({
      ...prevData,
      longitud: lng.toFixed(6),
      latitud: lat.toFixed(6),
    }));
  };

  const [obserData, setObserData] = useState({
    longitud: coords.lng,
    latitud: coords.lat,
    localidad: "",
    ubicacion: "",
    fisiografia: "",
    fechaColecta: "",
    img: "",
    idPlanta: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setObserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  const imghandleChange = async (e) => {
    const file = e.target.files[0];
    let imgBase64 = "";
    await getBase64(file, (result) => {
      imgBase64 = result;
      console.log("img", imgBase64);
      setObserData((prevData) => ({
        ...prevData,
        img: file,
        imgBase64,
      }));
      const objectUrl = URL.createObjectURL(file);
      setImageUrl(objectUrl);
      console.log("hola");
    });
  };

  async function handleRegisterObservacion() {
    try {
      console.log(obserData);
      const response = await fetchObservacion(obserData);
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  const handleClicItem = (index) => {
    console.log(filterPlantas[index]);
    setObserData((prevData) => ({
      ...prevData,
      idPlanta: filterPlantas[index].id,
    }));
    setInputValue(""); // Resetea el valor del input
    setArrayFilter([]); // Limpia los resultados filtrados
  };

  useEffect(() => {
    const getPlantas = async () => {
      try {
        const response = await fetchPlantasTodas();
        console.log(response);
        setArrayPlantas(response.Data);
      } catch (error) {
        console.log(error);
      }
    };
    getPlantas();
  }, []);

  const handleSearch = (query) => {
    setInputValue(query);
    const filtroPlantas = arrayPlantas.filter((item) =>
      item.nombreComun.toLowerCase().includes(query.toLowerCase())
    );
    setArrayFilter(query.length === 0 ? [] : filtroPlantas);
  };

  return (
    <div className="bg-zinc-900/50 z-[20000] fixed flex items-center justify-center h-screen w-screen">
      <button className="h-full w-full absolute" onClick={handleClick} />
      <div className="bg-white relative flex flex-row md:flex-row h-auto w-[70%] rounded-md z-10 items-center gap-5 p-4">
        <div className="bg-[#E0E0E0] flex flex-col items-center justify-center w-full h-[40vh] gap-4 rounded-lg border-2 border-black border-dashed p-4">
          <img
            src={imageUrl != null ? imageUrl : icon}
            alt="Camara"
            className="w-[50%]  "
          />
          <span className="text-center">
            {imageUrl != null ? null : "Camara"}
          </span>

          <input
            className="h-[100%]"
            type="file"
            accept="image/*"
            onChange={imghandleChange}
          />
        </div>
        <div className="flex flex-col w-full items-center">
          <div className="text-4xl pb-4">PUBLICACIÓN</div>
          <button
            onClick={handleClickPlanta}
            className="w-48 flex justify-center items-center rounded-md border-2 opacity-50 gap-4 hover:scale-105"
          >
            Agregar planta
            <FaLeaf />
          </button>
          <div className="relative w-80 border-2 flex justify-between items-center rounded-lg m-4 p-2">
            <SearchBar onSearch={handleSearch} inputValue={inputValue} />
            <Lupa />
            {filterPlantas.length > 0 && (
              <div className="absolute rounded-b-md top-full left-0 w-full max-h-40vh overflow-y-auto bg-white border border-gray-300 shadow-lg z-50 mt-1">
                {filterPlantas.map((item, index) => (
                  <button
                    onClick={() => handleClicItem(index)}
                    key={index}
                    className="block w-full text-left p-2 hover:bg-gray-100"
                  >
                    {item.nombreComun}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="w-full border-2 rounded-lg p-4">
            <div className="bg-black text-slate-50 w-full rounded-t text-center p-1">
              Datos Planta
            </div>
            <div className="text-lg lg:text-5xl mb-4">
              {arrayPlantas.length > 0
                ? obserData.idPlanta !== "" &&
                  arrayPlantas.find((item) => item.id === obserData.idPlanta)
                    ?.nombreComun
                : "Nombre comun"}
            </div>
            <div className="text-lg mb-4">
              {arrayPlantas.length > 0
                ? obserData.idPlanta !== "" &&
                  arrayPlantas.find((item) => item.id === obserData.idPlanta)
                    ?.nombreCientifico
                : "Nombre cientifico"}
            </div>
            <div className="bg-black text-slate-50 w-full rounded-t text-center p-1">
              Datos Investigador
            </div>
            <div className="space-y-2 p-2 border-2 rounded-b-lg ">
              <div className="mb-4">
                <label
                  htmlFor="fecha_colecta"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Fecha de Colecta:
                </label>
                <input
                  id="fecha_colecta"
                  name="fechaColecta"
                  type="date"
                  autoComplete="off"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-zinc-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
              <div className="text-sm">Latitud: {coords.lat}</div>
              <div className="text-sm">Longitud: {coords.lng}</div>
              <input
                type="text"
                name="localidad"
                onChange={handleChange}
                placeholder="Ciudad"
              />
              <input
                type="text"
                name="ubicacion"
                onChange={handleChange}
                placeholder="País"
              />
              <input
                type="text"
                name="fisiografia"
                onChange={handleChange}
                placeholder="Fisiografia"
              />
            </div>

            <div className="w-full flex justify-center items-center pt-2">
              <button
                className="bg-green-600 w-20 h-10 border-2 rounded-md"
                onClick={handleRegisterObservacion}
              >
                Publicar
              </button>
            </div>
          </div>
        </div>
        <div className="border-2 w-full h-[40vh] rounded p-2">
          <MapAdd onMarkerClick={handleMarkerClick} setCoords={setCoords} />
        </div>
      </div>
    </div>
  );
}

export default Add;
