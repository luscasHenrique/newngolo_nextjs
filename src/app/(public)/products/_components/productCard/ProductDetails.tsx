// src/app/(public)/_components/productCard/ProductDetails.tsx
"use client"; // Marcar como Client Component se usa hooks ou interatividade.

import React from "react"; // Importar React
import { ProductRating } from "./ProductRating";
import { toCurrency } from "@/helpers/currency/toCurrency";

interface ProductDetailsProps {
  name: string;
  description: string;
  price: number; // <-- AGORA ESPERA UM NUMBER
  originalPrice?: number; // <-- AGORA ESPERA UM NUMBER (opcional)
  rating?: number;
  reviewCount?: number; // Já estava aqui, ótimo!
}

export function ProductDetails({
  name,
  description,
  price,
  originalPrice,
  rating,
  reviewCount, // Receba a prop
}: ProductDetailsProps) {
  return (
    <div className=" flex flex-col h-full space-y-2">
      {/* --- Bloco Superior: Título e Descrição --- */}
      <div>
        <h3 className="text-lg font-semibold mb-2">{name}</h3>{" "}
        {/* Ajustei para text-lg e mb-2 conforme seu outro código */}
        <p
          className="text-xs text-muted-foreground h-8 mt-1 line-clamp-2"
          title={description}
        >
          {description}
        </p>
      </div>

      {/* --- Bloco Inferior: Preços e Avaliação --- */}
      <div className="mt-auto space-y-1">
        <div className="flex flex-col items-start">
          <p className="text-xl font-bold text-blue-600">
            {toCurrency(price)}{" "}
            {/* <-- USAR toCurrency PARA FORMATAR O PREÇO */}
          </p>
          {originalPrice !== undefined &&
            originalPrice > price && ( // Verificar se originalPrice existe e é maior
              <p className="text-sm text-gray-500 line-through">
                De {toCurrency(originalPrice)}{" "}
                {/* <-- USAR toCurrency PARA FORMATAR O PREÇO ORIGINAL */}
              </p>
            )}
        </div>

        {rating !== undefined &&
          rating > 0 &&
          reviewCount !== undefined && ( // Verificar se rating e reviewCount existem e rating > 0
            <div>
              <ProductRating rating={rating} reviewCount={reviewCount} />{" "}
              {/* PASSE A PROP reviewCount */}
            </div>
          )}
      </div>
    </div>
  );
}
