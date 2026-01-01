import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext"; // ajuste se necessário
import {
  listAlunos,
  createAluno,
  updateAluno as apiUpdateAluno,
  deleteAluno as apiDeleteAluno,
} from "../services/alunosApi";

const AlunosContext = createContext(null);

export function AlunosProvider({ children }) {
  const { ready, authenticated } = useAuth();

  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  async function carregarAlunos() {
    try {
      setLoading(true);
      const data = await listAlunos();
      setAlunos(Array.isArray(data) ? data : []);
      setErro(null);
    } catch (e) {
      console.error("Erro ao carregar alunos", e);
      setErro("Não foi possível carregar os alunos.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!ready) return; // ainda iniciando auth
    if (!authenticated) return; // não logado (em tese não acontece com login-required)
    carregarAlunos();
  }, [ready, authenticated]);

  const addAluno = async ({ nome, faixa, telefone, email, plano }) => {
    await createAluno({ nome, faixa, telefone, email, plano });
    await carregarAlunos();
  };

  const deleteAluno = async (id) => {
    await apiDeleteAluno(id);
    await carregarAlunos();
  };

  const updateAluno = async (id, dados) => {
    await apiUpdateAluno(id, dados);
    await carregarAlunos();
  };

  const value = useMemo(
    () => ({ alunos, addAluno, deleteAluno, updateAluno, loading, erro }),
    [alunos, loading, erro]
  );

  return <AlunosContext.Provider value={value}>{children}</AlunosContext.Provider>;
}

export function useAlunos() {
  const ctx = useContext(AlunosContext);
  if (!ctx) throw new Error("useAlunos deve ser usado dentro de AlunosProvider");
  return ctx;
}
