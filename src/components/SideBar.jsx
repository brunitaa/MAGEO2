import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import * as Icon from "react-bootstrap-icons";

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

  return (
    <aside
      className={` fixed top-0 bottom-0 h-screen lg:relative  bg-red-900 ${
        sidebarOpen ? "" : "hidden"
      }`}
    >
      <div className="p-2 lg:w-72 lg:flex lg:flex-col lg:justify-between h-full lg:h-auto">
        <div className="text-gray-100 text-xl">
          <div className="p-2.5 mt-1 flex Ítems-center">
            <Icon.ArrowRight />
            <h1 className="font-bold text-gray-200 text-sm ml-3">SIEGEMUV</h1>
            <i
              className="bi bi-x cursor-pointer ml-3 lg:hidden"
              onClick={toggleSidebar}
            ></i>
          </div>
          <div className="my-2 bg-gray-600 h-px"></div>
        </div>

        <div className="p-2.5 mt-3 flex Ítems-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-600 text-white">
          <Icon.HouseFill />
          <Link to="/homepage" className="text-sm ml-3 text-gray-200 font-bold">
            Home
          </Link>
        </div>
        <div className="p-2.5 mt-3 flex Ítems-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-600 text-white">
          <Icon.Question />
          <Link to="/manual" className="text-sm ml-3 text-gray-200 font-bold">
            Preguntas
          </Link>
        </div>
        <div className="my-4 bg-gray-600 h-px"></div>
        <div className="p-2.5 mt-3 flex Ítems-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-600 text-white">
          <Icon.Envelope />
          <Link to="/events" className="text-sm ml-3 text-gray-200 font-bold">
            Solicitar Evento
          </Link>
        </div>
        <div className="my-4 bg-gray-600 h-px"></div>

        <button
          className="p-2.5 mt-3 flex Ítems-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-600 text-white"
          onClick={() => logout()}
        >
          <i className="bi bi-box-arrow-in-right"></i>
          <span className="text-sm ml-3 text-gray-200 font-bold">Log Out</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
