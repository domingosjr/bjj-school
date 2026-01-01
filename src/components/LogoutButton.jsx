import { Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";

export default function LogoutButton() {
  const { logout, user } = useAuth();

  return (
    <Button
      onClick={logout}
      sx={(t) => ({
        color: t.palette.primary.contrastText,
        textTransform: "none",
        fontWeight: 500,
      })}
    >
      Sair ({user?.preferred_username ?? "usuário"})
    </Button>
  );
}
