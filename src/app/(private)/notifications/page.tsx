// src/app/(private)/notifications/page.tsx
"use client";

import React, { useEffect } from "react"; // Importar useEffect
import { useNotificationsPage } from "./_hooks/useNotificationsPage";
import { NotificationsList } from "./_components/NotificationsList";
import { NotificationModal } from "./_components/NotificationModal";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useSearchParams } from "next/navigation"; // Importar useSearchParams

export default function NotificationsPage() {
  const searchParams = useSearchParams(); // Hook para pegar query params
  const notificationIdFromUrl = searchParams.get("id"); // Pega o 'id' da URL

  const {
    notifications,
    isLoading,
    error,
    markAllNotificationsAsRead,
    hasUnread,
    isModalOpen,
    selectedNotification,
    openNotificationModal,
    closeNotificationModal,
  } = useNotificationsPage();

  // Efeito para abrir o modal se houver um ID na URL e as notificações estiverem carregadas
  useEffect(() => {
    if (
      notificationIdFromUrl &&
      notifications.length > 0 &&
      !isLoading &&
      !error
    ) {
      const foundNotification = notifications.find(
        (n) => n.id === notificationIdFromUrl
      );
      if (foundNotification) {
        openNotificationModal(foundNotification);
      }
    }
  }, [
    notificationIdFromUrl,
    notifications,
    isLoading,
    error,
    openNotificationModal,
  ]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
        <p className="ml-4 text-lg text-blue-500">Carregando notificações...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full min-h-[400px] text-red-500 text-lg">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <SectionTitle title="Todas as suas Notificações" animate={false} />

      <div className="flex justify-end mb-4">
        {hasUnread && (
          <Button
            onClick={markAllNotificationsAsRead}
            variant="outline"
            className="text-sm"
          >
            Marcar todas como lidas
          </Button>
        )}
      </div>

      {/* Passa a função para abrir o modal para a lista */}
      <NotificationsList
        notifications={notifications}
        onOpenModal={openNotificationModal}
      />

      {/* RENDERIZA O MODAL */}
      <NotificationModal
        isOpen={isModalOpen}
        onClose={closeNotificationModal}
        notification={selectedNotification}
      />
    </div>
  );
}
