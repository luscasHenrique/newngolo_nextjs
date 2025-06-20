// src/app/(public)/_components/productCard/ProductRating.tsx
"use client"; // Client Component

import React from "react";
import { Star, MessageSquare } from "lucide-react"; // Supondo MessageSquare já importado
import clsx from "clsx";

interface ProductRatingProps {
  rating: number;
  reviewCount?: number; // Já era opcional, ótimo
}

export function ProductRating({ rating, reviewCount }: ProductRatingProps) {
  const tooltipText = reviewCount
    ? `Baseado em ${reviewCount} avaliações`
    : "Este produto ainda não tem avaliações";

  return (
    <div className="flex items-center gap-2" title={tooltipText}>
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16} // Mantido size
            // Correção: preenche a estrela se o índice for menor que o rating
            // O rating é um número, então a comparação é direta.
            className={clsx(
              "w-4 h-4", // Mantido w-4 h-4
              i < rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300 stroke-gray-300" // stroke para estrelas vazias
            )}
          />
        ))}
      </div>

      {/* Exibir reviewCount apenas se for um número e maior que 0 */}
      {reviewCount !== undefined && reviewCount > 0 && (
        <div className="flex items-center gap-1 text-muted-foreground">
          <MessageSquare className="h-3 w-3" />
          <span className="text-xs">({reviewCount})</span>
        </div>
      )}
    </div>
  );
}
