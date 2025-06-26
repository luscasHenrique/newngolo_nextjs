// src/app/events/_data/mockEvents.ts

import type { Event } from "../types/Event";

export const mockEvents: Event[] = [
  {
    id: "evt1",
    title: "Workshop de Next.js com App Router",
    description:
      "Aprenda a construir aplicações modernas com Next.js 14 e o novo App Router.",
    longDescription:
      "Este workshop intensivo cobrirá os fundamentos do Next.js App Router, Server Components, Data Fetching, e implantação. Ideal para desenvolvedores que querem aprofundar seus conhecimentos em React e Next.js.",
    dateStart: "2025-07-20T14:00:00", // Início
    dateEnd: "2025-07-20T18:00:00", // Fim (mesmo dia)
    location: "Auditório Central, São Paulo",
    category: "Workshop",
    isOnline: false,
    registrationLink: "https://example.com/register-nextjs-workshop",
    speakers: ["Ana Paula Faria", "Carlos Eduardo Silva"],
    tags: ["Next.js", "React", "Desenvolvimento Web"],
  },
  {
    id: "evt_new_1",
    title: "Palestra: Introdução ao SvelteKit",
    description:
      "Conheça os fundamentos do SvelteKit para desenvolvimento web.",
    longDescription:
      "Uma palestra concisa sobre os conceitos básicos do SvelteKit, suas vantagens e como começar a desenvolver aplicações rapidamente.",
    dateStart: "2025-07-20T10:00:00", // Início (mesmo dia do evt1, mas horário diferente)
    dateEnd: "2025-07-20T11:30:00", // Fim
    location: "Sala de Conferências 1, São Paulo",
    category: "Palestra",
    isOnline: false,
    registrationLink: "https://example.com/register-sveltekit",
    speakers: ["Bruno Rodrigues"],
    tags: ["Svelte", "Frontend", "Frameworks"],
  },
  {
    id: "evt_new_2",
    title: "Webinar: Produtividade com Ferramentas AI",
    description:
      "Descubra como ferramentas de inteligência artificial podem otimizar sua produtividade.",
    longDescription:
      "Este webinar abordará ferramentas de IA para automação de tarefas, otimização de fluxo de trabalho e aumento da eficiência em diversas áreas profissionais.",
    dateStart: "2025-07-20T16:30:00", // Início (mesmo dia, outro horário)
    dateEnd: "2025-07-20T17:30:00", // Fim
    location: "Online via Google Meet",
    category: "Webinar",
    isOnline: true,
    registrationLink: "https://example.com/register-ai-productivity",
    speakers: ["Sofia Martins"],
    tags: ["Produtividade", "IA", "Ferramentas"],
  },
  {
    id: "evt_new_13",
    title: "Webinar: Produtividade com Ferramentas AI",
    description:
      "Descubra como ferramentas de inteligência artificial podem otimizar sua produtividade.",
    longDescription:
      "Este webinar abordará ferramentas de IA para automação de tarefas, otimização de fluxo de trabalho e aumento da eficiência em diversas áreas profissionais.",
    dateStart: "2025-07-20T16:30:00", // Início (mesmo dia, outro horário)
    dateEnd: "2025-07-20T17:30:00", // Fim
    location: "Online via Google Meet",
    category: "Webinar",
    isOnline: true,
    registrationLink: "https://example.com/register-ai-productivity",
    speakers: ["Sofia Martins"],
    tags: ["Produtividade", "IA", "Ferramentas"],
  },
  {
    id: "evt2",
    title: "Webinar: Tendências de IA para 2025",
    description:
      "Explore as principais tendências e o futuro da Inteligência Artificial nos próximos anos.",
    longDescription:
      "Um webinar aprofundado sobre os avanços mais recentes em IA, incluindo IA generativa, aprendizado de máquina em larga escala e suas implicações para a indústria e a sociedade.",
    dateStart: "2025-07-25T10:00:00",
    dateEnd: "2025-07-25T11:30:00",
    location: "Online via Zoom",
    category: "Webinar",
    isOnline: true,
    registrationLink: "https://example.com/register-ai-webinar",
    materialsLink: "/downloads/webinar-ia-slides.pdf",
    speakers: ["Dr. Lucas Almeida"],
    tags: ["IA", "Machine Learning", "Futuro"],
  },
  {
    id: "evt3",
    title: "Meetup de Design UX/UI",
    description:
      "Um encontro para discutir as melhores práticas e inovações em UX/UI Design.",
    longDescription:
      "Junte-se a nós para uma noite de networking e discussões sobre as últimas tendências em design de experiência do usuário e interface, com sessões de lightning talks e mentoria.",
    dateStart: "2025-08-05T19:00:00",
    dateEnd: "2025-08-05T21:00:00",
    location: "Espaço Colaborativo DesignHub",
    category: "Meetup",
    isOnline: false,
    registrationLink: "https://example.com/register-uxui-meetup",
    tags: ["UX", "UI", "Design"],
  },
  {
    id: "evt4",
    title: "Conferência Anual de Cibersegurança",
    description:
      "Os maiores especialistas em segurança digital se reúnem para compartilhar conhecimentos.",
    longDescription:
      "Uma conferência de três dias com keynotes, painéis de discussão e workshops práticos sobre as ameaças mais recentes em cibersegurança e estratégias de defesa eficazes para empresas e indivíduos.",
    dateStart: "2025-09-10T09:00:00", // Início (primeiro dia)
    dateEnd: "2025-09-12T17:00:00", // Fim (último dia)
    location: "Centro de Convenções Tech",
    category: "Conferência",
    isOnline: false,
    registrationLink: "https://example.com/register-cybersec-conf",
    speakers: ["Dra. Gabriela Souza", "Eng. Fernando Costa"],
    tags: ["Segurança", "Cibersegurança", "Proteção de Dados"],
  },
  {
    id: "evt5",
    title: "Palestra: Gestão Financeira Pessoal",
    description:
      "Dicas essenciais para organizar suas finanças e alcançar a liberdade financeira.",
    longDescription:
      "Nesta palestra, você aprenderá sobre orçamento, investimentos básicos, controle de gastos e planejamento para o futuro financeiro, com foco em estratégias práticas para o dia a dia.",
    dateStart: "2025-07-28T18:30:00",
    dateEnd: "2025-07-28T20:00:00",
    location: "Online via Google Meet",
    category: "Palestra",
    isOnline: true,
    registrationLink: "https://example.com/register-financas",
    speakers: ["Paula Oliveira (Consultora Financeira)"],
    tags: ["Finanças", "Economia", "Planejamento"],
  },
  {
    id: "evt6",
    title: "Workshop de Fotografia Digital Básica",
    description:
      "Aprenda os fundamentos da fotografia com sua câmera digital ou smartphone.",
    longDescription:
      "Um workshop prático para iniciantes em fotografia, abordando conceitos como abertura, velocidade, ISO, composição e edição básica de imagens. Traga sua câmera ou smartphone!",
    dateStart: "2025-08-15T09:00:00",
    dateEnd: "2025-08-15T13:00:00",
    location: "Parque da Cidade, Área Verde",
    category: "Workshop",
    isOnline: false,
    registrationLink: "https://example.com/register-fotografia",
    tags: ["Fotografia", "Hobby", "Arte"],
  },
  {
    id: "evt7",
    title: "Encontro de Programadores Frontend",
    description:
      "Discussão sobre as novas tendências de desenvolvimento frontend.",
    longDescription:
      "Um encontro descontraído para programadores frontend trocarem ideias, apresentarem pequenos projetos e fazerem networking. Foco em React, Vue e Svelte.",
    dateStart: "2025-07-18T19:00:00",
    dateEnd: "2025-07-18T21:00:00",
    location: "Cafeteria Tech Hub",
    category: "Meetup",
    isOnline: false,
    registrationLink: "https://example.com/register-frontend-meetup",
    tags: ["Frontend", "JavaScript", "React"],
  },
];
