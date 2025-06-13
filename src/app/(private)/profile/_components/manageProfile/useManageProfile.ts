"use client";

import { Role, User } from "@/types/model/User";
import { useState } from "react";

export function useManageProfile(initialUser: Partial<User>) {
  const [user, setUser] = useState<Partial<User>>(initialUser);
  const [newName, setNewName] = useState(user.name || "");
  const [newPassword, setNewPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(user.image || "");
  const [isSaving, setIsSaving] = useState(false);

  const roles: { label: string; value: Role }[] = [
    { label: "Administrador", value: Role.ADMIN },
    { label: "Editor", value: Role.EDITOR },
    { label: "Visualizador", value: Role.VIEWER },
    { label: "Vendedor", value: Role.SELLER },
    { label: "Super Admin", value: Role.SUPERADMIN },
  ];

  function handleAvatarChange(file: File) {
    const url = URL.createObjectURL(file);
    setAvatarUrl(url);
  }

  async function handleSave() {
    setIsSaving(true);
    // Simular delay ou conectar com API real para salvar os dados
    await new Promise((r) => setTimeout(r, 1500));

    setUser((prev) => ({
      ...prev,
      name: newName,
      image: avatarUrl,
    }));
    setNewPassword("");
    setIsSaving(false);
  }

  return {
    user,
    newName,
    setNewName,
    newPassword,
    setNewPassword,
    avatarUrl,
    handleAvatarChange,
    isSaving,
    handleSave,
    roles,
  };
}
