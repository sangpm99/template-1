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
import { requiredValidator, emailValidator } from "@/@core/utils/validators";

import { useGenerateImageVariant } from "@/@core/composable/useGenerateImageVariant";
import { useAuthorizeStore } from "@/stores/authorize";
import type { ErrorResponse } from "@/types";
import type { ForgotPasswordParams, ValidateErrors } from "@/types/authorize";

import ReCaptcha from "@/components/ReCaptcha.vue";
import Alert from "@/components/Alert.vue";

const authorizeStore = useAuthorizeStore();

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

const forgotPasswordParams: Ref<ForgotPasswordParams> = ref({
  email: "",
  reCaptcha: "string",
});

const refFormForgotPassword = ref<VForm>();
const errors = ref<ValidateErrors | null>(null);
const isSnackbarVisible = ref<boolean>(false);
const message = ref<string>("");
const messageType = ref<string>("error");

const handleSubmit = () => {
  refFormForgotPassword.value?.validate().then(async ({ valid }) => {
    if (valid) {
      try {
        if (import.meta.env.VITE_APP_MODE) {
          forgotPasswordParams.value.reCaptcha = "string";
        }
        await authorizeStore.forgotPassword(forgotPasswordParams.value);
        message.value =
          "The link change password has sent to your email, please change password in 10 minutes.";
        isSnackbarVisible.value = true;
        messageType.value = "success";
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
          <h3 class="text-h3">Forgot Password</h3>
          <h5 class="text-h5 my-2">
            Welcome to
            <span class="text-capitalize">{{ themeConfig.app.title }}</span>
          </h5>
        </VCardText>

        <VCardText>
          <VForm
            id="formForgotPassword"
            ref="refFormForgotPassword"
            @submit.prevent="handleSubmit"
          >
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <VTextField
                  v-model="forgotPasswordParams.email"
                  label="Email"
                  type="email"
                  placeholder="johndoe@email.com"
                  :rules="[requiredValidator, emailValidator]"
                  :error-messages="errors?.Email"
                />
              </VCol>

              <VCol cols="12">
                <!-- login button -->
                <div class="mb-6">
                  <RouterLink class="text-primary" to="/login">
                    Go Back
                  </RouterLink>
                </div>

                <div class="my-4">
                  <ReCaptcha
                    :re-captcha-receive="forgotPasswordParams.reCaptcha"
                    @handle-error-callback="
                      (value: string) =>
                        (forgotPasswordParams.reCaptcha = value)
                    "
                    @handle-expired-callback="
                      (value: string) =>
                        (forgotPasswordParams.reCaptcha = value)
                    "
                    @handle-load-callback="
                      (value: string) =>
                        (forgotPasswordParams.reCaptcha = value)
                    "
                    :error-message="errors?.ReCaptcha"
                  />
                </div>

                <VBtn
                  form="formForgotPassword"
                  block
                  type="submit"
                  :loading="authorizeStore.loading"
                >
                  Submit
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
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
