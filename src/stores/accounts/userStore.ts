import { axiosDefault } from "@/plugins/axios";
import type { PagedResponse } from "@/types";
import type {
  Activity,
  ChangePasswordParams,
  ChangeProfileParams,
  CreateUserParams,
  UpdateUserParams,
  User,
  UserOption,
  Users,
  SearchQuery,
  UpdateUser,
} from "@/types/accounts/users";
import { removeEmptyField } from "@/utils/formatters";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user-store", () => {
  const loading: Ref<boolean> = ref(false);

  const getUsers = async (
    getUsersParams: SearchQuery,
  ): Promise<PagedResponse<Users>> => {
    loading.value = true;
    const params = removeEmptyField(getUsersParams);
    try {
      const { data } = await axiosDefault.get<PagedResponse<Users>>(
        "/User/GetUsers",
        { params: params },
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  const getUser = async (id: string): Promise<User> => {
    loading.value = true;
    try {
      const { data } = await axiosDefault.get<User>(`/User/GetUser?id=${id}`);
      return data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  const getUserOptions = async (
    searchQuery: SearchQuery,
  ): Promise<UserOption[]> => {
    const params = removeEmptyField(searchQuery);
    const { data } = await axiosDefault.get<PagedResponse<UserOption>>(
      `/User/GetOptions`,
      { params },
    );
    return data.items;
  };

  const getExternalToken = async (): Promise<string> => {
    loading.value = true;
    try {
      const { data } = await axiosDefault.get<string>("/User/GetExternalToken");
      return data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  const revokeAllExternalTokens = async (): Promise<void> => {
    loading.value = true;
    try {
      const { data } = await axiosDefault.get<void>(
        "/User/RevokeAllExternalTokens",
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  const createUser = async (
    createUserParams: CreateUserParams,
  ): Promise<void> => {
    loading.value = true;
    const params = removeEmptyField(createUserParams);
    try {
      await axiosDefault.post("/User/Create", params);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  const updateUserPatch = async (
    updateUserParams: UpdateUserParams,
  ): Promise<void> => {
    loading.value = true;
    try {
      await axiosDefault.patch(
        `/User/Update/${updateUserParams.id}`,
        updateUserParams.payload,
      );
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  const updateUser = async (id: string, params: UpdateUser): Promise<void> => {
    loading.value = true;
    try {
      await axiosDefault.put(`/User/Update/${id}`, params);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  const removeUser = async (id: string): Promise<void> => {
    loading.value = true;
    try {
      await axiosDefault.delete(`/User/Delete/${id}`);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  const getActivities = async (
    id: string,
    getActivityParams: SearchQuery,
  ): Promise<Activity[]> => {
    loading.value = true;
    const params = removeEmptyField(getActivityParams);
    try {
      const res = await axiosDefault.get<Activity[]>(
        `/User/GetActivity/${id}`,
        { params: params },
      );
      return res.data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  const revokeJWTToken = async (
    id: string,
    signedInAt: string,
  ): Promise<void> => {
    loading.value = true;
    try {
      await axiosDefault.put(`/User/RevokeJWTToken/${id}/${signedInAt}`);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  const revokeAllJWTTokens = async (id: string): Promise<void> => {
    loading.value = true;
    try {
      await axiosDefault.put(`/User/RevokeAllJWTTokens/${id}`);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  const getPermissions = async (): Promise<string[]> => {
    loading.value = true;
    try {
      const { data } = await axiosDefault.get<string[]>("/User/GetPermissions");

      return data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  const changePassword = async (
    changePasswordParams: ChangePasswordParams,
  ): Promise<void> => {
    try {
      loading.value = true;
      await axiosDefault.put("/User/ChangePassword", changePasswordParams);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  const changeProfile = async (
    changeProfileParams: ChangeProfileParams,
  ): Promise<void> => {
    loading.value = true;

    const params = removeEmptyField(changeProfileParams);
    try {
      await axiosDefault.put("/User/ChangeProfile", params);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  const getCodeChangeTwoFactor = async (): Promise<void> => {
    loading.value = true;
    try {
      await axiosDefault.get("/User/ChangeTwoFactor");
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  const changeTwoFactor = async (verifyCode: string): Promise<void> => {
    loading.value = true;
    try {
      await axiosDefault.put(`/User/ChangeTwoFactor/${verifyCode}`);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    getUsers,
    getUser,
    getUserOptions,
    getExternalToken,
    revokeAllExternalTokens,
    createUser,
    updateUserPatch,
    updateUser,
    removeUser,
    getActivities,
    revokeJWTToken,
    revokeAllJWTTokens,
    getPermissions,
    changePassword,
    changeProfile,
    getCodeChangeTwoFactor,
    changeTwoFactor,
  };
});
