"use client";
import { useEffect, useState, useCallback } from "react";
import { z } from "zod";
import { notify } from "@/lib/notify";

export const userSchema = z.object({
  name: z.string().min(2, "Nome obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha com pelo menos 6 dígitos").optional(),
  role: z.string().min(1, "Cargo obrigatório"),
});

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export function useManageUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Busca/pesquisa
  const [search, setSearch] = useState("");

  // Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Buscar usuários
  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    } catch {
      setError("Erro ao buscar usuários");
      notify.error("Erro ao buscar usuários");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Chama fetchUsers ao montar a página
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Criar usuário
  const handleCreate = async (form: any) => {
    setIsLoading(true);
    setError(null);
    try {
      userSchema.parse(form);
      const res = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Erro ao criar usuário");
      notify.success("Usuário criado com sucesso!");
      fetchUsers();
    } catch (err: any) {
      setError(err.message || "Erro ao criar usuário");
      notify.error(err.message || "Erro ao criar usuário");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Editar usuário
  const handleEdit = async (id: string, form: any) => {
    setIsLoading(true);
    setError(null);
    try {
      userSchema.pick({ name: true, email: true, role: true }).parse(form);
      const res = await fetch(`/api/users/${id}`, {
        method: "PATCH",
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Erro ao editar usuário");
      notify.success("Usuário editado com sucesso!");
      fetchUsers();
    } catch (err: any) {
      setError(err.message || "Erro ao editar usuário");
      notify.error(err.message || "Erro ao editar usuário");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Deletar usuário
  const handleDelete = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao deletar usuário");
      notify.success("Usuário deletado com sucesso!");
      fetchUsers();
    } catch {
      setError("Erro ao deletar usuário");
      notify.error("Erro ao deletar usuário");
    } finally {
      setIsLoading(false);
    }
  };

  // Busca e paginação
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase()) ||
      u.createdAt.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const pagedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return {
    users: pagedUsers,
    totalUsers: filteredUsers.length,
    isLoading,
    error,
    fetchUsers,
    handleCreate,
    handleEdit,
    handleDelete,
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    totalPages,
  };
}
