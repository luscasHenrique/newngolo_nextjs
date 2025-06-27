// src/app/(public)/(home)/_components/headerMenu/menu.ts
// Certifique-se que você tenha o caminho correto para o seu MenuItem.
// ex: import { MenuItem } from "@/types/model/Menu";
import { MenuItem } from "@/models/Menu";
import {
  Home,
  Users,
  FileText,
  Calendar,
  BarChart,
  Settings,
  HelpCircle,
  LogOut,
  // Certifique-se de que ChartAreaIcon e LockKeyhole estão sendo importados
  ChartAreaIcon,
  LockKeyhole,
  Linkedin,
  Facebook,
  Twitter,
  Dribbble, // Ícones sociais
  User as UserIcon,
  SettingsIcon,
  BookOpen,
  CalendarClock,
  Music,
  Newspaper,
  Handshake, // Renomeado User para evitar conflito com 'user' genérico
} from "lucide-react"; // Adicionado User para o ícone de perfil

// Menu principal
export const mainHeaderMenu: MenuItem[] = [
  {
    icon: Home,
    label: "Home",
    href: "/",
  },
  {
    icon: BookOpen,
    label: "História",
    href: "/history",
  },
  {
    icon: Handshake,
    label: "O Grupo",
    submenu: [
      {
        label: "Sistema de Graduação",
        href: "/graduation",
      },
      {
        label: "Professores",
        href: "/professors",
      },
    ],
  },
  {
    icon: CalendarClock,
    label: "Eventos",
    href: "/events",
  },
  {
    icon: Music,
    label: "Musicas",
    href: "/music",
  },
  {
    icon: Newspaper,
    label: "Artigos",
    href: "/articles",
  },
  {
    icon: LockKeyhole,
    label: "Login", // Este será substituído pelo "Perfil" se o usuário estiver logado.
    href: "/signin",
  },
];

export const profileMenu: MenuItem[] = [
  // Tipado como MenuItem[]
  { label: "Meu Perfil", href: "/account", icon: UserIcon }, // Exemplo: para página de conta
  { label: "Configurações", href: "/settings", icon: SettingsIcon },
  { label: "Sair", href: "#", icon: LogOut, action: "logout" }, // Ação de logout
];

// Links do footer (parte inferior do menu mobile)
// O nome `footerMenuLinks` é mais descritivo do que `footerMenu` se `footerMenu` já for usado para outra coisa.
export const footerMenuLinks: MenuItem[] = [
  // Tipado explicitamente
  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
    color: "text-gray-700 hover:bg-gray-100",
  },
  {
    icon: HelpCircle,
    label: "Help",
    href: "/help",
    color: "text-gray-700 hover:bg-gray-100",
  },
  {
    icon: LogOut,
    label: "Logout",
    href: "#", // Ou "/" para ir para a home, mas a ação vai lidar com o logout.
    color: "text-red-600 hover:bg-red-50",
    action: "logout", // Adicionado para identificar a ação de logout
  },
];

// Informações de contato
export const footerContact = {
  phone: "999 999 999 9999",
  email: "info@ngolo.com",
};

// Ícones sociais com links
interface SocialLink {
  // Interface para links sociais
  label: string;
  href: string;
  icon: React.ElementType; // Icon é um componente React
}
export const footerSocial: SocialLink[] = [
  // Tipado explicitamente
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: Linkedin,
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: Facebook,
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: Twitter,
  },
  {
    label: "Dribbble",
    href: "https://dribbble.com",
    icon: Dribbble,
  },
];
