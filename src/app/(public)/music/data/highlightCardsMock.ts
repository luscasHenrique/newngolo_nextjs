// src/app/(public)/music/data/highlightCardsMock.ts

import { HighlightCardData } from "@/app/(public)/music/types/highlightCard";

export const highlightCardsMock: HighlightCardData[] = [
  {
    id: "1",
    coverImage: "/images/cantoRaiz.jpeg",
    title: "Canto Raiz",
    subtitle: "Mestre Dionizio",
    description: "Em breve em todas as plataformas digitais",
    platforms: [
      { icon: "FaSpotify", href: "https://spotify.com", label: "Spotify" }, // Changed to string
      { icon: "FaYoutube", href: "https://youtube.com", label: "YouTube" }, // Changed to string
      { icon: "FaMusic", href: "https://deezer.com", label: "Deezer" }, // Changed to string
    ],
  },
  {
    id: "2",
    coverImage: "/images/cantoRaiz.jpeg",
    title: "Treino Capoeira",
    subtitle: "Metodologia Avançada",
    description: "Descubra o programa de treino que vai revolucionar sua arte.",
    platforms: [
      { icon: "FaHeadphones", href: "/treino-podcast", label: "Podcast" }, // Changed to string
      {
        icon: "FaYoutube",
        href: "https://youtube.com/ngolotraining",
        label: "YouTube Videos",
      },
    ],
  },
  {
    id: "3",
    coverImage: "/images/cantoRaiz.jpeg",
    title: "Encontro Anual",
    subtitle: "Roda Internacional",
    description: "Prepare-se para o maior evento do ano! Inscrições abertas.",
    platforms: [
      { icon: "FaMusic", href: "/eventos", label: "Detalhes do Evento" },
      {
        icon: "FaSpotify",
        href: "https://spotify.com/playlist-evento",
        label: "Playlist do Evento",
      },
    ],
  },
  {
    id: "4",
    coverImage: "/images/cantoRaiz.jpeg",
    title: "Aulas Online",
    subtitle: "Mestre João",
    description:
      "Aprenda capoeira de qualquer lugar do mundo com nossos mestres.",
    platforms: [
      {
        icon: "FaYoutube",
        href: "https://youtube.com/aulas-online",
        label: "Aulas no YouTube",
      },
      {
        icon: "FaHeadphones",
        href: "/plataforma-aulas",
        label: "Nossa Plataforma",
      },
    ],
  },
];
