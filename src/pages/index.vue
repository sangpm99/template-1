<script setup lang="ts">
import Banner from "@/views/apps/home/homePage/Banner.vue";
import AboutUs from "@/views/apps/home/homePage/AboutUs.vue";
import Products from "@/views/apps/home/homePage/Products.vue";
import Blogs from "@/views/apps/home/homePage/Blogs.vue";

definePage({
  meta: {
    public: true,
  },
});
</script>

<template>
  <section>
    <Banner></Banner>
    <AboutUs></AboutUs>
    <Products></Products>
    <Blogs></Blogs>
  </section>
</template>
