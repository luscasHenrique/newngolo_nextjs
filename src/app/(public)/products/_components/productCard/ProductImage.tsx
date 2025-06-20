// src/app/(public)/_components/productCard/ProductImage.tsx
"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ProductTagType } from "@/types/product/product";
import { cva } from "class-variance-authority";
// REMOVA: import { env } from "@/config/env"; // Não precisará mais do env aqui se a URL já é completa

interface ProductImageProps {
  imageUrl: string; // <-- AGORA ESPERA UMA URL COMPLETA (ex: "https://...")
  altText: string;
  tagText?: string;
  tagType?: ProductTagType;
}

const tagVariants = cva("absolute top-2 left-2 z-10 text-white", {
  variants: {
    type: {
      oferta: "bg-red-500",
      frete: "bg-green-600",
      novidade: "bg-blue-500",
      offer: "bg-red-500",
      freeShipping: "bg-green-600",
      new: "bg-blue-500",
      highlight: "bg-yellow-500",
    },
  },
  defaultVariants: {
    type: undefined,
  },
});

export function ProductImage({
  imageUrl, // <-- Esta já é a URL completa do mock
  altText,
  tagText,
  tagType,
}: ProductImageProps) {
  // REMOVA ESTA LINHA:
  // const fullImageUrl = `${env.PRODUCT_IMAGE_BASE_URL}${imageUrl}`;

  return (
    <div className="relative w-full h-48 bg-gray-200 flex items-center justify-center overflow-hidden rounded-t-lg group">
      {tagText && tagType && (
        <Badge variant="default" className={tagVariants({ type: tagType })}>
          {tagText}
        </Badge>
      )}
      <Image
        src={imageUrl} // <-- AGORA USA imageUrl DIRETAMENTE (pois já é a URL COMPLETA do mock)
        alt={altText}
        fill
        style={{ objectFit: "cover" }}
        loading="lazy"
        className="transition-transform duration-300 ease-in-out group-hover:scale-110"
      />
    </div>
  );
}
