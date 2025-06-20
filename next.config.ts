// next.config.js
import type { NextConfig } from "next"; // Se você estiver usando NextConfig com TypeScript

const nextConfig: NextConfig = {
  // AQUI É ONDE VOCÊ ADICIONA A CONFIGURAÇÃO DE IMAGENS
  images: {
    // Usar 'remotePatterns' é a forma mais flexível e recomendada no Next.js App Router (v13+).
    // Ele permite especificar URLs mais detalhadas, incluindo portas e caminhos.
    remotePatterns: [
      {
        protocol: "https", // Protocolo HTTP ou HTTPS
        hostname: "images.unsplash.com", // Domínio das imagens do Unsplash (para seu mock)
        port: "", // Deixe vazio para qualquer porta, ou especifique se a imagem usa uma porta específica
        pathname: "/**", // Permite qualquer caminho depois do hostname
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com", // Se você usar imagens de placeholder
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.ngolocapoeira.org", // SE sua API real serve imagens diretamente (ex: /uploads/nome.jpeg)
        port: "",
        pathname: "/assets/images/**", // <-- O CAMINHO REAL ONDE SUAS IMAGENS SÃO SERVIDAS PELA API
        // OU '/uploads/**', ou '/sua-pasta-de-imagens/**'
      },
      // Adicione outros domínios de onde suas imagens virão (ex: de um CDN diferente da sua API principal)
      // Exemplo para localhost em desenvolvimento (se você tem imagens na sua pasta public/)
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000", // A porta do seu servidor Next.js
        pathname: "/uploads/**", // Se você colocar imagens em 'public/uploads'
      },
    ],
    // 'domains' é a opção mais antiga e simples, mas menos flexível que 'remotePatterns'.
    // Geralmente não é usada em conjunto com 'remotePatterns'.
    // domains: ['images.unsplash.com', 'api.ngolocapoeira.org'], // Exemplo de uso de domains
  },
  /* config options here */
};

export default nextConfig;
