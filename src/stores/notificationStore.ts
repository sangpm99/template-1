import { axiosDefault } from "@/plugins/axios";
import type { Notification, SearchQuery } from "@/types/notification";
import type { PagedResponse, ExtraStatus } from "@/types";
import { removeEmptyField } from "@/utils/formatters";

export const useNotificationStore = defineStore("notification-store", () => {
  const loading = ref<boolean>(false);

  // /Notification/GetNotifications
  const getNotifications = async (
    searchQuery: SearchQuery,
  ): Promise<PagedResponse<Notification, ExtraStatus>> => {
    loading.value = true;
    const params = removeEmptyField(searchQuery);
    try {
      const { data } = await axiosDefault.get<
        PagedResponse<Notification, ExtraStatus>
      >(`/Notification/GetNotifications`, { params: params });
      return data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  // /Notification/UpdateNotification/{notificationId}
  const updateNotification = async (
    notificationId: string,
    status?: string,
  ): Promise<void> => {
    loading.value = true;
    try {
      let url = `/Notification/UpdateNotification/${notificationId}`;
      if (status) url += `?status=${status}`;
      await axiosDefault.put(url);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  // /Notification/DeleteNotification
  const deleteNotification = async (
    notificationIds: string[],
  ): Promise<void> => {
    loading.value = true;
    try {
      await axiosDefault.delete(`/Notification/DeleteNotification`, {
        params: { notificationIds },
        paramsSerializer: { indexes: true },
      });
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    getNotifications,
    updateNotification,
    deleteNotification,
  };
});
