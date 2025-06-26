// src/app/events/[id]/page.tsx
// Este é um Server Component por padrão.

import { notFound } from "next/navigation";
import { mockEvents } from "../data/mockEvents"; // Caminho ajustado para _data
import type { Event } from "../types/Event"; // Caminho ajustado para _types

interface EventDetailsPageProps {
  // A tipagem de 'params' é um objeto simples, mas o Next.js o envolve em uma Promise por debaixo dos panos
  params: {
    id: string;
  };
}

async function getEventById(id: string): Promise<Event | undefined> {
  const event = mockEvents.find((e) => e.id === id);
  return Promise.resolve(event);
}

export async function generateStaticParams() {
  return mockEvents.map((event) => ({
    id: event.id,
  }));
}

// CORREÇÃO AQUI: Use 'await' diretamente na desestruturação dos params
// Isso força o Next.js a resolver a Promise antes de prosseguir
export default async function EventDetailsPage({
  params,
}: EventDetailsPageProps) {
  // A linha que causava o warning:
  // const { id } = params; // Removida ou substituída pela desestruturação com await abaixo

  // SOLUÇÃO: Desestruture e, se o linter for muito rigoroso,
  // você pode até fazer um 'await' explícito no objeto 'params' inteiro
  // antes de desestruturar, ou o Next.js geralmente espera que você faça isso na desestruturação.
  // A maneira mais garantida de silenciar o warning é essa:
  const { id } = await Promise.resolve(params); // <--- AQUI ESTÁ A MUDANÇA PRINCIPAL

  const event = await getEventById(id); // Use o 'id' já resolvido

  if (!event) {
    notFound();
  }

  const startDate = new Date(event.dateStart);
  const endDate = new Date(event.dateEnd);

  let formattedPeriod: string;
  if (startDate.toDateString() === endDate.toDateString()) {
    formattedPeriod = `${startDate.toLocaleDateString("pt-BR", {
      dateStyle: "full",
    })} das ${startDate.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })} às ${endDate.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  } else {
    // CORREÇÃO do 'timeStyle' aqui também, se ainda não foi feita!
    // toLocaleDateString não aceita timeStyle
    formattedPeriod = `De ${startDate.toLocaleDateString("pt-BR", {
      dateStyle: "full",
    })} às ${startDate.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })} a ${endDate.toLocaleDateString("pt-BR", {
      dateStyle: "full",
    })} às ${endDate.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl bg-white shadow-lg rounded-lg my-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 border-b pb-3">
        {event.title}
      </h1>

      <p className="text-lg text-purple-700 mb-4 flex items-center gap-2">
        🗓️ <span className="font-medium">{formattedPeriod}</span>
        {event.location && (
          <span className="ml-4 flex items-center gap-1">
            📍 <span className="font-medium">{event.location}</span>
          </span>
        )}
      </p>

      <div className="flex flex-wrap gap-2 text-sm mb-6">
        <span className="p-1 px-3 bg-purple-100 text-purple-800 rounded-full font-semibold">
          {event.category}
        </span>
        {event.isOnline && (
          <span className="p-1 px-3 bg-blue-100 text-blue-800 rounded-full font-semibold">
            Online
          </span>
        )}
        {event.tags?.map((tag) => (
          <span
            key={tag}
            className="p-1 px-3 bg-gray-100 text-gray-700 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      <p className="text-gray-800 leading-relaxed text-base mb-6">
        {event.longDescription || event.description}
      </p>

      {event.speakers && event.speakers.length > 0 && (
        <div className="mb-6 border-t pt-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Palestrantes
          </h2>
          <ul className="list-disc list-inside pl-4 text-gray-700">
            {event.speakers.map((speaker, index) => (
              <li key={index} className="mb-1">
                {speaker}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        {event.registrationLink && (
          <a
            href={event.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-green-600 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-green-700 transition duration-300 gap-2 shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Inscrever-se Agora
          </a>
        )}

        {event.materialsLink && (
          <a
            href={event.materialsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center border border-blue-600 text-blue-600 py-3 px-6 rounded-md text-lg font-semibold hover:bg-blue-50 transition duration-300 gap-2 shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Baixar Materiais
          </a>
        )}
      </div>
    </div>
  );
}
