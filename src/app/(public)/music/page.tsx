// src/app/(public)/music/page.tsx
"use client";

import React from "react";
import { SectionTitle } from "@/components/ui/SectionTitle"; // Se você tiver um componente SectionTitle global
import { HighlightCarousel } from "./_components/highlightCarousel/HighlightCarousel"; // Importar o carrossel
import { highlightCardsMock } from "./data/highlightCardsMock"; // Importar o mock de dados

export default function MusicPage() {
  return (
    <div className="space-y-10">
      <section>
        <SectionTitle title="Músicas Oficiais N'GOLO" animate={false} />{" "}
      </section>

      {/* Título da página */}
      {/* Aqui você renderiza o seu carrossel de destaques de músicas */}
      <section className="">
        <HighlightCarousel cards={highlightCardsMock} />
      </section>
      {/* Você pode adicionar outras seções aqui, como: */}
      <section className="">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Álbuns Recentes
        </h2>
        {/* Aqui você listaria outros álbuns ou faixas */}
        <p className="text-gray-700">Conteúdo para álbuns recentes...</p>
      </section>
      <section className="">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Playlists Oficiais
        </h2>
        {/* Aqui você listaria playlists */}
        <p className="text-gray-700">Conteúdo para playlists...</p>
      </section>
    </div>
  );
}
