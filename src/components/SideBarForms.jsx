import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function SidebarForms() {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [submenuProtocolo, setSubmenuProtocolo] = useState(false);
  const [submenuLogistica, setSubmenuLogistica] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true); // Sidebar abierto por defecto

  const toggleSubmenu = () => {
    setSubmenuOpen(!submenuOpen);
  };

  const toggleProtocolo = () => {
    setSubmenuProtocolo(!submenuProtocolo);
  };

  const toggleLogistica = () => {
    setSubmenuLogistica(!submenuLogistica);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redirige al usuario a la página de inicio después de cerrar sesión
      console.log("Signed out successfully");
    } catch (error) {
      console.log("Error al cerrar sesión:", error.message);
    }
  };

  return (
    <aside
      className={`d-lg-block bg-danger ${sidebarOpen ? "" : "d-none"}`}
      style={{ position: "fixed", top: 0, bottom: 0 }}
    >
      <div className="border-bottom border-light my-2"></div>
      <div className="p-3">
        <div className="text-light text-xl">
          <div className="d-flex align-items-center">
            <i className="bi bi-app-indicator px-2 py-1 bg-danger"></i>
            <h1 className="font-weight-bold text-light text-sm ml-3">
              SIEGEMUV
            </h1>
          </div>
          <div className="border-bottom border-light my-2"></div>
        </div>
        <div className="p-2 d-flex align-items-center rounded hover-bg-danger text-white">
          <Link
            to="/homepage"
            className="text-sm ml-3 text-light font-weight-bold"
          >
            Home
          </Link>
        </div>
        <div className="border-bottom border-light my-2"></div>
        <div className="p-2 d-flex align-items-center rounded hover-bg-danger text-white">
          <Link
            to="/events"
            className="text-sm ml-3 text-light font-weight-bold"
          >
            Form 1
          </Link>
        </div>
        <div className="border-bottom border-light my-2"></div>
        <div
          className="p-2 d-flex align-items-center rounded hover-bg-danger text-white"
          onClick={toggleSubmenu}
        >
          <div className="d-flex justify-content-between w-100 align-items-center">
            <Link className="text-sm ml-3 text-light font-weight-bold">
              Formulario 2
            </Link>
            <span
              className={`text-sm ${submenuOpen ? "rotate-180" : ""}`}
              id="arrow"
            >
              <i className="bi bi-chevron-down"></i>
            </span>
          </div>
        </div>

        <div className="border-bottom border-light my-2"></div>
        <div className="p-2 d-flex align-items-center rounded hover-bg-danger text-white">
          <Link
            to={`/user/logistic`}
            className="text-sm ml-3 text-light font-weight-bold"
          >
            Logistica
          </Link>
        </div>
        <div className="p-2 d-flex align-items-center rounded hover-bg-danger text-white">
          <Link
            to={`/user/protocol`}
            className="text-sm ml-3 text-light font-weight-bold"
          >
            Protocol
          </Link>
        </div>

        <div className="p-2 d-flex align-items-center rounded hover-bg-danger text-white">
          <Link
            to={`/advertisingPiece`}
            className="text-sm ml-3 text-light font-weight-bold"
          >
            Form 3
          </Link>
        </div>
        <div className="border-bottom border-light my-2"></div>
      </div>
      <button
        className="p-2 mt-3 d-flex align-items-center rounded hover-bg-danger text-white"
        onClick={() => logout()}
      >
        <i className="bi bi-box-arrow-in-right"></i>
        <span className="text-sm ml-3 text-light font-weight-bold">
          Log Out
        </span>
      </button>
    </aside>
  );
}

export default SidebarForms;
