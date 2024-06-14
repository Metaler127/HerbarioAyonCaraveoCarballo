import axios from "axios";

const apiRoute = axios.create({ baseURL: "http://127.0.0.1:8000/api/" });

export async function fetchLogin(data) {
  const result = await apiRoute.post("Login", data);
  console.log(result);

  return result.data;
}

export async function fetchObservacion(data) {
  const result = await apiRoute.post("Observacion", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  console.log(result);

  return result.data;
}

export async function getLogin() {
  const resultll = await apiRoute.get("user");
  console.log(resultll);

  return resultll.data;
}

export async function getObservaciones() {
  const result = await apiRoute.get("Observacion");
  console.log(result);

  return result.data;
}

export async function fetchRegister(data) {
  const resultR = await apiRoute.post("registrar", data);
  console.log(resultR);

  return resultR.data;
}
export async function fetchObtenerRegisto() {
  const resultOR = await apiRoute.get("registrar");
  console.log(resultOR);
}

export async function fetchPlanta(plantaId) {
  const resultP = await apiRoute.get(`Observacion/${plantaId}`);
  console.log(resultP);
  return resultP.data;
}

export async function fetchPlantasTodas() {
  const resultPl = await apiRoute.get(`planta`);
  console.log(resultPl);
  return resultPl.data;
}

export async function fetchRegisterPlanta(data) {
  const resultP = await apiRoute.post("planta", data);
  console.log(resultP);

  return resultP.data;
}

export function setClientToken(token) {
  apiRoute.interceptors.request.use(async function (config) {
    config.headers.Authorization = "Bearer " + token;
    return config;
  });
}

export async function getPlantas() {
  const result = await apiRoute.get("planta"); // Asumiendo que "planta" es la ruta correcta en tu API para obtener la lista de plantas
  console.log(result);
  return result.data;
}
