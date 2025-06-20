// src/app/(public)/products/_components/productInfo/useProductInfo.ts
"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types/product/product";
import { UserProfile } from "@/model/UserProfile"; // UserProfile agora tem address?: Address[]
import {
  SelectedColorState,
  SelectedSizeState,
} from "../productGrade/useProductGrade";
import { notify } from "@/lib/notify"; // notify agora tem .warn
import {
  CartGrade,
  CartProduct,
  ProductAddCartPayload,
} from "@/types/product/cart";
import { Grade } from "@/types/product/grade";
import {
  addProductToCart,
  calculateShippingCost,
} from "@/services/productService";
import { toCurrency } from "@/helpers/currency/toCurrency";

interface UseProductInfoProps {
  products: Product;
  quantity: number;
  user: UserProfile; // UserProfile agora tem address?: Address[]
  selectedColor: SelectedColorState;
  selectedSize: SelectedSizeState;
  quantityChange: (increment: boolean) => void;
  // FUNÇÕES QUE FALTAVAM NO ESCOPO (VÊM DO useProductPage.ts)
  handleColorSelect: (color?: string, image?: string, id?: string) => void; // <-- ADICIONADO AQUI
  handleSizeSelect: (size: string, id: string) => void; // <-- ADICIONADO AQUI
}

export function useProductInfo({
  products,
  quantity,
  user,
  selectedColor,
  selectedSize,
  quantityChange,
  // Desestruturar as funções que vêm do ProductPage
  handleColorSelect, // <-- DESESTRUTURADO
  handleSizeSelect, // <-- DESESTRUTURADO
}: UseProductInfoProps) {
  const [shippingCost, setShippingCost] = useState<string | null>(null);
  const [zipCode, setZipCode] = useState<string>("");
  const [isCalculatingShipping, setIsCalculatingShipping] =
    useState<boolean>(false);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);

  const getPrice = (
    gradeArray: Grade[],
    selectedColorId: string,
    selectedSizeId: string
  ): number => {
    let price = 0;
    const selectedGrade = gradeArray.find((g) => g.id === selectedColorId);
    if (selectedGrade) {
      const selectedGradeSize = selectedGrade.gradeSizes.find(
        (gs) => gs.id === selectedSizeId
      );
      if (selectedGradeSize) {
        price = selectedGradeSize.price.price;
      }
    }
    return price;
  };

  const handleAddCart = async (): Promise<void> => {
    console.log(
      "DEBUG [useProductInfo]: Iniciando o processo de adicionar ao carrinho..."
    );

    if (!products || quantity <= 0) {
      notify.warning("Produto ou quantidade inválidos.");
      return;
    }
    if (!user || !user.id) {
      notify.error(
        "Você precisa estar logado para adicionar itens ao carrinho."
      );
      return;
    }

    setIsAddingToCart(true);
    try {
      let isGradeSelect = true;

      if (products.grade && products.grade.length > 0) {
        const uniqueGradeExists = products.grade.find(
          (g) => g.name === "UNICO" && g.color === "UNICO"
        );
        if (uniqueGradeExists) {
          isGradeSelect = false;
        }

        if (isGradeSelect && !selectedColor.id) {
          notify.error("Selecione uma cor");
          return;
        }
        if (isGradeSelect && !selectedSize.id) {
          notify.error("Selecione um tamanho");
          return;
        }
      } else {
        isGradeSelect = false;
      }

      const currentPrice = getPrice(
        products.grade,
        selectedColor.id,
        selectedSize.id
      );

      const CartGrade: CartGrade = {
        id: isGradeSelect ? selectedColor.id : products.grade?.[0]?.id || "",
        gradeSizeId: isGradeSelect
          ? selectedSize.id
          : products.grade?.[0]?.gradeSizes?.[0]?.id || "",
        name: isGradeSelect ? "" : "UNICO",
        color: isGradeSelect ? selectedColor.color : "UNICO",
        size: isGradeSelect ? selectedSize.size : "unico",
        price: currentPrice,
      };

      const CartPoduct: CartProduct = {
        id: products.id,
        name: products.name,
        quantity: quantity,
        totalValue: currentPrice * quantity,
        grade: CartGrade,
      };

      const payload: ProductAddCartPayload = {
        id: CartGrade.id,
        product: CartPoduct,
        quantity: quantity,
        totalValue: currentPrice * quantity,
      };

      const response = await addProductToCart(payload);
      if (response.status === 201 || response.status === 200) {
        notify.success("Produto adicionado ao carrinho!");
      } else {
        notify.error(
          "Erro ao adicionar produto ao carrinho. Status: " + response.status
        );
      }
    } catch (error: any) {
      console.error(
        "DEBUG [useProductInfo]: Erro ao adicionar produto ao carrinho:",
        error
      );
      notify.error(
        "Erro ao adicionar produto ao carrinho: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setIsAddingToCart(false);
    }
  };

  const onCalculateShipping = async () => {
    if (!zipCode || zipCode.length !== 8) {
      notify.warning("Por favor, insira um CEP válido (8 dígitos).");
      return;
    }
    if (!products?.dimensions) {
      notify.error(
        "Dimensões do produto não disponíveis para cálculo de frete."
      );
      return;
    }

    setIsCalculatingShipping(true);
    try {
      const payload = {
        altura: products.dimensions.height,
        largura: products.dimensions.width,
        profundidade: products.dimensions.depth,
        peso: products.dimensions.weight,
        zipcodeDestination: zipCode,
      };

      const response = await calculateShippingCost(payload);
      setShippingCost(toCurrency(response.frete));
      notify.success("Frete calculado com sucesso!");
    } catch (error: any) {
      console.error("DEBUG [useProductInfo]: Erro ao calcular frete:", error);
      notify.error("Erro ao calcular o frete.");
      setShippingCost("Erro ao calcular o frete.");
    } finally {
      setIsCalculatingShipping(false);
    }
  };

  // Efeito para preencher o CEP inicial do usuário e calcular frete (se aplicável)
  useEffect(() => {
    if (
      products &&
      !isCalculatingShipping &&
      user?.address &&
      user.address.length > 0
    ) {
      const userAddress = user.address[0]; // Agora user.address é Address[], então user.address[0] é Address.

      if (userAddress && userAddress.city === products.seller.city) {
        setZipCode(userAddress.zipcode);
        // Chamar onCalculateShipping usando useCallback para evitar loop infinito
        // Ou envolver em useCallback ou passar como dependência para o useEffect.
        onCalculateShipping();
      } else if (userAddress && userAddress.city !== products.seller.city) {
        setShippingCost("Frete não disponível para sua cidade.");
        notify.warning("Frete não disponível para sua cidade.");
      } else {
        setShippingCost("Adicione seu endereço para calcular o frete.");
        notify.info("Adicione seu endereço para calcular o frete.");
      }
    } else if (products && !user && !isCalculatingShipping) {
      setShippingCost("Faça login para calcular o frete.");
      notify.info("Faça login para calcular o frete.");
    }
  }, [products, user, isCalculatingShipping, onCalculateShipping]); // Adicionado onCalculateShipping para dependência.

  return {
    shippingCost,
    zipCode,
    isCalculatingShipping,
    isAddingToCart,
    handleAddCart,
    onZipCodeChange: setZipCode,
    onCalculateShipping,
    products, // Retornar para a UI
    user, // Retornar para a UI
    selectedColor, // Retornar para a UI
    selectedSize, // Retornar para a UI
    quantity, // Retornar para a UI
    quantityChange, // Retornar para a UI
    handleColorSelect, // Retornar para a UI
    handleSizeSelect, // Retornar para a UI
  };
}
