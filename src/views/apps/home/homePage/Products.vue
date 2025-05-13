<script setup lang="ts">
import { getBody, getProducts } from "@/stores/homeStore";
import type { Body, Product } from "@/types/home";

const body = ref<Body>();
const products = ref<Product[]>();
const currentTab = ref<number>(0);

onMounted(async () => {
  body.value = await getBody();
  products.value = await getProducts();
});
</script>

<template>
  <div class="my-10 bg-white" v-if="body">
    <VRow class="d-flex justify-center">
      <VCol cols="5">
        <h1 class="text-h1 text-center">{{ body.product.title }}</h1>
        <p class="text-center">{{ body.product.description }}</p>
      </VCol>
    </VRow>

    <VRow>
      <VCol cols="12">
        <VTabs v-model="currentTab" align-tabs="center">
          <VTab>T-Shirt</VTab>
          <VTab>Hoodie</VTab>
          <VTab>Sweater</VTab>
        </VTabs>

        <VWindow v-model="currentTab" class="mt-5 layout-width">
          <VWindowItem v-for="n in 3" :key="n">
            <div style="height: 2rem; width: 100%"></div>
            <VRow>
              <VCol
                cols="auto"
                style="width: 20%"
                v-for="product in products"
                :key="product.id"
              >
                <VCard class="h-100">
                  <VCardText>
                    <div
                      :class="
                        product.mainMockupURL
                          ? 'w-100 bg-white'
                          : 'w-100 bg-secondary'
                      "
                      style="min-height: 200px"
                    >
                      <VImg :src="product.mainMockupURL"></VImg>
                    </div>
                    <p class="mt-3 mb-0 three-lines">
                      {{ product.productName }}
                    </p>
                    <p class="mb-0 text-error"><b>$99.99</b></p>
                  </VCardText>
                </VCard>
              </VCol>
            </VRow>
            <div style="height: 2rem; width: 100%"></div>
          </VWindowItem>
        </VWindow>
      </VCol>
    </VRow>
  </div>
</template>
