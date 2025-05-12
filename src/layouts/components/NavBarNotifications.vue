<template>
  <NotificationsDialog :notifications="notifications" @read="markRead" />
</template>

<script lang="ts" setup>
import NotificationsDialog from "@/layouts/components/NotificationsDialog.vue";
import { useNotificationStore } from "@/stores/notificationStore";
import type { Notification, SearchQuery } from "@/types/notification";
import { pageIndex, pageSize } from "@/enums";
import type { PagedResponse, ExtraStatus } from "@/types";
import { useCallHub } from "@/composables/useCallHub";

// 👉 Stores
const notificationStore = useNotificationStore();

// 👉 States
const searchQuery = ref<SearchQuery>({
  status: "",
  pageIndex: pageIndex,
  pageSize: pageSize,
});
const pagedResponse = ref<PagedResponse<Notification, ExtraStatus>>();
const notifications = ref<Notification[]>([]);
const { callHub } = useCallHub();

// 👉 Functions
const markRead = (notificationId: string[]) => {
  if (
    pagedResponse.value &&
    pagedResponse.value.items &&
    pagedResponse.value.items.length
  ) {
    pagedResponse.value.items.forEach((item) => {
      notificationId.forEach((id) => {
        if (id === item.id && item.status !== "READ") {
          notificationStore.updateNotification(id, "READ");
          item.status = "READ";
        }
      });
    });
  }
};

const getNotifications = async () => {
  pagedResponse.value = await notificationStore.getNotifications(
    searchQuery.value,
  );
  if (pagedResponse.value) {
    notifications.value = pagedResponse.value?.items ?? [];
  }
};

onMounted(async () => {
  await getNotifications();

  if (callHub.value && callHub.value.client) {
    callHub.value.client.on("notification", async (e: string) => {
      const obj = JSON.parse(e);
      const notification: Notification = {
        id: obj.id,
        platform: obj.platform,
        actor: obj.actor,
        notifier: obj.notifier,
        type: obj.type,
        action: obj.actor,
        entity: obj.entity,
        status: obj.status,
        reference: obj.reference,
        createdTimestamp: obj.created,
      };
      notifications.value.unshift(notification);
    });
  }
});
</script>
