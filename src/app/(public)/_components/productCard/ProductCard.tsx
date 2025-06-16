// components/product/product-card.tsx
import Link from "next/link"; // 1. IMPORTE O LINK
import { Card } from "@/components/ui/card";
import { ProductImage } from "./ProductImage";
import { ProductDetails } from "./ProductDetails";
import { ProductActions } from "./ProductActions";
import { Product } from "./types";

export interface ProductCardProps {
  product: Product;
}
export function ProductCard({ product }: ProductCardProps) {
  // 2. CRIE A URL DO PRODUTO DINAMICAMENTE
  const productUrl = `/products/${product.slug}`;

  return (
    <Card className="py-0 gap-0 w-full max-w-sm rounded-lg overflow-hidden shadow-lg border hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col">
      <Link href={productUrl}>
        <ProductImage
          imageUrl={product.imageUrl}
          altText={product.name}
          tagText={product.tagText}
          tagType={product.tagType}
        />
      </Link>

      <div className="flex flex-col flex-1">
        <Link href={productUrl}>
          <ProductDetails
            name={product.name}
            description={product.description}
            price={product.price}
            originalPrice={product.originalPrice}
            rating={product.rating}
          />
        </Link>

        <div className="mt-auto">
          <ProductActions productUrl={productUrl} />
        </div>
      </div>
    </Card>
  );
}
