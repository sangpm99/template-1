<template>
  <VRow>
    <VCol cols="12">
      <VList class="py-0">
        <template
          v-if="params.notifications.length"
          v-for="(notification, index) in params.notifications"
          :key="notification.id"
        >
          <VDivider v-if="index > 0" />
          <VListItem
            link
            lines="one"
            min-height="66px"
            class="list-item-hover-class py-3 px-4"
            :class="
              params.selectedNotification &&
              params.selectedNotification.id === notification.id
                ? 'active'
                : ''
            "
            @click="$emit('click:notification', notification)"
          >
            <VRow>
              <VCol cols="12" class="d-flex align-start gap-3">
                <VAvatar
                  size="40"
                  :color="
                    notification.reference === 'HIGH'
                      ? 'error'
                      : notification.reference === 'MEDIUM'
                        ? 'warning'
                        : notification.reference === 'LOW'
                          ? 'success'
                          : 'primary'
                  "
                  variant="tonal"
                >
                  <VIcon
                    :icon="
                      notification.status
                        ? 'mdi-email-open-outline'
                        : 'mdi-email-outline'
                    "
                  />
                </VAvatar>

                <div>
                  <div
                    class="text-body-2 text-high-emphasis font-weight-medium mb-1"
                  >
                    {{ notification.entity }}
                  </div>
                  <p
                    class="text-caption mb-2 text-medium-emphasis"
                    style="letter-spacing: 1px !important; line-height: 18px"
                  >
                    {{ notification.type }} -
                    {{ notification.reference }}
                  </p>
                  <p
                    class="text-caption mb-0"
                    style="letter-spacing: 1px !important; line-height: 18px"
                  >
                    {{
                      useDateFormatter().fromUnix(notification.createdTimestamp)
                    }}
                  </p>
                </div>

                <VSpacer />

                <div class="d-flex flex-column h-100">
                  <VIcon
                    v-if="!notification.status"
                    color="success"
                    size="10"
                    icon="ri-circle-fill"
                    class="position-absolute"
                    style="right: 10px"
                  ></VIcon>

                  <VSpacer />

                  <VTooltip text="Delete">
                    <template v-slot:activator="{ props }">
                      <VIcon
                        v-bind="props"
                        class="visible-in-hover position-absolute"
                        style="
                          top: 50%;
                          transform: translateY(-50%);
                          right: 5px;
                        "
                        color="error"
                        icon="ri-delete-bin-7-line"
                        @click="emit('delete', [notification.id])"
                      ></VIcon>
                    </template>
                  </VTooltip>
                </div>
              </VCol>
            </VRow>
          </VListItem>
        </template>

        <VListItem
          class="text-center text-medium-emphasis"
          style="block-size: 56px"
          v-if="params.isLoadMore"
        >
          <VBtn variant="outlined" @click="onLoadMore">Load More</VBtn>
        </VListItem>

        <VListItem
          v-show="!params.notifications.length"
          class="text-center text-medium-emphasis"
          style="block-size: 56px"
        >
          <VListItemTitle>No Notification Found!</VListItemTitle>
        </VListItem>
      </VList>
    </VCol>
  </VRow>
</template>
<script setup lang="ts">
import { useDateFormatter } from "@/composables/useDateFormatter";
import type { Notification } from "@/types/notification";

// 👉 Props & Emits
interface Props {
  notifications: Notification[];
  selectedNotification?: Notification;
  pageIndex: number;
  isLoadMore: boolean;
}

interface Emit {
  (e: "delete", value: string[]): void;
  (e: "update:pageIndex", value: number): void;
  (e: "click:notification", value: Notification): void;
}

const params = defineProps<Props>();
const emit = defineEmits<Emit>();

// 👉 States
const onLoadMore = () => {
  const pageIndex = params.pageIndex + 1;
  emit("update:pageIndex", pageIndex);
};
</script>

<style lang="scss" scoped>
::v-deep(.active) {
  background: rgba(0, 0, 0, 0.1);
}
</style>
