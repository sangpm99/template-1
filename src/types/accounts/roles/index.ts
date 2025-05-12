import type { SearchQuery } from "@/types";

// 👉 Gerneral
export interface User {
  userName: string;
  email: string;
  avatar: string;
  fullName: string;
}

export interface Role {
  id: string;
  name: string;
  users: User[];
  usersCount: number;
}

// 👉 /Role/GetRoles
export interface SearchQueryGetRoles extends SearchQuery {
  limitUsersPerRole?: number | null;
}

// 👉 /Role/GetRole/{id}
export interface RoleDetail extends Role {
  permissions: string[];
}

// 👉 /Role/GetNames
export interface RoleName {
  id: string;
  name: string;
}

export interface CreateRole extends Omit<Role, "id" | "users" | "usersCount"> {
  permissions: string[];
}

export interface UpdateRole extends Omit<Role, "id" | "users" | "usersCount"> {
  permissions: string[];
}

export interface ValidateErrors {
  RoleName: string[];
  Permissions: string[];
}
