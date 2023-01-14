import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import "bootstrap/dist/css/bootstrap.min.css";
import { Box, Container } from "@mui/material";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
