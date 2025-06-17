import { StatusType } from "../enums/StatusType";
import { BrandingDTO } from "./BrandingDTO";
import { DimensionsDTO } from "./DimensionsDTO";
import { GradeDTO } from "./GradeDTO";
import { PriceProductDTO } from "./PriceProductDTO";
import { ProductReviewDTO } from "./ProductReviewDTO";
import { RatingsDTO } from "./RatingsDTO";
import { WarrantyDTO } from "./WarrantyDTO";

export interface ProductDTO {
  id: string; // UUID
  name: string;
  description: string;
  stock: string;
  sku: string;
  promotion: boolean;
  freeShipping: boolean;
  isLocalShippingFree: boolean;
  location: string;
  dateAt: string; // Date
  updateAt: string; // Date
  status: StatusType;
  category: any; // Definir melhor se necessário
  brand: BrandingDTO;
  dimensions: DimensionsDTO;
  imagens: any[]; // Definir melhor se necessário
  price: PriceProductDTO;
  ratings: RatingsDTO[];
  tags: string[];
  grade: GradeDTO[];
  reviews: ProductReviewDTO[];
  totalSale: number;
  warranty: WarrantyDTO;
}
