import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { store } from "./store";
import { ThemeProvider, CssBaseline } from "@mui/material";
import App from "./App";
import { AlunosProvider } from "./context/AlunosContext";
import { makeTheme } from "./theme/theme";

function WithTheme({ children }) {
  const mode = useSelector(s => s.ui.mode);
  const theme = makeTheme(mode);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <WithTheme>
        <BrowserRouter>
          <AlunosProvider>
            <App />
          </AlunosProvider>
        </BrowserRouter>
      </WithTheme>
    </Provider>
  </React.StrictMode>
);
