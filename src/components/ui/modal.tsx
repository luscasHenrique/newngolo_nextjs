"use client";
import { ReactNode } from "react";
import { X } from "lucide-react"; // ou SVG

export function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl min-w-[350px] max-w-full w-full sm:w-[400px] relative">
        {/* Espaço reservado para o botão de fechar */}
        <div className="h-12">
          <button
            className="absolute top-2 right-4 p-2 rounded-full hover:bg-gray-100 transition-all flex items-center justify-center"
            onClick={onClose}
            aria-label="Fechar"
            type="button"
          >
            <X className="w-6 h-6 text-gray-500 hover:text-gray-800" />
          </button>
        </div>
        {/* Espaçamento interno (padding-top menor agora) */}
        <div className="px-6 pb-8 pt-2">{children}</div>
      </div>
    </div>
  );
}
