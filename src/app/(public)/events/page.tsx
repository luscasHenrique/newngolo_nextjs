// src/app/events/page.tsx
// Este é um Server Component por padrão.

// Removido: import { useState } from "react"; // Não é mais necessário aqui
import { mockEvents } from "./data/mockEvents"; // Ajustado o caminho para _data
import type { Event } from "./types/Event"; // Ajustado o caminho para _types
// Removido: import { Button } from "@/components/ui/button"; // Não é usado diretamente aqui
import EventListDisplay from "./_components/EventListDisplay";
import { SectionTitle } from "@/components/ui/SectionTitle"; // Assumindo que esta é uma importação válida

// Função para buscar os eventos (executada no servidor)
async function getEvents(): Promise<Event[]> {
  // Em um projeto real, aqui você faria uma chamada a uma API externa,
  // um CMS, ou consultaria um banco de dados.
  // Exemplo: const res = await fetch('YOUR_API_ENDPOINT/events');
  // return res.json();

  // Retorna os eventos mockados. Eles já terão dateStart e dateEnd.
  return Promise.resolve(mockEvents);
}

export default async function EventsPage() {
  const events = await getEvents(); // Busca os dados no servidor

  // Extrai categorias únicas para o filtro
  const availableCategories = Array.from(
    new Set(events.map((event) => event.category))
  );

  // Removido: A ordenação dos eventos será feita dentro do useEventFilters,
  // que é o Client Component responsável por manipular a lista final para exibição.
  // events.sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());

  return (
    <>
      {/* Hero Section */}
      <section className="text-center">
        <SectionTitle title="Agenda de Eventos" animate={true} />
        <p className="mt-4">
          Participe de nossos workshops, palestras e webinars. Fique por dentro
          de tudo que acontece!
        </p>
      </section>
      {/* EventListDisplay é o Client Component que gerencia a exibição e a lógica de filtro */}
      {/* Ele também é responsável por alternar entre as visualizações de lista e calendário */}
      <EventListDisplay
        initialEvents={events} // Passa todos os eventos para o Client Component
        availableCategories={availableCategories} // Passa as categorias únicas
      />
    </>
  );
}
