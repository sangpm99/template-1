<script setup lang="ts">
import { colors, pageIndex, pageSize } from "@/enums";
import { capitalizeText, shortScale } from "@/utils/formatters";

import { useNotificationStore } from "@/stores/notificationStore";
import type { Notification, SearchQuery } from "@/types/notification";
import type { ExtraStatus, PagedResponse } from "@/types";

import NotifyNavigation from "@/views/apps/notifications/NotifyNavigation.vue";
import NotifyContent from "@/views/apps/notifications/NotifyContent.vue";

const notificationStore = useNotificationStore();

definePage({
  meta: {
    action: "Read",
    subject: "Permission.Public",
  },
});

const searchQuery = ref<SearchQuery>({
  status: "",
  pageIndex: pageIndex,
  pageSize: pageSize,
});
const pagedResponse = ref<PagedResponse<Notification, ExtraStatus>>();
const notifications = ref<Notification[]>([]);
const notificationStatuses = ref<string[]>([]);
const selectedNotification = ref<Notification>();
const remount = ref<number>(0);
const isLoadMore = ref<boolean>(false);

const getNotifications = async () => {
  if (searchQuery.value.status === "ALL") searchQuery.value.status = undefined;
  pagedResponse.value = await notificationStore.getNotifications(
    searchQuery.value,
  );
  if (
    pagedResponse.value &&
    pagedResponse.value.items &&
    pagedResponse.value.items.length
  ) {
    notifications.value = [...pagedResponse.value.items];
    isLoadMore.value = pagedResponse.value.items.length >= pageSize;
  } else {
    isLoadMore.value = false;
  }
  buildTabs();
};

const handleLoadMore = async (value: number) => {
  searchQuery.value.pageIndex = value;
  if (searchQuery.value.status === "ALL") searchQuery.value.status = undefined;
  const { items } = await notificationStore.getNotifications(searchQuery.value);
  if (
    !items ||
    !items.length ||
    !pagedResponse.value ||
    !pagedResponse.value.items
  )
    return;
  for (let i = 0; i < items.length; i++) {
    let equal = false;
    let index = -1;
    for (let j = 0; j < notifications.value.length; j++) {
      if (items[i].id === notifications.value[j].id) {
        equal = true;
        index = j;
        break;
      }
    }
    if (equal && index !== -1) {
      notifications.value[index] = items[i];
    } else {
      notifications.value.push(items[i]);
    }
  }
};

const buildTabs = () => {
  if (!notifications.value.length || !pagedResponse.value) return;
  const extraStatuses = pagedResponse.value.extra as ExtraStatus[];
  notificationStatuses.value = [];
  extraStatuses.forEach((item) => {
    if (item.status) {
      notificationStatuses.value.push(item.status);
    } else {
      notificationStatuses.value.push("ALL");
    }
  });
  remount.value++;
};

const getCounterByStatus = (status: string | null) => {
  if (!pagedResponse.value) return;
  const extraStatuses = pagedResponse.value.extra as ExtraStatus[];

  switch (true) {
    case status === "ALL": {
      let total = 0;
      extraStatuses.forEach((item) => {
        total += item.counter;
      });
      return shortScale(total);
    }
    default: {
      const foundIndex = extraStatuses.findIndex(
        (item) => item.status === status,
      );
      if (foundIndex !== -1) {
        return shortScale(extraStatuses[foundIndex].counter);
      }
    }
  }
};

const handleRead = async (value: Notification) => {
  selectedNotification.value = value;
  if (selectedNotification.value.status === null) {
    await notificationStore.updateNotification(
      selectedNotification.value.id,
      "READ",
    );
    await getNotifications();
    buildTabs();
  }
};

const handleUnread = async (ids: string[]) => {
  for (const id of ids) {
    for (const notification of notifications.value) {
      if (notification.id === id) {
        await notificationStore.updateNotification(notification.id);
        break;
      }
    }
  }
  selectedNotification.value = undefined;
  await getNotifications();
  buildTabs();
};

const handleDeleteNotification = async (ids: string[]) => {
  await notificationStore.deleteNotification(ids);
  notifications.value = notifications.value.filter((n) => !ids.includes(n.id));
};

onMounted(() => {
  getNotifications();
});
</script>

<template>
  <section>
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardText>
            <VTabs
              v-if="notificationStatuses.length"
              height="52"
              v-model="searchQuery.status"
              @update:model-value="getNotifications"
            >
              <VTab
                v-for="(st, index) in notificationStatuses"
                :value="st"
                :key="index"
                min-width="100"
              >
                <VBadge
                  :content="getCounterByStatus(st)"
                  floating
                  :color="colors[index]"
                >
                  {{ capitalizeText(st) }}
                </VBadge>
              </VTab>
            </VTabs>
          </VCardText>
        </VCard>
      </VCol>

      <VCol cols="12">
        <VRow>
          <VCol cols="4">
            <VCard min-height="1000px">
              <VCardText>
                <NotifyNavigation
                  :page-index="searchQuery.pageIndex"
                  @update:page-index="handleLoadMore"
                  :notifications="notifications"
                  :selected-notification="selectedNotification"
                  @click:notification="handleRead"
                  :is-load-more="isLoadMore"
                  @delete="handleDeleteNotification"
                  :key="remount"
                ></NotifyNavigation>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="8">
            <VCard class="h-100">
              <VCardText>
                <NotifyContent
                  :selected-notification="selectedNotification"
                  @delete="handleDeleteNotification"
                  @unread="handleUnread"
                ></NotifyContent>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VCol>
    </VRow>
  </section>
</template>
