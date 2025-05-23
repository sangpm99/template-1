<script setup lang="ts">
import { requiredValidator } from "@/@core/utils/validators";

import type { Product } from "@/types/home";
import { getProducts } from "@/stores/homeStore";
import { register } from "swiper/element/bundle";

definePage({
  meta: {
    public: true,
  },
});

interface Option {
  name: string;
  disabled: boolean;
}

const route = useRoute();
const product = ref<Product>();
const products = ref<Product[]>();
const sizes: Option[] = [
  { name: "XS", disabled: true },
  { name: "S", disabled: false },
  { name: "M", disabled: false },
  { name: "L", disabled: false },
  { name: "XL", disabled: false },
  { name: "2XL", disabled: false },
  { name: "3XL", disabled: false },
  { name: "4XL", disabled: true },
  { name: "5XL", disabled: true },
  { name: "6XL", disabled: true },
];

const size = ref<string>("");

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
          <VRow>
            <VCol cols="12">
              <span class="text-h3">{{ product.productName }}</span>
              <br />
              <span class="text-error text-h4"><b>$99.99</b></span>
            </VCol>

            <VCol cols="12">
              <label>Size <span class="text-error">*</span></label>
              <VSelect
                :items="sizes"
                item-title="name"
                item-value="name"
                v-model="size"
                density="compact"
                :rules="[requiredValidator]"
              >
                <template v-slot:item="{ props, item }">
                  <VListItem
                    v-bind="props"
                    :title="item.raw.name"
                    :disabled="item.raw.disabled"
                  ></VListItem>
                </template>
              </VSelect>
            </VCol>

            <VCol cols="12">
              <div class="d-flex">
                <VBtn :disabled="!size">Add To Cart</VBtn>
              </div>
            </VCol>
          </VRow>
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
