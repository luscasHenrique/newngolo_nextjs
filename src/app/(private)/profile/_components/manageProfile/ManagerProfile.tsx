"use client";

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
import { Role, User } from "@/types/model/User";
import { useManageProfile } from "./useManageProfile";
import { Edit } from "lucide-react"; // <-- Importa o ícone Edit

interface ManageProfilePageProps {
  initialUser: Partial<User>;
}

export function ManageProfile({ initialUser }: ManageProfilePageProps) {
  const {
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
  } = useManageProfile(initialUser);

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center text-primary">
        Meu Perfil
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Editar Informações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-6">
            {/* Avatar */}
            <div className="relative">
              <img
                src={avatarUrl || "/default-avatar.png"}
                alt="Avatar do usuário"
                className="w-24 h-24 rounded-full object-cover border border-gray-300"
              />
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-[#444444] text-white rounded-full p-1 cursor-pointer border border-white hover:bg-primary-dark"
                title="Alterar foto"
              >
                <Edit size={16} />
              </label>
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={(e) =>
                  e.target.files && handleAvatarChange(e.target.files[0])
                }
              />
            </div>

            {/* Nome */}
            <Input
              placeholder="Nome"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full max-w-md"
            />

            {/* Email (não editável) */}
            <Input
              placeholder="Email"
              value={user.email || ""}
              disabled
              className="w-full max-w-md bg-gray-100 cursor-not-allowed"
            />

            {/* Cargo (não editável) */}
            <Select value={user.role || Role.VIEWER} disabled>
              <SelectTrigger className="w-full max-w-md">
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

            {/* Nova senha */}
            <Input
              placeholder="Nova senha"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full max-w-md"
            />

            {/* Botão salvar */}
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full max-w-md"
            >
              {isSaving ? "Salvando..." : "Salvar alterações"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
