// src/app/(public)/(home)/_components/headerMenu/HeaderMenu.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  X,
  User as UserIcon,
  LogOut,
  Settings as SettingsIcon,
  ChevronDown,
  ChevronRight,
  Loader2,
  LockKeyhole,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut as nextAuthSignOut } from "next-auth/react";
import { notify } from "@/lib/notify";

import {
  footerContact,
  footerSocial,
  mainHeaderMenu as originalMainHeaderMenu,
  profileMenu,
} from "./menu";
import { MenuNotifications } from "@/app/(private)/notifications/_components/MenuNotifications";

export function HeaderMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const router = useRouter();

  async function handleLogout() {
    try {
      await nextAuthSignOut({
        redirect: false,
        callbackUrl: "/signin",
      });
      notify.success("Sessão encerrada com sucesso!");
    } catch (error) {
      notify.error("Erro ao fazer logout.");
      console.error("Logout error:", error);
    }
  }

  const dynamicMainMenu = [...originalMainHeaderMenu];

  if (!isLoading && status === "authenticated" && session?.user) {
    const loginIndex = dynamicMainMenu.findIndex(
      (item) => item.label === "Login" && item.href === "/signin"
    );
    if (loginIndex > -1) {
      dynamicMainMenu.splice(loginIndex, 1);
    }
    dynamicMainMenu.push({
      icon: UserIcon,
      label: session.user.name || "Perfil",
      submenu: profileMenu.map((item) => ({
        label: item.label,
        href: item.href,
        icon: item.icon,
        action: item.action,
      })),
    });
  } else if (!isLoading && status === "unauthenticated") {
    const loginExists = dynamicMainMenu.some(
      (item) => item.label === "Login" && item.href === "/signin"
    );
    if (!loginExists) {
      dynamicMainMenu.push({
        icon: LockKeyhole,
        label: "Login",
        href: "/signin",
      });
    }
  }

  return (
    <>
      <header className="w-full border-b border-gray-200 bg-white z-50 relative h-16">
        <div className="px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <Link href="/">
            <img
              src="/images/logo_ngolo.png"
              alt="Logo N'GOLO Capoeira"
              className="h-14 w-auto hover:opacity-80 transition"
            />
          </Link>

          {/* Área à direita do logo - para desktop/mobile */}
          <div className="flex items-center gap-2 sm:gap-4">
            {" "}
            {/* Ajustei o gap para mobile/desktop */}
            {/* Componente de Notificações - Visível em mobile e desktop/tablet */}
            {status === "authenticated" && (
              <MenuNotifications /> // Renderiza o sino sempre que logado
            )}
            {/* Texto "NGOLO" ou Link de login - SÓ VISÍVEL EM DESKTOP (md:block) */}
            {status === "unauthenticated" ? (
              <Link
                href="/"
                className="text-xl font-bold hover:opacity-80 transition hidden md:block" // Escondido em mobile
              >
                NGOLO
              </Link>
            ) : (
              // Se autenticado, não mostra "NGOLO" aqui.
              // O nome do usuário (ou "Perfil") já está no menu de navegação à direita.
              // E o sino já está ao lado.
              // Para o caso de usuário autenticado sem ter um perfil "dropdown" no menu principal,
              // mas ainda queremos um "nome" ali, podemos adicionar uma div vazia ou ajustar.
              // Por agora, se autenticado, só o sino fica ali.
              <span className="hidden md:block">
                {/* Aqui poderia ser o nome do usuário ou um ícone de perfil se não for no menu principal */}
              </span>
            )}
            {/* Botão do menu mobile (hambúrguer) - VISÍVEL APENAS EM MOBILE */}
            <button
              className="block md:hidden p-2 rounded-md hover:bg-gray-100"
              onClick={() => setIsOpen(true)}
              disabled={isLoading}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Menu de navegação desktop (Centralizado) */}
        <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 space-x-6 z-10">
          {isLoading ? (
            <div className="flex items-center space-x-2 text-gray-500">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Carregando...</span>
            </div>
          ) : (
            dynamicMainMenu.map((item, index) => (
              <div key={index} className="relative">
                <div className="group inline-block">
                  {item.href && item.href !== "#" && !item.submenu ? (
                    <Link
                      href={item.href}
                      className="text-sm font-medium text-gray-700 hover:text-black px-2 py-1 inline-block"
                    >
                      {item.label}
                    </Link>
                  ) : item.submenu ? (
                    <span className="text-sm font-medium text-gray-700 hover:text-black px-2 py-1 inline-flex items-center cursor-pointer">
                      {item.label}
                      <ChevronDown size={14} className="ml-1" />
                    </span>
                  ) : (
                    <span className="text-sm font-medium text-gray-400 px-2 py-1 inline-block cursor-default">
                      {item.label}
                    </span>
                  )}

                  {item.submenu && (
                    <div className="absolute left-0 mt-2 bg-white shadow-md rounded-md w-48 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all z-50">
                      {item.submenu.map((sub, subIndex) => (
                        <button
                          key={subIndex}
                          onClick={() => {
                            if (sub.action === "logout") {
                              handleLogout();
                            } else if (sub.href) {
                              router.push(sub.href);
                            }
                          }}
                          className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md w-full text-left"
                        >
                          {sub.icon && (
                            <sub.icon className="inline-block mr-2 h-4 w-4" />
                          )}
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </nav>
      </header>

      {/* Overlay + Menu mobile animado (sem o sino duplicado aqui) */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/30 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-lg p-4 md:hidden flex flex-col overflow-y-auto"
            >
              <div className="flex justify-between items-center border-b pb-2">
                <Link
                  href="/"
                  className="text-lg font-bold hover:opacity-80 transition"
                  onClick={() => setIsOpen(false)}
                >
                  <img
                    src="/images/logo_ngolo.png"
                    alt="Logo N'GOLO Capoeira"
                    className="h-6 w-auto hover:opacity-80 transition"
                  />
                </Link>
                <div className="flex items-center gap-2">
                  <button onClick={() => setIsOpen(false)}>
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* Removido o MenuNotifications daqui, pois ele já fica fora do menu no mobile */}

              <div className="pt-4 space-y-2 flex-1 overflow-y-auto">
                {dynamicMainMenu.map((item, index) => (
                  <div key={index}>
                    {item.href && item.href !== "#" ? (
                      <Link
                        href={item.href}
                        className="block py-2 font-medium text-gray-700 hover:bg-gray-100 rounded px-3"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.icon && (
                          <item.icon className="inline-block mr-2 h-4 w-4" />
                        )}
                        {item.label}
                      </Link>
                    ) : item.submenu ? (
                      <div className="py-2">
                        <button
                          onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                          className="flex items-center w-full font-medium text-gray-700 hover:bg-gray-100 rounded px-3 py-2"
                        >
                          {item.icon && (
                            <item.icon className="inline-block mr-2 h-4 w-4" />
                          )}
                          {item.label}
                          <span className="ml-auto">
                            {isProfileMenuOpen ? (
                              <ChevronDown size={16} />
                            ) : (
                              <ChevronRight size={16} />
                            )}
                          </span>
                        </button>
                        <AnimatePresence>
                          {isProfileMenuOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="ml-4 space-y-1 overflow-hidden"
                            >
                              {item.submenu.map((sub, subIndex) => (
                                <button
                                  key={subIndex}
                                  onClick={() => {
                                    if (sub.action === "logout") {
                                      handleLogout();
                                    } else if (sub.href) {
                                      router.push(sub.href);
                                    }
                                    setIsOpen(false);
                                  }}
                                  className="block px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded w-full text-left"
                                >
                                  {sub.icon && (
                                    <sub.icon className="inline-block mr-2 h-4 w-4" />
                                  )}
                                  {sub.label}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <span className="block py-2 font-medium text-gray-400 px-3 cursor-default">
                        {item.label}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t mt-6 pt-4 text-center text-sm space-y-4">
                <div>
                  <p className="text-gray-600">{footerContact.phone}</p>
                  <p className="text-gray-600">{footerContact.email}</p>
                </div>

                <div className="flex justify-center space-x-4 items-center">
                  {footerSocial.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5 text-gray-600 hover:text-black" />
                    </a>
                  ))}
                </div>

                <p className="text-gray-400 text-xs pt-4">&copy; 2025 NGOLO</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
