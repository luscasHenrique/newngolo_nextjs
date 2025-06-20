// src/app/(public)/(home)/_components/headerMenu/menu.ts

import { MenuItem } from "@/model/Menu";
import {
  Home,
  Users,
  FileText,
  Calendar,
  BarChart,
  Settings,
  HelpCircle,
  LogOut,
  ChartAreaIcon,
  LockKeyhole,
  Linkedin,
  Facebook,
  Twitter,
  Dribbble,
} from "lucide-react";

// Menu principal
export const mainHeaderMenu: MenuItem[] = [
  {
    icon: ChartAreaIcon,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Users,
    label: "Audience",
  },
  {
    icon: FileText,
    label: "Posts",
    href: "/posts",
  },
  {
    icon: Calendar,
    label: "Schedules",
    href: "/schedules",
  },
  {
    icon: BarChart,
    label: "Income",
    submenu: [
      {
        label: "Income 1",
        href: "/income-1",
      },
      {
        label: "Income 2",
        href: "/income-2",
      },
    ],
  },
  {
    icon: LockKeyhole,
    label: "Login",
    href: "/signin",
  },
];

// Links do footer (parte inferior do menu mobile)
export const footerMenuLinks = [
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
    href: "/logout",
    color: "text-red-600 hover:bg-red-50",
  },
];

// Informações de contato
export const footerContact = {
  phone: "678 324 7259",
  email: "info@atosbjj-atl.com",
};

// Ícones sociais com links
export const footerSocial = [
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
