// src/app/(public)/products/_components/productGrade/ProductGradeUI.tsx
"use client";

import React from "react"; // Removido useRef daqui, pois a ref vem das props
import { env } from "@/config/env";
import { SelectedOption } from "./useProductGrade"; // Tipos da interface

interface ProductGradeUIProps {
  options: Record<string, SelectedOption[]>;
  selectedOptions: Record<string, SelectedOption>;
  onOptionSelect: (category: string, option: SelectedOption) => void;
  // Recebe os handlers e a ref diretamente do hook useProductGrade
  handleMouseDown: (e: React.MouseEvent, category: string) => void;
  handleMouseMove: (e: React.MouseEvent, category: string) => void;
  handleMouseUpOrLeave: (category: string) => void;
  scrollContainerRefs: React.MutableRefObject<
    // Tipo da ref que vem das props
    Record<string, HTMLDivElement | null>
  >;
}

const ProductGradeUI: React.FC<ProductGradeUIProps> = ({
  options,
  selectedOptions,
  onOptionSelect,
  handleMouseDown,
  handleMouseMove,
  handleMouseUpOrLeave,
  scrollContainerRefs, // Desestruturando a ref recebida
}) => {
  return (
    <div className="p-4">
      {Object.keys(options).map((category) => (
        <div key={category} className="mb-6">
          <h3 className="text-lg font-semibold mb-2">
            {category}:{" "}
            {selectedOptions[category] && (
              <span className="font-medium text-blue-600">
                {selectedOptions[category].name}
              </span>
            )}
          </h3>
          <div
            className="flex gap-4 overflow-x-auto whitespace-nowrap cursor-grab p-1"
            ref={(el) => {
              // Verifica se scrollContainerRefs e scrollContainerRefs.current existem
              if (scrollContainerRefs && scrollContainerRefs.current) {
                scrollContainerRefs.current[category] = el;
              }
            }}
            onMouseDown={(e) => handleMouseDown(e, category)}
            onMouseMove={(e) => handleMouseMove(e, category)}
            onMouseUp={() => handleMouseUpOrLeave(category)}
            onMouseLeave={() => handleMouseUpOrLeave(category)}
          >
            {options[category].map((option) => (
              <button
                key={option.id || option.name}
                className={`border px-4 py-2 rounded-md transition-all text-sm cursor-pointer shadow-sm flex items-center justify-center ${
                  selectedOptions[category]?.id === option.id
                    ? "border-blue-500 bg-blue-100 font-bold"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onClick={() => onOptionSelect(category, option)}
                onDragStart={(e) => e.preventDefault()}
              >
                {option.image ? (
                  <img
                    src={`${env.PRODUCT_IMAGE_BASE_URL}${option.image}`}
                    alt={option.name}
                    className="w-10 h-10 object-cover rounded mr-2"
                  />
                ) : (
                  <span>{option.name}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGradeUI;
