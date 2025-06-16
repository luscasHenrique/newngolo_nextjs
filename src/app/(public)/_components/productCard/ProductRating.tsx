// components/product/ProductRating.tsx

// 1. TROQUE A IMPORTAÇÃO: de 'Users' para 'MessageSquare'
import { Star, MessageSquare } from "lucide-react";

interface ProductRatingProps {
  rating: number;
  reviewCount?: number;
}

export function ProductRating({ rating, reviewCount }: ProductRatingProps) {
  const tooltipText = reviewCount
    ? `Baseado em ${reviewCount} avaliações`
    : "Este produto ainda não tem avaliações";

  return (
    <div className="flex items-center gap-2" title={tooltipText}>
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>

      {reviewCount && reviewCount > 0 && (
        <div className="flex items-center gap-1 text-muted-foreground">
          {/* 2. TROQUE O COMPONENTE DO ÍCONE AQUI */}
          <MessageSquare className="h-3 w-3" />
          <span className="text-xs">({reviewCount})</span>
        </div>
      )}
    </div>
  );
}
