// src/app/(public)/products/_components/productSlider/ProductSlider.tsx
"use client";

import React from "react";
import Image from "next/image"; // Importar o componente Image do Next.js

interface ProductSliderProps {
  imagens: string[]; // Array de URLs de imagem já prefixadas.
  highlightedImage: string; // Imagem atualmente em destaque (URL completa).
  zoomStyle: React.CSSProperties; // Estilos para zoom.
  handleColorSelect: (color?: string, image?: string, id?: string) => void;
  handleMouseMove: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  handleMouseLeave: () => void;
}

export const ProductSlider: React.FC<ProductSliderProps> = ({
  imagens,
  highlightedImage,
  zoomStyle,
  handleColorSelect,
  handleMouseMove,
  handleMouseLeave,
}) => {
  // Estado local para controlar a imagem em destaque no hover, se houver.
  // Usaremos um pequeno atraso para evitar trocas rápidas demais.
  const [hoveredImage, setHoveredImage] = React.useState<string | null>(null);
  const hoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleThumbnailMouseEnter = (imgSrc: string) => {
    // Limpa qualquer timeout existente para evitar conflito
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    // Define um pequeno atraso antes de trocar a imagem para evitar jitter
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredImage(imgSrc);
      handleColorSelect(undefined, imgSrc, undefined); // Chama a função para mudar a imagem principal
    }, 150); // Atraso de 150ms
  };

  const handleThumbnailMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setHoveredImage(null); // Limpa o estado de hover.
    // Opcional: Você pode querer voltar para a imagem 'highlightedImage' original ao sair do hover.
    // Mas geralmente o click já define a imagem fixa.
    // Para um comportamento suave, o clique deve ser o "fixador" da imagem.
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="w-full max-w-md h-96 flex items-center justify-center relative overflow-hidden cursor-zoom-in"
        style={{
          // Usa a imagem do hover se houver, caso contrário, usa a imagem destacada.
          backgroundImage: `url(${hoveredImage || highlightedImage})`,
          backgroundPosition: zoomStyle.backgroundPosition || "center center",
          backgroundSize: zoomStyle.backgroundSize || "contain",
          backgroundRepeat: "no-repeat",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* A imagem principal é um background para o zoom. */}
      </div>

      {/* Miniaturas das Imagens (Slider de Miniaturas) */}
      <div className="flex overflow-x-auto gap-2 p-2 mt-4 w-full ">
        {imagens.map((imgSrc, index) => (
          <button
            key={index}
            // Eventos de mouse para hover
            onMouseEnter={() => handleThumbnailMouseEnter(imgSrc)}
            onMouseLeave={handleThumbnailMouseLeave}
            // O onClick ainda troca a imagem destacada de forma permanente
            onClick={() => handleColorSelect(undefined, imgSrc, undefined)}
            className={`w-20 h-20 flex-none border-2 rounded-md overflow-hidden ${
              imgSrc === highlightedImage || imgSrc === hoveredImage // Adicionado condição para hoveredImage
                ? "border-blue-500"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <img
              src={imgSrc}
              alt={`Miniatura ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
