<script lang="ts" setup>
import navItems from "@/navigation/horizontal";
import { themeConfig } from "@themeConfig";

// Components
import Footer from "@/layouts/components/Footer.vue";
import NavbarThemeSwitcher from "@/layouts/components/NavbarThemeSwitcher.vue";
import UserProfile from "@/layouts/components/UserProfile.vue";
import NavBarI18n from "@core/components/I18n.vue";
import { HorizontalNavLayout } from "@layouts";
import { VNodeRenderer } from "@layouts/components/VNodeRenderer";

const topbar = ref<string>("Open your own merch shop today. Always Free.");

const onNavigationToCart = () => {
  window.location.href = "/cart";
};
</script>

<template>
  <HorizontalNavLayout :nav-items="navItems" :topbar="topbar">
    <!-- 👉 navbar -->
    <template #navbar>
      <RouterLink to="/" class="app-logo">
        <VNodeRenderer :nodes="themeConfig.app.logo" />

        <!--        <h1 class="app-logo-title leading-normal">-->
        <!--          {{ themeConfig.app.title }}-->
        <!--        </h1>-->
      </RouterLink>
      <VSpacer />

      <NavBarI18n
        v-if="
          themeConfig.app.i18n.enable && themeConfig.app.i18n.langConfig?.length
        "
        :languages="themeConfig.app.i18n.langConfig"
      />

      <!--      <NavbarThemeSwitcher class="me-2" />-->

      <VBadge content="100" max="99" class="badge-custom-padding me-10">
        <VBtn
          icon="ri-shopping-bag-line"
          @click="onNavigationToCart"
          variant="outlined"
          class="rounded"
          size="small"
        ></VBtn>
      </VBadge>

      <UserProfile />
    </template>

    <!-- 👉 Pages -->
    <slot />

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>
  </HorizontalNavLayout>
</template>

<style lang="scss" scoped>
.app-logo {
  display: flex;
  align-items: center;
  column-gap: 0.5rem;

  .app-logo-title {
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.75rem;
    text-transform: capitalize;
  }
}
</style>
