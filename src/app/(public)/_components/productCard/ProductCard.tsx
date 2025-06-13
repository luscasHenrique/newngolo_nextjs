"use client";

import { ShoppingCart } from "lucide-react";
import { Product, ProductTagType } from "./types";

interface ProductCardProps extends Product {
  onBuy?: () => void;
  onAddToCart?: () => void;
}

const tagClasses: Record<ProductTagType, string> = {
  oferta: "bg-red-600",
  frete: "bg-green-600",
  novidade: "bg-blue-600",
};

export function ProductCard({
  imageUrl,
  tagText,
  tagType = "oferta",
  name,
  description,
  rating = 5,
  price,
  originalPrice,
  onBuy,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="group bg-white rounded-lg shadow-sm overflow-hidden w-full max-w-[250px] mx-auto flex flex-col transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      {/* Imagem + Tag */}
      <div className="relative w-full pt-[100%] overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div
          className={`absolute top-2 left-2 text-white text-[10px] font-semibold uppercase px-2 py-0.5 rounded ${tagClasses[tagType]}`}
        >
          {tagText}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="text-base font-semibold text-gray-800 mb-1">{name}</h3>
        <p className="text-xs text-gray-600 flex-grow">{description}</p>

        {/* Estrelas */}
        <div className="flex items-center gap-1 my-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <svg
              key={i}
              viewBox="0 0 24 24"
              fill={i <= rating ? "#facc15" : "#e5e7eb"}
              className="w-4 h-4"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
        </div>

        {/* Preço */}
        <div className="text-lg font-bold text-gray-900 mb-3">
          {price}
          {originalPrice && (
            <span className="text-xs text-gray-400 line-through ml-2">
              {originalPrice}
            </span>
          )}
        </div>

        {/* Botões */}
        <div className="flex gap-4 items-center justify-between">
          <button
            onClick={onBuy}
            className="flex-1 bg-blue-600 text-white text-sm font-semibold py-1.5 rounded-md hover:bg-blue-700 transition"
          >
            Comprar
          </button>
          <button
            onClick={onAddToCart}
            className="p-0 m-0 bg-transparent hover:bg-transparent"
            aria-label="Adicionar ao carrinho"
          >
            <ShoppingCart
              size={22}
              className="text-gray-700 hover:text-blue-600 transition-transform hover:scale-110"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
