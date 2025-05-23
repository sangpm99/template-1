<script setup lang="ts">
import type { Product } from "@/types/home";
import { getProducts } from "@/stores/homeStore";
import { register } from "swiper/element/bundle";

definePage({
  meta: {
    public: true,
  },
});

const route = useRoute();
const product = ref<Product>();
const products = ref<Product[]>();

onMounted(async () => {
  const params = route.params;
  const { id } = params as { id: string };
  if (id) {
    products.value = await getProducts();
    product.value = products.value.find((p) => p.id == id);
  }
});

register();
</script>

<template>
  <section>
    <div class="layout-width mt-5 mb-10" v-if="product">
      <VRow>
        <VCol cols="6">
          <VRow>
            <VCol cols="12">
              <swiper-container
                class="mySwiper"
                thumbs-swiper=".mySwiper2"
                loop="true"
                space-between="10"
                navigation="true"
                centered-slides="true"
                events-prefix="swiper-"
              >
                <swiper-slide
                  v-for="swiperImg in product.mockupURLs"
                  :key="swiperImg"
                >
                  <VImg :src="swiperImg" cover />
                </swiper-slide>
              </swiper-container>

              <swiper-container
                class="mySwiper2"
                loop="true"
                free-mode="true"
                events-prefix="swiper-"
                slides-per-view="4"
              >
                <swiper-slide
                  v-for="swiperImg in product.mockupURLs"
                  :key="swiperImg"
                >
                  <VImg :src="swiperImg" cover />
                </swiper-slide>
              </swiper-container>
            </VCol>
          </VRow>
        </VCol>
        <VCol cols="6">
          <span class="text-h3">{{ product.productName }}</span>
          <br />
          <span class="text-error"><b>$99.99</b></span>
        </VCol>
      </VRow>
    </div>
  </section>
</template>

<style lang="scss" scoped>
swiper-container {
  background-color: #000;
}

.mySwiper2 {
  swiper-slide {
    border: 5px solid black;
    block-size: 100%;
    inline-size: 25%;
    opacity: 0.4;
  }

  .swiper-slide-thumb-active {
    opacity: 1;
  }
}
</style>
