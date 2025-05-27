<script setup lang="ts">
import type { Blog, Site } from "@/types/home";
import { getBlogs, getSiteInfo } from "@/stores/home";
import { formatSite } from "@/utils/formatters";

definePage({
  meta: {
    public: true,
  },
});
const route = useRoute();
const site = ref<Site>();
const blogs = ref<Blog[]>();
const blog = ref<Blog>();

onMounted(async () => {
  site.value = await getSiteInfo();
  blogs.value = await getBlogs();
  const params = route.params;
  if (params) {
    const { id } = params as { id: string };
    if (id) {
      blog.value = blogs.value.find((item) => item.id === id);
    }
  }

  if (site.value && blog.value) {
    blog.value.postExcerpt = formatSite(site.value, blog.value.postExcerpt);
    blog.value.postContent = formatSite(site.value, blog.value.postContent);
  }
});
</script>

<template>
  <section>
    <div v-if="blog" class="layout-width my-5">
      <VRow>
        <VCol cols="12" class="d-flex flex-column align-center">
          <p class="text-h3">{{ blog.postTitle }}</p>
          <VImg :src="blog.featuredImage" width="75%"></VImg>
        </VCol>

        <VCol cols="12">
          <div v-html="blog.postContent"></div>
        </VCol>
      </VRow>
    </div>
  </section>
</template>
