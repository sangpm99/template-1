import { axiosDefault } from "@/plugins/axios";
import { removeEmptyField } from "@/utils/formatters";
import type { Tenant, CreateTenant, UpdateTenant } from "@/types/tenant";
import type { Option } from "@/types/tenant";

export const useTenantStore = defineStore("tenant-store", () => {
  const loading: Ref<boolean> = ref(false);

  const getTenants = async (): Promise<Tenant[]> => {
    try {
      const { data } = await axiosDefault.get<Tenant[]>(`/Tenant/GetTenants`);
      return data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  const getOptions = async (): Promise<Option[]> => {
    loading.value = true;
    try {
      const { data } = await axiosDefault.get<Option[]>(`/Tenant/GetOptions`);
      return data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  const createTenant = async (query: CreateTenant): Promise<void> => {
    loading.value = true;
    const params = removeEmptyField(query);
    try {
      await axiosDefault.post(`/Tenant/CreateTenant`, params);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  const updateTenant = async (
    tenantId: string,
    query: UpdateTenant,
  ): Promise<void> => {
    loading.value = true;
    const params = removeEmptyField(query);
    try {
      await axiosDefault.put(`/Tenant/UpdateTenant/${tenantId}`, params);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  const deleteTenant = async (tenantId: string): Promise<void> => {
    loading.value = true;
    try {
      await axiosDefault.delete(`/Tenant/DeleteTenant/${tenantId}`);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    getTenants,
    getOptions,
    createTenant,
    updateTenant,
    deleteTenant,
  };
});
