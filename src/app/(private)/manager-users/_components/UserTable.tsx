"use client";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/SearchInput";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";

export function UserTable({
  users,
  isLoading,
  onEdit,
  onDelete,
  search,
  setSearch,
}: any) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <SearchInput value={search} onChange={setSearch} />
      </div>
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Cargo</TableHead>
            <TableHead>Criado em</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6}>
                <div className="flex justify-center">
                  <Loader2 className="animate-spin" />
                </div>
              </TableCell>
            </TableRow>
          ) : users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6}>Nenhum usuário encontrado.</TableCell>
            </TableRow>
          ) : (
            users.map((user: any) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Button onClick={() => onEdit(user)} size="sm">
                    Editar
                  </Button>
                  <Button
                    onClick={() => onDelete(user.id)}
                    size="sm"
                    variant="destructive"
                    className="ml-2"
                  >
                    Deletar
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
