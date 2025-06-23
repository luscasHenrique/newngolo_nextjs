// src/app/(private)/notifications/_hooks/useNotificationsPage.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { Notification, NotificationType } from "@/types/notification"; // Importação correta
import { notify } from "@/lib/notify";
import { useRouter } from "next/navigation";
import { MOCK_NOTIFICATIONS_DATA } from "../data/mockNotificationsData";
// import axios from 'axios';

export function useNotificationsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);

  const getNotificationsFromApi = useCallback(async () => {
    // console.log("DEBUG: useNotificationsPage - getNotificationsFromApi - Iniciando...");
    return new Promise<Notification[]>((resolve) => {
      setTimeout(() => {
        // console.log("DEBUG: useNotificationsPage - getNotificationsFromApi - setTimeout concluído.");
        // Use os dados do mock importado aqui
        const mockData = MOCK_NOTIFICATIONS_DATA;

        const transformedData: Notification[] = mockData.map((item) => ({
          ...item,
          createdAt: new Date(item.createdAt),
        }));

        resolve(
          transformedData.sort(
            (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
          )
        );
      }, 800); // Mantém o delay para a página completa
    });
  }, []);

  const loadAllNotifications = useCallback(async () => {
    // console.log("DEBUG: useNotificationsPage - loadAllNotifications - Iniciando carregamento. isLoading = true.");
    setIsLoading(true);
    setError(null);
    try {
      const fetchedData = await getNotificationsFromApi();
      setNotifications(fetchedData);
      // console.log("DEBUG: useNotificationsPage - loadAllNotifications - Dados carregados:", fetchedData.length, "notificações.");
    } catch (err) {
      console.error(
        "DEBUG: useNotificationsPage - Erro durante o carregamento:",
        err
      );
      setError("Não foi possível carregar todas as notificações.");
      notify.error("Erro ao carregar notificações.");
    } finally {
      // console.log("DEBUG: useNotificationsPage - loadAllNotifications - Carregamento finalizado. isLoading = false.");
      setIsLoading(false);
    }
  }, [getNotificationsFromApi]);

  useEffect(() => {
    // console.log("DEBUG: useNotificationsPage - useEffect - Chamando loadAllNotifications.");
    loadAllNotifications();
  }, [loadAllNotifications]);

  const markNotificationAsRead = useCallback(async (id: string) => {
    try {
      setNotifications((prevNotifications) =>
        prevNotifications.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      notify.error("Erro ao marcar notificação como lida.");
      console.error("Failed to mark notification as read:", err);
    }
  }, []);

  const markAllNotificationsAsRead = useCallback(async () => {
    try {
      setNotifications((prevNotifications) =>
        prevNotifications.map((n) => ({ ...n, read: true }))
      );
      notify.success("Todas as notificações marcadas como lidas!");
    } catch (err) {
      notify.error("Erro ao marcar todas como lidas.");
      console.error("Failed to mark all notifications as read:", err);
    }
  }, []);

  const openNotificationModal = useCallback(
    (notification: Notification) => {
      setSelectedNotification(notification);
      setIsModalOpen(true);
      if (!notification.read) {
        markNotificationAsRead(notification.id);
      }
    },
    [markNotificationAsRead]
  );

  const closeNotificationModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedNotification(null);
  }, []);

  return {
    notifications,
    isLoading,
    error,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    hasUnread: notifications.some((n) => !n.read),
    isModalOpen,
    selectedNotification,
    openNotificationModal,
    closeNotificationModal,
  };
}
