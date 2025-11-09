import axios from "axios";
const http = axios.create({ baseURL: "https://jsonplaceholder.typicode.com", timeout: 10000 });

export async function getComunicados(signal) {
  const req = http.get("/posts", { signal });
  const timeout = new Promise((_, rej)=> setTimeout(()=> rej(new Error("Timeout")), 9000));
  return Promise.race([req, timeout]).then(r => r.data);
}

export async function getPerfil(id, signal) {
  const { data } = await http.get(`/users/${id}`, { signal });
  return data;
}
