// src/app/(public)/products/[id]/useProductPage.ts
"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { Product } from "@/types/product/product";
import { UserProfile } from "@/model/UserProfile";
import {
  SelectedColorState,
  SelectedSizeState,
  SelectedOption,
} from "../_components/productGrade/useProductGrade"; // Mantém os tipos
import {
  getProductById,
  addProductToCart,
  calculateShippingCost,
} from "@/services/productService";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { notify } from "@/lib/notify";
import {
  CartGrade,
  CartProduct,
  ProductAddCartPayload,
} from "@/types/product/cart";
import { Grade } from "@/types/product/grade";
import { Address } from "@/model/Address";
import { AuthUser } from "@/model/AuthUser";
import { getUserProfile } from "@/services/userService";
import { toCurrency } from "@/helpers/currency/toCurrency";

interface ProductPageParams {
  id: string;
  [key: string]: string;
}

export function useProductPage() {
  const router = useRouter();
  const params = useParams<ProductPageParams>();
  const productId = params.id;

  const { user: sessionUser, loading: sessionLoading } = useCurrentUser();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isUserProfileLoading, setIsUserProfileLoading] =
    useState<boolean>(true);

  const [products, setProducts] = useState<Product | undefined>(undefined);
  const [quantity, setQuantity] = useState<number>(1);
  const [shippingCost, setShippingCost] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<SelectedColorState>(
    {} as SelectedColorState
  );
  const [selectedSize, setSelectedSize] = useState<SelectedSizeState>(
    {} as SelectedSizeState
  );
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [isFetchingProduct, setIsFetchingProduct] = useState<boolean>(true);
  const [zipCode, setZipCode] = useState<string>("");
  const [isCalculatingShipping, setIsCalculatingShipping] =
    useState<boolean>(false);

  // REMOVIDO: Estados e refs relacionados diretamente à grade
  // const [productGradeOptions, setProductGradeOptions] = useState<Record<string, SelectedOption[]>>({});
  // const [productGradeSelectedOptions, setProductGradeSelectedOptions] = useState<Record<string, SelectedOption>>({});
  // const [productGradeFilteredOptions, setProductGradeFilteredOptions] = useState<Record<string, SelectedOption[]>>({});
  // const scrollContainerRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const loggedInUser: UserProfile | AuthUser | null =
    userProfile || sessionUser;
  const userLoading = sessionLoading || isUserProfileLoading;

  const handleColorSelect = useCallback(
    (color?: string, image?: string, id?: string) => {
      if (color && id) {
        setSelectedColor({ color, id });
      }
      setSelectedSize({} as SelectedSizeState);
      if (image) {
        setSelectedImage(image);
      }
    },
    []
  );

  const handleSizeSelect = useCallback((size: string, id: string): void => {
    setSelectedSize({ id, size });
  }, []);

  const handleQuantityChange = useCallback((increment: boolean) => {
    setQuantity((prev) => Math.max(1, prev + (increment ? 1 : -1)));
  }, []);

  // REMOVIDO: Funções de manipulação da lógica de grade (transform, filter, select)
  // REMOVIDO: Funções de manipulação de mouse/scroll da grade

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setZoomStyle({
        backgroundPosition: `${x}% ${y}%`,
        backgroundSize: "200%",
      });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setZoomStyle({});
  }, []);

  const getProduct = useCallback(
    async (id: string): Promise<void> => {
      setIsFetchingProduct(true);
      try {
        const data = await getProductById(id);
        setProducts(data);
        if (data.imagens && data.imagens.length > 0) {
          setSelectedImage(data.imagens[0]);
        }
        if (data.grade && data.grade.length > 0) {
          const firstColorGrade = data.grade[0];
          if (firstColorGrade) {
            handleColorSelect(
              firstColorGrade.color,
              firstColorGrade.image,
              firstColorGrade.id
            );
          }
        }
      } catch (error) {
        console.error("DEBUG [useProductPage]: Erro ao buscar produto:", error);
        notify.error("Erro ao carregar os detalhes do produto.");
        setProducts(undefined);
      } finally {
        setIsFetchingProduct(false);
      }
    },
    [handleColorSelect]
  );

  const getPrice = useCallback(
    (
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
    },
    []
  );

  const handleAddCart = useCallback(async (): Promise<void> => {
    console.log(
      "DEBUG [useProductPage]: Iniciando o processo de adicionar ao carrinho..."
    );

    if (!products || quantity <= 0 || userLoading) {
      notify.warning(
        "Produto ou quantidade inválidos, ou usuário não carregado."
      );
      return;
    }
    if (
      !loggedInUser ||
      !loggedInUser.id ||
      !("address" in loggedInUser) ||
      !loggedInUser.address
    ) {
      notify.error(
        "Você precisa estar logado e ter um perfil completo para adicionar itens ao carrinho."
      );
      router.push("/signin");
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
        "DEBUG [useProductPage]: Erro ao adicionar produto ao carrinho:",
        error
      );
      notify.error(
        "Erro ao adicionar produto ao carrinho: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setIsAddingToCart(false);
    }
  }, [
    products,
    quantity,
    userLoading,
    loggedInUser,
    selectedColor,
    selectedSize,
    getPrice,
    router,
  ]);

  const handleCalculateShipping = useCallback(async () => {
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
      console.error("DEBUG [useProductPage]: Erro ao calcular frete:", error);
      notify.error("Erro ao calcular o frete.");
      setShippingCost("Erro ao calcular o frete.");
    } finally {
      setIsCalculatingShipping(false);
    }
  }, [zipCode, products, notify, toCurrency]);

  useEffect(() => {
    if (productId) {
      getProduct(productId);
    }
  }, [productId, getProduct]);

  useEffect(() => {
    if (
      products &&
      !userLoading &&
      loggedInUser &&
      "address" in loggedInUser &&
      loggedInUser.address
    ) {
      if (loggedInUser.address.length > 0) {
        const userAddress = loggedInUser.address[0];

        if (userAddress && userAddress.city === products.seller.city) {
          setZipCode(userAddress.zipcode);
          handleCalculateShipping();
        } else if (userAddress && userAddress.city !== products.seller.city) {
          setShippingCost("Frete não disponível para sua cidade.");
          notify.warning("Frete não disponível para sua cidade.");
        } else {
          setShippingCost("Adicione seu endereço para calcular o frete.");
          notify.info("Adicione seu endereço para calcular o frete.");
        }
      } else {
        setShippingCost("Adicione seu endereço para calcular o frete.");
        notify.info("Adicione seu endereço para calcular o frete.");
      }
    } else if (products && !userLoading && !loggedInUser) {
      setShippingCost("Faça login para calcular o frete.");
      notify.info("Faça login para calcular o frete.");
    }
  }, [products, loggedInUser, userLoading, handleCalculateShipping]);

  return {
    products,
    quantity,
    loggedInUser: loggedInUser as UserProfile,
    shippingCost,
    selectedImage,
    selectedColor,
    selectedSize,
    zoomStyle,
    zipCode,
    isCalculatingShipping,
    isAddingToCart,
    onAddCart: handleAddCart,
    quantityChange: handleQuantityChange,
    handleColorSelect: handleColorSelect,
    handleSizeSelect: handleSizeSelect,
    handleMouseMove: handleMouseMove,
    handleMouseLeave: handleMouseLeave,
    onZipCodeChange: setZipCode,
    onCalculateShipping: handleCalculateShipping,
    isFetchingProduct,
  };
}
