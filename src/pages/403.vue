<script setup lang="ts">
import { useGenerateImageVariant } from "@/@core/composable/useGenerateImageVariant";
import pages403 from "@images/pages/403.png";

import miscMaskDark from "@images/misc/misc-mask-dark.png";
import miscMaskLight from "@images/misc/misc-mask-light.png";
import miscObj from "@images/pages/misc-404-object.png";
import {
  useAuthorizeStore,
  removeLocalStorageUser,
} from "@/stores/authorizeStore";

const authThemeMask = useGenerateImageVariant(miscMaskLight, miscMaskDark);

definePage({
  meta: {
    layout: "blank",
    public: true,
  },
});

const handleBackToHome = async () => {
  window.location.href = "/";
};

const authorizeStore = useAuthorizeStore();
const logOut = async () => {
  try {
    await authorizeStore.logOut();
  } catch (err) {
  } finally {
    removeLocalStorageUser();
    window.location.href = "/login";
  }
};
</script>

<template>
  <div class="misc-wrapper">
    <ErrorHeader
      status-code="403"
      title="You do not have permission to access this page ⚠️"
      description="Please contact the administrator to be granted access to this page."
      class="mb-10"
    />

    <!-- 👉 Image -->
    <div class="misc-avatar w-100 text-center">
      <VImg :src="pages403" alt="Coming Soon" height="400" class="my-sm-5" />

      <VBtn class="mt-10 me-4" @click="handleBackToHome"> Back to Home </VBtn>

      <VBtn color="error" class="mt-10" @click="logOut"> Log Out </VBtn>

      <VImg
        :src="authThemeMask"
        class="d-none d-md-block footer-coming-soon flip-in-rtl"
        cover
      />

      <VImg
        :src="miscObj"
        class="d-none d-md-block footer-coming-soon-obj"
        :max-width="177"
        height="160"
      />
    </div>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/misc.scss";
</style>
