// src/app/(public)/products/[id]/page.tsx
"use client"; // Marcar como Client Component.

import { useProductPage } from "./useProductPage"; // Importa o hook de lógica
import { Loader2 } from "lucide-react"; // Para o loader
import React from "react"; // Necessário para JSX
import { ProductPageUI } from "./ProductPageUI";

// Este é o COMPONENTE DE PÁGINA que o Next.js espera como default export.
export default function ProductPage() {
  // Obtém TODOS os estados e funções do hook useProductPage.
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
    productGradeOptions,
    productGradeSelectedOptions,
    onProductGradeOptionSelect,
    handleProductGradeMouseDown,
    handleProductGradeMouseMove,
    handleProductGradeMouseUpOrLeave,
  } = useProductPage(); // <-- CHAMA O HOOK DE LÓGICA AQUI

  // Lógica de carregamento da página (exibindo um loader)
  if (isFetchingProduct) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
        <p className="ml-4 text-lg text-blue-500">Carregando produto...</p>
      </div>
    );
  }

  // Renderiza a UI principal da página do produto (ProductPageUI)
  // APENAS se o produto estiver carregado.
  return (
    <>
      {products ? (
        <ProductPageUI
          products={products}
          onAddCart={onAddCart}
          quantity={quantity}
          quantityChange={quantityChange}
          user={loggedInUser} // Passa loggedInUser (UserProfile | AuthUser | null)
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
          productGradeOptions={productGradeOptions}
          productGradeSelectedOptions={productGradeSelectedOptions}
          onProductGradeOptionSelect={onProductGradeOptionSelect}
          handleProductGradeMouseDown={handleProductGradeMouseDown}
          handleProductGradeMouseMove={handleProductGradeMouseMove}
          handleProductGradeMouseUpOrLeave={handleProductGradeMouseUpOrLeave}
        />
      ) : (
        // Se o produto não for encontrado após o carregamento (ex: ID inválido, erro 404 da API)
        <div className="flex justify-center items-center h-screen text-red-500 text-lg">
          <p>Produto não encontrado ou ocorreu um erro ao carregar.</p>
        </div>
      )}
    </>
  );
}
