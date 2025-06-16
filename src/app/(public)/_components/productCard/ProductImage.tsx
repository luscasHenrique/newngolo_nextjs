// components/product/ProductImage.tsx
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { CardContent } from "@/components/ui/card";
import { ProductTagType } from "./types";
import { cva } from "class-variance-authority";

interface ProductImageProps {
  imageUrl: string;
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
    },
  },
});
export function ProductImage({
  imageUrl,
  altText,
  tagText,
  tagType,
}: ProductImageProps) {
  return (
    <CardContent className="p-0 relative overflow-hidden rounded-t-lg group">
      {tagText && tagType && (
        <Badge variant="default" className={tagVariants({ type: tagType })}>
          {tagText}
        </Badge>
      )}

      <img
        src={imageUrl}
        alt={altText}
        loading="lazy"
        className="w-full h-auto aspect-square object-cover 
                   transition-transform duration-300 ease-in-out 
                   group-hover:scale-110"
      />
    </CardContent>
  );
}
