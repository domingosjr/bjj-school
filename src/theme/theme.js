import { createTheme } from "@mui/material/styles";

export function makeTheme(mode = "light") {
  return createTheme({
    palette: {
      mode,
      primary: { main: "#1769aa" },
      error:   { main: "#b00020" },
    },
    shape: { borderRadius: 10 },
  });
}
