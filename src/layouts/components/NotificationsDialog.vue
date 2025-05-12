<template>
  <IconBtn id="notification-btn">
    <VBadge
      dot
      v-bind="props.badgeProps"
      :model-value="props.notifications.some((n) => !n.status)"
      color="error"
      bordered
      offset-x="1"
      offset-y="1"
      class="notification-badge"
    >
      <VIcon icon="ri-notification-2-line" />
    </VBadge>

    <VMenu
      activator="parent"
      width="380"
      :location="props.location"
      offset="15px"
      :close-on-content-click="false"
    >
      <VCard class="d-flex flex-column">
        <!-- 👉 Header -->
        <VCardItem class="notification-section">
          <h6 class="text-h6 text-truncate">Notifications</h6>
        </VCardItem>

        <VDivider />

        <!-- 👉 Notifications list -->
        <PerfectScrollbar
          :options="{ wheelPropagation: false }"
          style="max-block-size: 27rem"
        >
          <VList class="py-0">
            <template
              v-if="props.notifications"
              v-for="(notification, index) in props.notifications"
              :key="notification.id"
            >
              <VDivider v-if="index > 0" />
              <VListItem
                link
                lines="one"
                min-height="66px"
                class="list-item-hover-class py-3 px-4"
                @click="$emit('read', [notification.id])"
              >
                <!-- Slot: Prepend -->
                <!-- Handles Avatar: Image, Icon, Text -->
                <div class="d-flex align-start gap-3">
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
                      {{ notification.type }} - {{ notification.reference }}
                    </p>
                    <p
                      class="text-caption mb-0"
                      style="letter-spacing: 1px !important; line-height: 18px"
                    >
                      {{
                        useDateFormatter().fromUnix(
                          notification.createdTimestamp,
                        )
                      }}
                    </p>
                  </div>

                  <VSpacer />

                  <div class="d-flex flex-column align-end gap-2">
                    <VIcon
                      v-if="!notification.status"
                      color="success"
                      class="ms-1"
                      size="10"
                      icon="ri-circle-fill"
                      @click.stop="$emit('read', [notification.id])"
                    />
                  </div>
                </div>
              </VListItem>
            </template>

            <VListItem
              v-show="!props.notifications.length"
              class="text-center text-medium-emphasis"
              style="block-size: 56px"
            >
              <VListItemTitle>No Notification Found!</VListItemTitle>
            </VListItem>
          </VList>
        </PerfectScrollbar>

        <VDivider />

        <!-- 👉 Footer -->
        <VCardText v-show="props.notifications.length" class="pa-4">
          <VBtn block size="small" @click="onNavigateNotificationPage">
            View All Notifications
          </VBtn>
        </VCardText>
      </VCard>
    </VMenu>
  </IconBtn>
</template>

<script lang="ts" setup>
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import type { Notification } from "@/types/notification";
import { useDateFormatter } from "@/composables/useDateFormatter";

// 👉 Props & Emits
interface Props {
  badgeProps?: object;
  location?: any;
  notifications: Notification[];
}
interface Emit {
  (e: "read", value: string[]): void;
}
const props = withDefaults(defineProps<Props>(), {
  location: "bottom end",
  badgeProps: undefined,
});
defineEmits<Emit>();

// 👉 Functions
const onNavigateNotificationPage = () => {
  window.location.href = "/notifications";
};
</script>

<style lang="scss">
.notification-section {
  padding-block: 12px !important;
  padding-inline: 16px !important;
}

.list-item-hover-class {
  .visible-in-hover {
    display: none;
  }

  &:hover {
    .visible-in-hover {
      display: block;
    }
  }
}

.notification-badge {
  &.v-badge--bordered.v-badge--dot .v-badge__badge::after {
    color: rgb(var(--v-theme-background));
  }
}
</style>
