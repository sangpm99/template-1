<script lang="ts" setup>
import { useConfigStore } from "@core/stores/config";
import { AppContentLayoutNav } from "@layouts/enums";
import { switchToVerticalNavOnLtOverlayNavBreakpoint } from "@layouts/utils";
import { errors } from "@/plugins/axios";
import type { ErrorResponse } from "@/types";
import Alert from "@/components/Alert.vue";

const isSnackbarVisible = ref<boolean>(false);
const message = ref<string>("");
const messageType = ref<string>("error");

const DefaultLayoutWithHorizontalNav = defineAsyncComponent(
  () => import("./components/DefaultLayoutWithHorizontalNav.vue"),
);
const DefaultLayoutWithVerticalNav = defineAsyncComponent(
  () => import("./components/DefaultLayoutWithVerticalNav.vue"),
);

const configStore = useConfigStore();

// ℹ️ This will switch to vertical nav when define breakpoint is reached when in horizontal nav layout
// Remove below composable usage if you are not using horizontal nav layout in your app
switchToVerticalNavOnLtOverlayNavBreakpoint();

const { layoutAttrs, injectSkinClasses } = useSkins();

injectSkinClasses();

// SECTION: Loading Indicator
const isFallbackStateActive = ref(false);
const refLoadingIndicator = ref<any>(null);

// watching if the fallback state is active and the refLoadingIndicator component is available
watch(
  [isFallbackStateActive, refLoadingIndicator],
  () => {
    if (isFallbackStateActive.value && refLoadingIndicator.value)
      refLoadingIndicator.value.fallbackHandle();

    if (!isFallbackStateActive.value && refLoadingIndicator.value)
      refLoadingIndicator.value.resolveHandle();
  },
  { immediate: true },
);
// !SECTION

watch(
  () => errors.value,
  (error) => {
    const { response } = error as ErrorResponse;
    const { data, status } = response;
    message.value = data.title || "Something went wrong.";
    if (status === 400) {
      if (data.errors) {
        Object.entries(data.errors).forEach(([key, value]) => {
          message.value = `${key}: ${value}`;
        });
      }
    }
    isSnackbarVisible.value = true;
    messageType.value = "error";
  },
);
</script>

<template>
  <div>
    <Component
      v-bind="layoutAttrs"
      :is="
        configStore.appContentLayoutNav === AppContentLayoutNav.Vertical
          ? DefaultLayoutWithVerticalNav
          : DefaultLayoutWithHorizontalNav
      "
    >
      <AppLoadingIndicator ref="refLoadingIndicator" />

      <RouterView v-slot="{ Component }">
        <Suspense
          :timeout="0"
          @fallback="isFallbackStateActive = true"
          @resolve="isFallbackStateActive = false"
        >
          <Component :is="Component" />
        </Suspense>
      </RouterView>
    </Component>

    <Alert
      v-model:is-visible="isSnackbarVisible"
      :message="message"
      :type="messageType"
    ></Alert>
  </div>
</template>

<style lang="scss">
// As we are using `layouts` plugin we need its styles to be imported
@use "@layouts/styles/default-layout";
</style>
