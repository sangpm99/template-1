<script setup lang="ts">
interface Props {
  quantity: number;
  min?: number;
  max?: number;
}
const props = defineProps<Props>();
interface Emit {
  (e: "update:quantity", value: number): void;
}
const emit = defineEmits<Emit>();

const quantity = ref<number>(props.quantity);

const handleCheck = () => {
  if (props.min && quantity.value < props.min) {
    quantity.value = props.min;
  }

  if (props.max && quantity.value > props.max) {
    quantity.value = props.max;
  }
};

const handleUpdate = (value: string | number) => {
  try {
    const q = Number(value);
    if (!Number.isNaN(q)) {
      if (props.min) {
      }
      quantity.value = q;
      handleCheck();
    }
    emit("update:quantity", quantity.value);
  } catch (error) {}
};

const onIncrease = () => {
  quantity.value++;
  handleUpdate(quantity.value);
};

const onDecrease = () => {
  quantity.value--;
  handleUpdate(quantity.value);
};
</script>

<template>
  <div class="quantity-counter">
    <VBtn icon="mdi-minus" @click="onDecrease" class="btn-minus"></VBtn>

    <VTextField
      v-model="quantity"
      @update:model-value="(value) => handleUpdate(value)"
      density="compact"
      rounded="0"
      width="50"
      type="number"
      hide-spin-buttons
      class="hide-input-details"
    ></VTextField>

    <VBtn icon="mdi-plus" @click="onIncrease" class="btn-plus"></VBtn>
  </div>
</template>

<style lang="scss" scoped>
.quantity-counter {
  display: flex;
  height: 45px;

  ::v-deep(input) {
    text-align: center !important;
    height: 45px;
  }

  ::v-deep(.btn-minus),
  ::v-deep(.btn-plus) {
    border-radius: 0;
    height: 100%;
  }
}
</style>
