import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  listAlunos,
  createAluno,
  updateAluno as apiUpdateAluno,
  deleteAluno as apiDeleteAluno,
} from "../services/alunosApi";

const AlunosContext = createContext(null);

export function AlunosProvider({ children }) {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  async function carregarAlunos() {
    try {
      setLoading(true);
      const data = await listAlunos();
      setAlunos(data);
      setErro(null);
    } catch (e) {
      console.error("Erro ao carregar alunos", e);
      setErro("Não foi possível carregar os alunos.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarAlunos();
  }, []);

  const addAluno = async ({ nome, faixa, telefone, email, plano }) => {
    await createAluno({ nome, faixa, telefone, email, plano });
    await carregarAlunos(); // 🔁 recarrega do banco
  };

  const deleteAluno = async (id) => {
    await apiDeleteAluno(id);
    await carregarAlunos(); // 🔁 recarrega do banco
  };

  const updateAluno = async (id, dados) => {
    await apiUpdateAluno(id, dados);
    await carregarAlunos(); // 🔁 recarrega do banco
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
