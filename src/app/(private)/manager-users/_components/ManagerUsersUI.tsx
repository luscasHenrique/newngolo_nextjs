"use client";
import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserForm } from "./UserForm";
import { UserTable } from "./UserTable";
import { Pagination } from "./Pagination";
import { notify } from "@/lib/notify";
import { Modal } from "../../../../components/ui/modal";
import { useManageUsers, User } from "../_hooks/useManageUsers";

export default function ManagerUsersUI() {
  const {
    users,
    isLoading,
    error,
    handleCreate,
    handleEdit,
    handleDelete,
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useManageUsers();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Notifica erro global ao usuário
  if (error) {
    notify.error(error);
  }

  const handleOpenCreate = () => {
    setEditingUser(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (user: User) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  const handleSubmit = async (data: any) => {
    if (editingUser) {
      await handleEdit(editingUser.id, data);
    } else {
      await handleCreate(data);
    }
    setModalOpen(false);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Gerenciamento de Usuários (Novo)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end mb-4">
            <Button onClick={handleOpenCreate}>Novo Usuário</Button>
          </div>

          {/* Exibe erro na UI além do toast, se desejar */}
          {error && (
            <div className="mb-4 text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded">
              {error}
            </div>
          )}

          <UserTable
            users={users}
            isLoading={isLoading}
            onEdit={handleOpenEdit}
            onDelete={handleDelete}
            search={search}
            setSearch={setSearch}
          />

          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </CardContent>
      </Card>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <UserForm
          user={editingUser}
          onSubmit={handleSubmit}
          onClose={() => setModalOpen(false)}
          isEditing={!!editingUser}
          loading={isLoading}
        />
      </Modal>
    </div>
  );
}
