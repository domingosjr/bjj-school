// src/services/alunosApi.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:80909/api",
});

// GET /api/alunos
export async function listAlunos(nome) {
  const response = await api.get("/alunos", {
    params: nome ? { nome } : {},
  });
  return response.data;
}

// GET /api/alunos/{id}
export async function getAluno(id) {
  const response = await api.get(`/alunos/${id}`);
  return response.data;
}

// POST /api/alunos
export async function createAluno(aluno) {
  const response = await api.post("/alunos", aluno);
  return response.data;
}

// PUT /api/alunos/{id}
export async function updateAluno(id, aluno) {
  const response = await api.put(`/alunos/${id}`, aluno);
  return response.data;
}

// DELETE /api/alunos/{id}
export async function deleteAluno(id) {
  await api.delete(`/alunos/${id}`);
}
