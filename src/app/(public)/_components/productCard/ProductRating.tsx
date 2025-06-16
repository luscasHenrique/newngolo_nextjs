// components/product/ProductRating.tsx
import { Star } from "lucide-react";

interface ProductRatingProps {
  rating: number;
}

export function ProductRating({ rating }: ProductRatingProps) {
  return (
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
  );
}
