"use client";

import { useState } from "react";
import { useManageUsers } from "./useManageUsers";

import { CheckCircle, KeyRound, Loader2, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Role } from "@/types/model/User";

export default function ManageUsersUI() {
  const {
    users,
    newUser,
    setNewUser,
    handleCreate,
    handleDelete,
    handlePasswordReset,
    handleRoleChange,
    handleUpdateRole,
    isLoading,
  } = useManageUsers();

  const [passwordInputs, setPasswordInputs] = useState<Record<string, string>>(
    {}
  );

  const roles: { label: string; value: Role }[] = [
    { label: "Administrador", value: Role.ADMIN },
    { label: "Editor", value: Role.EDITOR },
    { label: "Visualizador", value: Role.VIEWER },
    { label: "Vendedor", value: Role.SELLER },
    { label: "Super Admin", value: Role.SUPERADMIN },
  ];

  const handlePasswordChange = (userId: string, value: string) => {
    setPasswordInputs((prev) => ({ ...prev, [userId]: value }));
  };

  const handlePasswordSave = (userId: string) => {
    const newPassword = passwordInputs[userId];
    if (!newPassword) return;
    handlePasswordReset(userId, newPassword);
    setPasswordInputs((prev) => ({ ...prev, [userId]: "" }));
  };

  return (
    <div className="p-4 space-y-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-primary">
        Gerenciar Usuários
      </h1>

      {/* Formulário criar usuário */}
      <Card>
        <CardHeader>
          <CardTitle>Criar Novo Usuário</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Input
              placeholder="Nome"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="flex-1 min-w-[150px]"
            />
            <Input
              placeholder="Email"
              type="email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="flex-1 min-w-[150px]"
            />
            <Input
              placeholder="Senha"
              type="password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              className="flex-1 min-w-[150px]"
            />
            <Select
              value={newUser.role}
              onValueChange={(value: Role) =>
                setNewUser({ ...newUser, role: value as Role })
              }
            >
              <SelectTrigger className="flex-1 min-w-[150px]">
                <SelectValue placeholder="Cargo" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={handleCreate}
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Criando...
                </>
              ) : (
                "Criar"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabela para desktop */}
      <div className="hidden md:block">
        <Card>
          <CardHeader>
            <CardTitle>Lista de Usuários</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table className="min-w-[900px]">
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Nova Senha</TableHead>
                  <TableHead>Criado em</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Select
                          value={user.role}
                          onValueChange={(value: Role) =>
                            handleRoleChange(user.id, value as Role)
                          }
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map((r) => (
                              <SelectItem key={r.value} value={r.value}>
                                {r.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                          onClick={() => handleUpdateRole(user.id)}
                          variant="outline"
                          size="icon"
                          title="Salvar alteração de cargo"
                        >
                          <CheckCircle size={18} />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="Nova senha"
                          type="password"
                          value={passwordInputs[user.id] || ""}
                          onChange={(e) =>
                            handlePasswordChange(user.id, e.target.value)
                          }
                          className="w-[140px]"
                        />
                        <Button
                          onClick={() => handlePasswordSave(user.id)}
                          variant="outline"
                          size="icon"
                          title="Salvar nova senha"
                          disabled={!passwordInputs[user.id]}
                        >
                          <KeyRound size={16} />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      {user.createdAt?.slice(0, 19).replace("T", " ")}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleDelete(user.id)}
                        variant="destructive"
                        size="icon"
                        title="Excluir"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Cards para mobile */}
      <div className="md:hidden space-y-4">
        {users.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <CardTitle className="text-base">
                Usuário: <strong>{user.name}</strong>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">ID: {user.id}</p>

              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Cargo:</label>
                <div className="flex items-center gap-2">
                  <Select
                    value={user.role}
                    onValueChange={(value: Role) =>
                      handleRoleChange(user.id, value as Role)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((r) => (
                        <SelectItem key={r.value} value={r.value}>
                          {r.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={() => handleUpdateRole(user.id)}
                    variant="outline"
                    size="icon"
                  >
                    <CheckCircle size={16} />
                  </Button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">
                  Nova Senha:
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    type="password"
                    placeholder="Nova senha"
                    value={passwordInputs[user.id] || ""}
                    onChange={(e) =>
                      handlePasswordChange(user.id, e.target.value)
                    }
                    className="flex-1"
                  />
                  <Button
                    onClick={() => handlePasswordSave(user.id)}
                    variant="outline"
                    size="icon"
                    disabled={!passwordInputs[user.id]}
                  >
                    <KeyRound size={16} />
                  </Button>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                Criado em:{" "}
                <span className="font-medium">
                  {user.createdAt?.slice(0, 19).replace("T", " ")}
                </span>
              </p>

              <Button
                onClick={() => handleDelete(user.id)}
                variant="destructive"
                className="w-full"
              >
                <Trash2 size={16} className="mr-2" />
                Excluir
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
