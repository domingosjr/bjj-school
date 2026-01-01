import { useState, useMemo, useEffect } from "react";
import { useAlunos } from "../context/AlunosContext";
import StudentFormFields from "../components/StudentFormFields";
import StudentsTable from "../components/StudentsTable";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Stack, Typography, Alert } from "@mui/material";

const EMPTY = { nome: "", faixa: "", telefone: "", email: "", plano: "" };

export default function Students() {
  const {
    alunos,
    addAluno,
    updateAluno,
    deleteAluno,
    loading,
    erro,
  } = useAlunos();

  const listaAlunos = Array.isArray(alunos) ? alunos : [];

  const [editingId, setEditingId] = useState(null);
  const [query, setQuery] = useState("");
  const [form, setForm] = useState(EMPTY);
  const [showAluno, setShowAluno] = useState(null);

  const handleShow = (id) => {
    const aluno = listaAlunos.find(a => a.id === id) || null;
    setShowAluno(aluno);
  };

  const handleCloseShow = () => {
    setShowAluno(null);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q
      ? listaAlunos.filter((a) =>
        [a.nome, a.faixa, a.plano].some((v) =>
          (v || "").toLowerCase().includes(q)
        )
      )
      : listaAlunos;
  }, [listaAlunos, query]);

  const alunoEdit = listaAlunos.find((a) => a.id === editingId) || null;

  // sempre que entrar/sair do modo edição, sincroniza o form
  useEffect(() => {
    if (alunoEdit) setForm(alunoEdit);
    else setForm(EMPTY);
  }, [editingId, alunoEdit]);

  const handleSubmit = async () => {
    if (!form.nome.trim()) return;

    const payload = {
      nome: form.nome,
      faixa: form.faixa,
      telefone: form.telefone,
      email: form.email,
      plano: form.plano,
    };

    if (editingId == null) {
      // CREATE: o backend gera o id
      await addAluno(payload);
    } else {
      // UPDATE
      await updateAluno(editingId, payload);
      setEditingId(null);
    }
    setForm(EMPTY);
  };

  const handleDelete = async (id) => {
    await deleteAluno(id);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Alunos
      </Typography>

      {loading && (
        <Typography sx={{ mb: 2 }}>Carregando alunos...</Typography>
      )}

      {erro && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {erro}
        </Alert>
      )}

      {!editingId ? (
        <>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ mb: 2 }}
          >
            <TextField
              label="Buscar"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              size="small"
            />
            <Button onClick={() => setQuery("")}>Limpar</Button>
          </Stack>

          {/* FORM CONTROLADO */}
          <StudentFormFields
            values={form}
            onChange={setForm}
            onSubmit={handleSubmit}
            submitLabel="Adicionar"
          />
          <hr />
          <StudentsTable
            items={filtered}
            onShow={handleShow}
            onEdit={(id) => setEditingId(id)}
            onDelete={handleDelete}
          />
        </>
      ) : (
        <>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Editando aluno
          </Typography>

          {/* FORM CONTROLADO TAMBÉM NO EDIT */}
          <StudentFormFields
            values={form}
            onChange={setForm}
            onSubmit={handleSubmit}
            submitLabel="Salvar"
          />
          <Button
            color="error"
            sx={{ mt: 2 }}
            onClick={() => {
              setEditingId(null);
              setForm(EMPTY);
            }}
          >
            Cancelar
          </Button>
        </>
      )}
      <Dialog open={!!showAluno} onClose={handleCloseShow} maxWidth="sm" fullWidth>
        <DialogTitle>Detalhes do aluno</DialogTitle>

        <DialogContent dividers>
          {showAluno && (
            <Stack spacing={1}>
              <Typography><b>ID:</b> {showAluno.id}</Typography>
              <Typography><b>Nome:</b> {showAluno.nome}</Typography>
              <Typography><b>Faixa:</b> {showAluno.faixa}</Typography>
              <Typography><b>Telefone:</b> {showAluno.telefone}</Typography>
              <Typography><b>Email:</b> {showAluno.email}</Typography>
              <Typography><b>Plano:</b> {showAluno.plano}</Typography>
            </Stack>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseShow}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
