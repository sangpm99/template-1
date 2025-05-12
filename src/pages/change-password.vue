<script setup lang="ts">
import authV2LoginIllustrationBorderedDark from "@images/pages/auth-v2-login-illustration-bordered-dark.png";
import authV2LoginIllustrationBorderedLight from "@images/pages/auth-v2-login-illustration-bordered-light.png";
import authV2LoginIllustrationDark from "@images/pages/auth-v2-login-illustration-dark.png";
import authV2LoginIllustrationLight from "@images/pages/auth-v2-login-illustration-light.png";
import authV2LoginMaskDark from "@images/pages/auth-v2-login-mask-dark.png";
import authV2LoginMaskLight from "@images/pages/auth-v2-login-mask-light.png";
import { VForm } from "vuetify/components/VForm";
import { themeConfig } from "@themeConfig";
import { VNodeRenderer } from "@layouts/components/VNodeRenderer";
import { useGenerateImageVariant } from "@/@core/composable/useGenerateImageVariant";

import { useAuthorizeStore } from "@/stores/authorizeStore";
import type { ErrorResponse } from "@/types";
import type { RecoverPasswordParams, ValidateErrors } from "@/types/authorize";
import {
  passwordValidator,
  confirmedValidator,
} from "@/@core/utils/validators";

import ReCaptcha from "@/components/ReCaptcha.vue";
import Alert from "@/components/Alert.vue";

// Define
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

// Route
const route = useRoute();

// Store
const authorizeStore = useAuthorizeStore();
const recoverPasswordParams: Ref<RecoverPasswordParams> = ref({
  email: "",
  token: "",
  newPassword: "",
  confirmNewPassword: "",
  reCaptcha: "",
});
const refFormChangePassword = ref<VForm>();
const errors = ref<ValidateErrors | null>(null);
const isSnackbarVisible = ref<boolean>(false);
const message = ref<string>("");
const messageType = ref<string>("error");
const isValidLink = ref<boolean>(false);

// Function
onMounted(() => {
  if (route.query.email && route.query.token) {
    recoverPasswordParams.value.email = route.query.email as string;
    recoverPasswordParams.value.token = route.query.token as string;
    isValidLink.value = true;
  } else {
    message.value = "Please use feature forgot password before this feature!";
    messageType.value = "error";
    isSnackbarVisible.value = true;
  }
});

const handleSubmit = () => {
  refFormChangePassword.value?.validate().then(async ({ valid }) => {
    if (valid) {
      try {
        if (import.meta.env.VITE_APP_MODE) {
          recoverPasswordParams.value.reCaptcha = "string";
        }
        await authorizeStore.recoverPassword(recoverPasswordParams.value);
        message.value = "Change password successfully.";
        messageType.value = "success";
        isSnackbarVisible.value = true;
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
          <h3 class="text-h3">Change Password</h3>
          <h5 class="text-h5 my-2">
            Welcome to
            <span class="text-capitalize">{{ themeConfig.app.title }}</span>
          </h5>
        </VCardText>

        <VCardText v-if="isValidLink">
          <VForm
            id="formChangePassword"
            ref="refFormChangePassword"
            @submit.prevent="handleSubmit"
          >
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <VTextField
                  v-model="recoverPasswordParams.newPassword"
                  label="New Password"
                  type="password"
                  placeholder="********"
                  :rules="[passwordValidator]"
                  :error-messages="errors?.NewPassword"
                />
              </VCol>

              <VCol cols="12">
                <VTextField
                  v-model="recoverPasswordParams.confirmNewPassword"
                  label="Confirm New Password"
                  type="password"
                  placeholder="********"
                  :rules="[
                    confirmedValidator(
                      recoverPasswordParams.confirmNewPassword,
                      recoverPasswordParams.newPassword,
                    ),
                  ]"
                  :error-messages="errors?.ConfirmNewPassword"
                />
              </VCol>

              <VCol cols="12">
                <ReCaptcha
                  :re-captcha-receive="recoverPasswordParams.reCaptcha"
                  @handle-error-callback="
                    (value: string) => (recoverPasswordParams.reCaptcha = value)
                  "
                  @handle-expired-callback="
                    (value: string) => (recoverPasswordParams.reCaptcha = value)
                  "
                  @handle-load-callback="
                    (value: string) => (recoverPasswordParams.reCaptcha = value)
                  "
                  :error-messages="errors?.ReCaptcha"
                />
              </VCol>

              <VCol cols="12">
                <VBtn
                  form="formChangePassword"
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
