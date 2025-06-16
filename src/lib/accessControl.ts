// src/lib/accessControl.ts
import { Role } from "@/types/model/User";

type AccessControlMap = {
  [path: string]: Role[];
};

const ALL_ROLES: Role[] = Object.values(Role);

export const accessControlMap: AccessControlMap = {
  "/teste": [Role.EDITOR, Role.ADMIN, Role.SUPERADMIN],
  "/posts": [Role.SELLER, Role.ADMIN],
  "/schedules": [Role.VIEWER, Role.SELLER, Role.EDITOR, Role.ADMIN],
  "/register": [Role.ADMIN, Role.SUPERADMIN],
  "/manager-users": [Role.ADMIN, Role.SUPERADMIN],
  "/profile": [Role.ADMIN, Role.SUPERADMIN],
  "/dashboard": ALL_ROLES,
  "/account": ALL_ROLES,
};

export function canAccess(path: string, role?: Role): boolean {
  if (!role) return false;

  const matchedPath = Object.keys(accessControlMap)
    .filter((key) => path.startsWith(key))
    .sort((a, b) => b.length - a.length)[0];

  if (!matchedPath) return true;
  return accessControlMap[matchedPath].includes(role);
}
