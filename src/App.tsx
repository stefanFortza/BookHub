import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [count, setCount] = useState(0);

  return <RouterProvider router={router} />;
}

export default App;
