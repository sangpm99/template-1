<script setup lang="ts">
const category = ref<number>();
const from = ref<string>();
const to = ref<string>();

const onReset = () => {
  category.value = undefined;
  from.value = undefined;
  to.value = undefined;
};
</script>

<template>
  <div>
    <VRow no-gutters>
      <VCol cols="12">
        <p class="text-h5 mb-0">Categories</p>
      </VCol>
    </VRow>

    <VRadioGroup v-model="category">
      <VRow no-gutters>
        <VCol cols="12">
          <VRadio value="1" label="T-Shirt"></VRadio>
        </VCol>

        <VCol cols="12">
          <VRadio value="2" label="Hoodie"></VRadio>
        </VCol>

        <VCol cols="12">
          <VRadio value="3" label="Sweater"></VRadio>
        </VCol>
      </VRow>
    </VRadioGroup>

    <VRow class="mt-2">
      <VCol cols="12" class="pb-0">
        <p class="text-h5 mb-0">Filter By Price</p>
      </VCol>

      <VCol cols="12">
        <VTextField
          density="compact"
          label="From"
          v-model="from"
          type="number"
          min="0"
        ></VTextField>
      </VCol>

      <VCol cols="12">
        <VTextField
          density="compact"
          label="To"
          v-model="to"
          type="number"
          min="0"
        ></VTextField>
      </VCol>

      <VCol cols="12">
        <div class="d-flex gap-4">
          <VBtn>Filter</VBtn>
          <VBtn color="error" variant="outlined" @click="onReset">Reset</VBtn>
        </div>
      </VCol>
    </VRow>
  </div>
</template>
