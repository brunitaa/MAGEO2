import { useEffect, useState } from "react";
import Sidebar from "../../components/SideBar";
import { useAuth } from "../../context/AuthContext";
import { useSpectatorRequest } from "../../context/SpectatorContext";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { SpectatorCard } from "../../components/Tasks/Spectator";

export function SpectatorsPage() {
  const {
    spectators,
    getSpectator,
    getSpectators,
    getSpectatorsAdmin,
    updateSpectator,
    createSpectator,
  } = useSpectatorRequest([]);
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const { isAdmin } = useAuth([]);
  const navigate = useNavigate();

  useEffect(() => {
    getSpectatorsAdmin();
  }, []);

  const onSubmit = async (data) => {
    try {
      if (params.id) {
        console.log(params.id);
        updateSpectator(params.id, {
          ...data,
        });
      } else {
        console.log(data);
        createSpectator({
          ...data,
        });
      }
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadEvent = async () => {
      if (params.id) {
        const spectator = await getSpectator(params.id);
        console.log(spectator);
        setValue("title", spectator.title);
        setValue("area", spectator.value);
      }
    };
    loadEvent();
  }, []);

  return (
    <>
      <div className="flex">
        <Sidebar></Sidebar>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="title">Title:</label>
            <input type="text" {...register("title")} required />
          </div>
          <div>
            <label htmlFor="value">Value:</label>
            <input type="number" {...register("value")} required />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div>
        <h1>Mis Espectadores</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
          {spectators &&
            spectators.length > 0 &&
            spectators.map((spectator) => (
              <SpectatorCard spectator={spectator} key={spectator._id} />
            ))}
        </div>
      </div>
    </>
  );
}
