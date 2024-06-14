import React from "react";
import { useState } from "react";
import { useModalStore } from "../global/modalStore";
import { fetchRegisterPlanta } from "../../services/apiServices";

function AddPlant() {
  const [plantForm, setPlantForm] = useState({
    nombreComun: "",
    nombreCientifico: "",
    familia: "",
    formaBiologica: "",
    tipoVegetacion: "",
    vulnerada: "false",
    infoAdicional: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlantForm((prevData) =>
      name != "vulnerada"
        ? {
            ...prevData,
            [name]: value,
          }
        : { ...prevData, [name]: value == "on" ? "true" : "false" }
    );
  };

  const handleRegisterPlant = async () => {
    try {
      const response = await fetchRegisterPlanta(plantForm);
      console.log("Response Status:", response);
      console.log("Response Status:", response.Data);
      //console.log("Response OK:", response.ok);

      if (response.status) {
        setTimeout(() => {
          window.location.reload();
        }, 700);
      } else {
        //const errorData = await response.json();
        //console.log("Error Data:", errorData);
      }
    } catch (error) {
      console.log("Catch Error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegisterPlant();
  };

  const { setShowAgregarPlanta } = useModalStore((state) => state);
  function handleClick() {
    setShowAgregarPlanta(false);
  }

  return (
    <div className="bg-zinc-900/50 z-[20000] fixed flex items-center justify-center h-screen w-screen">
      <button className="h-full w-full absolute" onClick={handleClick} />
      <div className="bg-white relative flex flex-col h-auto w-auto rounded-md z-10 items-center gap-5 p-4">
        <div className="flex flex-col w-full">
          <div className="w-[70vh] border-2 rounded-lg p-4 flex flex-col">
            <div className="text-4xl pb-4 text-center">Nueva Planta</div>
            <form onSubmit={handleSubmit}>
              <input
                className="text-xl lg:text-5xl mb-4 border-2 placeholder-black placeholder-opacity-50 border-1"
                placeholder="Nombre cientifico"
                name="nombreCientifico"
                onChange={handleChange}
              />
              <input
                className="text-xl lg:text-5xl mb-4  border-2 placeholder-black placeholder-opacity-50 border-1"
                name="nombreComun"
                placeholder="Nombre Comun"
                onChange={handleChange}
              />
              <div className="flex flex-row bg-black text-slate-50 w-full rounded-t-md text-center p-1 ">
                Datos
              </div>
              <div className="space-y-2 p-2 pr-6 pl-2 flex flex-col border-2 rounded-b-md">
                <input
                  className="text-sm md:text-base border-2 placeholder-black placeholder-opacity-50 border-1"
                  placeholder="Familia"
                  name="familia"
                  onChange={handleChange}
                />

                <input
                  className="text-sm md:text-base border-2 placeholder-black placeholder-opacity-50 border-1"
                  placeholder="Habitat"
                  name="habitat"
                  onChange={handleChange}
                />
                <input
                  className="text-sm md:text-base border-2 placeholder-black placeholder-opacity-50 border-1"
                  placeholder="Forma biologica"
                  name="formaBiologica"
                  onChange={handleChange}
                />
                <input
                  className="text-sm md:text-base border-2 placeholder-black placeholder-opacity-50 border-1"
                  placeholder="Tipo de vegetacion"
                  name="tipoVegetacion"
                  onChange={handleChange}
                />
                <div className="mb-4">
                  <label
                    htmlFor="vulnerada"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ¿Vulnerada?
                  </label>
                  <div className="mt-2 flex items-center">
                    <input
                      id="vulnerada"
                      name="vulnerada"
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-green-600 transition duration-150 ease-in-out"
                      onChange={handleChange}
                    />
                    <span className="ml-2 text-sm text-gray-900">Sí</span>
                  </div>
                </div>
                <textarea
                  className="h-24 resize-none text-sm md:text-base border-2 placeholder-black placeholder-opacity-50 overflow-y-auto w-full"
                  name="infoAdicional"
                  placeholder="Datos de la planta"
                  onChange={handleChange}
                />
              </div>
              <div className="w-full flex justify-center items-center pt-2">
                <button
                  onClick={handleSubmit}
                  className="bg-green-600 w-20 h-10 border-2 rounded-md"
                  type="submit"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPlant;
