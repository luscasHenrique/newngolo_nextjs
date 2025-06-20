// src/app/(public)/_components/productCard/ProductActions.tsx
"use client"; // Client Component

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface ProductActionsProps {
  productUrl: string; // URL para a página de detalhes do produto
}

export function ProductActions({ productUrl }: ProductActionsProps) {
  return (
    <div className="p-3 pt-1 flex items-center gap-2">
      <Button asChild className="flex-1" size="sm">
        <Link href={productUrl}>Comprar</Link>
      </Button>

      {/* Botão do carrinho com as alterações */}
      <Button
        variant="ghost"
        size="icon" // Definido como "icon" para o botão quadrado
        className="transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:bg-transparent"
        // onClick={() => { /* Lógica para adicionar ao carrinho */ }} // Adicione a lógica de clique se não for só visual
      >
        <ShoppingCart className="h-4 w-4" />
        <span className="sr-only">Adicionar ao carrinho</span>
      </Button>
    </div>
  );
}
