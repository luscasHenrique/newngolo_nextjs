// src/app/(public)/music/_components/highlightCarousel/HighlightCard.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HighlightCardData } from "@/app/(public)/music/types/highlightCard";
import { FaSpotify, FaYoutube, FaMusic, FaHeadphones } from "react-icons/fa";

const iconMap: { [key: string]: React.ElementType } = {
  FaSpotify: FaSpotify,
  FaYoutube: FaYoutube,
  FaMusic: FaMusic,
  FaHeadphones: FaHeadphones,
};

interface HighlightCardProps {
  data: HighlightCardData;
}

export const HighlightCard: React.FC<HighlightCardProps> = ({ data }) => {
  return (
    // Removido h-full para deixar o card se ajustar ao conteúdo e ao flex de fora
    // Adicionado um padding horizontal maior para o carrossel geral
    <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden w-full h-full">
      {" "}
      {/* Usar flex-col para empilhar, então a imagem vai para o topo */}
      {/* Imagem da Capa - Agora ocupa a largura total e uma altura responsiva */}
      <div className="relative w-full h-48 sm:h-56 md:h-64 flex-shrink-0">
        {" "}
        {/* Definir altura para a imagem */}
        <Image
          src={data.coverImage}
          alt={data.title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg" // Arredonda o topo da imagem
        />
      </div>
      {/* Conteúdo do Texto e Links - Ocupa o restante do espaço */}
      <div className="flex-grow p-4 flex flex-col justify-between">
        {" "}
        {/* flex-grow para ocupar o espaço restante */}
        <div>
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
            {data.title}
          </h3>
          <p className="text-sm md:text-base text-gray-700 mb-2">
            {data.subtitle}
          </p>
          <p className="text-xs md:text-sm text-gray-500 mb-4">
            {data.description}
          </p>
        </div>
        {/* Links para Plataformas */}
        <div className="flex space-x-3 mt-auto">
          {data.platforms.map((platform, index) => {
            const IconComponent = iconMap[platform.icon];
            if (!IconComponent) {
              console.warn(
                `Ícone não encontrado para a plataforma: ${platform.icon}`
              );
              return null;
            }
            return (
              <Link
                key={index}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ouvir ${data.title} no ${platform.label}`}
                className="text-gray-600 hover:text-blue-600 transition-colors" // Mudei hover para blue-600 para combinar com o tema
              >
                <IconComponent className="h-6 w-6" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
