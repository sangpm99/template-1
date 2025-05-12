import { axiosDefault } from "@/plugins/axios";
import type { GetAuditLogsParams, PaginatedAuditLogs } from "@/types/syslog";

export const useSyslogStore = defineStore("syslog-store", () => {
  const loading: Ref<boolean> = ref(false);

  const getAuditLogs = async (
    getAuditLogsParams: GetAuditLogsParams
  ): Promise<PaginatedAuditLogs> => {
    loading.value = true;
    const params = Object.fromEntries(
      Object.entries(getAuditLogsParams).filter(([, v]) => v)
    );
    try {
      const { data } = await axiosDefault.get<PaginatedAuditLogs>(
        "/Syslog/GetAuditLogs",
        {
          params: params,
        }
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  return {
    getAuditLogs,
    loading,
  };
});
