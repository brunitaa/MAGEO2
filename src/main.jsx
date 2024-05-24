import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa el CSS de Bootstrap
import "./index.css"; // Tu archivo CSS personalizado, si tienes uno
import "./styles.scss"; // Importa el archivo Sass personalizado
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Importa el JS de Bootstrap

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
