import { StatusType } from "../enums/StatusType";
import { Branding } from "./Branding";
import { CategoryProduct } from "./CategoryProduct";
import { Dimensions } from "./Dimensions";
import { Grade } from "./Grade";
import { Image } from "./Image";
import { ProductReview } from "./ProductReview";
import { Ratings } from "./Ratings";
import { Tags } from "./Tags";
import { User } from "./User";
import { Warranty } from "./Warranty";

export interface Product {
  id: string; // UUID
  name: string;
  description: string;
  stock: string;
  sku: string;
  promotion: boolean;
  freeShipping: boolean;
  location: string;
  isLocalShippingFree: boolean;
  dateAt: string; // Date
  updateAt: string; // Date
  user: User;
  status: StatusType;
  branding: Branding;
  dimensions: Dimensions;
  ratings: Ratings[];
  warranty: Warranty;
  image: Image[];
  tags: Tags[];
  categoryProducts: CategoryProduct[];
  grades: Grade[];
  productReviews: ProductReview[];
}
