"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useUserForm } from "../_hooks/useUserForm";

const roles = [
  { label: "Administrador", value: "ADMIN" },
  { label: "Editor", value: "EDITOR" },
  { label: "Visualizador", value: "VIEWER" },
  { label: "Vendedor", value: "SELLER" },
  { label: "Super Admin", value: "SUPERADMIN" },
];

export function UserForm({
  user,
  onSubmit,
  onClose,
  isEditing,
  loading: loadingProp,
}: any) {
  const { form, errors, handleChange, handleSubmit, loading } = useUserForm({
    user,
    onSubmit,
    isEditing,
  });

  // Usa o loading local do hook + prop do pai (evita double submit)
  const isBusy = loading || loadingProp;

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Input
        value={form.name}
        onChange={(e) => handleChange("name", e.target.value)}
        placeholder="Nome"
        disabled={isBusy}
      />
      {errors.name && <div className="text-sm text-red-600">{errors.name}</div>}
      <Input
        value={form.email}
        onChange={(e) => handleChange("email", e.target.value)}
        placeholder="Email"
        disabled={isEditing || isBusy}
        type="email"
      />
      {errors.email && (
        <div className="text-sm text-red-600">{errors.email}</div>
      )}
      {/* Campo de senha ao criar usuário */}
      {!isEditing && (
        <>
          <Input
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
            placeholder="Senha"
            disabled={isBusy}
            type="password"
          />
          {errors.password && (
            <div className="text-sm text-red-600">{errors.password}</div>
          )}
        </>
      )}

      <Select
        key={form.role + (user?.id || "")} // força atualização ao trocar usuário
        value={form.role}
        onValueChange={(v) => handleChange("role", v)}
        disabled={isBusy}
      >
        <SelectTrigger>
          <SelectValue placeholder="Cargo">
            {roles.find((r) => r.value === form.role)?.label || "Selecione"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {roles.map((r) => (
            <SelectItem key={r.value} value={r.value}>
              {r.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors.role && <div className="text-sm text-red-600">{errors.role}</div>}
      <div className="flex justify-end gap-2 mt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onClose}
          disabled={isBusy}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isBusy}>
          {isEditing ? "Salvar" : "Criar"}
        </Button>
      </div>
    </form>
  );
}
