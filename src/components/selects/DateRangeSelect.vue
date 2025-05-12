<template>
  <VMenu v-model="menu" :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <VTextField
        :disabled="params.disabled"
        density="compact"
        v-bind="props"
        width="200"
        label="From - To"
        append-inner-icon="ri-calendar-check-fill"
        v-model="dateRange"
      ></VTextField>
    </template>

    <VList>
      <VListItem>
        <VRow>
          <VCol>
            <VList density="compact" class="pa-0">
              <VListItem class="px-0" v-for="option in options">
                <VBtn
                  block
                  variant="tonal"
                  @click="onSelectOption(option.value)"
                  >{{ option.title }}</VBtn
                >
              </VListItem>
            </VList>
          </VCol>

          <VCol class="py-5">
            <AppDateTimePicker
              v-model="dateRange"
              density="compact"
              label="From - To"
              append-inner-icon="ri-calendar-check-fill"
              placeholder="Select date"
              :config="{ mode: 'range', inline: true }"
            />
          </VCol>
        </VRow>
      </VListItem>
    </VList>
  </VMenu>
</template>

<script setup lang="ts">
import type { SelectOptions } from "@/types";

// 👉 Props & Emits
interface Props {
  from: number | null;
  to: number | null;
  disabled?: boolean;
}
interface Emit {
  (e: "update:from", value: number | null): void;
  (e: "update:to", value: number | null): void;
}
const params = defineProps<Props>();
const emit = defineEmits<Emit>();

// 👉 States
const menu = ref<boolean>(false);
const from: Ref<number | null> = ref(null);
const to: Ref<number | null> = ref(null);
const dateRange: Ref<string> = ref("");
const options: Ref<SelectOptions[]> = ref([
  { title: "Today", value: "today" },
  { title: "Yesterday", value: "yesterday" },
  { title: "This Week", value: "thisWeek" },
  { title: "Last Week", value: "lastWeek" },
  { title: "This Month", value: "thisMonth" },
  { title: "Last Month", value: "lastMonth" },
]);

// 👉 Functions
const handleUpdate = () => {
  emit("update:from", from.value);
  emit("update:to", to.value);
};

const transform = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

const onSelectOption = (option: string) => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);

  switch (option) {
    case "today": {
      date.setDate(date.getDate());
      dateRange.value = transform(date);
      break;
    }

    case "yesterday": {
      date.setDate(date.getDate() - 1);
      dateRange.value = transform(date);
      break;
    }

    case "thisWeek": {
      // Tính ngày đầu tuần (Thứ Hai)
      const dayOfWeek = date.getDay(); // 0 = Chủ Nhật, 1 = Thứ Hai, ..., 6 = Thứ Bảy
      const startDiff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
      const startDate = new Date(date);
      startDate.setDate(date.getDate() + startDiff);

      // Tính ngày cuối tuần (Chủ Nhật)
      const endDiff = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
      const endDate = new Date(date);
      endDate.setDate(date.getDate() + endDiff);

      dateRange.value = `${transform(startDate)} to ${transform(endDate)}`;
      break;
    }

    case "lastWeek": {
      // Lùi một tuần về trước
      const dayOfWeek = date.getDay();
      const startDiff = dayOfWeek === 0 ? -13 : -6 - dayOfWeek; // Lùi về Thứ Hai tuần trước
      const endDiff = dayOfWeek === 0 ? -7 : 0 - dayOfWeek; // Lùi về Chủ Nhật tuần trước

      const startDate = new Date(date);
      startDate.setDate(date.getDate() + startDiff);

      const endDate = new Date(date);
      endDate.setDate(date.getDate() + endDiff);

      dateRange.value = `${transform(startDate)} to ${transform(endDate)}`;
      break;
    }

    case "thisMonth": {
      // Ngày đầu tháng hiện tại
      const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
      // Ngày cuối tháng hiện tại
      const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      dateRange.value = `${transform(startDate)} to ${transform(endDate)}`;
      break;
    }

    case "lastMonth": {
      // Ngày đầu tháng trước
      const startDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
      // Ngày cuối tháng trước
      const endDate = new Date(date.getFullYear(), date.getMonth(), 0);

      dateRange.value = `${transform(startDate)} to ${transform(endDate)}`;
      break;
    }

    default: {
      break;
    }
  }
};

const handleReset = () => {
  from.value = null;
  to.value = null;
};

watch(
  () => dateRange.value,
  () => {
    if (!dateRange.value) {
      handleReset();
      handleUpdate();
      return;
    }

    const range = dateRange.value.split(" to ");

    if (range.length === 1) {
      const start = new Date(range[0]);
      start.setHours(0, 0, 0, 0);
      from.value = start.getTime();

      const end = new Date(range[0]);
      end.setHours(0, 0, 0, 0);
      to.value = end.getTime() + 86400000 - 1;
    } else if (range.length > 1) {
      const start = new Date(range[0]);
      start.setHours(0, 0, 0, 0);
      from.value = start.getTime();

      const end = new Date(range[range.length - 1]);
      end.setHours(0, 0, 0, 0);
      to.value = end.getTime() + 86400000 - 1;
    } else {
      handleReset();
    }
    handleUpdate();
  },
);

const onClear = () => {
  dateRange.value = "";
};

onMounted(() => {
  from.value = params.from;
  to.value = params.to;

  if (from.value !== null && to.value !== null) {
    dateRange.value = `${from.value} to ${to.value}`;
  }
});
</script>

<style scoped lang="scss">
::v-deep(.app-picker-field) {
  .v-input {
    display: none;
  }

  .flatpickr-calendar {
    box-shadow: none;
    border-width: 1px;
    border-style: solid;
  }

  .flatpickr-calendar.v-theme--light {
    border-color: var(--border-light);
  }

  .flatpickr-calendar.v-theme--dark {
    border-color: var(--border-dark);
  }
}
</style>
