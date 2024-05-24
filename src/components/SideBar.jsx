import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSubmenu = () => {
    setSubmenuOpen(!submenuOpen);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/"); // Redirige al usuario a la página de inicio después de cerrar sesión
      console.log("Signed out successfully");
    } catch (error) {
      console.log("Error al cerrar sesión:", error.message);
    }
  };

  return (
    <aside
      className={`fixed top-0 bottom-0 h-100 bg-danger ${
        sidebarOpen ? "d-block" : "d-none"
      } lg:static`}
    >
      <div className="d-flex flex-column justify-between h-100 p-3">
        <div>
          <div className="d-flex align-items-center">
            <h1 className="text-white fw-bold fs-6 ml-3">SIEGEMUV</h1>
            <i
              className="bi bi-x cursor-pointer ms-auto d-lg-none"
              onClick={toggleSidebar}
            ></i>
          </div>
          <hr className="text-secondary my-2" />
          <nav className="nav flex-column">
            <Link to="/homepage" className="nav-link text-light">
              Home
            </Link>
            <Link to="/manual" className="nav-link text-light">
              Preguntas
            </Link>
            <hr className="text-secondary my-2" />
            <Link to="/events" className="nav-link text-light">
              Solicitar Evento
            </Link>
            <hr className="text-secondary my-2" />
          </nav>
        </div>
        <button
          className="btn btn-danger mt-auto d-flex align-items-center"
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-in-right"></i>
          <span className="ms-2 text-light">Log Out</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
