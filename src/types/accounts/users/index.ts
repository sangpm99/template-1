import type { UpdatePatchParams } from "@/types";
import type { SearchQuery as Search } from "@/types";
import type { TenantOption } from "@/types/tenant";
import type { SiteDetail } from "@/types/site";

export interface Metadata {
  tenantOption?: TenantOption;
  timezone: number;
  language?: string;
  sites?: SiteDetail[];
  TelegramId?: string;
}

//User/GetOptions
export interface SearchQuery extends Search {
  department?: string;
}

export interface UserOption {
  userName: string;
  email: string;
  avatar: string;
  fullName: string;
  id: string;
  referenceId: string;
  department: string;
  address: string;
  phoneNumber: string;
  tenant: TenantOption;
}

export interface Users extends UserOption {
  lockedOut: boolean;
  twoFactorEnabled: boolean;
  roles: string[];
  createdAt: string;
  metadata: string;
}

export interface User extends Users {
  emailConfirmed: boolean;
  phoneNumberConfirmed: boolean;
  permissions: string[];
}

export interface CreateUserParams extends Omit<UserOption, "id" | "tenant"> {
  tenantId: string | null;
  password: string;
  confirmPassword: string;
  roles: string[];
  metadata: string;
}

export interface UpdateUserParams {
  id: string;
  payload: UpdatePatchParams[];
}

export interface UpdateUser {
  userName: string;
  email: string;
  avatar: string;
  fullName: string;
  referenceId: string | null;
  tenantId: string | null;
  tenantUpdated: boolean;
  phoneNumber: string | null;
  department: string | null;
  address: string | null;
  lockedOut: boolean;
  roles: string[];
  metadata: string;
}

export interface Activity {
  SignedInAt: string;
  ExpiresAt: string;
  IpAddress: string;
  Blocked: boolean;
  UserAgent: string;
  Fingerprint: string;
}

export interface ChangePasswordParams {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ChangeProfileParams {
  userName: string;
  email: string;
  phoneNumber: string | null;
  fullName: string | null;
  department: string | null;
  address: string | null;
  metadata: string; // new
}

// ⚠️ Errors
export interface ValidateErrorsUser {
  UserName: string[];
  Email: string[];
  Avatar: string[];
  FullName: string[];
  Password: string[];
  ConfirmPassword: string[];
  PhoneNumber: string[];
  Department: string[];
  Address: string[];
  Roles: string[];
  NewPassword: string[];
  ConfirmNewPassword: string[];
  OldPassword: string[];
  ReferenceId: string[];
}
