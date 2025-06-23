// src/components/footer/Footer.tsx
"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { footerData } from "./data/footerData";
import React, { useState } from "react";

// Componente auxiliar para um item de acordeão (apenas para mobile)
interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    // Borda cinza clara para dividir seções em mobile
    <div className="md:hidden border-b border-gray-200 last:border-b-0">
      <button
        className="w-full flex justify-between items-center py-4 text-gray-800 text-base font-semibold" // Texto preto/cinza escuro
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {title}
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-600" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-600" />
        )}{" "}
        {/* Ícones cinza */}
      </button>
      {isOpen && <div className="pb-4">{children}</div>}
    </div>
  );
};

export function Footer() {
  return (
    // Fundo branco, com sombra sutil
    <footer className="  bg-white text-gray-800 py-10 px-4 sm:px-6 lg:px-8 mt-10 shadow-lg">
      <div className="max-w-7xl mx-auto">
        {/* Seção da Logo e Slogan */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left mb-8 md:mb-10">
          <Link href="/">
            {/* Se a logo tiver texto escuro e for em PNG transparente, ela deve ficar bem em fundo branco */}
            <img
              src={footerData.logoSrc}
              alt={footerData.logoAlt}
              className="h-16 w-auto mb-4"
            />
          </Link>
          <p className="text-sm max-w-xs text-gray-600">{footerData.slogan}</p>{" "}
          {/* Slogan em cinza escuro */}
        </div>
        {/* Links e Contato para DESKTOP (colunas) */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 mb-10">
          {/* Links Rápidos Desktop */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Links Rápidos
            </h3>{" "}
            {/* Título em preto quase total */}
            <ul className="space-y-2">
              {footerData.quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-700 hover:text-gray-900 transition-colors" // Links em cinza escuro, hover preto
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato Desktop */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Contato
            </h3>{" "}
            {/* Título em preto quase total */}
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-gray-700">
                {" "}
                {/* Texto em cinza escuro */}
                <Phone className="h-4 w-4 mr-2 text-gray-600" />{" "}
                {/* Ícone em cinza */}
                <span>{footerData.contact.phone}</span>
              </li>
              <li className="flex items-center text-sm text-gray-700">
                <Mail className="h-4 w-4 mr-2 text-gray-600" />
                <span>{footerData.contact.email}</span>
              </li>
              {footerData.contact.address && (
                <li className="flex items-start text-sm text-gray-700">
                  <MapPin className="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-gray-600" />
                  <span>{footerData.contact.address}</span>
                </li>
              )}
            </ul>
          </div>
        </div>{" "}
        {/* Fim dos links/contato desktop */}
        {/* Links e Contato para MOBILE (acordeão) */}
        <div className="md:hidden">
          {/* Acordeão de Links Rápidos */}
          <AccordionItem title="Links Rápidos">
            <ul className="space-y-2 pl-4">
              {footerData.quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionItem>

          {/* Acordeão de Contato */}
          <AccordionItem title="Contato">
            <ul className="space-y-2 pl-4">
              <li className="flex items-center text-sm text-gray-700">
                <Phone className="h-4 w-4 mr-2 text-gray-600" />
                <span>{footerData.contact.phone}</span>
              </li>
              <li className="flex items-center text-sm text-gray-700">
                <Mail className="h-4 w-4 mr-2 text-gray-600" />
                <span>{footerData.contact.email}</span>
              </li>
              {footerData.contact.address && (
                <li className="flex items-start text-sm text-gray-700">
                  <MapPin className="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-gray-600" />
                  <span>{footerData.contact.address}</span>
                </li>
              )}
            </ul>
          </AccordionItem>
        </div>{" "}
        {/* Fim dos links/contato mobile */}
        {/* Seção de Redes Sociais e Copyright */}
        {/* Borda cinza clara entre as seções principais e esta */}
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
          <div className="flex space-x-6 mb-4 sm:mb-0">
            {footerData.socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-gray-500 hover:text-gray-700 transition-colors" // Ícones sociais em cinza médio, hover cinza escuro
              >
                <social.icon className="h-6 w-6" />
              </a>
            ))}
          </div>
          <p className="text-sm text-gray-500">{footerData.copyright}</p>{" "}
          {/* Copyright em cinza médio */}
        </div>
      </div>
    </footer>
  );
}
