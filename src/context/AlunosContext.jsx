import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AlunosContext = createContext(null);

export function AlunosProvider({ children }) {
  const [alunos, setAlunos] = useLocalStorage("jj_alunos", []);

  const addAluno = ({ nome, faixa, telefone, email, plano }) =>
    setAlunos(prev => [...prev, { id: Date.now(), nome, faixa, telefone, email, plano }]);

  const deleteAluno = (id) => setAlunos(prev => prev.filter(a => a.id !== id));

  const updateAluno = (id, dados) =>
    setAlunos(prev => prev.map(a => (a.id === id ? { ...a, ...dados } : a)));

  const value = useMemo(() => ({ alunos, addAluno, deleteAluno, updateAluno }), [alunos]);
  return <AlunosContext.Provider value={value}>{children}</AlunosContext.Provider>;
}

export function useAlunos() {
  const ctx = useContext(AlunosContext);
  if (!ctx) throw new Error("useAlunos deve ser usado dentro de AlunosProvider");
  return ctx;
}
