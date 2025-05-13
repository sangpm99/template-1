<script setup lang="ts">
import { getBody } from "@/stores/homeStore";
import type { Body } from "@/types/home";

const router = useRouter();

const onNavigateShop = () => {
  router.push({ name: "shop" });
};

const body = ref<Body>();

onMounted(async () => {
  body.value = await getBody();
});
</script>

<template>
  <div v-if="body">
    <VRow>
      <VCol cols="12">
        <VImg
          :src="body.banner"
          @click="onNavigateShop"
          class="cursor-pointer"
        ></VImg>
      </VCol>
    </VRow>
  </div>
</template>
