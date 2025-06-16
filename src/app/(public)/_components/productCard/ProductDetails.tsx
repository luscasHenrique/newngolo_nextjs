// components/product/ProductDetails.tsx
import { ProductRating } from "./ProductRating";

// 1. ATUALIZE A INTERFACE PARA ACEITAR reviewCount
interface ProductDetailsProps {
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  rating?: number;
  reviewCount?: number;
}

export function ProductDetails({
  name,
  description,
  price,
  originalPrice,
  rating,
  reviewCount, // RECEBA A PROP
}: ProductDetailsProps) {
  return (
    <div className="p-3 flex flex-col h-full gap-3">
      {/* --- Bloco Superior: Título e Descrição --- */}
      <div>
        <h3 className="text-base font-semibold truncate">{name}</h3>
        <p
          className="text-xs text-muted-foreground h-8 mt-1 line-clamp-2"
          title={description}
        >
          {description}
        </p>
      </div>

      {/* --- Bloco Inferior: Preços e Avaliação --- */}
      <div className="mt-auto">
        <div className="flex flex-col items-start">
          <p className="text-lg font-bold text-primary">{price}</p>
          {originalPrice && (
            <p className="text-xs text-muted-foreground line-through">
              {originalPrice}
            </p>
          )}
        </div>

        {rating && rating > 0 && (
          <div className="mt-1">
            {/* 2. PASSE A PROP reviewCount PARA O COMPONENTE */}
            <ProductRating rating={rating} reviewCount={reviewCount} />
          </div>
        )}
      </div>
    </div>
  );
}
