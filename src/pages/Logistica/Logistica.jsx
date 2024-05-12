import React, { useState, useEffect } from "react";
import Mobiliario from "./Mobiliario";
import MobiliarioAlquiler from "./MobiliarioAlquiler";
import Alimentacion from "./Alimentacion";
import AlimentacionAlquiler from "./AlimentacionAlquiler";
import MaterialApoyo from "./MaterialApoyo";
import MaterialApoyoAlquiler from "./MaterialApoyoAlquiler";
import Transporte from "./Transporte";
import Disertante from "./Disertante";

function Logistica() {
  return (
    <>
      <div>
        <Mobiliario></Mobiliario>
      </div>
      <div>
        <MobiliarioAlquiler></MobiliarioAlquiler>
      </div>
      <div>
        <Alimentacion></Alimentacion>
      </div>
      <div>
        <AlimentacionAlquiler></AlimentacionAlquiler>
      </div>
      <div>
        <MaterialApoyo></MaterialApoyo>
      </div>
      <div>
        <MaterialApoyoAlquiler></MaterialApoyoAlquiler>
      </div>
      <Transporte></Transporte> <Disertante></Disertante>
    </>
  );
}

export default Logistica;
