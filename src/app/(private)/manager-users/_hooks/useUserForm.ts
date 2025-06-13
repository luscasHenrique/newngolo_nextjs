"use client";
import { useState, useEffect } from "react";
import { userSchema } from "./useManageUsers";

// Mesma lista de roles para validação
const roles = [
  { label: "Administrador", value: "ADMIN" },
  { label: "Editor", value: "EDITOR" },
  { label: "Visualizador", value: "VIEWER" },
  { label: "Vendedor", value: "SELLER" },
  { label: "Super Admin", value: "SUPERADMIN" },
];
const allowedRoles = roles.map((r) => r.value);

export function useUserForm({ user, onSubmit, isEditing }: any) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "VIEWER",
  });
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Aguarda role válida (uppercase para garantir)
    let role = user?.role?.toUpperCase() || "VIEWER";
    if (!allowedRoles.includes(role)) role = "VIEWER";
    setForm({
      name: user?.name || "",
      email: user?.email || "",
      password: "",
      role,
    });
    setErrors({});
  }, [user, isEditing]);

  const handleChange = (k: string, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e: any) => ({ ...e, [k]: undefined }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing) {
        userSchema.pick({ name: true, email: true, role: true }).parse(form);
        await onSubmit(form);
      } else {
        userSchema.parse(form);
        await onSubmit(form);
      }
    } catch (err: any) {
      if (err.errors) {
        const zodErrors: any = {};
        err.errors.forEach((e: any) => {
          zodErrors[e.path[0]] = e.message;
        });
        setErrors(zodErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  return { form, errors, handleChange, handleSubmit, loading };
}
