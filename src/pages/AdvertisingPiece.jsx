import React, { useEffect, useState } from "react";
import SidebarForms from "../components/SideBarForms";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Input, Label } from "../components/ui";
import { useAdvertisingRequest } from "../context/AdvertisementContext";
import { useForm, useFieldArray } from "react-hook-form";
import { useSpectatorRequest } from "../context/SpectatorContext";
dayjs.extend(utc);

const AdvertisingPiece = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { spectators, getSpectators } = useSpectatorRequest();
  const { createAdvertisement, getAdvertisement, updateAdvertisement } =
    useAdvertisingRequest();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const [successMessage, setSuccessMessage] = useState("");
  const onSubmit = async (data) => {
    try {
      if (params.id) {
        console.log(params.id);
        updateAdvertisement(params.id, {
          ...data,
        });
        setSuccessMessage("Cambios guardados exitosamente");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        console.log(data);
        createAdvertisement({
          ...data,
        });
        setSuccessMessage("Creado Exitosamente");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      }
      setTimeout(() => {
        navigate("/homepage");
      }, 6000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSpectators();
    const loadEvent = async () => {
      if (params.id) {
        const advertisement = await getAdvertisement(params.id);
        console.log(advertisement);
        setValue("title", advertisement.title);
        setValue("area", advertisement.area);
        const firstSpectator =
          advertisement.spectators.length > 0
            ? advertisement.spectators[0].title
            : "";
        setValue("spectators", firstSpectator);
        console.log(firstSpectator);

        setValue("goals", advertisement.goals);
        setValue("area", advertisement.area);
        setValue("scope", advertisement.scope);
        setValue("description", advertisement.description);
        setValue("visual_references", advertisement.visual_references);
        setValue("registrations_links", advertisement.registrations_links);
      }
    };
    loadEvent();
  }, []);

  return (
    <>
      <SidebarForms></SidebarForms>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Titulo:
          <Input
            type="text"
            name="title"
            placeholder="Nombre del Evento"
            {...register("title")}
            required
          />
        </label>

        <label>
          Area:
          <Input type="text" name="area" {...register("area")} required />
        </label>

        <label>
          Objetivos:
          <Input type="text" name="area" {...register("goals")} required />
        </label>
        <div className="mb-4">
          <Label className="block text-gray-700 text-sm font-bold mb-2">
            Dirigido a
          </Label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            {...register("spectators")} // Asegúrate de que spectators esté registrado correctamente
            defaultValue={spectators.length > 0 ? spectators[0].title : ""} // Establece el valor predeterminado del select
            required
          >
            <option value="">Selecciona un espectador</option>
            {spectators.map((spectator, index) => (
              <option key={index} value={spectator._id}>
                {spectator.title}
              </option>
            ))}
          </select>
        </div>

        <label>
          Alcanze:
          <select name="scope" {...register("scope")} required>
            <option value="">Select Scope</option>
            <option value="regional">Regional</option>
            <option value="national">National</option>
          </select>
        </label>
        <label>
          Descripción:
          <Input
            type="text"
            name="description"
            {...register("description")}
            required
          />
        </label>
        <label>
          Referencias Visuales:
          <Input
            type="text"
            name="visual_references"
            {...register("visual_references")}
          />
        </label>
        <label>
          Link de Registro:
          <Input
            type="text"
            name="registrations_links"
            {...register("registrations_links")}
          />
        </label>

        {successMessage && (
          <div
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            {successMessage}
          </div>
        )}

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default AdvertisingPiece;
