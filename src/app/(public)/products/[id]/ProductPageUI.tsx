// src/app/(public)/products/[id]/ProductPageUI.tsx
"use client";

import React from "react";
import { Product } from "@/types/product/product";
import { UserProfile } from "@/model/UserProfile";
import {
  SelectedColorState,
  SelectedSizeState,
  SelectedOption,
} from "../_components/productGrade/useProductGrade";

import { ProductInfo } from "../_components/productInfo/ProductInfo";
import { ProductSlider } from "../_components/productSlider/ProductSlider";
import { ProductReviewList } from "../_components/productReviewList/ProductReviewList";

interface ProductPageUIProps {
  products: Product;
  quantity: number;
  user: UserProfile | null;
  shippingCost: string | null;
  selectedImage: string;
  selectedColor: SelectedColorState;
  selectedSize: SelectedSizeState;
  zoomStyle: React.CSSProperties;
  zipCode: string;
  isCalculatingShipping: boolean;
  isAddingToCart: boolean;
  // REMOVIDO: props de grade daqui, pois ProductInfo agora gerencia isso
  // productGradeOptions: Record<string, SelectedOption[]>;
  // productGradeSelectedOptions: Record<string, SelectedOption>;
  // onProductGradeOptionSelect: (category: string, option: SelectedOption) => void;
  // handleProductGradeMouseDown: (e: React.MouseEvent, category: string) => void;
  // handleProductGradeMouseMove: (e: React.MouseEvent, category: string) => void;
  // handleProductGradeMouseUpOrLeave: (category: string) => void;

  onAddCart: () => void;
  quantityChange: (increment: boolean) => void;
  handleColorSelect: (color?: string, image?: string, id?: string) => void;
  handleSizeSelect: (size: string, id: string) => void;
  handleMouseMove: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  handleMouseLeave: () => void;
  onZipCodeChange: (value: string) => void;
  onCalculateShipping: () => void;
}

export const ProductPageUI: React.FC<ProductPageUIProps> = ({
  products,
  quantity,
  user,
  shippingCost,
  selectedImage,
  selectedColor,
  selectedSize,
  zoomStyle,
  zipCode,
  isCalculatingShipping,
  isAddingToCart,
  onAddCart,
  quantityChange,
  handleColorSelect,
  handleSizeSelect,
  handleMouseMove,
  handleMouseLeave,
  onZipCodeChange,
  onCalculateShipping,
  // REMOVIDO: desestruturação das props de grade aqui
  // productGradeOptions,
  // productGradeSelectedOptions,
  // onProductGradeOptionSelect,
  // handleProductGradeMouseDown,
  // handleProductGradeMouseMove,
  // handleProductGradeMouseUpOrLeave,
}) => {
  return (
    <div className="flex flex-wrap w-full bg-white rounded-lg shadow-sm">
      <div className="w-full md:h-[500px] lg:hidden lg:flex-none">
        <ProductSlider
          imagens={products.imagens}
          highlightedImage={selectedImage}
          zoomStyle={zoomStyle}
          handleColorSelect={handleColorSelect}
          handleMouseMove={handleMouseMove}
          handleMouseLeave={handleMouseLeave}
        />
      </div>

      <div className="w-full lg:hidden lg:flex-none">
        <ProductInfo
          products={products}
          onAddCart={onAddCart}
          quantity={quantity}
          quantityChange={quantityChange}
          user={user}
          shippingCost={shippingCost}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          handleColorSelect={handleColorSelect}
          handleSizeSelect={handleSizeSelect}
          zipCode={zipCode}
          onZipCodeChange={onZipCodeChange}
          onCalculateShipping={onCalculateShipping}
          isCalculatingShipping={isCalculatingShipping}
          // As props relacionadas à grade não são mais passadas para ProductInfo a partir daqui.
          // ProductInfo chamará o useProductGrade internamente.
        />
      </div>

      <div className="hidden flex-none lg:grid w-full lg:grid-cols-[55%_45%] gap-2">
        <div className="w-full">
          <ProductSlider
            imagens={products.imagens}
            highlightedImage={selectedImage}
            zoomStyle={zoomStyle}
            handleColorSelect={handleColorSelect}
            handleMouseMove={handleMouseMove}
            handleMouseLeave={handleMouseLeave}
          />
        </div>
        <div className="w-full">
          <ProductInfo
            products={products}
            onAddCart={onAddCart}
            quantity={quantity}
            quantityChange={quantityChange}
            user={user}
            shippingCost={shippingCost}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            handleColorSelect={handleColorSelect}
            handleSizeSelect={handleSizeSelect}
            zipCode={zipCode}
            onZipCodeChange={onZipCodeChange}
            onCalculateShipping={onCalculateShipping}
            isCalculatingShipping={isCalculatingShipping}
            // As props relacionadas à grade não são mais passadas para ProductInfo a partir daqui.
          />
        </div>
      </div>

      <div className="w-full gap-4 p-4">
        <div>
          <hr className="border-t-2 border-gray-300 my-4" />
          <h1 className="text-lg font-bold mb-2 mt-4">{products.name}</h1>
        </div>
        <div className="text-gray-700 rounded-md">{products.description}</div>
        {products.review && products.review.length > 0 ? (
          <ProductReviewList reviews={products.review} />
        ) : (
          <>
            <hr className="mt-6 mb-6" />
            <p> Ainda não tem avaliação</p>
          </>
        )}
      </div>
    </div>
  );
};
