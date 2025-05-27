<script setup lang="ts">
import authV2LoginIllustrationBorderedDark from "@images/pages/auth-v2-login-illustration-bordered-dark.png";
import authV2LoginIllustrationBorderedLight from "@images/pages/auth-v2-login-illustration-bordered-light.png";
import authV2LoginIllustrationDark from "@images/pages/auth-v2-login-illustration-dark.png";
import authV2LoginIllustrationLight from "@images/pages/auth-v2-login-illustration-light.png";
import authV2LoginMaskDark from "@images/pages/auth-v2-login-mask-dark.png";
import authV2LoginMaskLight from "@images/pages/auth-v2-login-mask-light.png";
import { VNodeRenderer } from "@layouts/components/VNodeRenderer";
import { themeConfig } from "@themeConfig";
import { VForm } from "vuetify/components/VForm";
import { useGenerateImageVariant } from "@/@core/composable/useGenerateImageVariant";
import { requiredValidator, emailValidator } from "@/@core/utils/validators";

import { getLocalStorageUser, useAuthorizeStore } from "@/stores/authorize";
import type { ErrorResponse } from "@/types";
import type { SignInParams, ValidateErrors } from "@/types/authorize";

import TwoFactor from "@/views/apps/authorize/TwoFactor.vue";
import Alert from "@/components/Alert.vue";
import ReCaptcha from "@/components/ReCaptcha.vue";

// Config
definePage({
  meta: {
    layout: "blank",
    public: true,
  },
});

const authV2LoginMask = useGenerateImageVariant(
  authV2LoginMaskLight,
  authV2LoginMaskDark,
);

const authV2LoginIllustration = useGenerateImageVariant(
  authV2LoginIllustrationLight,
  authV2LoginIllustrationDark,
  authV2LoginIllustrationBorderedLight,
  authV2LoginIllustrationBorderedDark,
  true,
);

// Store
const authorizeStore = useAuthorizeStore();

// State
const isPasswordVisible: Ref<boolean> = ref(false);
const isTwoFactor: Ref<boolean> = ref(false);
const refFormLogin = ref<VForm>();
const errors = ref<ValidateErrors | null>(null);
const isSnackbarVisible = ref<boolean>(false);
const message = ref<string>("");
const messageType = ref<string>("error");
const signInParams: Ref<SignInParams> = ref({
  email: "",
  password: "",
  rememberMe: false,
  reCaptcha: "string",
});

// Function
const handleSubmit = () => {
  refFormLogin.value?.validate().then(async ({ valid }) => {
    if (valid) {
      // Recaptcha step required if it is production environment
      if (import.meta.env.VITE_APP_MODE) {
        signInParams.value.reCaptcha = "string";
      }

      try {
        await authorizeStore.logIn(signInParams.value);

        const user = getLocalStorageUser();
        if (user && user.twoFactorEnabled) {
          isTwoFactor.value = true;
        } else {
          window.location.href = "/";
        }
      } catch (error) {
        const { response } = error as ErrorResponse<ValidateErrors>;
        const { data, status } = response;
        errors.value = data.errors || null;
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
      }
    }
  });
};
</script>

<template>
  <a href="javascript:void(0)">
    <div class="app-logo auth-logo">
      <VNodeRenderer :nodes="themeConfig.app.logo" />
      <h1 class="app-logo-title">
        {{ themeConfig.app.title }}
      </h1>
    </div>
  </a>

  <VRow no-gutters class="auth-wrapper">
    <VCol
      md="8"
      class="d-none d-md-flex align-center justify-center position-relative"
    >
      <div class="d-flex align-center justify-center pa-10">
        <img
          :src="authV2LoginIllustration"
          class="auth-illustration w-100"
          alt="auth-illustration"
        />
      </div>
      <VImg
        :src="authV2LoginMask"
        class="d-none d-md-flex auth-footer-mask"
        alt="auth-mask"
      />
    </VCol>

    <VCol
      cols="12"
      md="4"
      class="auth-card-v2 d-flex align-center justify-center"
      :style="'background-color: rgb(var(--v-theme-surface))'"
    >
      <VCard flat :max-width="500" class="mt-12 mt-sm-0 pa-5 pa-lg-7 w-500">
        <VCardText>
          <h3 class="text-h3">Login</h3>
          <h5 class="text-h5 my-2">
            Welcome to
            <span class="text-capitalize">{{ themeConfig.app.title }}</span>
          </h5>
        </VCardText>

        <div v-if="!isTwoFactor">
          <VCardText>
            <VForm
              id="formLogin"
              ref="refFormLogin"
              @submit.prevent="handleSubmit"
            >
              <VRow>
                <!-- email -->
                <VCol cols="12">
                  <VTextField
                    v-model="signInParams.email"
                    label="Email"
                    type="email"
                    placeholder="johndoe@email.com"
                    :rules="[emailValidator]"
                    :error-messages="errors?.Email"
                  />
                </VCol>

                <!-- password -->
                <VCol cols="12">
                  <VTextField
                    v-model="signInParams.password"
                    label="Password"
                    placeholder="············"
                    :type="isPasswordVisible ? 'text' : 'password'"
                    :append-inner-icon="
                      isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'
                    "
                    :rules="[requiredValidator]"
                    @click:append-inner="isPasswordVisible = !isPasswordVisible"
                    :error-messages="errors?.Password"
                  />

                  <!-- remember me checkbox -->
                  <div
                    class="d-flex align-center justify-space-between flex-wrap my-6 gap-x-2"
                  >
                    <VCheckbox
                      v-model="signInParams.rememberMe"
                      label="Remember me"
                    />

                    <RouterLink class="text-primary" to="/forgot-password">
                      Forgot Password?
                    </RouterLink>
                  </div>

                  <div class="my-4">
                    <ReCaptcha
                      :re-captcha-receive="signInParams.reCaptcha"
                      @handle-error-callback="
                        (value) => (signInParams.reCaptcha = value)
                      "
                      @handle-expired-callback="
                        (value) => (signInParams.reCaptcha = value)
                      "
                      @handle-load-callback="
                        (value) => (signInParams.reCaptcha = value)
                      "
                      :error-messages="errors?.ReCaptcha"
                    />
                  </div>

                  <!-- login button -->
                  <VBtn
                    form="formLogin"
                    block
                    type="submit"
                    :loading="authorizeStore.loading"
                  >
                    Login
                  </VBtn>
                </VCol>
              </VRow>
            </VForm>
          </VCardText>
        </div>

        <div v-else>
          <TwoFactor />
        </div>
      </VCard>
    </VCol>
  </VRow>

  <Alert
    v-model:is-visible="isSnackbarVisible"
    :message="message"
    :type="messageType"
  ></Alert>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth";
.w-500 {
  width: 500px;
}
</style>
