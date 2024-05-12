import React, { useState, useEffect } from "react";

import RequerimientosServicios from "./RequerimientosServicios";
import Inauguracion from "./Inauguracion";
import Clausura from "./Clausura";

function Protocolo() {
  return (
    <>
      <div>
        <RequerimientosServicios></RequerimientosServicios>
        <Inauguracion></Inauguracion> <Clausura></Clausura>
      </div>
    </>
  );
}

export default Protocolo;
