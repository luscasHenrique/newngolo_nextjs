// src/app/(public)/professors/_components/ProfessorProfileCard.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

// CORREÇÃO AQUI: O tipo agora se chama 'Professor' no arquivo 'Professor.ts'
import type { Professor } from "../types/Professor"; // <-- Importa 'Professor' (o tipo unificado)

interface ProfessorProfileCardProps {
  // CORREÇÃO AQUI: Use 'Professor' em vez de 'ProfessorDetails'
  professor: Professor;
}

const ProfessorProfileCard: React.FC<ProfessorProfileCardProps> = ({
  professor,
}) => {
  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("");

  // NOVO: Mapa de classes de cores dinâmicas
  const cordColorClasses: { [key: string]: { bg: string; text: string } } = {
    AZUL: { bg: "bg-blue-100", text: "text-blue-800" },
    MARROM: { bg: "bg-amber-100", text: "text-amber-800" }, // Usando amber para marrom
    VERDE: { bg: "bg-green-100", text: "text-green-800" },
    AMARELA: { bg: "bg-yellow-100", text: "text-yellow-800" },
    ROXA: { bg: "bg-purple-100", text: "text-purple-800" },
    VERMELHA: { bg: "bg-red-100", text: "text-red-800" },
    BRANCA: { bg: "bg-gray-500", text: "text-white" }, // Cinza claro para 'Branca'
    // Adicione outras cores de corda se existirem (ex: Azul-Marrom, etc. se for exibir)
  };

  // Obtém as classes para a cor da corda atual
  const currentCordColors = cordColorClasses[professor.corda.toUpperCase()] || {
    bg: "bg-gray-100",
    text: "text-gray-700",
  }; // Default se a cor não for encontrada

  // Lógica para renderizar estrelas
  const renderStars = (rating: number) => {
    const stars = [];
    const ratingOutOf5 = rating / 2; // Sua avaliação é de 0-10, converte para 0-5
    const fullStars5 = Math.floor(ratingOutOf5);
    const hasHalfStar5 = ratingOutOf5 - fullStars5 >= 0.5;

    for (let i = 0; i < fullStars5; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-500" />);
    }
    if (hasHalfStar5) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-500" />);
    }
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="text-gray-300" />);
    }
    return stars;
  };

  return (
    <div className="relative flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-sm mx-auto min-h-[360px]">
      {/* Imagem/Avatar do Professor */}
      <div className="w-28 h-28 rounded-full border-4 border-gray-200 shadow-md overflow-hidden bg-gray-100 flex-shrink-0 mb-4">
        {professor.imageUrl ? (
          <Avatar className="w-full h-full border-0">
            <AvatarImage
              src={professor.imageUrl}
              alt={professor.name}
              className="object-cover rounded-full"
            />
          </Avatar>
        ) : (
          <Avatar className="w-full h-full border-0">
            <AvatarFallback className="bg-gray-300 text-gray-700 text-xl font-semibold flex items-center justify-center">
              {getInitials(professor.name)}
            </AvatarFallback>
          </Avatar>
        )}
      </div>

      {/* Nome do Professor */}
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-1 leading-tight">
        {professor.name}
      </h2>

      {/* Bio Curta / Cargo */}
      <p className="text-sm text-gray-600 text-center mb-3">
        {professor.bioShort}
      </p>

      {/* Corda e Categoria */}
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-sm mb-4">
        {/* Corda */}
        <span
          className={`px-2 py-1 ${currentCordColors.bg} ${currentCordColors.text} rounded-full font-semibold`}
        >
          Corda: {professor.corda}
        </span>
        {/* Categoria */}
        <span
          className={`px-2 py-1 ${currentCordColors.bg} ${currentCordColors.text} rounded-full font-semibold`}
        >
          {professor.categoria}
        </span>
      </div>

      {/* Avaliação */}
      <div className="flex items-center gap-2 mb-6">
        <div className="flex text-lg">{renderStars(professor.avaliacao)}</div>
        <span className="text-gray-800 font-semibold text-lg">
          {professor.avaliacao.toFixed(1)}
        </span>
        {professor.totalReviews && (
          <span className="text-gray-500 text-sm">
            ({professor.totalReviews} avaliações)
          </span>
        )}
      </div>

      {/* Botão Ver Perfil */}
      <Link href={`/professor/${professor.id}`} className="mt-auto w-full">
        <Button variant={"outline"} className="w-full transition-all">
          Ver Perfil Completo
        </Button>
      </Link>
    </div>
  );
};

export default ProfessorProfileCard;
