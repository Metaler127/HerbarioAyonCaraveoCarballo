import React, { useState } from "react";
import { useMapEvents, Marker } from "react-leaflet";
import axios from "axios";

const Markers = ({ onMarkerSet }) => {
  const [marker, setMarker] = useState(null);

  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;
      setMarker({ lat, lng });

      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse`,
          {
            params: {
              lat,
              lon: lng,
              format: "json",
            },
          }
        );

        const locationData = response.data;
        const address = locationData.address;
        const locationInfo = {
          lat,
          lng,
          city: address.city || address.town || address.village,
          state: address.state,
          country: address.country,
        };

        onMarkerSet(locationInfo);
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    },
  });

  return marker ? (
    <Marker position={[marker.lat, marker.lng]} draggable={true} />
  ) : null;
};

export default Markers;
