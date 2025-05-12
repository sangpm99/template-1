<script lang="ts" setup>
import type { Tenant, TenantOption } from "@/types/tenant";
import { useTenantStore } from "@/stores/tenantStore";

interface Props {
  tenantOption?: TenantOption;
  tenant?: Tenant;
}
interface Emit {
  (e: "tenant", value: Tenant): void;
}
const props = defineProps<Props>();
const emit = defineEmits<Emit>();

const tenantStore = useTenantStore();
const tenants = ref<Tenant[]>([]);
const selectedTenant = ref<Tenant>();

const getTenants = async () => {
  const data = await tenantStore.getTenants();
  if (data && data.length) {
    tenants.value = data;
  }
};

const clearFilter = async () => {
  await getTenants();
};

const updateModelValue = (value: Tenant) => {
  selectedTenant.value = value;
  emit("tenant", value);
};

onMounted(async () => {
  await getTenants();
  if (props.tenantOption) {
    const tenantOption = props.tenantOption as TenantOption;
    const t = tenants.value.find((tenant) => tenant.id === tenantOption.id);
    if (t) {
      selectedTenant.value = t;
      emit("tenant", selectedTenant.value);
    }
  }
});
</script>

<template>
  <VAutocomplete
    label="Tenant"
    density="compact"
    clearable
    :items="tenants"
    item-title="name"
    item-value="id"
    return-object
    :loading="tenantStore.loading"
    v-model="selectedTenant"
    @update:model-value="updateModelValue"
    @click:clear="clearFilter"
    @keydown.enter="getTenants"
    :custom-filter="() => true"
  >
  </VAutocomplete>
</template>
