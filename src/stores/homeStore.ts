import { axiosDefault } from "@/plugins/axios";
import type {
  ChartData,
  DesignerStatistic,
  SellerStatistic,
  WarningData,
  SearchQueryPaginated,
  SearchQuery,
  SearchQueryStore,
  StoreStatistic,
  DesignRejected,
  Report,
} from "@/types/home";
import type { PagedResponse } from "@/types";
import { removeEmptyField } from "@/utils/formatters";

export const useHomeStore = defineStore("home-store", () => {
  const loading: Ref<boolean> = ref(false);

  const getWarnings = async (): Promise<WarningData[]> => {
    loading.value = true;
    try {
      const { data } =
        await axiosDefault.get<WarningData[]>("/Home/GetWarnings");
      return data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  const getReports = async (searchQuery: SearchQuery): Promise<Report> => {
    loading.value = true;
    const params = removeEmptyField(searchQuery);
    try {
      const { data } = await axiosDefault.get<Report>(`/Home/GetReports`, {
        params: params,
      });
      return data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  const getProfitChart = async (
    searchQuery: SearchQuery,
  ): Promise<ChartData[]> => {
    loading.value = true;
    const params = removeEmptyField(searchQuery);
    try {
      const res = await axiosDefault.get<ChartData[]>("/Home/GetProfitChart", {
        params: params,
      });
      return res.data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  const getStoreStatistic = async (
    searchQuery: SearchQueryStore,
  ): Promise<PagedResponse<StoreStatistic, string>> => {
    loading.value = true;
    const params = removeEmptyField(searchQuery);
    try {
      const { data } = await axiosDefault.get<
        PagedResponse<StoreStatistic, string>
      >("/Home/GetStoreStatistic", { params: params });
      return data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  const getSellerStatistic = async (
    searchQuery: SearchQueryPaginated,
  ): Promise<PagedResponse<SellerStatistic, string>> => {
    loading.value = true;
    const params = removeEmptyField(searchQuery);
    try {
      const { data } = await axiosDefault.get<
        PagedResponse<SellerStatistic, string>
      >("/Home/GetSellerStatistic", { params: params });
      return data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  const getDesignerStatistic = async (
    searchQuery: SearchQueryPaginated,
  ): Promise<PagedResponse<DesignerStatistic, string>> => {
    loading.value = true;
    const params = removeEmptyField(searchQuery);
    try {
      const { data } = await axiosDefault.get<
        PagedResponse<DesignerStatistic, string>
      >("/Home/GetDesignerStatistic", { params: params });
      return data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  //Home/GetDesignRejected/{userId}
  const getDesignRejected = async (
    userId: string,
    searchQuery: SearchQueryPaginated,
  ): Promise<PagedResponse<DesignRejected, string>> => {
    loading.value = true;
    const params = removeEmptyField(searchQuery);
    try {
      const { data } = await axiosDefault.get<
        PagedResponse<DesignRejected, string>
      >(`/Home/GetDesignRejected/${userId}`, { params: params });
      return data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    getWarnings,
    getReports,
    getProfitChart,
    getStoreStatistic,
    getSellerStatistic,
    getDesignerStatistic,
    getDesignRejected,
  };
});
