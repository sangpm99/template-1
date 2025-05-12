<template>
  <VRow v-if="props.selectedNotification">
    <VCol cols="12">
      <div class="d-flex justify-space-between align-center">
        <div class="d-flex align-center gap-y-4 gap-x-4">
          <span class="mb-0">
            {{
              useDateFormatter().fromUnix(
                props.selectedNotification.createdTimestamp,
              )
            }}
          </span>
          <VDivider vertical></VDivider>
          <VChip
            class="rounded"
            :color="
              props.selectedNotification.reference === 'HIGH'
                ? 'error'
                : props.selectedNotification.reference === 'MEDIUM'
                  ? 'warning'
                  : props.selectedNotification.reference === 'LOW'
                    ? 'success'
                    : 'primary'
            "
            >{{ props.selectedNotification.reference }}</VChip
          >
          <VDivider vertical></VDivider>
          <VChip
            class="rounded"
            :color="
              props.selectedNotification.action === 'DELETED'
                ? 'error'
                : props.selectedNotification.action === 'UPDATED'
                  ? 'warning'
                  : props.selectedNotification.action === 'CREATED'
                    ? 'success'
                    : 'primary'
            "
            >{{ props.selectedNotification.action }}</VChip
          >
        </div>

        <div class="d-flex gap-x-4 gap-y-4">
          <VTooltip text="Mark as unread">
            <template v-slot:activator="{ props }">
              <VBtn
                icon="mdi-email-open-outline"
                v-bind="props"
                class="rounded"
                color="info"
                @click="onUnreadNotification"
              ></VBtn>
            </template>
          </VTooltip>

          <VTooltip text="Delete">
            <template v-slot:activator="{ props }">
              <VBtn
                icon="ri-delete-bin-7-line"
                v-bind="props"
                class="rounded"
                color="error"
                @click="onDeleteNotification"
              ></VBtn>
            </template>
          </VTooltip>
        </div>
      </div>
    </VCol>

    <VDivider></VDivider>

    <VCol cols="12">
      <h3 class="text-h3">
        <span>{{ props.selectedNotification.type }}: </span>
        <span>{{ props.selectedNotification.entity }}</span>
        <span
          v-if="
            props.selectedNotification.entity &&
            props.selectedNotification.platform
          "
          class="mx-1"
          >-</span
        >
        <span class="text-warning">{{
          props.selectedNotification.platform
        }}</span>
      </h3>
    </VCol>
  </VRow>
</template>
<script setup lang="ts">
import { useDateFormatter } from "@/composables/useDateFormatter";
import type { Notification } from "@/types/notification";

// 👉 Props & Emits
interface Props {
  selectedNotification?: Notification;
}
interface Emit {
  (e: "delete", value: string[]): void;
  (e: "unread", value: string[]): void;
}
const props = defineProps<Props>();
const emit = defineEmits<Emit>();

const onDeleteNotification = () => {
  if (props.selectedNotification) {
    emit("delete", [props.selectedNotification.id]);
  }
};

const onUnreadNotification = () => {
  if (props.selectedNotification) {
    emit("unread", [props.selectedNotification.id]);
  }
};
</script>
