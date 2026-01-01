import axios from "axios";
import keycloak from "../auth/keycloak";

const bjjApi = axios.create({
  baseURL: "http://localhost:8090/api",
  timeout: 10000,
});

bjjApi.interceptors.request.use(async (config) => {
  // se já existe token, renova e envia
  if (keycloak?.token) {
    await keycloak.updateToken(30);
    config.headers.Authorization = `Bearer ${keycloak.token}`;
  }
  return config;
});

export default bjjApi;
