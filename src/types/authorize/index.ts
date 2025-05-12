// 👉 /Authorize/SignIn
export interface SignInParams {
  email: string;
  password: string;
  rememberMe: boolean;
  reCaptcha: string;
}

export interface User {
  id: string;
  fullName: string | null;
  avatar: string | null;
  department: string | null;
  address: string | null;
  userName: string;
  email: string;
  emailConfirmed: boolean;
  phoneNumber: string | null;
  phoneNumberConfirmed: boolean;
  tenantId: string;
  twoFactorEnabled: boolean;
  roles: string[];
  permissions: string[];
  token?: string | null;
  expiration?: string | null;
  metadata: string;
}

// 👉 Authorize/TwoFactor
export interface TwoFactorParams {
  email: string;
  token: string;
  twoFactorCode: string;
  rememberMe: boolean;
}

// 👉 Authorize/ForgotPassword
export interface ForgotPasswordParams {
  email: string;
  reCaptcha: string;
}

// 👉 Authorize/RecoverPassword
export interface RecoverPasswordParams {
  email: string;
  token: string;
  newPassword: string;
  confirmNewPassword: string;
  reCaptcha: string;
}

export interface UserOption {
  id: string;
  fullName: string;
  userName: string;
  email: string;
}

export interface ValidateErrors {
  Email: string[];
  Password: string[];
  OldPassword: string[];
  NewPassword: string[];
  ConfirmNewPassword: string[];
  RememberMe: string[];
  ReCaptcha: string[];
  Id: string[];
  FullName: string[];
  Avatar: string[];
  Department: string[];
  Address: string[];
  UserName: string[];
  EmailConfirmed: string[];
  PhoneNumber: string[];
  PhoneNumberConfirmed: string[];
  TenantId: string[];
  TwoFactorEnabled: string[];
  Roles: string[];
  Permissions: string[];
  Token: string[];
  Expiration: string[];
  Metadata: string[];
  RwoFactorCode: string[];
  TwoFactorCode: string[];
}
