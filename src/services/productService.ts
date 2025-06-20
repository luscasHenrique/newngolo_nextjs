// src/services/productService.ts
import { api } from "./api";
import { Product } from "@/types/product/product";
import { ProductAddCartPayload } from "@/types/product/cart";
import { env } from "@/config/env";
import { productsMock } from "@/app/(public)/products/_components/productCard/mock";

// Função auxiliar: Garante que a URL da imagem seja completa e prefixada se for apenas um nome de arquivo.
const ensureFullImageUrl = (imagePath: string | undefined | null): string => {
  if (!imagePath) return "https://via.placeholder.com/500x500?text=Sem+Imagem";
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath; // Se já é uma URL completa, retorna como está.
  }
  // Se for apenas um nome de arquivo, prefixa com a URL base de imagens de produto do .env.
  return `${env.PRODUCT_IMAGE_BASE_URL}${imagePath}`;
};

export const getProductById = async (productId: string): Promise<Product> => {
  try {
    let productData: Product;
    const useMock = process.env.NODE_ENV === "development";

    if (useMock) {
      console.log(
        "DEBUG [productService.ts]: Usando MOCK de produto para ID:",
        productId
      );
      const foundProduct = productsMock.find((p) => p.id === productId);
      if (!foundProduct) {
        throw new Error(`Produto com ID ${productId} não encontrado no mock.`);
      }
      productData = JSON.parse(JSON.stringify(foundProduct)); // Deep copy.
    } else {
      // Ambiente de produção, chamar a API real
      console.log(
        "DEBUG [productService.ts]: Buscando produto da API real para ID:",
        productId
      );
      const response = await api.get<Product>(`/product/one/${productId}`);
      productData = response.data;
    }

    // --- PROCESSO DE UNIFICAÇÃO E GARANTIA DE URLs COMPLETAS PARA O FRONTEND ---
    // Este bloco é executado para DADOS DO MOCK E DA API REAL.

    // Garante que 'imagens' e 'grade' são arrays para evitar erros de runtime.
    if (!productData.imagens) productData.imagens = [];
    if (!productData.grade) productData.grade = [];

    // Cria um Set para armazenar URLs únicas (evita duplicatas e mantém ordem de adição).
    const allUniqueImageUrls = new Set<string>();

    // 1. Processa a 'imageUrl' principal (garante que é completa e a adiciona primeiro ao Set).
    productData.imageUrl = ensureFullImageUrl(productData.imageUrl);
    if (productData.imageUrl) {
      allUniqueImageUrls.add(productData.imageUrl);
    }

    // 2. Processa as 'imagens' do slider (garante que são completas e as adiciona ao Set).
    productData.imagens = productData.imagens.map((imgName) =>
      ensureFullImageUrl(imgName)
    );
    productData.imagens.forEach((imgName) => allUniqueImageUrls.add(imgName));

    // 3. Processa as imagens de 'grade' (garante que são completas e as adiciona ao Set).
    if (productData.grade.length > 0) {
      productData.grade.forEach((grade) => {
        if (grade.image) {
          grade.image = ensureFullImageUrl(grade.image); // Atualiza a imagem da grade para URL completa.
          allUniqueImageUrls.add(grade.image);
        }
      });
    }

    // 4. Finaliza o array 'imagens' para o frontend.
    // Garante que 'productData.imageUrl' (a imagem principal) esteja sempre na PRIMEIRA POSIÇÃO do array 'imagens'.
    const finalImagensArray = Array.from(allUniqueImageUrls);
    const mainImageUrlIndex = finalImagensArray.indexOf(productData.imageUrl);

    if (mainImageUrlIndex > -1) {
      finalImagensArray.splice(mainImageUrlIndex, 1); // Remove da posição atual
    }
    finalImagensArray.unshift(productData.imageUrl); // Adiciona no início do array.

    productData.imagens = finalImagensArray; // Atribui o array final de imagens ao produto.

    console.log(
      "DEBUG [productService.ts]: Produto recebido e imagens processadas:",
      productData
    );
    return productData;
  } catch (error) {
    console.error(
      "DEBUG [productService.ts]: Erro ao buscar produto por ID (API ou Mock):",
      error
    );
    throw error;
  }
};

/**
 * Adiciona um produto ao carrinho de compras.
 * Endpoint: POST /api/v1/order/add-carts
 * @param payload Os dados do item a ser adicionado ao carrinho.
 * @returns Uma Promise que resolve com os dados da resposta da API.
 */
export const addProductToCart = async (
  payload: ProductAddCartPayload
): Promise<any> => {
  try {
    const response = await api.post("/order/add-carts", payload);
    console.log(
      "DEBUG [productService.ts]: Resposta ao adicionar ao carrinho:",
      response.data
    );
    return response.data;
  } catch (error) {
    console.error(
      "DEBUG [productService.ts]: Erro ao adicionar produto ao carrinho:",
      error
    );
    throw error;
  }
};

/**
 * Interface para o payload da requisição de cálculo de frete.
 */
interface ShippingPayload {
  altura: string;
  largura: string;
  profundidade: string;
  peso: string;
  zipcodeDestination: string;
}

/**
 * Calcula o custo de frete.
 * Endpoint: POST /api/v1/product/calc-frete
 * @param payload As dimensões do produto e o CEP de destino.
 * @returns Uma Promise que resolve com um objeto contendo o custo do frete (ex: { frete: number }).
 */
export const calculateShippingCost = async (
  payload: ShippingPayload
): Promise<{ frete: number }> => {
  try {
    const response = await api.post("/product/calc-frete", payload);
    console.log(
      "DEBUG [productService.ts]: Resposta ao calcular frete:",
      response.data
    );
    return response.data;
  } catch (error) {
    console.error("DEBUG [productService.ts]: Erro ao calcular frete:", error);
    throw error;
  }
};
