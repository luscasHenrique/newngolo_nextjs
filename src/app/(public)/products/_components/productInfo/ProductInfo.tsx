// src/app/(public)/products/_components/productInfo/ProductInfo.tsx
"use client";

import React from "react";
import { Product } from "@/types/product/product";
import { UserProfile } from "@/model/UserProfile";
// CORREÇÃO: Removido '//' duplo e ajustado a importação dos tipos de seleção
import {
  SelectedColorState,
  SelectedSizeState,
  SelectedOption,
} from "../productGrade/useProductGrade";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import ProductGradeUI from "../productGrade/ProductGradeUI"; // Certifique-se que este caminho está correto

interface ProductInfoProps {
  products: Product;
  quantity: number;
  user: UserProfile | null; // <-- CORREÇÃO AQUI: A prop 'user' PODE SER NULL
  shippingCost: string | null;
  selectedImage?: string; // Adicionado como opcional, pois nem sempre é usado
  selectedColor: SelectedColorState;
  selectedSize: SelectedSizeState;
  isCalculatingShipping: boolean;
  onAddCart: () => void;
  quantityChange: (increment: boolean) => void;
  handleColorSelect: (color?: string, image?: string, id?: string) => void;
  handleSizeSelect: (size: string, id: string) => void;
  zipCode: string;
  onZipCodeChange: (value: string) => void;
  onCalculateShipping: () => void;
  // Props para ProductGradeUI (virão do useProductPage.ts)
  productGradeOptions: Record<string, SelectedOption[]>;
  productGradeSelectedOptions: Record<string, SelectedOption>;
  onProductGradeOptionSelect: (
    category: string,
    option: SelectedOption
  ) => void;
  handleProductGradeMouseDown: (e: React.MouseEvent, category: string) => void;
  handleProductGradeMouseMove: (e: React.MouseEvent, category: string) => void;
  handleProductGradeMouseUpOrLeave: (category: string) => void;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
  products,
  quantity,
  user, // <-- user agora pode ser null aqui
  shippingCost,
  selectedColor,
  selectedSize,
  isCalculatingShipping,
  onAddCart,
  quantityChange,
  handleColorSelect,
  handleSizeSelect,
  zipCode,
  onZipCodeChange,
  onCalculateShipping,
  productGradeOptions,
  productGradeSelectedOptions,
  onProductGradeOptionSelect,
  handleProductGradeMouseDown,
  handleProductGradeMouseMove,
  handleProductGradeMouseUpOrLeave,
}) => {
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
