// src/app/(public)/products/[id]/ProductPageUI.tsx
"use client"; // Marca este componente como Client Component.

import React from "react";
import { Product } from "@/types/product/product"; // Interface para o produto.
import { UserProfile } from "@/model/UserProfile"; // Interface para o perfil completo do usuário.
// Tipos de seleção de cor e tamanho para o componente de grade.
import {
  SelectedColorState,
  SelectedSizeState,
  SelectedOption,
} from "../_components/productGrade/useProductGrade";

// Componentes de UI importados.
// Certifique-se de que os caminhos de importação estão corretos em relação a este arquivo.
import { ProductInfo } from "../_components/productInfo/ProductInfo"; // Componente UI ProductInfo.
import { ProductSlider } from "../_components/productSlider/ProductSlider"; // Componente UI ProductSlider.
import { ProductReviewList } from "../_components/productReviewList/ProductReviewList"; // Componente ProductReviewList.

// Interface que define todas as props que ProductPageUI espera receber do seu hook (useProductPage.ts).
interface ProductPageUIProps {
  products: Product; // Dados do produto.
  quantity: number; // Quantidade selecionada do produto.
  user: UserProfile | null; // Dados do usuário logado (pode ser null se não logado).
  shippingCost: string | null; // Custo do frete formatado.
  selectedImage: string; // URL da imagem atualmente destacada no slider.
  selectedColor: SelectedColorState; // Cor selecionada.
  selectedSize: SelectedSizeState; // Tamanho selecionado.
  zoomStyle: React.CSSProperties; // Estilos para a funcionalidade de zoom na imagem.
  zipCode: string; // CEP digitado para cálculo de frete.
  isCalculatingShipping: boolean; // Estado de carregamento do cálculo de frete.
  isAddingToCart: boolean; // Estado de carregamento da adição ao carrinho.

  // Funções de callback para eventos do usuário.
  onAddCart: () => void; // Função para adicionar ao carrinho.
  quantityChange: (increment: boolean) => void; // Função para mudar a quantidade.
  handleColorSelect: (color?: string, image?: string, id?: string) => void; // Função para selecionar cor/imagem.
  handleSizeSelect: (size: string, id: string) => void; // Função para selecionar tamanho.
  handleMouseMove: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void; // Função de mouse move para zoom.
  handleMouseLeave: () => void; // Função de mouse leave para zoom.
  onZipCodeChange: (value: string) => void; // Função para mudar o CEP.
  onCalculateShipping: () => void; // Função para calcular frete.

  // Props ESPECÍFICAS para o componente ProductGradeUI.
  productGradeOptions: Record<string, SelectedOption[]>; // Opções de grade filtradas.
  productGradeSelectedOptions: Record<string, SelectedOption>; // Opções de grade selecionadas.
  onProductGradeOptionSelect: (
    category: string,
    option: SelectedOption
  ) => void; // Callback de seleção de grade.
  handleProductGradeMouseDown: (e: React.MouseEvent, category: string) => void; // Evento de mouse down para drag-scroll.
  handleProductGradeMouseMove: (e: React.MouseEvent, category: string) => void; // Evento de mouse move para drag-scroll.
  handleProductGradeMouseUpOrLeave: (category: string) => void; // Evento de mouse up/leave para drag-scroll.
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
  // Desestruturar as props da grade que virão do useProductPage.ts
  productGradeOptions,
  productGradeSelectedOptions,
  onProductGradeOptionSelect,
  handleProductGradeMouseDown,
  handleProductGradeMouseMove,
  handleProductGradeMouseUpOrLeave,
}) => {
  return (
    <div className="flex flex-wrap w-full   bg-white  rounded-lg shadow-sm">
      {/* Imagem Principal do Produto (para telas mobile e tablet) */}
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

      {/* Informações do Produto (para telas mobile e tablet) */}
      <div className="w-full lg:hidden lg:flex-none">
        <ProductInfo
          products={products}
          onAddCart={onAddCart}
          quantity={quantity}
          quantityChange={quantityChange}
          user={user} // Passa o user (UserProfile | null)
          shippingCost={shippingCost}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          handleColorSelect={handleColorSelect}
          handleSizeSelect={handleSizeSelect}
          zipCode={zipCode}
          onZipCodeChange={onZipCodeChange}
          onCalculateShipping={onCalculateShipping}
          isCalculatingShipping={isCalculatingShipping}
          // isAddingToCart={isAddingToCart} // Não passar, addCart já tem o estado interno.

          // Passa as props da grade para ProductInfo, que as repassará para ProductGradeUI.
          productGradeOptions={productGradeOptions}
          productGradeSelectedOptions={productGradeSelectedOptions}
          onProductGradeOptionSelect={onProductGradeOptionSelect}
          handleProductGradeMouseDown={handleProductGradeMouseDown}
          handleProductGradeMouseMove={handleProductGradeMouseMove}
          handleProductGradeMouseUpOrLeave={handleProductGradeMouseUpOrLeave}
        />
      </div>

      {/* Layout para Desktop (Imagens e Informações lado a lado) */}
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
            // isAddingToCart={isAddingToCart} // Comentado.

            // Passa as props da grade para ProductInfo.
            productGradeOptions={productGradeOptions}
            productGradeSelectedOptions={productGradeSelectedOptions}
            onProductGradeOptionSelect={onProductGradeOptionSelect}
            handleProductGradeMouseDown={handleProductGradeMouseDown}
            handleProductGradeMouseMove={handleProductGradeMouseMove}
            handleProductGradeMouseUpOrLeave={handleProductGradeMouseUpOrLeave}
          />
        </div>
      </div>

      {/* Seção de Descrição e Avaliações do Produto */}
      <div className="w-full gap-4 p-4">
        <div>
          <hr className="border-t-2 border-gray-300 my-4" />
          <h1 className="text-lg font-bold mb-2 mt-4">{products.name}</h1>
        </div>
        <div className="text-gray-700 rounded-md">{products.description}</div>
        {/* Renderiza a lista de avaliações se houver, senão uma mensagem padrão. */}
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
