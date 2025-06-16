// components/product/ProductActions.tsx
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
export function ProductActions() {
  return (
    // p-4 pt-2 -> p-3 (padding menor) | gap-3 -> gap-2 (espaçamento menor)
    <div className="p-3 pt-1 flex items-center gap-2">
      <Button className="flex-1" size="sm">
        Comprar
      </Button>

      <Button variant="outline" size="sm">
        {" "}
        {/* size="icon-sm" é um exemplo, ajuste conforme seu Button */}
        <ShoppingCart className="h-4 w-4" />
        <span className="sr-only">Adicionar ao carrinho</span>
      </Button>
    </div>
  );
}
