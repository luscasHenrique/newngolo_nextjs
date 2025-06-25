// src/app/(public)/products/_components/productInfo/ProductInfo.tsx
"use client";

import React from "react";
import { Product } from "@/types/product/product";
import { UserProfile } from "@/models/UserProfile";
import {
  SelectedColorState,
  SelectedSizeState,
  SelectedOption,
} from "../productGrade/useProductGrade"; // Tipos necessários
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useProductGrade } from "../productGrade/useProductGrade"; // Importe o hook useProductGrade
import ProductGradeUI from "../productGrade/ProductGradeUI";

interface ProductInfoProps {
  products: Product;
  quantity: number;
  user: UserProfile | null;
  shippingCost: string | null;
  selectedImage?: string;
  selectedColor: SelectedColorState; // Passado para o useProductGrade para inicialização/sincronização
  selectedSize: SelectedSizeState; // Passado para o useProductGrade para inicialização/sincronização
  isCalculatingShipping: boolean;
  onAddCart: () => void;
  quantityChange: (increment: boolean) => void;
  // Funções passadas para useProductGrade para atualizar o estado principal
  handleColorSelect: (color?: string, image?: string, id?: string) => void;
  handleSizeSelect: (size: string, id: string) => void;
  zipCode: string;
  onZipCodeChange: (value: string) => void;
  onCalculateShipping: () => void;
  // Removidas as props handleProductGrade... e productGrade... daqui
  // Elas agora são internas ao ProductGradeUI e useProductGrade
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
  products,
  quantity,
  user,
  shippingCost,
  selectedColor,
  selectedSize,
  isCalculatingShipping,
  onAddCart,
  quantityChange,
  handleColorSelect, // Passado para o useProductGrade
  handleSizeSelect, // Passado para o useProductGrade
  zipCode,
  onZipCodeChange,
  onCalculateShipping,
}) => {
  // Chamada do hook useProductGrade AQUI, dentro de ProductInfo
  // Ele gerencia o estado e os handlers das grades
  const {
    options: productGradeOptions, // Renomeado para evitar conflito com 'options' interno
    selectedOptions: productGradeSelectedOptions, // Renomeado
    onOptionSelect: onProductGradeOptionSelect, // Renomeado
    handleMouseDown: handleProductGradeMouseDown,
    handleMouseMove: handleProductGradeMouseMove,
    handleMouseUpOrLeave: handleProductGradeMouseUpOrLeave,
    scrollContainerRefs, // A ref gerada por useProductGrade
  } = useProductGrade({
    grades: products.grade || [], // Passa as grades do produto
    onColorSelect: handleColorSelect, // Passa o handler de cor do ProductPage
    onSizeSelect: handleSizeSelect, // Passa o handler de tamanho do ProductPage
    selectedColorFromParent: selectedColor, // Sincroniza com o estado do pai
    selectedSizeFromParent: selectedSize, // Sincroniza com o estado do pai
    product: products, // Pode ser útil passar o produto inteiro, ou apenas grades
  });

  return (
    <div className="flex flex-col p-4">
      <div>
        <h2 className="text-xl font-bold mb-2">{products.name}</h2>
        <p className="text-gray-700 mb-4">{products.description}</p>
        <p className="text-2xl font-bold text-blue-600 mb-4">
          R${" "}
          {products.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </p>
        {products.originalPrice && products.originalPrice > products.price && (
          <p className="text-sm text-gray-500 line-through">
            De R${" "}
            {products.originalPrice.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}
          </p>
        )}
      </div>

      {products.grade && products.grade.length > 0 && (
        <ProductGradeUI
          options={productGradeOptions}
          selectedOptions={productGradeSelectedOptions}
          onOptionSelect={onProductGradeOptionSelect}
          handleMouseDown={handleProductGradeMouseDown}
          handleMouseMove={handleProductGradeMouseMove}
          handleMouseUpOrLeave={handleProductGradeMouseUpOrLeave}
          scrollContainerRefs={scrollContainerRefs} // Passa a ref gerada pelo useProductGrade
        />
      )}

      <div className="flex items-center space-x-4 my-6">
        <Button
          onClick={() => quantityChange(false)}
          variant="outline"
          size="sm"
        >
          -
        </Button>
        <span className="text-lg font-semibold">{quantity}</span>
        <Button
          onClick={() => quantityChange(true)}
          variant="outline"
          size="sm"
        >
          +
        </Button>
      </div>
      <Button onClick={onAddCart} className="w-full mb-4">
        Adicionar ao Carrinho
      </Button>

      <div className="border-t pt-4 mt-4">
        <h3 className="font-semibold mb-2">Calcular Frete</h3>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Digite seu CEP"
            value={zipCode}
            onChange={(e) => onZipCodeChange(e.target.value)}
            maxLength={8}
            className="border p-2 rounded-md flex-1"
          />
          <Button
            onClick={onCalculateShipping}
            disabled={isCalculatingShipping}
          >
            {isCalculatingShipping ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Calcular"
            )}
          </Button>
        </div>
        {shippingCost && (
          <p className="mt-2 text-sm text-gray-600">
            Custo do Frete: {shippingCost}
          </p>
        )}
      </div>

      {user && (
        <div className="border-t pt-4 mt-4">
          <h3 className="font-semibold mb-2">Seus Dados</h3>
          <p>Nome: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Nickname: {user.nickname || "N/A"}</p>
        </div>
      )}
    </div>
  );
};
