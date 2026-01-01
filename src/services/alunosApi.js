// src/services/alunosApi.js
import api from "./bjjApi";

// GET /api/alunos
export async function listAlunos(nome) {
  const response = await api.get("/alunos", {
    params: nome ? { nome } : {},
  });
  // Se vier Page do Spring, usa content. Se vier array, usa direto.
  const data = response.data;
  return Array.isArray(data) ? data : (data?.content ?? []);
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
