// src/app/manager-users/useManageUsers.ts
"use client";

import { useState } from "react";
import { User, Role } from "@/types/model/User";
import { notify } from "@/lib/notify";

export function useManageUsers() {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Luna Admin",
      email: "lunasjc@lunaaba.com.br",
      emailVerified: true,
      image: null,
      phone: null,
      role: Role.ADMIN,
      is_active: true,
      bio: "Administrador geral do sistema",
      last_login: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]);

  const [newUser, setNewUser] = useState<{
    name: string;
    email: string;
    password: string;
    role: Role;
  }>({
    name: "",
    email: "",
    password: "",
    role: Role.VIEWER,
  });

  const handleCreate = async () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      notify.error("Preencha todos os campos obrigatórios!");
      return;
    }

    const emailAlreadyExists = users.some(
      (u) => u.email.toLowerCase() === newUser.email.toLowerCase()
    );
    if (emailAlreadyExists) {
      notify.error("Este e-mail já está em uso!");
      return;
    }

    setIsLoading(true);

    const user: User = {
      id: (Math.random() * 10000).toFixed(0), // ID simulada
      name: newUser.name,
      email: newUser.email,
      emailVerified: false,
      image: null,
      phone: null,
      role: newUser.role,
      is_active: true,
      bio: "",
      last_login: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setUsers((prev) => [...prev, user]);
    setNewUser({ name: "", email: "", password: "", role: Role.VIEWER });
    notify.success("Usuário criado com sucesso!");

    setIsLoading(false);
  };

  const handleDelete = (id: string) => {
    setUsers(users.filter((u) => u.id !== id));
    notify.success("Usuário excluído com sucesso!");
  };

  const handlePasswordReset = (id: string, newPassword: string) => {
    // Apenas simulação — não altera dados de verdade
    notify.success(`Senha redefinida para o usuário #${id}`);
  };

  const handleRoleChange = (id: string, role: Role) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
  };

  const handleUpdateRole = (id: string) => {
    const user = users.find((u) => u.id === id);
    if (!user) {
      notify.error("Usuário não encontrado");
      return;
    }
    notify.success(`Cargo atualizado: ${user.name} agora é ${user.role}`);
  };

  return {
    users,
    newUser,
    setNewUser,
    handleCreate,
    handleDelete,
    handlePasswordReset,
    handleRoleChange,
    handleUpdateRole,
    isLoading,
  };
}
