<template>
  <VSelect
    width="200"
    label="Department"
    density="compact"
    clearable
    :items="departments"
    :loading="loading"
    v-model="department"
    @keydown.enter="getDepartments"
    :custom-filter="() => true"
  >
  </VSelect>
</template>

<script lang="ts" setup>
import { useConfigurationStore } from "@/stores/configuration";

// Props & Emits
interface Props {
  department?: string;
}
const props = defineProps<Props>();

// Stores
const configurationStore = useConfigurationStore();

// States
const departments = ref<string[]>([]);
const department = ref<string | undefined>(props.department);
const loading = ref<boolean>(false);

// Functions
const getDepartments = async () => {
  departments.value = await configurationStore.getDepartments();
};

onMounted(async () => {
  await getDepartments();
});
</script>
