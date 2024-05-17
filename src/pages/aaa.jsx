import { useEffect } from "react";
import { useEventRequest } from "../context/EventsContext";
import { EventCard } from "../components/Tasks/EventCard";
import Sidebar from "../components/SideBar";
import { useAdvertisingRequest } from "../context/AdvertisementContext";
import { AdvertisementCard } from "../components/Tasks/AdvertisementCard";
import Protocol from "./Protocol";
import { useprotocolRequest } from "../context/ProtocolContext";
import { ProtocolCard } from "../components/Tasks/ProtocolCard";
import { LogisticCard } from "../components/Tasks/LogisticCard";
import { useLogisticRequest } from "../context/LogisticContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export function HomePage2() {
  const { events, getMyEvents } = useEventRequest([]);
  const { advertisements, getMyAdvertisements } = useAdvertisingRequest([]);
  const { protocols, getMyProtocols } = useprotocolRequest([]);
  const { logistics, getMyLogistics } = useLogisticRequest([]);
  const isAdmin = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getMyEvents();
    getMyAdvertisements();
    getMyProtocols();
    getMyLogistics();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-4">
        <section>
          <h1 className="text-2xl font-bold mb-4">Eventos</h1>
          {events.length === 0 && (
            <div className="flex justify-center items-center p-10">
              <div>
                <h1 className="font-bold text-xl">
                  No hay eventos aún, por favor añade uno nuevo.
                </h1>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
              <EventCard event={event} key={event._id} />
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h1 className="text-2xl font-bold mb-4">Protocolos</h1>
          {protocols.length === 0 && (
            <div className="flex justify-center items-center p-10">
              <div>
                <h1 className="font-bold text-xl">
                  No hay formularios de protocolo aún, por favor añade uno
                  nuevo.
                </h1>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {protocols.map((protocol) => (
              <ProtocolCard protocol={protocol} key={protocol._id} />
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h1 className="text-2xl font-bold mb-4">Logística</h1>
          {logistics.length === 0 && (
            <div className="flex justify-center items-center p-10">
              <div>
                <h1 className="font-bold text-xl">
                  No hay formularios de logistica aún, por favor añade uno
                  nuevo.
                </h1>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {logistics.map((logistic) => (
              <LogisticCard
                logistic={logistic}
                isAdmin={isAdmin}
                key={logistic._id}
              />
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h1 className="text-2xl font-bold mb-4">Piezas</h1>
          {advertisements.length === 0 && (
            <div className="flex justify-center items-center p-10">
              <div>
                <h1 className="font-bold text-xl">
                  No hay piezas publicitarias aún, por favor añade uno nuevo.
                </h1>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {advertisements.map((advertisement) => (
              <AdvertisementCard
                advertisement={advertisement}
                key={advertisement._id}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
