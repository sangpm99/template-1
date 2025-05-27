import { axiosDefault } from "@/plugins/axios";
import type {
  ForgotPasswordParams,
  RecoverPasswordParams,
  SignInParams,
  TwoFactorParams,
  User,
} from "@/types/authorize";
import { removeEmptyField } from "@/utils/formatters";
import type { AxiosError } from "axios";
import axios from "axios";
import { defineStore } from "pinia";

const authorizationName: string = import.meta.env.VITE_AUTHORIZE_NAME;
const localStorageName: string = import.meta.env.VITE_LOCALSTORAGE_USER_NAME;

export const setLocalStorageUser = (value: User): void => {
  localStorage.setItem(localStorageName, JSON.stringify(value));
};

export const getLocalStorageUser = (): User | null => {
  const data: string = localStorage.getItem(localStorageName) ?? "";
  if (data.length !== 0) return JSON.parse(data);
  else return null;
};

export const getAuthorization = (): string | null => {
  const user = getLocalStorageUser();

  return (user?.token as string) || null;
};

export const removeLocalStorageUser = () => {
  return localStorage.removeItem(localStorageName);
};

export const removeAuthorization = () => {
  return (document.cookie = `${authorizationName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`);
};

export const useAuthorizeStore = defineStore("authorize", () => {
  const loading: Ref<boolean> = ref(false);
  // 👉 Log In
  const logIn = async (signInParams: SignInParams): Promise<void> => {
    loading.value = true;

    const params = removeEmptyField(signInParams);
    try {
      const res = await axiosDefault.post<User>("/Authorize/SignIn", params);
      res.data && setLocalStorageUser(res.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) return Promise.reject(err);
      else throw new Error("Unexpected Error");
    } finally {
      loading.value = false;
    }
  };

  // 👉 Two Factor
  const twoFactor = async (twoFactorParams: TwoFactorParams): Promise<void> => {
    loading.value = true;

    const params = removeEmptyField(twoFactorParams);
    try {
      const res = await axiosDefault.post<User>("/Authorize/TwoFactor", params);

      res.data && setLocalStorageUser(res.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) return Promise.reject(err);
      else throw new Error("Unexpected Error");
    } finally {
      loading.value = false;
    }
  };

  // 👉 Forgot Password
  const forgotPassword = async (
    forgotPasswordParams: ForgotPasswordParams
  ): Promise<void> => {
    loading.value = true;

    const params = removeEmptyField(forgotPasswordParams);
    try {
      await axiosDefault.post("/Authorize/ForgotPassword", params);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) return Promise.reject(err);
      else throw new Error("Unexpected Error");
    } finally {
      loading.value = false;
    }
  };

  // 👉 Recover Password - || - Change Password
  const recoverPassword = async (
    recoverPasswordParams: RecoverPasswordParams
  ): Promise<void> => {
    loading.value = true;
    const params = removeEmptyField(recoverPasswordParams);
    try {
      await axiosDefault.post("/Authorize/RecoverPassword", params);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) return Promise.reject(err);
      else throw new Error("Unexpected Error");
    } finally {
      loading.value = false;
    }
  };

  // 👉 Log Out
  const logOut = async (): Promise<void | AxiosError> => {
    loading.value = true;
    try {
      await axiosDefault.get("/Authorize/SignOut");
      removeLocalStorageUser();
      removeAuthorization();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) return Promise.reject(err);
      else throw new Error("Unexpected Error");
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    logIn,
    logOut,
    forgotPassword,
    recoverPassword,
    twoFactor,
  };
});
