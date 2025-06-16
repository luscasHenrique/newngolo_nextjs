// components/product/ProductActions.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface ProductActionsProps {
  productUrl: string;
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
        // 1. Alteramos o 'size' para 'icon' para criar um botão quadrado, ideal para ícones.
        size="icon"
        // 2. Adicionamos estas classes para a animação de hover.
        className="transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:bg-transparent"
      >
        <ShoppingCart className="h-4 w-4" />
        <span className="sr-only">Adicionar ao carrinho</span>
      </Button>
    </div>
  );
}
