import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Label } from "../../components/ui/Label";

function MaterialApoyoAlquiler() {
  const { eventId } = useParams();
  const [Ítems, setÍtems] = useState([
    { ÍtemName: "", quantity: 0, observations: "" },
  ]);
  const [isOpenMoviliarios, setIsOpenMoviliarios] = useState(false);
  const [isOpenOtherMobiliarios, setIsOpenOtherMobiliarios] = useState(false);
  const toggleMobiliario = () => {
    setIsOpenMoviliarios(!isOpenMoviliarios);
  };

  const toggleOtrosMobiliarios = () => {
    setIsOpenOtherMobiliarios(!isOpenOtherMobiliarios);
  };
  const handleAddRow = () => {
    setÍtems([...Ítems, { ÍtemName: "", quantity: 0, observations: "" }]);
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newÍtems = [...Ítems];
    newÍtems[index][name] = value;
    setÍtems(newÍtems);
  };
  return (
    <div className="flex">
      <div style={{ margin: "10px 20px" }}>
        <h3 className="text-2xl font-bold mb-4" style={{ margin: "10px 20px" }}>
          2.4.1 Materiales de Apoyo (Alquiler/Compra)
        </h3>
        <div className="bg-white flex Ítems-center justify-between mt-4">
          <table className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">
                  <Label>Ítem</Label>
                </th>
                <th className="px-4 py-2">
                  <Label>Cantidad</Label>
                </th>
                <th className="px-4 py-2">
                  <Label>Unidad</Label>
                </th>
                <th className="px-4 py-2">
                  <Label>Precio Unitario</Label>
                </th>
                <th className="px-4 py-2">
                  <Label>Observaciones</Label>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Arreglo floral </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    min="0"
                    defaultValue="0"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    readOnly
                    defaultValue="Pieza"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    readOnly
                    defaultValue="70"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="observaciones"
                  />
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Adornos </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    min="0"
                    defaultValue="0"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    readOnly
                    defaultValue="Pieza"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    readOnly
                    defaultValue="450"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="observaciones"
                  />
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Souvenirs </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    min="0"
                    defaultValue="0"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    readOnly
                    defaultValue="Pieza"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    readOnly
                    defaultValue="50"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="observaciones"
                  />
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">
                  Credenciales personalizados
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    min="0"
                    defaultValue="0"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    readOnly
                    defaultValue="Pieza"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    readOnly
                    defaultValue="22"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="observaciones"
                  />
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Papelógrafos</td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    min="0"
                    defaultValue="0"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    readOnly
                    defaultValue="Pieza"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    readOnly
                    defaultValue="6"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="observaciones"
                  />
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Marcadores </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    min="0"
                    defaultValue="0"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    readOnly
                    defaultValue="pieza"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    readOnly
                    defaultValue="3.5"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="observaciones"
                  />
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Cintas </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    min="0"
                    defaultValue="0"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    readOnly
                    defaultValue="Pieza"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    readOnly
                    defaultValue="8"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="observaciones"
                  />
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Boligrafo </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    min="0"
                    defaultValue="0"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    readOnly
                    defaultValue="Pieza"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    readOnly
                    defaultValue="2"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="observaciones"
                  />
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Lápiz </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    min="0"
                    defaultValue="0"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    readOnly
                    defaultValue="Pieza"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    readOnly
                    defaultValue="1.5"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Observaciones"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 className="text-2xl font-bold mb-4" style={{ margin: "10px 20px" }}>
          2.4.2 Otros Materiales de Apoyo (Alquiler/Compra)
        </h3>
        <div className="bg-white flex Ítems-center justify-between mt-4">
          <table className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">
                  <Label>Ítem</Label>
                </th>
                <th className="px-4 py-2">
                  <Label>Cantidad</Label>
                </th>
                <th className="px-4 py-2">
                  <Label>Unidad de Medida</Label>
                </th>
                <th className="px-4 py-2">
                  <Label>Precio Unitario</Label>
                </th>
                <th className="px-4 py-2">
                  <Label>Observaciones</Label>
                </th>
              </tr>
            </thead>
            <tbody>
              {Ítems.map((Ítem, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">
                    <input
                      className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="ÍtemName"
                      value={Ítem.ÍtemName}
                      onChange={(e) => handleChange(index, e)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="number"
                      name="quantity"
                      min="0"
                      value={Ítem.quantity}
                      onChange={(e) => handleChange(index, e)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="number"
                      name="unidad"
                      min="0"
                      value={Ítem.quantity}
                      onChange={(e) => handleChange(index, e)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="number"
                      name="price"
                      min="0"
                      value={Ítem.quantity}
                      onChange={(e) => handleChange(index, e)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="observations"
                      value={Ítem.observations}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="Observaciones"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleAddRow}
          type="button"
          style={{ margin: "10px 20px" }}
        >
          Agregar fila
        </button>
      </div>
    </div>
  );
}

export default MaterialApoyoAlquiler;
