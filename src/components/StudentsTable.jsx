import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function StudentsTable({ items, onShow, onEdit, onDelete }) {
  if (!items.length) return <p>Nenhum aluno cadastrado.</p>;

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Nome</TableCell>
          <TableCell>Faixa</TableCell>
          <TableCell>Telefone</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Plano</TableCell>
          <TableCell align="right">Ações</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {items.map((a) => (
          <TableRow key={a.id} hover>
            <TableCell>{a.nome}</TableCell>
            <TableCell>{a.faixa}</TableCell>
            <TableCell>{a.telefone}</TableCell>
            <TableCell>{a.email}</TableCell>
            <TableCell>{a.plano}</TableCell>

            <TableCell align="right">
              <Stack direction="row" spacing={1} justifyContent="flex-end">
                <IconButton
                  onClick={() => onShow?.(a.id)}
                  aria-label={`Ver detalhes ${a.nome}`}
                  title="Ver detalhes"
                >
                  <VisibilityIcon />
                </IconButton>

                <IconButton
                  color="primary"
                  onClick={() => onEdit(a.id)}
                  aria-label={`Editar ${a.nome}`}
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() => onDelete(a.id)}
                  aria-label={`Excluir ${a.nome}`}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
