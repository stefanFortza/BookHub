import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserContextProvider from "./contexts/user/user.context";
import { ThemeProvider } from "@mui/material/styles";
import darkTheme from "./theme";
import CssBaseline from "@mui/material/CssBaseline";
import localforage from "localforage";
import CartContextProvider from "./contexts/cart/cart.context";

localforage.config({
  driver: localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
  name: "bookShop",
  version: 1.0,
  storeName: "bookShop", // Should be alphanumeric, with underscores.
  description: "some description",
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <UserContextProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </UserContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
