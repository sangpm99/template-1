<template>
  <VSelect
    label="Platform"
    density="compact"
    clearable
    :items="platforms"
    :model-value="props.modelValue"
    @update:modelValue="updateValue"
  ></VSelect>
</template>

<script lang="ts" setup>
import { useConfigurationStore } from "@/stores/configuration";
const configStore = useConfigurationStore();
const { getPlatform } = configStore;
interface Props {
  modelValue?: string | null;
}

interface Emit {
  (e: "update:modelValue", value: string | null): void;
  (e: "click:clear", value: void): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emit>();
const platforms = ref<string[]>([]);

const updateValue = (value: string | null) => {
  emit("update:modelValue", value);
};

onMounted(async () => {
  platforms.value = await getPlatform();
});
</script>
