import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Input, Label } from "../../components/ui";
import { useEventRequest } from "../../context/EventsContext";
import { useForm, useFieldArray } from "react-hook-form";
import { format, formatISO } from "date-fns";
import SidebarForms from "../../components/SideBarForms";
import { useSpectatorRequest } from "../../context/SpectatorContext";
dayjs.extend(utc);

function EventFormAdmin() {
  const [successMessage, setSuccessMessage] = useState("");
  const params = useParams();
  const { createEvent, getEvent, updateEvent, acceptEvent, rejectEvent } =
    useEventRequest();
  const { spectators, getSpectators } = useSpectatorRequest();
  const navigate = useNavigate();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "schedules",
  });

  const onSubmit = async (data) => {
    try {
      data.schedules.forEach((schedule) => {
        // Formatea la fecha
        schedule.date = format(
          new Date(schedule.date),
          "yyyy-MM-dd'T'HH:mm:ssxxx"
        );

        // Formatea el tiempo
        schedule.time = format(
          new Date(`2000-01-01T${schedule.time}`),
          "yyyy-MM-dd'T'HH:mm:ssxxx"
        );
      });
      if (params.id) {
        console.log(params.id);
        updateEvent(params.id, {
          ...data,
        });
      } else {
        console.log(data);
        createEvent({
          ...data,
        });
      }
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  const onAccept = async (data) => {
    try {
      console.log(params.id);
      updateEvent(params.id, {
        ...data,
      });
      acceptEvent(params.id, {
        ...data,
      });
      setSuccessMessage("Aceptado Correctamente");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      setTimeout(() => {
        navigate("/admin");
      }, 5000);

      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  const onReject = async (data) => {
    try {
      console.log(params.id);
      updateEvent(params.id, {
        ...data,
      });
      rejectEvent(params.id, {
        ...data,
      });
      setSuccessMessage("Rechazado Correctamente");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      setTimeout(() => {
        navigate("/admin");
      }, 5000);

      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSpectators();
    const loadEvent = async () => {
      if (params.id) {
        const event = await getEvent(params.id);
        console.log(event);
        setValue("event_name", event.event_name);
        setValue("event_description", event.event_description);
        setValue(
          "date",
          event.date ? dayjs(event.date).utc().format("YYYY-MM-DD") : ""
        );
        setValue("campus", event.campus);
        setValue("area", event.area);
        setValue("registration_link", event.registration_link);
        setValue("attendance_control", event.attendance_control);

        // Asegúrate de que event.schedules exista y sea un array antes de asignarlo
        if (event.schedules && Array.isArray(event.schedules)) {
          // Aquí puedes ajustar cómo asignas los valores de los schedules según tu estructura de datos
          event.schedules.forEach((schedule, index) => {
            setValue(`schedules[${index}].place`, schedule.place);
            setValue(
              `schedules[${index}].date`,
              schedule.date ? schedule.date.slice(0, 10) : ""
            );
            setValue(
              `schedules[${index}].time`,
              schedule.time ? schedule.time.slice(0, 10) : ""
            );
            setValue(
              `schedules[${index}].links_to_visual_material`,
              schedule.links_to_visual_material
            );
            setValue(`schedules[${index}].event_type`, schedule.event_type);
            setValue(`schedules[${index}].coordination`, schedule.coordination);
            setValue(`schedules[${index}].scope`, schedule.scope);
            setValue(`schedules[${index}].description`, schedule.description);
            setValue(
              `schedules[${index}].activity_objective`,
              schedule.activity_objective
            );
            setValue(`schedules[${index}].format`, schedule.format);
          });
        }
      }
    };
    loadEvent();
  }, []);

  return (
    <>
      <SidebarForms></SidebarForms>
      <form
        style={{ margin: "10px 20px" }}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 min-h-screen max-w-4xl mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl font-bold mb-4">Formulario de Solicitud</h1>
        <div className="mb-4">
          <Label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="event_name"
          >
            Nombre del Evento
          </Label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            name="event_name"
            type="text"
            placeholder="Nombre del Evento"
            {...register("event_name")}
            readOnly
            autoFocus
          />
        </div>
        <div className="mb-4">
          <Label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="event_description"
          >
            Descripción del Evento
          </Label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="event_description"
            placeholder="Descripción del Evento"
            {...register("event_description")}
            readOnly
          />
        </div>
        <div className="grid grid-cols-2 gap-4 w-full h-full">
          <div className="mb-4">
            <Label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="area"
            >
              Area
            </Label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="area"
              type="text"
              placeholder={"Area"}
              {...register("area")}
              readOnly
            />
          </div>
          <div className="mb-4">
            <Label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="campus"
            >
              Sede
            </Label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="campus"
              type="text"
              value={"Santa Cruz"}
              readOnly
              {...register("campus")}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 w-full h-full">
          <div className="mb-4">
            <Label className="block text-gray-700 text-sm font-bold mb-2">
              Link de Registro
            </Label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="registration_link"
              type="text"
              placeholder={"Link"}
              readOnly
              {...register("registration_link")}
            />
          </div>
          <div className="mb-4">
            <Label className="block text-gray-700 text-sm font-bold mb-2">
              Control de asistencia
            </Label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="attendance_control"
              type="text"
              placeholder={"Si o No?"}
              readOnly
              {...register("attendance_control")}
            >
              <option value="true">Si</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>
        {/* Otros campos de entrada aquí */}
        {/* Sección de programación (schedules) */}
        <h2 className="text-xl font-bold mb-2">Horarios</h2>
        {fields.map((schedule, index) => (
          <div key={schedule.id}>
            <h3 className="text-lg font-bold mb-2">Horario {index + 1}</h3>
            <div className="mb-4">
              <Label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor={`schedules[${index}].place`}
              >
                Lugar
              </Label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                name={`schedules[${index}].place`}
                type="text"
                placeholder="Lugar"
                {...register(`schedules[${index}].place`, { readOnly: true })}
              />
            </div>
            <div className="mb-4">
              <Label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor={`schedules[${index}].date`}
              >
                Fecha
              </Label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                name={`schedules[${index}].date`}
                type="date"
                placeholder="Fecha"
                {...register(`schedules[${index}].date`, { readOnly: true })}
              />
            </div>
            <div className="mb-4">
              <Label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor={`schedules[${index}].time`}
              >
                Hora
              </Label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                name={`schedules[${index}].time`}
                type="time"
                placeholder="Hora"
                {...register(`schedules[${index}].time`, { readOnly: true })}
              />
            </div>
            <div className="mb-4">
              <Label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor={`schedules[${index}].time`}
              >
                Modalidad
              </Label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                name={`schedules[${index}].format`}
                type="text"
                placeholder="modalidad"
                {...register(`schedules[${index}].format`, { readOnly: true })}
              >
                <option value="Virtual">Virtual</option>
                <option value="In person">Presencial</option>
              </select>
            </div>
            <div className="mb-4">
              <Label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="eventType"
              >
                Tipo de Evento
              </Label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="event_type"
                {...register(`schedules[${index}].event_type`, {
                  readOnly: true,
                })}
                readOnly
              >
                <option value="Talks">Charla</option>
                <option value="Contest">Concurso</option>
                <option value="Seminar">Seminario</option>
                <option value="Symposium">Simposium</option>
                <option value="Workshop">Taller</option>
                <option value="Conference">Conferencia</option>
                <option value="Fair">Feria</option>
                <option value="Signing of Agreement">Firma de Convenio</option>
                <option value="Inauguration">Poseción</option>
                <option value="Exhibition">Exposición</option>
                <option value="Cultural Activity">Actividad Cultural</option>
                <option value="Others">Otros(mencionar en Descripción)</option>
              </select>
            </div>
            <div className="mb-4">
              <Label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor={`schedules[${index}].place`}
              >
                Dirigido a
              </Label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                name={`schedules[${index}].place`}
                {...register(`schedules[${index}].spectators`, {
                  readOnly: true,
                })}
              >
                <option value="">Selecciona un espectador</option>
                {spectators.map((spectator, index) => (
                  <option key={index} value={spectator._id}>
                    {spectator.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <Label className="block text-gray-700 text-sm font-bold mb-2">
                Alcance del Evento
              </Label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="scope"
                readOnly
                {...register(`schedules[${index}].scope`, {
                  readOnly: true,
                })}
              >
                <option value="regional">Regional</option>
                <option value="Nacional">Nacional</option>
              </select>
            </div>
            <div className="mb-4">
              <Label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="event_description"
              >
                Descripción
              </Label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                placeholder="Descripción del Evento"
                {...register(`schedules[${index}].description`)}
                readOnly
              />
            </div>
            <div className="mb-4">
              <Label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="coordination"
              >
                Coordinación con
              </Label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="coordination"
                readOnly
                {...register(`schedules[${index}].coordination`, {
                  readOnly: true,
                })}
              >
                <option value="bienestar">Bienestar</option>
                <option value="comunicacion">Comunicación</option>
                <option value="direccion_carrera">Dirección de Carrera</option>
                <option value="administracion_marketing">
                  Administración y Marketing
                </option>
              </select>
            </div>
            <div className="mb-4">
              <Label className="block text-gray-700 text-sm font-bold mb-2">
                Objetivo de la Actividad
              </Label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="activity_objective"
                type="text"
                placeholder="Objetivo de la Actividad"
                readOnly
                {...register(`schedules[${index}].activity_objective`, {
                  readOnly: true,
                })}
              />
            </div>
            <div className="mb-4">
              <Label className="block text-gray-700 text-sm font-bold mb-2">
                Link al material Visual
              </Label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="links_to_visual_material"
                type="text"
                placeholder={"Link"}
                readOnly
                {...register(`schedules[${index}].links_to_visual_material`, {
                  readOnly: true,
                })}
              />
            </div>
            {/* Agrega los demás campos de programación aquí */}
          </div>
        ))}
        <button
          type="button"
          onClick={() => append({})}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Agregar Horario
        </button>
        <br />
        <button
          type="button"
          onClick={() => remove({})}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Eliminar Horario
        </button>
        <br />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Enviar
        </button>
        <br></br>

        <div className="mb-4">
          <Label className="block text-gray-700 text-sm font-bold mb-2">
            Observaciones
          </Label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="observations"
            type="text"
            placeholder={"observations"}
            {...register(`observations`)}
          />
        </div>

        <button
          type="button"
          onClick={() => onAccept()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Aceptar
        </button>

        <button
          type="button"
          onClick={() => onReject()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Denegar
        </button>
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
      </form>
    </>
  );
}

export default EventFormAdmin;
