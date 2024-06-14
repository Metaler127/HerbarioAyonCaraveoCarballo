import React, { useState } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MapView from "../MapView/Mapview";

function MySlider({ img }) {
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
          <img
            src={`http://127.0.0.1:8000${img}`}
            className="w-full h-full"
            alt="Imagen"
          />
        </picture>
      )}
    </div>
  );
}

export default MySlider;
