<script setup lang="ts">
import type { Site } from "@/types/home";
import { getSiteInfo } from "@/stores/home";

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
          <p class="text-center text-h2">Contact</p>

          <p>
            If you need assistance or have any other questions, feel free to
            email us at
            <a :href="`mailto:${site.siteEmail}`">{{ site.siteEmail }}</a>
          </p>
        </VCol>
      </VRow>
    </div>
  </section>
</template>
