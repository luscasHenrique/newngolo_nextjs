// src/app/(public)/products/_components/productReviewList/ProductReviewList.tsx
"use client"; // Se este componente usa apenas props e não estado/hooks, 'use client' é opcional mas não prejudica.

import React from "react";
// Importe sua interface Review se você a tiver, ex: import { Review } from '@/types/product/review';

interface ProductReviewListProps {
  reviews: any[]; // Substitua 'any[]' pela sua interface de Review[] se tiver uma.
}

export const ProductReviewList: React.FC<ProductReviewListProps> = ({
  reviews,
}) => {
  if (!reviews || reviews.length === 0) {
    return <p>Nenhuma avaliação disponível.</p>;
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Avaliações do Produto</h2>
      {reviews.map((review, index) => (
        <div key={index} className="border-b pb-4 mb-4">
          <p className="font-semibold">{review.author || "Anônimo"}</p>
          <p className="text-sm text-gray-600">{review.rating} estrelas</p>{" "}
          {/* Ajuste para sua lógica de rating */}
          <p className="mt-2">{review.comment}</p>{" "}
          {/* Ajuste para sua lógica de comment */}
        </div>
      ))}
    </div>
  );
};
