<script setup lang="ts">
import ShopSideBar from "@/views/apps/shop/ShopSideBar.vue";
import ShopContent from "@/views/apps/shop/ShopContent.vue";

definePage({
  meta: {
    public: true,
  },
});
</script>

<template>
  <section>
    <div class="layout-width mt-5 mb-10">
      <VRow>
        <VCol cols="3">
          <ShopSideBar></ShopSideBar>
        </VCol>

        <VCol cols="9">
          <ShopContent></ShopContent>
        </VCol>
      </VRow>
    </div>
  </section>
</template>
