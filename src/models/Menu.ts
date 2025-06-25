// src/types/model/Menu.ts
import { LucideIcon } from "lucide-react"; // Importe LucideIcon para tipar os ícones

export interface SubMenuItem {
  label: string;
  href?: string;
  icon?: LucideIcon; // Adicionado ícone, pode ser opcional.
  action?: string; // Para ações como "logout"
}

export interface MenuItem {
  icon?: LucideIcon; // Ícone, tornado opcional para itens sem ícone.
  label: string;
  href?: string;
  submenu?: SubMenuItem[];
  color?: string;
  action?: string; // Para ações diretas no item de menu principal (ex: logout)
}
