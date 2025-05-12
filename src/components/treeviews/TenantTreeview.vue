<script lang="ts" setup>
import { VTreeview } from "vuetify/labs/components";

import { useTenantStore } from "@/stores/tenantStore";
import type { Option, ValidateErrors } from "@/types/tenant";

const tenantStore = useTenantStore();

interface Props {
  id?: string;
  prependInnerIcon?: string;
  label?: string;
  errors?: ValidateErrors | null;
}
interface Emit {
  (e: "option", value: Option): void;
}
const params = defineProps<Props>();
const emit = defineEmits<Emit>();

const options = ref<Option[]>([]);
const getOptions = async () => {
  options.value = await tenantStore.getOptions();
};
const selectedOptions = ref<Option[]>([]);
const selectedName = ref<string>("");
const menu = ref<boolean>(false);

watch(
  () => selectedOptions.value,
  () => {
    if (selectedOptions.value && selectedOptions.value.length) {
      selectedName.value = selectedOptions.value?.[0]?.name ?? "";
    } else {
      selectedName.value = "";
    }
    emit("option", selectedOptions.value?.[0]);
  },
  { deep: true },
);

const findElementById = (data: Option[], targetId: string): Option[] => {
  for (const item of data) {
    if (item.id === targetId) {
      return [item];
    }
    if (item.childrens && item.childrens.length > 0) {
      const foundInChildren = findElementById(item.childrens, targetId);
      if (foundInChildren.length > 0) {
        return foundInChildren;
      }
    }
  }
  return [];
};

onMounted(async () => {
  await getOptions();
  if (params.id) {
    selectedOptions.value = findElementById(options.value, params.id);
    emit("option", selectedOptions.value[0]);
  }
});
</script>

<template>
  <VMenu v-model="menu">
    <template #activator="{ props }">
      <VTextField
        density="compact"
        v-bind="props"
        :label="params.label ?? 'Tenant'"
        readonly
        :prepend-inner-icon="params.prependInnerIcon ?? 'ri-account-box-line'"
        v-model="selectedName"
      >
      </VTextField>
    </template>

    <VCard max-height="600">
      <VList>
        <VListItem>
          <VTreeview
            v-model="selectedOptions"
            :items="options"
            item-value="id"
            item-title="name"
            item-children="childrens"
            return-object
            select-strategy="single-independent"
            selectable
            collapse-icon="ri-arrow-up-s-fill"
            expand-icon="ri-arrow-down-s-fill"
            open-all
            class="custom-radius"
          ></VTreeview>
        </VListItem>
      </VList>
    </VCard>
  </VMenu>
</template>
