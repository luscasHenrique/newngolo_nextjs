// src/app/(private)/notifications/_components/NotificationsList.tsx
"use client";

import React from "react";
import {
  Dot,
  MessageSquare,
  Gift,
  ShoppingCart,
  Calendar,
  Info,
  AlertTriangle,
  BookOpen,
  Bell,
} from "lucide-react";
import { Notification, NotificationType } from "@/types/notification";

interface NotificationsListProps {
  notifications: Notification[];
  // onMarkAsRead: (id: string) => void; // Removido, pois a marcação será feita ao abrir o modal
  onOpenModal: (notification: Notification) => void; // NOVO: Prop para abrir o modal
}

const getNotificationIcon = (type?: NotificationType) => {
  switch (type) {
    case NotificationType.ORDER:
      return <ShoppingCart className="h-5 w-5 text-blue-500 flex-shrink-0" />;
    case NotificationType.MESSAGE:
      return <MessageSquare className="h-5 w-5 text-green-500 flex-shrink-0" />;
    case NotificationType.PROMOTION:
      return <Gift className="h-5 w-5 text-purple-500 flex-shrink-0" />;
    case NotificationType.EVENT:
      return <Calendar className="h-5 w-5 text-orange-500 flex-shrink-0" />;
    case NotificationType.WARNING:
      return <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0" />;
    case NotificationType.INFO:
      return <Info className="h-5 w-5 text-gray-500 flex-shrink-0" />;
    case NotificationType.SYSTEM:
      return <BookOpen className="h-5 w-5 text-gray-600 flex-shrink-0" />;
    case NotificationType.REMINDER:
      return <Bell className="h-5 w-5 text-yellow-500 flex-shrink-0" />;
    default:
      return <Bell className="h-5 w-5 text-gray-500 flex-shrink-0" />;
  }
};

export const NotificationsList: React.FC<NotificationsListProps> = ({
  notifications,
  onOpenModal,
}) => {
  if (notifications.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p className="text-lg">Você não tem notificações.</p>
        <p className="text-sm mt-2">Verifique novamente mais tarde!</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-200 bg-white shadow-md rounded-lg p-4">
      {notifications.map((notification) => (
        <li
          key={notification.id}
          className={`py-4 px-4 hover:bg-gray-50 transition-colors ${
            !notification.read ? "bg-blue-50" : ""
          }`}
        >
          <button // Alterado de Link para Button
            onClick={() => onOpenModal(notification)} // Chama a função para abrir o modal
            className="flex items-start w-full text-left cursor-pointer" // Garante que o botão ocupe toda a largura e o texto seja alinhado
          >
            {!notification.read && (
              <Dot className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5 mr-2" />
            )}
            <div className="flex-shrink-0 mr-3 mt-0.5">
              {getNotificationIcon(notification.type)}
            </div>
            <div className="flex-grow">
              <p
                className={`text-base ${
                  notification.read
                    ? "text-gray-700"
                    : "text-gray-900 font-medium"
                }`}
              >
                {notification.message}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(notification.createdAt).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
};
