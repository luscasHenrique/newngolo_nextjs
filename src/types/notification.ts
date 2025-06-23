// src/types/notifications.ts

export enum NotificationType {
  SYSTEM = "system", // Notificações gerais do sistema (ex: atualizações da plataforma)
  PROMOTION = "promotion", // Notificações de marketing ou ofertas especiais
  ORDER = "order", // Notificações relacionadas a pedidos (status, envio, entrega)
  MESSAGE = "message", // Novas mensagens ou comunicações (ex: chat, suporte)
  EVENT = "event", // Notificações sobre eventos (lembretes, atualizações)
  WARNING = "warning", // Avisos ou alertas importantes (ex: conta, segurança)
  INFO = "info", // Informações gerais
  REMINDER = "reminder", // Lembretes de tarefas ou ações
}

/**
 * Interface que define a estrutura de um objeto de notificação.
 */
export interface Notification {
  id: string; // Identificador único da notificação
  message: string; // O conteúdo principal da notificação
  read: boolean; // Indica se a notificação foi lida pelo usuário
  createdAt: Date; // Timestamp de quando a notificação foi criada
  link?: string; // URL opcional para onde a notificação deve redirecionar
  type?: NotificationType; // Tipo da notificação, usando o enum
  entityId?: string; // ID opcional da entidade relacionada (ex: ID do pedido, ID do evento)
  entityType?: string; // Tipo opcional da entidade (ex: 'order', 'user', 'event')
}
