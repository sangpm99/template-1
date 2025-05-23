<script setup lang="ts">
import type { Product } from "@/types/home";
import { getProducts } from "@/stores/homeStore";

const router = useRouter();
const products = ref<Product[]>();

const onNavigateProductDetail = (id: string) => {
  router.push({ name: "product-id", params: { id: id } });
};

onMounted(async () => {
  products.value = await getProducts();
});
</script>

<template>
  <VRow>
    <VCol cols="3" v-for="product in products">
      <VCard
        class="h-100 cursor-pointer"
        @click="onNavigateProductDetail(product.id)"
      >
        <VCardText>
          <div
            :class="
              product.mainMockupURL ? 'w-100 bg-white' : 'w-100 bg-secondary'
            "
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
</template>
