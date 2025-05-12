<script lang="ts" setup>
interface Props {
  modelValue: number | null;
}
const props = defineProps<Props>();
interface Emit {
  (e: "update:modelValue", value: number | null): void;
}
const emit = defineEmits<Emit>();
const modelValue = ref<number | null>(props.modelValue);

const handleUpdateModelValue = (value: number | null) => {
  emit("update:modelValue", value);
};
</script>

<template>
  <VSelect
    density="compact"
    label="Approve"
    :items="[
      {
        title: 'Pending',
        value: 1,
      },
      {
        title: 'Approved',
        value: 2,
      },
      {
        title: 'Rejected',
        value: 3,
      },
    ]"
    item-title="title"
    item-value="value"
    clearable
    v-model="modelValue"
    @update:modelValue="handleUpdateModelValue"
  ></VSelect>
</template>
