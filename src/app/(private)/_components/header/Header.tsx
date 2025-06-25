// src/app/(private)/_components/header/Header.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { useState } from "react"; // <--- ADICIONE ESTA LINHA: IMPORTAR useState

import { signOut as nextAuthSignOut } from "next-auth/react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { notify } from "@/lib/notify";

import { useHeader } from "./useHeader";
import { footerMenu, mainMenu } from "../navmenu/menuData/menu"; // Certifique-se que o caminho está correto
import { MenuItem, SubMenuItem } from "@/models/Menu"; // Certifique-se que o caminho está correto
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  const { isOpen, toggleMenu, closeMenu } = useHeader();
  const router = useRouter();
  const { user, loading } = useCurrentUser();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null); // Estado para controlar submenu aberto

  async function signOut() {
    try {
      await nextAuthSignOut({
        redirect: false,
      });
      notify.success("Sessão encerrada!");
      router.push("/signin");
    } catch (error) {
      notify.error("Erro ao encerrar sessão. Tente novamente.");
      console.error("Erro ao encerrar sessão:", error);
    }
  }

  const toggleMobileSubmenu = (label: string) => {
    setOpenSubmenu((prev) => (prev === label ? null : label)); // prev já é inferido corretamente
  };

  return (
    <header className="w-full h-16 bg-white border-b flex items-center justify-between px-6 relative">
      <h1 className="text-lg font-semibold text-gray-800">N'GOLO Capoeira</h1>

      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          aria-label="Abrir menu"
          className="text-gray-700 hover:text-black"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="hidden md:flex items-center gap-4">
        <span className="text-sm text-gray-600">Bem-vindo(a),</span>
        <p className="text-sm font-semibold">
          {loading ? "Carregando..." : user?.name || "Usuário"}
        </p>
      </div>

      {/* DROPDOWN MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-3/4 max-w-sm bg-white shadow-lg z-50 md:hidden flex flex-col p-4"
          >
            {/* Cabeçalho do menu mobile */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                N'GOLO Capoeira
              </h2>
              <button
                onClick={closeMenu}
                aria-label="Fechar menu"
                className="text-gray-700 hover:text-black"
              >
                <X size={24} />
              </button>
            </div>

            {/* Seção do Avatar/Nome do Usuário no Mobile */}
            {user && (
              <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-100 mb-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={user.imageUrl || "https://github.com/shadcn.png"}
                    alt={user.name}
                  />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <p className="text-xs text-gray-400 uppercase">{user.type}</p>
                </div>
              </div>
            )}

            {/* Container principal para os itens de menu (rolável) */}
            <div className="flex-1 overflow-y-auto">
              <ul>
                {mainMenu.map((item: MenuItem) => (
                  <li key={item.label} className="mb-1">
                    {item.submenu ? (
                      // Item com submenu (agora com toggle)
                      <>
                        <button
                          onClick={() => toggleMobileSubmenu(item.label)}
                          className={clsx(
                            "flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg",
                            {
                              "bg-gray-100 font-semibold":
                                openSubmenu === item.label,
                            }
                          )}
                        >
                          <item.icon className="mr-3" size={18} />
                          {item.label}
                          <span className="ml-auto">
                            {openSubmenu === item.label ? (
                              <ChevronDown size={16} />
                            ) : (
                              <ChevronRight size={16} />
                            )}
                          </span>
                        </button>
                        <AnimatePresence>
                          {openSubmenu === item.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <ul className="pl-8 pt-1">
                                {item.submenu.map((subItem: SubMenuItem) => (
                                  <li key={subItem.href}>
                                    <Link
                                      href={subItem.href}
                                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm"
                                      onClick={closeMenu}
                                    >
                                      {subItem.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href!}
                        className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                        onClick={closeMenu}
                      >
                        <item.icon className="mr-3" size={18} />
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* FOOTER MENU - Container separado que permanece FIXO na parte inferior */}
            <ul className="mt-auto pt-4 border-t border-gray-200">
              {footerMenu.map((item: MenuItem) => {
                const isLogout = item.label.toLowerCase() === "logout";
                return isLogout ? (
                  <li key={item.href}>
                    <button
                      onClick={() => {
                        signOut();
                        closeMenu();
                      }}
                      className={clsx(
                        "flex items-center w-full px-4 py-3 text-sm rounded-lg",
                        item.color
                      )}
                    >
                      <item.icon className="mr-3" size={18} />
                      {item.label}
                    </button>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href!}
                      className={clsx(
                        "flex items-center w-full px-4 py-3 text-sm rounded-lg",
                        item.color
                      )}
                      onClick={closeMenu}
                    >
                      <item.icon className="mr-3" size={18} />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
