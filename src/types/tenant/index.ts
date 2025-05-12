// for get user
export interface TenantOption {
  id: string;
  referenceId: string | null;
  name: string;
}

export interface Tenant {
  id: string;
  referenceId: string | null;
  name: string;
  path: string;
  parentId: string | null;
  createdOnUtc: string;
}

// for get option tenant
export interface Option {
  id: string;
  parentId: string | null;
  referenceId: string | null;
  name: string;
  childrens: Option[];
}

export interface TenantForm
  extends Omit<Tenant, "id" | "createdOnUtc" | "path"> {
  telegramId: string;
}

export interface ValidateErrors {
  ParentId: string[];
  ReferenceId: string[];
  FullName: string[];
  PhoneNumber: string[];
  Email: string[];
  Address: string[];
  LockedOut: string[];
}
