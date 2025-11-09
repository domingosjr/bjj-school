import { useState, useMemo, useEffect } from "react";
import { useAlunos } from "../context/AlunosContext";
import StudentFormFields from "../components/StudentFormFields";
import StudentsTable from "../components/StudentsTable";
import { TextField, Button, Stack, Typography } from "@mui/material";

const EMPTY = { nome:"", faixa:"", telefone:"", email:"", plano:"" };

export default function Students(){
  const { alunos, addAluno, updateAluno, deleteAluno } = useAlunos();
  const [editingId, setEditingId] = useState(null);
  const [query, setQuery] = useState("");
  const [form, setForm] = useState(EMPTY);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? alunos.filter(a =>
      [a.nome, a.faixa, a.plano].some(v => (v||"").toLowerCase().includes(q))
    ) : alunos;
  }, [alunos, query]);

  const alunoEdit = alunos.find(a => a.id === editingId) || null;

  // sempre que entrar/sair do modo edição, sincroniza o form
  useEffect(() => {
    if (alunoEdit) setForm(alunoEdit);
    else setForm(EMPTY);
  }, [editingId, alunoEdit]);

  const handleSubmit = () => {
    if (!form.nome.trim()) return;
    if (editingId == null) {
      // CREATE: não gere id aqui se o contexto gerar; senão: { ...form, id: Date.now() }
      addAluno(form);
    } else {
      // UPDATE: nunca gere novo id aqui
      updateAluno(editingId, form);
      setEditingId(null);
    }
    setForm(EMPTY);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>Alunos</Typography>

      {!editingId ? (
        <>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 2 }}>
            <TextField label="Buscar" value={query} onChange={e => setQuery(e.target.value)} size="small"/>
            <Button onClick={() => setQuery("")}>Limpar</Button>
          </Stack>

          {/* FORM CONTROLADO */}
          <StudentFormFields
            values={form}
            onChange={setForm}
            onSubmit={handleSubmit}
            submitLabel="Adicionar"
          />
          <hr/>
          <StudentsTable
            items={filtered}
            onEdit={(id)=>setEditingId(id)}
            onDelete={deleteAluno}
          />
        </>
      ) : (
        <>
          <Typography variant="h6" sx={{ mb: 1 }}>Editando aluno</Typography>

          {/* FORM CONTROLADO TAMBÉM NO EDIT */}
          <StudentFormFields
            values={form}
            onChange={setForm}
            onSubmit={handleSubmit}
            submitLabel="Salvar"
          />
          <Button color="error" sx={{ mt: 2 }} onClick={() => setEditingId(null)}>
            Cancelar
          </Button>
        </>
      )}
    </>
  );
}
