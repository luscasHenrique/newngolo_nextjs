// src/app/(private)/notifications/_components/useMenuNotifications.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { notify } from "@/lib/notify";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Notification, NotificationType } from "@/types/notification"; // CORREÇÃO AQUI: Importa Notification e verifica o nome do arquivo

export function useMenuNotifications() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0); // O nome do estado é 'unreadCount'
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const NOTIFICATION_LIMIT = 6;

  const getNotificationsFromApi = useCallback(async () => {
    try {
      // Aqui você integraria sua chamada à API real.
      // Ex: const response = await axios.get('/api/user/notifications');
      // const dataFromApi: Notification[] = response.data;

      const mockData: Notification[] = [
        // Os literais de objeto agora são corretamente tipados
        {
          id: "1",
          message: "Seu pedido #123 foi enviado!",
          read: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 5),
          type: NotificationType.ORDER,
          link: "/orders/123",
        },
        {
          id: "2",
          message: "Nova mensagem de suporte.",
          read: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
          type: NotificationType.MESSAGE,
          link: "/support/messages",
        },
        {
          id: "3",
          message: "Promoção imperdível: 20% off!",
          read: true,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
          type: NotificationType.PROMOTION,
          link: "/promotions",
        },
        {
          id: "4",
          message: "Lembrete: evento de capoeira amanhã!",
          read: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
          type: NotificationType.EVENT,
          link: "/events/next",
        },
        {
          id: "5",
          message: "Seu pagamento foi confirmado.",
          read: true,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
          type: NotificationType.ORDER,
          link: "/orders/status",
        },
        {
          id: "6",
          message: "Atualização importante sobre sua conta.",
          read: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
          type: NotificationType.SYSTEM,
        },
        {
          id: "7",
          message: "Convite para aula experimental!",
          read: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
          type: NotificationType.INFO,
        },
        {
          id: "8",
          message: "Novidades no blog N'GOLO.",
          read: true,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20),
          type: NotificationType.INFO,
          link: "/articles/latest",
        },
      ];

      const transformedData: Notification[] = mockData.map((item) => ({
        ...item,
        // Certifique-se de que item.createdAt é algo que pode ser convertido para Date
        // Se sua API retornar string ISO, `new Date(item.createdAt)` é o correto.
        // Se retornar um timestamp, `new Date(item.createdAt * 1000)` para segundos ou `new Date(item.createdAt)` para milissegundos.
        createdAt: new Date(item.createdAt),
      }));

      return transformedData.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );
    } catch (error) {
      console.error("Erro ao buscar notificações da API:", error);
      throw new Error("Não foi possível carregar as notificações.");
    }
  }, []);

  const loadNotifications = useCallback(async () => {
    try {
      const fetchedNotifications = await getNotificationsFromApi();
      setNotifications(fetchedNotifications);
      const newUnreadCount = fetchedNotifications.filter((n) => !n.read).length;
      setUnreadCount(newUnreadCount);
    } catch (error) {
      notify.error("Erro ao carregar notificações.");
      console.error("Failed to load notifications:", error);
    }
  }, [getNotificationsFromApi]);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  const markAsRead = useCallback(async (id: string) => {
    try {
      // Sua chamada à API para marcar como lida no backend iria aqui:
      // await axios.put(`/api/user/notifications/${id}/mark-as-read`);

      setNotifications((prevNotifications) => {
        const updatedNotifications = prevNotifications.map((n) =>
          n.id === id ? { ...n, read: true } : n
        );
        const newUnreadCount = updatedNotifications.filter(
          (n) => !n.read
        ).length;
        setUnreadCount(newUnreadCount);
        return updatedNotifications;
      });
      notify.success("Notificação marcada como lida!");
    } catch (error) {
      notify.error("Erro ao marcar notificação como lida.");
      console.error("Failed to mark notification as read:", error);
    }
  }, []);

  const handleViewAll = useCallback(() => {
    router.push("/notifications");
    setIsDropdownOpen(false);
  }, [router]);

  return {
    notifications: notifications.slice(0, NOTIFICATION_LIMIT),
    totalUnreadCount: unreadCount, // CORREÇÃO AQUI: Retorna 'unreadCount' como 'totalUnreadCount'
    isDropdownOpen,
    toggleDropdown,
    markAsRead,
    handleViewAll,
    hasMoreNotifications: notifications.length > NOTIFICATION_LIMIT,
  };
}
