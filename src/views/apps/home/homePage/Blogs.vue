<script setup lang="ts">
import { getBlogs, getSiteInfo, getBody } from "@/stores/homeStore";
import type { Blog, Site, Body } from "@/types/home";

const blogs = ref<Blog[]>([]);
const site = ref<Site>();
const body = ref<Body>();

onMounted(async () => {
  site.value = await getSiteInfo();
  blogs.value = await getBlogs();
  body.value = await getBody();
});
</script>

<template>
  <div class="layout-width my-10" v-if="site && blogs && body">
    <VRow class="d-flex justify-center">
      <VCol cols="5">
        <h1 class="text-h1 text-center">{{ body.blog.title }}</h1>
        <p class="text-center">
          {{ body.blog.description }}
        </p>
      </VCol>
    </VRow>

    <VRow class="d-flex justify-center">
      <VCol cols="3">
        <template v-if="site.blogs[1]">
          <VImg :src="site.blogs[1].featuredImage"></VImg>
          <p class="text-center text-h4 mb-1">
            {{ site.blogs[1].postTitle }}
          </p>
          <p class="text-center text-sm">
            {{ site.blogs[1].postExcerpt }} [...]
          </p>
        </template>

        <template v-else>
          <div class="w-100 bg-secondary" style="height: 300px"></div>
          <p class="text-center text-h4 mb-1">Blog 2</p>
          <p class="text-center text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. [...]
          </p>
        </template>
      </VCol>

      <VCol cols="6">
        <template v-if="site.blogs[0]">
          <VImg :src="site.blogs[0].featuredImage"></VImg>
          <p class="text-center text-h4 mb-1">
            {{ site.blogs[0].postTitle }}
          </p>
          <p class="text-center text-sm">
            {{ site.blogs[0].postExcerpt }} [...]
          </p>
        </template>

        <template v-else>
          <div class="w-100 bg-secondary" style="height: 300px"></div>
          <p class="text-center text-h4 mb-1">Blog 1</p>
          <p class="text-center text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. [...]
          </p>
        </template>
      </VCol>

      <VCol cols="3">
        <template v-if="site.blogs[2]">
          <VImg :src="site.blogs[2].featuredImage"></VImg>
          <p class="text-center text-h4 mb-1">
            {{ site.blogs[2].postTitle }}
          </p>
          <p class="text-center text-sm">
            {{ site.blogs[2].postExcerpt }} [...]
          </p>
        </template>

        <template v-else>
          <div class="w-100 bg-secondary" style="height: 300px"></div>
          <p class="text-center text-h4 mb-1">Blog 3</p>
          <p class="text-center text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. [...]
          </p>
        </template>
      </VCol>
    </VRow>
  </div>
</template>
