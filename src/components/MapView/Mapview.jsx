import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Markers from "./Markers";

const MapView = ({ allowMarkerPlacement }) => {
  const [markerPosition, setMarkerPosition] = useState(null);

  const handleMarkerSet = (position) => {
    setMarkerPosition(position);
    console.log("Marker position:", position); // Puedes almacenar esto en una base de datos o en otro lugar
  };

  return (
    <MapContainer
      center={{ lat: "24.093460", lng: "-110.319222" }}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {allowMarkerPlacement && <Markers onMarkerSet={handleMarkerSet} />}
    </MapContainer>
  );
};

export default MapView;
