import { Suspense, useState } from "react";
import "./App.css";
import { Rutas } from "./router/router";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Add from "./components/search/add";
import { useModalStore } from "./components/global/modalStore";
import AddPlant from "./components/search/addPlant";

function App() {
  const [count, setCount] = useState(0);
  const { showAgregarObservacion, showAgregarPlanta } = useModalStore(
    (state) => state
  );

  return (
    <div className="relative h-screen">
      <Router>
        <Navbar />
        {showAgregarObservacion && <Add />}
        {showAgregarPlanta && <AddPlant />}
        <Suspense fallback={<>Esta pagina esta cargando...</>}>
          <Rutas />
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
