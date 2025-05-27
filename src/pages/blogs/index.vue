<script setup lang="ts">
import type { Blog } from "@/types/home";
import { getBlogs } from "@/stores/home";

definePage({
  meta: {
    public: true,
  },
});
const router = useRouter();
const blogs = ref<Blog[]>();

const onSelectBlog = (blog: Blog) => {
  router.push("/blog/" + blog.id);
};

onMounted(async () => {
  blogs.value = await getBlogs();
});
</script>

<template>
  <section>
    <div class="layout-width mt-5 mb-10">
      <VRow>
        <VCol cols="12">
          <p class="text-center text-h2 mb-2">Blogs And News</p>
        </VCol>

        <VCol cols="12" md="4" v-for="(blog, index) in blogs" :key="index">
          <VCard @click="onSelectBlog(blog)">
            <VCardText>
              <VImg :src="blog.featuredImage"></VImg>
              <p class="text-h5 mt-2">{{ blog.postTitle }}</p>
              <span
                >{{ blog.postExcerpt }}
                <span class="v-label">[read more]</span></span
              >
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </div>
  </section>
</template>
