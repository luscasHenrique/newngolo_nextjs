//src/app/(private)/notifications/data/mockNotificationsData.ts

import { Notification, NotificationType } from "@/types/notification";

export const MOCK_NOTIFICATIONS_DATA: Notification[] = [
  {
    id: "1",
    message:
      "Seu pedido #123 foi enviado! O item principal, 'Produto X', já está a caminho e deve chegar em 3 dias úteis. Acompanhe seu pedido pelo link abaixo para mais detalhes sobre o rastreamento e entrega.",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 minutos atrás
    type: NotificationType.ORDER,
    link: "/orders/123",
  },
  {
    id: "2",
    message:
      "Nova mensagem de suporte. Você recebeu uma resposta do nosso time de suporte sobre o ticket #456. Clique para ver a conversa completa e continuar o atendimento.",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 horas atrás
    type: NotificationType.MESSAGE,
    // link: "/support/messages",
  },
  {
    id: "3",
    message:
      "Promoção imperdível: 20% off em todos os kimonos! Válido por tempo limitado, não perca essa oportunidade de renovar seu equipamento com um desconto especial. Corra!",
    read: true, // Já lida
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 dia atrás
    type: NotificationType.PROMOTION,
    link: "/promotions",
  },
  {
    id: "4",
    message:
      "Lembrete: evento de capoeira amanhã! Não esqueça de se preparar para o nosso grande evento anual. Teremos workshops, rodas e muita energia. Confirme sua presença!",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 dias atrás
    type: NotificationType.EVENT,
    link: "/events/next",
  },
  {
    id: "5",
    message:
      "Seu pagamento foi confirmado. O pagamento da sua mensalidade foi processado com sucesso. Agradecemos por continuar fazendo parte da família N'GOLO Capoeira!",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 dias atrás
    type: NotificationType.ORDER,
    link: "/orders/status",
  },
  {
    id: "6",
    message:
      "Atualização importante sobre sua conta. Por favor, revise suas informações de contato em seu perfil. É importante que seus dados estejam sempre atualizados para garantir a comunicação.",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // 10 dias atrás
    type: NotificationType.SYSTEM,
  },
  {
    id: "7",
    message:
      "Convite para aula experimental! Convidamos você e seus amigos para uma aula experimental gratuita de capoeira. Venha sentir a energia e aprender os primeiros movimentos.",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15), // 15 dias atrás
    type: NotificationType.INFO,
  },
  {
    id: "8",
    message:
      "Novidades no blog N'GOLO. Acabamos de publicar um novo artigo sobre a história da capoeira na Bahia. Confira insights fascinantes e aprofunde seus conhecimentos!",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20), // 20 dias atrás
    type: NotificationType.INFO,
    link: "/articles/latest",
  },
  {
    id: "9",
    message:
      "Seu perfil foi atualizado com sucesso. Parabéns por manter seu perfil sempre atualizado em nossa plataforma! Suas informações estão seguras e prontas para uso.",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 25), // 25 dias atrás
    type: NotificationType.SYSTEM,
  },
  {
    id: "10",
    message:
      "Desconto exclusivo para membros! Como um membro fiel da comunidade N'GOLO, você tem direito a 10% de desconto em nossa loja online. Use o código NGOLO10OFF no checkout.",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // 30 dias atrás
    type: NotificationType.PROMOTION,
  },
];
