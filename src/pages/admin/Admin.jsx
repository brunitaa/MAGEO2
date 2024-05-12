import { useEffect } from "react";
import { useEventRequest } from "../../context/EventsContext";
import { EventCard } from "../../components/Tasks/EventCard";
import Sidebar from "../../components/SideBar";
import { AdvertisementCard } from "../../components/Tasks/AdvertisementCard";
import { useAdvertisingRequest } from "../../context/AdvertisementContext";
import { useAuth } from "../../context/AuthContext";

export function AdminHomePage() {
  const { events, getEvents } = useEventRequest([]);
  const { advertisements, getAdvertisements } = useAdvertisingRequest([]);
  const { isAdmin } = useAuth([]);

  useEffect(() => {
    getEvents();
    getAdvertisements();
  }, []);

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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {events.map((event) => (
          <EventCard event={event} key={event._id} isAdmin={isAdmin} />
        ))}
      </div>

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
