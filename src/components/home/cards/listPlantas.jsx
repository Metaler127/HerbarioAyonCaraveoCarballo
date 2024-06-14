import React, { useEffect, useState } from "react";
import { fetchPlanta, getObservaciones } from "../../../services/apiServices";
import Cards from "../cards/cards";

function listPlantas() {
  const [plantas, setPlantas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const plantasData = await fetchPlanta();
      setPlantas(plantasData);
      const promises = plantasData.map(async (planta) => {
        const observaciones = await getObservaciones(planta.id);
        return { ...planta, observaciones };
      });

      const updatedPlantas = await Promise.all(promises);
      setPlantas(updatedPlantas);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {plantas.map((planta) => (
        <Cards
          key={planta.id}
          plantaId={planta.id}
          nombreCientifico={planta.nombre_cientifico}
          nombreComun={planta.nombre_comun}
          infoAdicional={planta.informacion}
          username={planta.username}
          fecha={planta.fecha_publicacion}
          observaciones={planta.observaciones} // Pasar observaciones a Cards
        />
      ))}
    </div>
  );
}

export default listPlantas;
