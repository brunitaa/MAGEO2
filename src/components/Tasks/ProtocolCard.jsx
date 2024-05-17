import { useAuth } from "../../context/AuthContext";
import { useprotocolRequest } from "../../context/ProtocolContext";
import { Button, ButtonLink, Card } from "../ui";

export function ProtocolCard({ protocol, isAdmin }) {
  const { deleteProtocol } = useprotocolRequest();
  console.log(isAdmin);

  const handleDelete = async () => {
    await deleteProtocol(protocol._id);
    window.location.reload();
    // Llamar a la función para actualizar la lista de anuncios después de borrar
  };
  return (
    <Card>
      <header className="flex justify-between">
        <h2 className="text-2xl font-bold">{protocol.state}</h2>
        <div className="flex gap-x-2 items-center">
          <Button onClick={handleDelete}>Delete</Button>
          {isAdmin ? (
            <ButtonLink to={`/admin/protocol/${protocol._id}`}>Edit</ButtonLink>
          ) : (
            <ButtonLink to={`/user/protocol/${protocol._id}`}>View</ButtonLink>
          )}
        </div>
      </header>

      <p className="text-slate-300">Estado:{protocol.state}</p>
      <p className="text-slate-300">Observaciones:{protocol.observations}</p>
    </Card>
  );
}
