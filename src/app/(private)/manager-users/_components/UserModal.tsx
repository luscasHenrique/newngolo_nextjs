"use client";
import { ReactNode } from "react";

export function UserModal({
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
      <div className="bg-white rounded-lg p-6 shadow-lg min-w-[350px] relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-900 text-lg"
          onClick={onClose}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
