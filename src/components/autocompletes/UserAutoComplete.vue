<template>
  <VAutocomplete
    label="Seller"
    density="compact"
    clearable
    :items="users"
    item-value="id"
    item-title="fullName"
    :model-value="user"
    @update:model-value="updateModelValue"
    return-object
    @update:search="params.searchValue = $event"
    @keydown.enter="loadUserOptions"
    @click:clear="clearFilter"
    :loading="loading"
    :custom-filter="() => true"
  >
    <template #item="{ props, item }">
      <VListItem @click="onSelected(item.raw)" v-bind="props" title="">
        <VListItemTitle>
          <span>{{ item.raw.fullName }}</span>
          <span v-if="item.raw.fullName && item.raw.department" class="mx-1"
            >-</span
          >
          <span class="text-warning">
            {{ item.raw.department }}
          </span>
        </VListItemTitle>

        <VListItemSubtitle>
          <span>{{ item.raw.email || "" }}</span>
        </VListItemSubtitle>
      </VListItem>
    </template>
  </VAutocomplete>
</template>
<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import type { UserOption, SearchQuery } from "@/types/accounts/users";
import { pageIndex, pageSizeOption } from "@/enums";

interface Props {
  modelValue?: UserOption;
  department?: string;
}
interface Emit {
  (e: "update:modelValue", value: UserOption | null): void;
  (e: "selected", value: UserOption | null): void;
  (e: "deSelected", value: void): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emit>();

const userStore = useUserStore();
const { getUserOptions } = userStore;
const loading = ref(false);
const params = ref<SearchQuery>({
  pageIndex,
  pageSize: pageSizeOption,
  searchValue: "",
  department: "",
});
const users = ref<UserOption[]>([]);
const user = ref<UserOption>();

const onSelected = (value: UserOption | null) => {
  if (props.modelValue?.id === value?.id) {
    nextTick(() => {
      emit("update:modelValue", null);
      user.value = undefined;
      emit("deSelected");
    });
  } else {
    emit("selected", value);
  }
};

const updateModelValue = (value: UserOption | null) => {
  emit("update:modelValue", value);
};

const clearFilter = async () => {
  params.value.searchValue = "";
  await loadUserOptions();
};

const loadUserOptions = async () => {
  loading.value = true;
  try {
    if (props.department) {
      params.value.department = props.department;
    }
    users.value = await getUserOptions(params.value);
  } catch (error) {
    ///
  } finally {
    loading.value = false;
  }
};

watch(
  () => props.modelValue,
  (value) => {
    user.value = value;
  },
);

onMounted(() => {
  loadUserOptions();
});
</script>
