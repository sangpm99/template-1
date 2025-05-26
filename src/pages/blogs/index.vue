<script setup lang="ts">
import type { Site } from "@/types/home";
import { getSiteInfo } from "@/stores/homeStore";

definePage({
  meta: {
    public: true,
  },
});

const site = ref<Site>();
onMounted(async () => {
  site.value = await getSiteInfo();
});
</script>

<template>
  <section>
    <div v-if="site" class="layout-width mt-5 mb-10">
      <VRow>
        <VCol cols="12">
          <p class="text-center text-h2">Blogs And News</p>
        </VCol>

        <VCol cols="12" md="4">
          <VCard>
            <VCardText>
              <VImg></VImg>
              <p></p>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </div>
  </section>
</template>
