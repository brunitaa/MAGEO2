import { useEffect } from "react";
import { useEventRequest } from "../context/EventsContext";
import { EventCard } from "../components/Tasks/EventCard";
import Sidebar from "../components/SideBar";
import { useAdvertisingRequest } from "../context/AdvertisementContext";
import { AdvertisementCard } from "../components/Tasks/AdvertisementCard";

export function HomePage2() {
  const { events, getEvents } = useEventRequest([]);
  const { advertisements, getAdvertisements } = useAdvertisingRequest([]);

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
              No events yet, please add a new event
            </h1>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {events.map((event) => (
          <EventCard event={event} key={event._id} />
        ))}
      </div>

      <div>
        <p>ADVERTISING PIECES</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
          {advertisements.map((advertisement) => (
            <AdvertisementCard
              advertisement={advertisement}
              key={advertisement._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
