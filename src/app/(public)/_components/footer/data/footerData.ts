// src/components/footer/data/footerData.ts

import {
  Facebook,
  Instagram,
  Youtube,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import React from "react"; // Importar React para o tipo React.ElementType

interface QuickLink {
  label: string;
  href: string;
}

interface SocialLink {
  label: string;
  href: string;
  icon: React.ElementType; // Icon é um componente React (ex: Bell, Facebook)
}

interface ContactInfo {
  phone: string;
  email: string;
  address?: string; // Endereço é opcional
}

interface FooterContent {
  logoSrc: string;
  logoAlt: string;
  slogan: string;
  quickLinks: QuickLink[];
  contact: ContactInfo;
  socialLinks: SocialLink[];
  copyright: string;
}

export const footerData: FooterContent = {
  logoSrc: "/images/logo_ngolo.png", // Use o caminho da sua logo
  logoAlt: "Logo N'GOLO Capoeira",
  slogan: "A arte que liberta e transforma.", // Um slogan curto ou descrição
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "História", href: "/history" },
    { label: "Eventos", href: "/events" },
    { label: "Músicas", href: "/music" },
    { label: "Artigos", href: "/articles" },
    { label: "Produtos", href: "/products" },
    { label: "Privacidade", href: "/privacy-policy" }, // Exemplo de link de política
  ],
  contact: {
    phone: "678 324 7259", // Use o seu telefone real
    email: "info@ngolocapoeira.com", // Use o seu email real
    address: "Rua Exemplo, 123 - Centro, Cidade - Estado, País", // Opcional, mas mais completo
  },
  socialLinks: [
    {
      label: "Facebook",
      href: "https://facebook.com/ngolocapoeira",
      icon: Facebook,
    },
    {
      label: "Instagram",
      href: "https://instagram.com/ngolocapoeira",
      icon: Instagram,
    },
    {
      label: "YouTube",
      href: "http://youtube.com/ngolocapoeira",
      icon: Youtube,
    }, // Corrigido URL do YouTube
    // Adicione mais redes sociais conforme necessário
  ],
  copyright: "© 2025 NGOLO Capoeira. Todos os direitos reservados.",
};
