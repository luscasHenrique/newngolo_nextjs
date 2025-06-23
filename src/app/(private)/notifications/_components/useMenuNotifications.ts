// src/app/(private)/notifications/_components/useMenuNotifications.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { Notification, NotificationType } from "@/types/notification";
import { notify } from "@/lib/notify";
import { useRouter } from "next/navigation";
import { MOCK_NOTIFICATIONS_DATA } from "../data/mockNotificationsData";
// import axios from 'axios';

export function useMenuNotifications() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const NOTIFICATION_LIMIT = 6;

  const getNotificationsFromApi = useCallback(async () => {
    return new Promise<Notification[]>((resolve) => {
      setTimeout(() => {
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
      }, 300);
    });
  }, []);

  const loadNotifications = useCallback(async () => {
    try {
      const fetchedNotifications = await getNotificationsFromApi();
      setNotifications(fetchedNotifications);
      const newUnreadCount = fetchedNotifications.filter((n) => !n.read).length;
      setUnreadCount(newUnreadCount);
    } catch (err) {
      notify.error("Erro ao carregar notificações do menu.");
      console.error("Failed to load menu notifications:", err);
    }
  }, [getNotificationsFromApi]);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  const markAsRead = useCallback(async (id: string) => {
    // Esta função será chamada ANTES de redirecionar ou abrir modal
    try {
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
    } catch (err) {
      notify.error("Erro ao marcar notificação como lida no menu.");
      console.error("Failed to mark menu notification as read:", err);
    }
  }, []);

  const handleViewAll = useCallback(() => {
    router.push("/notifications"); // Ainda vai para a página de todas as notificações
    setIsDropdownOpen(false);
  }, [router]);

  return {
    notifications: notifications.slice(0, NOTIFICATION_LIMIT),
    totalUnreadCount: unreadCount,
    isDropdownOpen,
    toggleDropdown,
    markAsRead, // Exportar para ser usado antes do clique
    handleViewAll,
    hasMoreNotifications: notifications.length > NOTIFICATION_LIMIT,
  };
}
