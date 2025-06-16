// components/product/product-card.tsx
import { Card } from "@/components/ui/card";
import { ProductImage } from "./ProductImage";
import { ProductDetails } from "./ProductDetails";
import { ProductActions } from "./ProductActions";
import { Product } from "./types";

export interface ProductCardProps {
  product: Product;
}
export function ProductCard({ product }: ProductCardProps) {
  return (
    // SOLUÇÃO: Adicione "py-0" para remover o padding vertical
    // e "gap-0" para remover o espaçamento entre a imagem e o conteúdo.
    <Card className="py-0 gap-0 w-full max-w-sm rounded-lg overflow-hidden shadow-lg border hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col">
      <ProductImage
        imageUrl={product.imageUrl}
        altText={product.name}
        tagText={product.tagText}
        tagType={product.tagType}
      />
      <div className="flex flex-col flex-1">
        <ProductDetails
          name={product.name}
          description={product.description}
          price={product.price}
          originalPrice={product.originalPrice}
          rating={product.rating}
        />
        <div className="mt-auto">
          <ProductActions />
        </div>
      </div>
    </Card>
  );
}
