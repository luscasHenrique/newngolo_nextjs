// src/app/events/_components/EventListView.tsx
import EventCard from "./EventCard";
import type { Event } from "../types/Event";

interface EventListViewProps {
  events: Event[];
}

const EventListView: React.FC<EventListViewProps> = ({ events }) => {
  if (events.length === 0) {
    return (
      <p className="text-center text-gray-700 text-lg py-10">
        Nenhum evento encontrado para as datas selecionadas.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventListView;
