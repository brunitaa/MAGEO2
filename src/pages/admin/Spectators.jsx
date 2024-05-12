import { useEffect } from "react";
import Sidebar from "../../components/SideBar";
import { useAuth } from "../../context/AuthContext";
import { useSpectatorRequest } from "../../context/SpectatorContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export function SpectatorsPage() {
  const {
    getSpectator,
    deleteSpectator,
    createSpectator,
    updateSpectator,
    getSpectatorsAdmin,
  } = useSpectatorRequest([]);
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
      createSpectator({
        ...data,
      });

      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
  );
}
