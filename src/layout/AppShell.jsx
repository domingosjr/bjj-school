import { useMemo, useState } from "react";
import {
  AppBar, Toolbar, Typography, Container,
  Button, IconButton, CssBaseline
} from "@mui/material";
import { alpha, createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink, useNavigate } from "react-router-dom";
import Brightness4Icon from "@mui/icons-material/Brightness4"; // lua
import Brightness7Icon from "@mui/icons-material/Brightness7"; // sol
import LogoutButton from "../components/LogoutButton";

function NavButton({ to, children, end }) {
  return (
    <Button
      component={NavLink}
      to={to}
      end={end}
      variant="text"
      sx={(t) => {
        const contrast = t.palette.getContrastText(t.palette.primary.main);
        return {
          // texto sempre legível no AppBar (light e dark)
          color: `${contrast} !important`,
          textTransform: "none",
          fontWeight: 500,
          borderRadius: 2,
          "&.active": {
            backgroundColor: alpha(contrast, 0.24),
            color: `${contrast} !important`,
          },
          "&:hover": {
            backgroundColor: alpha(contrast, 0.14),
          },
          // evita que alguma variante herdada mude a cor
          "& .MuiButton-startIcon, & .MuiButton-endIcon": {
            color: `${contrast} !important`,
          },
        };
      }}
    >
      {children}
    </Button>
  );
}

export default function AppShell({ children }) {
  // 🔵 controle de tema fica aqui dentro do shell
  const [mode, setMode] = useState("light");
  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  const toggleTheme = () => setMode((m) => (m === "light" ? "dark" : "light"));
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AppBar position="static" color="primary" enableColorOnDark>
        <Toolbar sx={{ gap: 2 }}>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            JJ School
          </Typography>

          <NavButton to="/" end>Home</NavButton>
          <NavButton to="/alunos">Alunos</NavButton>
          <NavButton to="/comunicados">Comunicados</NavButton>
          <NavButton to="/admin">Admin</NavButton>
          <LogoutButton />
          <IconButton
            onClick={toggleTheme}
            sx={(t) => ({ color: t.palette.primary.contrastText })}
            aria-label={`Alternar tema (atual: ${mode})`}
          >
            {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 3 }}>{children}</Container>
    </ThemeProvider>
  );
}
