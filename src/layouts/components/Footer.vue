<script lang="ts" setup>
import { getSiteInfo } from "@/stores/home";
import type { Site } from "@/types/home";

const site = ref<Site>();

onMounted(async () => {
  site.value = await getSiteInfo();
});
</script>

<template>
  <div v-if="site">
    <VRow class="d-flex flex-wrap justify-space-between bg-white layout-width">
      <VCol cols="auto">
        <p class="mb-0 text-h4">
          {{ site.footer[0].headline }}
        </p>
        <VDivider class="my-2"></VDivider>
        <VRow>
          <VCol cols="12">
            <ul style="list-style-type: none">
              <li
                v-for="content in site.footer[0].contents"
                class="py-2 d-flex align-center"
              >
                <VIcon
                  icon="ri-arrow-right-s-line"
                  size="small"
                  :style="`color: ${site.primaryColor}`"
                ></VIcon>
                <span v-html="content" class="text-base"></span>
              </li>
            </ul>
          </VCol>
        </VRow>
      </VCol>

      <VCol cols="auto">
        <p class="mb-0 text-h4">
          {{ site.footer[1].headline }}
        </p>
        <VDivider class="my-2"></VDivider>
        <VRow>
          <VCol cols="12">
            <ul style="list-style-type: none">
              <li
                v-for="content in site.footer[1].contents"
                class="py-2 d-flex align-center"
              >
                <VIcon
                  icon="ri-arrow-right-s-line"
                  size="small"
                  :style="`color: ${site.primaryColor}`"
                ></VIcon>
                <span v-html="content" class="text-base"></span>
              </li>
            </ul>
          </VCol>
        </VRow>
      </VCol>

      <VCol cols="auto">
        <p class="mb-0 text-h4">
          {{ site.footer[2].headline }}
        </p>
        <VDivider class="my-2"></VDivider>
        <VRow>
          <VCol cols="12">
            <ul style="list-style-type: none">
              <li
                v-for="content in site.footer[2].contents"
                class="py-2 d-flex align-center"
              >
                <VIcon
                  icon="ri-arrow-right-s-line"
                  size="small"
                  :style="`color: ${site.primaryColor}`"
                ></VIcon>
                <span v-html="content" class="text-base"></span>
              </li>
            </ul>
          </VCol>
        </VRow>
      </VCol>
    </VRow>

    <VRow class="ma-0 layout-width bg-secondary">
      <VCol cols="12" class="px-0">
        {{ site.absoluteFooter }}
      </VCol>
    </VRow>
  </div>
</template>
