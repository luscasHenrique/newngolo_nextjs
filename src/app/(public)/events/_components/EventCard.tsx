// src/app/events/_components/EventCard.tsx
import Link from "next/link";
import type { Event } from "../types/Event";

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const startDate = new Date(event.dateStart);
  const endDate = new Date(event.dateEnd);

  // Formatar data e hora de início
  const formattedStartDate = startDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const formattedStartTime = startDate.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Verificar se o evento termina no mesmo dia
  const isSameDayEvent = startDate.toDateString() === endDate.toDateString();

  let dateDisplay;
  if (isSameDayEvent) {
    dateDisplay = `🗓️ ${formattedStartDate} das ${formattedStartTime} às ${endDate.toLocaleTimeString(
      "pt-BR",
      { hour: "2-digit", minute: "2-digit" }
    )}`;
  } else {
    // Evento de múltiplos dias
    const formattedEndDate = endDate.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    const formattedEndTime = endDate.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    dateDisplay = `🗓️ De ${formattedStartDate} ${formattedStartTime} a ${formattedEndDate} ${formattedEndTime}`;
  }

  return (
    <div className="border p-4 rounded-lg shadow-md flex flex-col bg-white transition-all duration-300 hover:shadow-lg hover:border-gray-300">
      <h3 className="text-xl font-semibold mb-2 text-gray-800">
        {event.title}
      </h3>
      <p className="text-sm text-green-600 font-medium mb-1">{dateDisplay}</p>
      {event.location && (
        <p className="text-sm text-gray-600 mb-2">📍 {event.location}</p>
      )}
      <p className="text-gray-700 text-sm mb-3 line-clamp-3">
        {event.description}
      </p>
      <div className="flex flex-wrap gap-2 text-xs mb-4">
        <span className="p-1 px-2 bg-green-100 text-green-800 rounded-full">
          {event.category}
        </span>
        {event.isOnline && (
          <span className="p-1 px-2 bg-blue-100 text-blue-800 rounded-full">
            Online
          </span>
        )}
      </div>
      <div className="flex gap-2 mt-auto">
        <Link
          href={`/events/${event.id}`}
          className="flex-1 text-center bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300"
        >
          Ver Detalhes
        </Link>
        {event.registrationLink && (
          <a
            href={event.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center border border-gray-600 text-gray-600 py-2 px-4 rounded-md hover:bg-gray-50 transition duration-300"
          >
            Inscrever-se
          </a>
        )}
      </div>
    </div>
  );
};

export default EventCard;
