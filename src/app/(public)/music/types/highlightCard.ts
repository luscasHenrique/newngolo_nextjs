// src/app/(public)/music/types/highlightCard.ts

import React from "react"; // Ainda necessário para outros contextos React.ElementType

export interface PlatformLink {
  icon: string; // ALTERADO: Agora será o nome do ícone como string (ex: "Spotify", "Youtube")
  href: string;
  label: string;
}

export interface HighlightCardData {
  id: string;
  coverImage: string;
  title: string;
  subtitle: string;
  description: string;
  platforms: PlatformLink[];
}
