import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserContextProvider from "./contexts/user/user.context";
import { ThemeProvider } from "@mui/material/styles";
import darkTheme from "./theme";
import CssBaseline from "@mui/material/CssBaseline";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
