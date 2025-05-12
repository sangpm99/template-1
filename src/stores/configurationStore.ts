import { axiosDefault } from "@/plugins/axios";
import { defineStore } from "pinia";
import type { EbaySite } from "@/types/configuration";

export const useConfigurationStore = defineStore("configuration-store", () => {
  const loading: Ref<boolean> = ref(false);

  const getDepartments = async (): Promise<string[]> => {
    loading.value = true;
    try {
      const { data } = await axiosDefault.get<string[]>(
        "/Configuration/GetDepartments",
      );
      return data || [];
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  const getCurrency = async (): Promise<string[]> => {
    loading.value = true;
    try {
      const { data } = await axiosDefault.get<string[]>(
        "/Configuration/GetCurrencies",
      );
      return data || [];
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  const getPlatform = async (): Promise<string[]> => {
    loading.value = true;
    try {
      const { data } = await axiosDefault.get<string[]>(
        "/Configuration/GetPlatforms",
      );

      return data || [];
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  const getStoreStatuses = async (): Promise<string[]> => {
    loading.value = true;
    try {
      const { data } = await axiosDefault.get<string[]>(
        "/Configuration/GetStoreStatuses",
      );

      return data || [];
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  const getMockupColorVariants = async (): Promise<string> => {
    loading.value = true;
    try {
      const { data } = await axiosDefault.get<string>(
        `/Configuration/GetMockupColorVariants`,
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  const getProductSubTitles = async (): Promise<string> => {
    loading.value = true;
    try {
      const { data } = await axiosDefault.get<string>(
        `/Configuration/GetProductSubTitles`,
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  const getOrderWarningTypes = async (): Promise<string[]> => {
    loading.value = true;
    try {
      const { data } = await axiosDefault.get<string[]>(
        `/Configuration/GetOrderWarningTypes`,
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  const getTaskStatues = async (): Promise<string[]> => {
    loading.value = true;
    try {
      const { data } = await axiosDefault.get<string[]>(
        `/Configuration/GetTaskStatuses`,
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  const getMpItemSpec = async (): Promise<string[]> => {
    loading.value = true;
    try {
      const { data } = await axiosDefault.get<string[]>(
        `/Configuration/GetTaskStatuses`,
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  const generatePassword = async (): Promise<string> => {
    loading.value = true;
    const params = {
      requiredLength: 12,
      requiredUniqueChars: 5,
      requireNonAlphanumeric: true,
      requireLowercase: true,
      requireUppercase: true,
      requireDigit: true,
    };
    try {
      const { data } = await axiosDefault.get<string>(
        `/Configuration/GeneratePassword`,
        { params: params },
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  const getIntegratedAccounts = async (): Promise<string[]> => {
    loading.value = true;
    try {
      const { data } = await axiosDefault.get<string[]>(
        `/Configuration/GetIntegratedAccounts`,
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  const getEbaySites = async (): Promise<EbaySite[]> => {
    loading.value = true;
    try {
      const { data } = await axiosDefault.get<EbaySite[]>(
        `/Configuration/GetEbaySites`,
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    getDepartments,
    getCurrency,
    getPlatform,
    getStoreStatuses,
    getMockupColorVariants,
    getProductSubTitles,
    getOrderWarningTypes,
    generatePassword,
    getIntegratedAccounts,
    getEbaySites,
  };
});
