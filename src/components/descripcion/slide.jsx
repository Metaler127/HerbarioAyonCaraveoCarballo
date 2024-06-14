import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MapView from "../MapView/Mapview"; // Asegúrate de que la ruta sea correcta
import image1 from "../../assets/arbol.jpeg";

function MySlider() {
  const [viewRef, setViewRef] = useState(true);

  function handleClick() {
    setViewRef(!viewRef);
  }

  return (
    <div className="overflow-y rounded-md">
      <button
        onClick={handleClick}
        className="absolute z-[10000] rounded-full b-2 flex m-2"
      >
        <div>
          <picture className="h-auto w-10 flex">
            <img
              src="\src\assets\CamaraIcono.png"
              className="object-cover w-full h-full"
            />
          </picture>
        </div>
      </button>

      {viewRef ? (
        <div>
          <div style={{ height: "88vh" }}>
            <MapView allowMarkerPlacement={false} />
          </div>
        </div>
      ) : (
        <picture className="h-full items-center justify-center">
          <img src={image1} className="w-full h-full" alt="Imagen" />
        </picture>
      )}
    </div>
  );
}

export default MySlider;
