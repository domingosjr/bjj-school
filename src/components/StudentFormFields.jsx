import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";

export default function StudentFormFields({
  values,
  onChange,
  onSubmit,
  submitLabel = "Salvar",
  onCancel
}) {
  const [errors, setErrors] = useState({});

  const set = (field) => (e) => onChange({ ...values, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação simples — exige nome, faixa e telefone
    const newErrors = {};
    if (!values.nome.trim()) newErrors.nome = "O nome é obrigatório";
    if (!values.faixa.trim()) newErrors.faixa = "A faixa é obrigatória";
    if (!values.telefone.trim()) newErrors.telefone = "O telefone é obrigatório";
    if (!values.email.trim()) newErrors.email = "O e-mail é obrigatório";
    if (!values.plano.trim()) newErrors.plano = "O plano é obrigatório";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    // Chama a função de salvar do pai
    onSubmit();
    setErrors({});
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="grid" gap={2}>
      {/* Linha 1 */}
      <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }} gap={2}>
        <TextField
          label="Nome"
          value={values.nome}
          onChange={set("nome")}
          error={!!errors.nome}
          helperText={errors.nome}
        />
        <TextField
          label="Faixa"
          value={values.faixa}
          onChange={set("faixa")}
          error={!!errors.faixa}
          helperText={errors.faixa}
        />
      </Box>

      {/* Linha 2 */}
      <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr 1fr" }} gap={2}>
        <TextField
          label="Telefone"
          value={values.telefone}
          onChange={set("telefone")}
          error={!!errors.telefone}
          helperText={errors.telefone}
        />
        <TextField
          label="Email"
          value={values.email}
          onChange={set("email")}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label="Plano"
          value={values.plano}
          onChange={set("plano")}
          error={!!errors.plano}
          helperText={errors.plano}
        />
      </Box>

      {/* Botão SALVAR — largura total */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="small"
        sx={{
          justifySelf: 'start',   // evita ocupar 100% no grid
          width: 'auto',          // garante largura do conteúdo
          px: 2.5,                // padding horizontal
          py: 0.75,               // padding vertical
          borderRadius: 1.5,      // cantos arredondados (~12px)
          fontWeight: 'bold',
          letterSpacing: '0.5px',
          boxShadow: 2            // leve sombra como no print
        }}
      >
        SALVAR
      </Button>


      {/* Botão CANCELAR */}
      {onCancel && (
        <Button
          color="error"
          sx={{
            mt: 1,
            fontWeight: "bold",
            width: "fit-content"
          }}
          onClick={onCancel}
        >
          Cancelar
        </Button>
      )}
    </Box>
  );
}
