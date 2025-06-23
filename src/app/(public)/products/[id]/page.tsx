// src/app/(public)/products/[id]/page.tsx
"use client";

import { useProductPage } from "./useProductPage";
import { Loader2 } from "lucide-react";
import React from "react";
import { ProductPageUI } from "./ProductPageUI";

export default function ProductPage() {
  const {
    products,
    quantity,
    loggedInUser,
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
    isFetchingProduct,
    // REMOVIDO: productGradeOptions, productGradeSelectedOptions, etc.
    // Eles agora são internos ao ProductInfo (via useProductGrade).
  } = useProductPage();

  if (isFetchingProduct) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
        <p className="ml-4 text-lg text-blue-500">Carregando produto...</p>
      </div>
    );
  }

  return (
    <>
      {products ? (
        <ProductPageUI
          products={products}
          onAddCart={onAddCart}
          quantity={quantity}
          quantityChange={quantityChange}
          user={loggedInUser}
          shippingCost={shippingCost}
          selectedImage={selectedImage}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          handleColorSelect={handleColorSelect}
          handleSizeSelect={handleSizeSelect}
          zoomStyle={zoomStyle}
          handleMouseMove={handleMouseMove}
          handleMouseLeave={handleMouseLeave}
          zipCode={zipCode}
          onZipCodeChange={onZipCodeChange}
          onCalculateShipping={onCalculateShipping}
          isCalculatingShipping={isCalculatingShipping}
          isAddingToCart={isAddingToCart}
          // REMOVIDO: as props relacionadas à grade que eram passadas antes
        />
      ) : (
        <div className="flex justify-center items-center h-screen text-red-500 text-lg">
          <p>Produto não encontrado ou ocorreu um erro ao carregar.</p>
        </div>
      )}
    </>
  );
}
