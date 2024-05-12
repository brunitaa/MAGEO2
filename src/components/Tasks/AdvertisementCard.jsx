import { useAdvertisingRequest } from "../../context/AdvertisementContext";
import { useAuth } from "../../context/AuthContext";
import { Button, ButtonLink, Card } from "../ui";

export function AdvertisementCard({ advertisement, isAdmin }) {
  const { deleteAdvertisement } = useAdvertisingRequest();
  console.log(isAdmin);
  const handleDelete = async () => {
    await deleteAdvertisement(advertisement._id);
    // Llamar a la función para actualizar la lista de anuncios después de borrar
  };
  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{advertisement.title}</h1>
        <div className="flex gap-x-2 items-center">
          <Button onClick={handleDelete}>Delete</Button>
          {isAdmin ? (
            <ButtonLink to={`/admin/advertisement/${advertisement._id}`}>
              Edit
            </ButtonLink>
          ) : (
            <ButtonLink to={`/user/advertisement/${advertisement._id}`}>
              View
            </ButtonLink>
          )}
        </div>
      </header>
      <p className="text-slate-300">{advertisement.description}</p>
      <p className="text-slate-300">{advertisement.state}</p>
    </Card>
  );
}
