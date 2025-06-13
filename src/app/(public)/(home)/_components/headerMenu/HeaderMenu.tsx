"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { footerContact, footerSocial, mainHeaderMenu } from "./menu";

export function HeaderMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="w-full border-b border-gray-200 bg-white  z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 h-16 items-center">
            {/* Esquerda - Nome clicável */}
            <div className="flex items-center">
              <Link
                href="/"
                className="text-xl font-bold hover:opacity-80 transition"
              >
                ATOS ATLANTA
              </Link>
            </div>

            {/* Centro - Menu Desktop */}
            <nav className="hidden md:flex justify-center space-x-6">
              {mainHeaderMenu.map((item, index) => (
                <div key={index} className="relative group">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="text-sm font-medium text-gray-700 hover:text-black"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-sm font-medium text-gray-700 cursor-default">
                      {item.label}
                    </span>
                  )}
                  {item.submenu && (
                    <div className="absolute left-0 mt-2 bg-white shadow-md rounded-md w-48 opacity-0 group-hover:opacity-100 transition-opacity z-50">
                      {item.submenu.map((sub, subIndex) => (
                        <Link
                          key={subIndex}
                          href={sub.href}
                          className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Direita - Logo clicável e botão mobile */}
            <div className="flex justify-end items-center gap-2">
              <Link href="/">
                <img
                  src="/logo.svg"
                  alt="Logo"
                  className="h-8 w-auto hover:opacity-80 transition"
                />
              </Link>
              <button
                className="block md:hidden p-2 rounded-md hover:bg-gray-100"
                onClick={() => setIsOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay + Menu animado com Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay com fade-in/out */}
            <motion.div
              className=" bg-black/30 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Menu mobile deslizando da esquerda */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-lg p-4 md:hidden overflow-y-auto"
            >
              <div className="flex justify-between items-center border-b pb-2">
                <Link
                  href="/"
                  className="text-lg font-bold hover:opacity-80 transition"
                  onClick={() => setIsOpen(false)}
                >
                  ATOS ATLANTA
                </Link>
                <div className="flex items-center gap-2">
                  <Link href="/" onClick={() => setIsOpen(false)}>
                    <img
                      src="/logo.svg"
                      alt="Logo"
                      className="h-6 w-auto hover:opacity-80 transition"
                    />
                  </Link>
                  <button onClick={() => setIsOpen(false)}>
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div className="pt-4 space-y-2">
                {mainHeaderMenu.map((item, index) => (
                  <div key={index}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="block py-2 font-medium text-gray-700 hover:bg-gray-100 rounded px-3"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ) : !item.submenu ? (
                      <span className="block py-2 font-medium text-gray-400 px-3 cursor-default">
                        {item.label}
                      </span>
                    ) : null}

                    {item.submenu && (
                      <div className="ml-4 space-y-1">
                        {item.submenu.map((sub, subIndex) => (
                          <Link
                            key={subIndex}
                            href={sub.href}
                            className="block text-sm text-gray-600 hover:bg-gray-100 rounded px-3 py-1"
                            onClick={() => setIsOpen(false)}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
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

                <p className="text-gray-400 text-xs pt-4">
                  &copy; 2025 ATOS ATL
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
