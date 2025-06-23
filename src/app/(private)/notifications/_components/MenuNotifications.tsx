// src/app/(private)/notifications/_components/MenuNotifications.tsx
"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import {
  Bell,
  Dot,
  MessageSquare,
  Gift,
  ShoppingCart,
  Calendar,
  Info,
  AlertTriangle,
  BookOpen,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMenuNotifications } from "./useMenuNotifications";
// Removido: import './MenuNotifications.css'; // Não precisamos mais deste CSS para o tooltip
import { NotificationType } from "@/types/notification";

export const MenuNotifications: React.FC = () => {
  const {
    notifications,
    totalUnreadCount,
    isDropdownOpen,
    toggleDropdown,
    markAsRead,
    handleViewAll,
    hasMoreNotifications,
  } = useMenuNotifications();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Removido: tooltipContent, pois o tooltip será removido

  const getNotificationIcon = (type?: NotificationType) => {
    switch (type) {
      case NotificationType.ORDER:
        return <ShoppingCart className="h-4 w-4 text-blue-500 flex-shrink-0" />;
      case NotificationType.MESSAGE:
        return (
          <MessageSquare className="h-4 w-4 text-green-500 flex-shrink-0" />
        );
      case NotificationType.PROMOTION:
        return <Gift className="h-4 w-4 text-purple-500 flex-shrink-0" />;
      case NotificationType.EVENT:
        return <Calendar className="h-4 w-4 text-orange-500 flex-shrink-0" />;
      case NotificationType.WARNING:
        return <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />;
      case NotificationType.INFO:
        return <Info className="h-4 w-4 text-gray-500 flex-shrink-0" />;
      case NotificationType.SYSTEM:
        return <BookOpen className="h-4 w-4 text-gray-600 flex-shrink-0" />;
      case NotificationType.REMINDER:
        return <Bell className="h-4 w-4 text-yellow-500 flex-shrink-0" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500 flex-shrink-0" />;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        if (isDropdownOpen) {
          toggleDropdown();
        }
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen, toggleDropdown]);

  return (
    <div className="relative inline-block text-left z-50">
      {/* Removido o tooltip-container */}
      <button
        ref={buttonRef}
        type="button"
        className="inline-flex justify-center items-center p-2 rounded-full text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 relative"
        onClick={toggleDropdown}
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
      >
        <Bell className="h-6 w-6" />
        {totalUnreadCount > 0 && (
          <span className="absolute top-0 left-1/2 -translate-x-1/4 -translate-y-1/4 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full min-w-[20px] h-[20px]">
            {/* Ajuste do `left-1/2 -translate-x-1/4 -translate-y-1/4` para puxar mais para a esquerda e um pouco para cima/direita */}
            {totalUnreadCount > 99 ? "99+" : totalUnreadCount}
          </span>
        )}
      </button>
      {/* Removido o span do tooltip-text */}

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-gray-200 ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex={-1}
          >
            <div className="py-1" role="none">
              <div className="px-4 py-2 text-sm font-semibold text-gray-700 border-b">
                Notificações
              </div>
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <Link
                    key={notification.id}
                    href={notification.link || "/notifications"}
                    onClick={() => {
                      markAsRead(notification.id);
                      toggleDropdown();
                    }}
                    className={`flex items-start px-4 py-3 text-sm hover:bg-gray-50 ${
                      notification.read
                        ? "text-gray-500"
                        : "text-gray-900 font-medium"
                    }`}
                    role="menuitem"
                    tabIndex={-1}
                  >
                    {!notification.read && (
                      <Dot className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5 mr-1" />
                    )}
                    <span className="flex-shrink-0 mr-2 mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </span>
                    <span className="flex-grow">
                      {notification.message}
                      <p className="text-xs text-gray-400 mt-0.5">
                        {new Date(notification.createdAt).toLocaleDateString(
                          "pt-BR",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                    </span>
                  </Link>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-gray-500">
                  Nenhuma notificação recente.
                </div>
              )}
            </div>
            {hasMoreNotifications && (
              <div className="py-1">
                <button
                  onClick={handleViewAll}
                  className="block w-full text-center px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 rounded-b-md"
                  role="menuitem"
                  tabIndex={-1}
                >
                  Ver todas
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
