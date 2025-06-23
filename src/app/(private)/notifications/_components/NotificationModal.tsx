// src/app/(private)/notifications/_components/NotificationModal.tsx
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  MessageSquare,
  Gift,
  ShoppingCart,
  Calendar,
  Info,
  AlertTriangle,
  BookOpen,
  Bell,
} from "lucide-react"; // Removido Dot, pois não é usado aqui
import Link from "next/link";
import { Notification, NotificationType } from "@/types/notification"; // Caminho correto do tipo

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notification: Notification | null;
}

const getNotificationIcon = (type?: NotificationType, className?: string) => {
  switch (type) {
    case NotificationType.ORDER:
      return <ShoppingCart className={className || "h-6 w-6 text-blue-500"} />;
    case NotificationType.MESSAGE:
      return (
        <MessageSquare className={className || "h-6 w-6 text-green-500"} />
      );
    case NotificationType.PROMOTION:
      return <Gift className={className || "h-6 w-6 text-purple-500"} />;
    case NotificationType.EVENT:
      return <Calendar className={className || "h-6 w-6 text-orange-500"} />;
    case NotificationType.WARNING:
      return <AlertTriangle className={className || "h-6 w-6 text-red-500"} />;
    case NotificationType.INFO:
      return <Info className={className || "h-6 w-6 text-gray-500"} />;
    case NotificationType.SYSTEM:
      return <BookOpen className={className || "h-6 w-6 text-gray-600"} />;
    case NotificationType.REMINDER:
      return <Bell className={className || "h-6 w-6 text-yellow-500"} />;
    default:
      return <Bell className={className || "h-6 w-6 text-gray-500"} />;
  }
};

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  notification,
}) => {
  if (!isOpen || !notification) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          // Ajustes no fundo: bg-black/40 (40% de opacidade) e backdrop-blur-sm
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              aria-label="Fechar"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="flex items-center mb-4 border-b pb-3">
              <span className="flex-shrink-0 mr-3">
                {getNotificationIcon(notification.type, "h-8 w-8")}{" "}
              </span>
              <h2 className="text-xl font-bold text-gray-900">
                Detalhes da Notificação
              </h2>
            </div>

            <p className="text-gray-800 mb-4 whitespace-pre-wrap">
              {notification.message}
            </p>

            <p className="text-sm text-gray-500 mb-4">
              Recebido em:{" "}
              {new Date(notification.createdAt).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>

            {/* Renderiza "Ver mais detalhes" SOMENTE SE notification.link existir */}
            {notification.link &&
              notification.link !== "#" && ( // Adicionado condição notification.link !== '#'
                <Link
                  href={notification.link}
                  onClick={onClose}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Ver mais detalhes
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
