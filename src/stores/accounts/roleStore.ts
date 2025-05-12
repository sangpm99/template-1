import { axiosDefault } from "@/plugins/axios";
import type { PagedResponse, SearchQuery } from "@/types";
import type {
  CreateRole,
  Role,
  RoleDetail,
  RoleName,
  SearchQueryGetRoles,
  UpdateRole,
} from "@/types/accounts/roles";
import { removeEmptyField } from "@/utils/formatters";
import { defineStore } from "pinia";

export const useRoleStore = defineStore("role-store", () => {
  const loading: Ref<boolean> = ref(false);

  const getRoles = async (
    searchQuery: SearchQueryGetRoles,
  ): Promise<PagedResponse<Role, string>> => {
    loading.value = true;
    const params = removeEmptyField(searchQuery);
    try {
      const { data } = await axiosDefault.get<PagedResponse<Role, string>>(
        "/Role/GetRoles",
        {
          params,
        },
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  const getRole = async (id: string): Promise<RoleDetail> => {
    loading.value = true;
    try {
      const { data } = await axiosDefault.get<RoleDetail>(
        `/Role/GetRole/${id}`,
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  const getRoleNames = async (
    searchQuery: SearchQuery,
  ): Promise<PagedResponse<RoleName, string>> => {
    loading.value = true;
    const params = removeEmptyField(searchQuery);
    try {
      const { data } = await axiosDefault.get<PagedResponse<RoleName, string>>(
        "/Role/GetNames",
        {
          params,
        },
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  const getPermissions = async (): Promise<string[]> => {
    loading.value = true;
    try {
      const { data } = await axiosDefault.get<string[]>("/Role/GetPermissions");
      return data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  const deleteRole = async (id: string): Promise<void> => {
    loading.value = true;
    try {
      await axiosDefault.delete(`/Role/Delete/${id}`);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  const createRole = async (params: CreateRole): Promise<void> => {
    loading.value = true;
    try {
      await axiosDefault.post("/Role/Create", params);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  const updateRole = async (id: string, params: UpdateRole): Promise<void> => {
    loading.value = true;
    try {
      await axiosDefault.put(`/Role/Update/${id}`, params);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    getRoleNames,
    getRoles,
    deleteRole,
    getRole,
    createRole,
    updateRole,
    getPermissions,
  };
});
