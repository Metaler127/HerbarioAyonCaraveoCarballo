import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMapEvents, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapAdd = ({ setCoords, onMarkerClick }) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [marker, setMarker] = useState(null);

  const [viewCoords, setViewCoords] = useState({
    lat: null,
    lng: null,

    zoom: 20,
    bounds: null,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, []);

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      setViewCoords((prevCoords) => ({
        ...prevCoords,
        lat: latitude,
        lng: longitude,
      }));
    }
  }, [latitude, longitude]);

  const MapEvents = () => {
    const map = useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setMarker({ lat, lng });
        setCoords({ lat: lat.toFixed(6), lng: lng.toFixed(6) });
        onMarkerClick({ lat, lng });
      },
      moveend: () => {
        const center = map.getCenter();
        const zoom = map.getZoom();
        const bounds = map.getBounds();
        setViewCoords({
          lat: center.lat,
          lng: center.lng,
          zoom: zoom,
          bounds: {
            northEast: bounds.getNorthEast(),
            northWest: bounds.getNorthWest(),
            southEast: bounds.getSouthEast(),
            southWest: bounds.getSouthWest(),
          },
        });
      },
    });
    return null;
  };

  return (
    <div className="relative overflow-y-hidden">
      {viewCoords.lat !== null && viewCoords.lng !== null ? (
        <MapContainer
          center={[viewCoords.lat, viewCoords.lng]}
          zoom={13}
          style={{ height: "38vh", width: "100%" }}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapEvents />
          {marker && <Marker position={[marker.lat, marker.lng]} />}
        </MapContainer>
      ) : (
        <p>Mapa cargando...</p>
      )}
    </div>
  );
};

export default MapAdd;
