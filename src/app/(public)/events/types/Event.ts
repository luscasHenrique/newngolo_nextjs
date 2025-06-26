// src/app/events/_types/Event.ts

export interface Event {
  id: string;
  title: string;
  description: string; // Breve descrição
  longDescription?: string; // Descrição mais completa para a página de detalhes
  dateStart: string; // Data e hora de início do evento (ex: "2025-07-20T14:00:00")
  dateEnd: string; // Data e hora de fim do evento (ex: "2025-07-20T18:00:00" ou "2025-07-22T12:00:00" para multi-dia)
  location: string; // Local físico ou "Online via Zoom"
  category:
    | "Workshop"
    | "Palestra"
    | "Webinar"
    | "Conferência"
    | "Meetup"
    | "Outro";
  isOnline: boolean;
  registrationLink?: string; // Link para inscrição
  materialsLink?: string; // Link para materiais de apoio (slides, etc.)
  speakers?: string[]; // Nomes dos palestrantes
  tags?: string[]; // Tags adicionais (ex: "IA", "Marketing", "Desenvolvimento")
}

export interface EventFiltersState {
  searchTerm: string;
  category: string; // 'all', 'Workshop', 'Palestra', etc.
  isOnlineFilter: "all" | "online" | "presential"; // Novo filtro
}
