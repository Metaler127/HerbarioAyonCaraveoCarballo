import Descripcion from "../components/descripcion/descripcion";
import Home from "../components/home/home";
import User from "../components/user/user";
import UserCreate from "../components/user/usercreate";
import Login from "../components/user/login";
import AddPlant from "../components/search/addPlant";
import listPlantas from "../components/home/cards/listPlantas";

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/desc:plantaId", element: <Descripcion /> },
  { path: "/login", element: <User /> },
  { path: "/usercreate", element: <UserCreate /> },
  { path: "/user", element: <Login /> },
  { path: "/addplant", element: <AddPlant /> },
  { path: "/planta/:plantaId", element: <Descripcion /> },
  { path: "/", element: <listPlantas /> },
  { path: "/desc/:plantaId", element: <Descripcion /> },
];
