<script setup lang="ts">
import { getBody } from "@/stores/homeStore";
import type { Body } from "@/types/home";

const router = useRouter();
const body = ref<Body>();

const onNavigateShop = () => {
  router.push({ name: "shop" });
};

onMounted(async () => {
  body.value = await getBody();
});
</script>

<template>
  <div class="layout-width about-us" v-if="body">
    <VRow class="d-flex justify-center">
      <VCol cols="5" class="text-center">
        <p class="text-h1">{{ body.aboutUs.title }}</p>
        <p>
          {{ body.aboutUs.description }}
        </p>
      </VCol>
    </VRow>

    <VRow>
      <VCol cols="6">
        <p class="text-h4 text-end">{{ body.aboutUs.headline2 }}</p>
        <VImg :src="body.aboutUs.image1"></VImg>
      </VCol>

      <VCol cols="6">
        <p class="text-h1 text-center">{{ body.aboutUs.headline1 }}</p>
        <p class="text-center">
          {{ body.aboutUs.subtitle1 }}
        </p>
        <ul>
          <li>
            <VIcon icon="ri-arrow-left-s-line"></VIcon>
            <span class="text-h4 ms-2 cursor-pointer" @click="onNavigateShop">{{
              body.aboutUs.headline1
            }}</span>
          </li>
          <li>
            <VIcon icon="ri-arrow-left-s-line"></VIcon>
            <span class="text-h4 ms-2 cursor-pointer" @click="onNavigateShop">{{
              body.aboutUs.headline2
            }}</span>
          </li>
        </ul>
      </VCol>
    </VRow>

    <VRow>
      <VCol cols="6">
        <p class="text-h1 text-center">{{ body.aboutUs.headline2 }}</p>
        <p class="text-center">
          {{ body.aboutUs.subtitle2 }}
        </p>
        <ul>
          <li>
            <VIcon icon="ri-arrow-left-s-line"></VIcon>
            <span class="text-h4 ms-2 cursor-pointer" @click="onNavigateShop">{{
              body.aboutUs.headline2
            }}</span>
          </li>
          <li>
            <VIcon icon="ri-arrow-left-s-line"></VIcon>
            <span class="text-h4 ms-2 cursor-pointer" @click="onNavigateShop">{{
              body.aboutUs.headline1
            }}</span>
          </li>
        </ul>
      </VCol>

      <VCol cols="6">
        <p class="text-h4 text-end">{{ body.aboutUs.headline1 }}</p>
        <VImg :src="body.aboutUs.image2"></VImg>
      </VCol>
    </VRow>
  </div>
</template>

<style lang="scss" scoped>
.about-us {
  ul {
    list-style-type: none;

    li {
      display: flex;
      align-items: center;

      span {
        position: relative;

        &::after {
          content: "";
          position: absolute;
          left: 0;
          height: 2px;
          bottom: 0;
          right: 100%;
          background-color: var(--primary);
          transition: all 0.25s ease-in-out;
        }

        &:hover {
          &::after {
            right: 0;
          }
        }
      }
    }
  }
}
</style>
