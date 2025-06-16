// components/product/ProductRating.tsx
import { Star } from "lucide-react";

// 1. ATUALIZE A INTERFACE PARA ACEITAR reviewCount
interface ProductRatingProps {
  rating: number;
  reviewCount?: number;
}

export function ProductRating({ rating, reviewCount }: ProductRatingProps) {
  // 2. CRIE A MENSAGEM DO TOOLTIP
  const tooltipText = reviewCount
    ? `Baseado em ${reviewCount} avaliações`
    : "Este produto ainda não tem avaliações";

  return (
    // 3. ADICIONE O ATRIBUTO 'title' AO CONTAINER
    <div className="flex items-center" title={tooltipText}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}
