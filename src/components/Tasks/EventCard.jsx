import { useEventRequest } from "../../context/EventsContext";
import { Button, ButtonLink, Card } from "../ui";

export function EventCard({ event }) {
  const { deleteEvent } = useEventRequest();

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{event.event_name}</h1>
        <div className="flex gap-x-2 items-center">
          <Button onClick={() => deleteEvent(event._id)}>Delete</Button>
          <ButtonLink to={`/eventsEdit/${event._id}`}>Edit</ButtonLink>
        </div>
      </header>
      <p className="text-slate-300">{event.event_description}</p>
      <p className="text-slate-300">{event.state}</p>
      {/* format date */}
      <p>
        {event.request_date &&
          new Date(event.request_date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
      </p>
    </Card>
  );
}
