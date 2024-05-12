import React, { useState, useEffect } from "react";
import SidebarForms from "../components/SideBarForms";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Input, Label } from "../components/ui";
import { useAdvertisingRequest } from "../context/AdvertisementContext";
import { useForm, useFieldArray } from "react-hook-form";
import { format, formatISO } from "date-fns";
import { useSpectatorRequest } from "../context/SpectatorContext";
dayjs.extend(utc);

const AdvertisingPieceAdmin = () => {
  const params = useParams();
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
  const onSubmit = async (data) => {
    try {
      if (params.id) {
        console.log(params.id);
        updateAdvertisement(params.id, {
          ...data,
        });
      } else {
        console.log(data);
        createAdvertisement({
          ...data,
        });
      }
      navigate("/homepage");
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
        setValue("spectator", advertisement.spectators);

        setValue("goals", advertisement.goals);
        setValue("area", advertisement.area);
        setValue("scope", advertisement.scope);
        setValue("descripton", advertisement.description);
        setValue("visual_references", advertisement.visual_references);
        setValue("registration_link", advertisement.registration_link);
      }
    };
    loadEvent();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          placeholder="Nombre del Evento"
          {...register("title")}
          required
        />
      </label>

      <label>
        Area:
        <input type="text" name="area" {...register("area")} required />
      </label>

      <label>
        Goals:
        <textarea name="goals" required />
        <input type="text" name="area" {...register("goals")} required />
      </label>
      <div className="mb-4">
        <Label className="block text-gray-700 text-sm font-bold mb-2">
          Dirigido a
        </Label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
          {...register("spectators")}
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
        Scope:
        <select name="scope" {...register("scope")} required>
          <option value="">Select Scope</option>
          <option value="regional">Regional</option>
          <option value="national">National</option>
        </select>
      </label>
      <label>
        Description:
        <textarea name="description" {...register("description")} required />
      </label>
      <label>
        Visual References:
        <input
          type="text"
          name="visual_references"
          {...register("visual_reference")}
        />
      </label>
      <label>
        Registrations Links:
        <input
          type="text"
          name="registrations_links"
          {...register("registration_links")}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AdvertisingPieceAdmin;
