import { useEffect } from "react";
import { useEventRequest } from "../../context/EventsContext";
import { EventCard } from "../../components/Tasks/EventCard";
import Sidebar from "../../components/SideBar";
import { AdvertisementCard } from "../../components/Tasks/AdvertisementCard";
import { useAdvertisingRequest } from "../../context/AdvertisementContext";
import { useAuth } from "../../context/AuthContext";
import { useprotocolRequest } from "../../context/ProtocolContext";
import { ProtocolCard } from "../../components/Tasks/ProtocolCard";
import { LogisticCard } from "../../components/Tasks/LogisticCard";
import { useLogisticRequest } from "../../context/LogisticContext";
import { useNavigate } from "react-router-dom";
import { ButtonLink } from "../../components/ui";

export function AdminHomePage() {
  const { events, getEvents } = useEventRequest([]);
  const { advertisements, getAdvertisements } = useAdvertisingRequest([]);
  const { protocols, getProtocols } = useprotocolRequest([]);
  const { logistics, getLogistics } = useLogisticRequest([]);
  const { isAdmin } = useAuth([]);

  useEffect(() => {
    getEvents();
    getAdvertisements();
    getProtocols();
    getLogistics();
  }, []);
  const navigate = useNavigate();
  return (
    <div className="flex">
      <Sidebar></Sidebar>
      {events.length === 0 && (
        <div className="flex justify-center items-center p-10">
          <div>
            <h1 className="font-bold text-xl">
              No tasks yet, please add a new task
            </h1>
          </div>
        </div>
      )}

      <ButtonLink to={`/spectators`}>Espectadores</ButtonLink>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {events.map((event) => (
          <EventCard event={event} key={event._id} isAdmin={isAdmin} />
        ))}
      </div>

      <h3>Protocolo</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {protocols.map((protocol) => (
          <ProtocolCard
            protocol={protocol}
            isAdmin={isAdmin}
            key={protocol._id}
          />
        ))}
      </div>
      <h3>Logistica</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {logistics.map((logistic) => (
          <LogisticCard
            logistic={logistic}
            isAdmin={isAdmin}
            key={logistic._id}
          />
        ))}
      </div>

      <h1>Piezas Publicitarias</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {advertisements.map((advertisement) => (
          <AdvertisementCard
            advertisement={advertisement}
            isAdmin={isAdmin}
            key={advertisement._id}
          />
        ))}
      </div>
    </div>
  );
}
