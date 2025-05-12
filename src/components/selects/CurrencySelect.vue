<template>
  <VSelect
    density="compact"
    clearable
    :items="currencies"
    :model-value="props.modelValue"
    :rules="[requiredValidator]"
    @update:modelValue="updateValue"

  ></VSelect>
</template>

<script lang="ts" setup>
import { useConfigurationStore } from "@/stores/configurationStore";
import { requiredValidator } from "@/@core/utils/validators";

const configStore = useConfigurationStore();
const { getCurrency } = configStore;
interface Props {
  modelValue?: string | null;
}

interface Emit {
  (e: "update:modelValue", value: string | null): void;
  (e: "click:clear", value: void): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emit>();
const currencies = ref<string[]>([]);

const updateValue = (value: string | null) => {
  emit("update:modelValue", value);
};

onMounted(async () => {
  currencies.value = await getCurrency();
});
</script>
