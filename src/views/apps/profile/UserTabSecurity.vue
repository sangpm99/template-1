<script setup lang="ts">
import {
  confirmedValidator,
  passwordValidator,
  requiredValidator,
} from "@/@core/utils/validators";
import { copyText } from "@/utils";
import { VForm } from "vuetify/components/VForm";

import { useUserStore } from "@/stores/accounts/userStore";
import { useConfigurationStore } from "@/stores/configurationStore";
import type { ChangePasswordParams } from "@/types/accounts/users";
import type { ValidateErrors } from "@/types/authorize";
import type { ErrorResponse } from "@/types";

import VerifyCodeTwoFactorDialog from "@/views/apps/profile/VerifyCodeTwoFactorDialog.vue";
import GetExternalTokenDialog from "@/views/apps/profile/GetExternalTokenDialog.vue";
import ConfirmDialog from "@/components/dialogs/ConfirmDialog.vue";
import Alert from "@/components/Alert.vue";

const props = defineProps<Props>();
const emit = defineEmits<Emit>();
const userStore = useUserStore();
interface Props {
  twoFactorEnabled: boolean;
}
interface Emit {
  (e: "update", value: boolean): void;
}
const refFormChangePassword = ref<VForm>();
const isVerifyCodeTwoFactorDialogVisible: Ref<boolean> = ref(false);
const isGetExternalTokenDialogVisible: Ref<boolean> = ref(false);
const remountGetExternalToken: Ref<number> = ref(0);
const errors = ref<ValidateErrors | null>(null);
const isSnackbarVisible = ref<boolean>(false);
const message = ref<string>("");
const messageType = ref<string>("");

const changePasswordParams: Ref<ChangePasswordParams> = ref({
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
});

const configurationStore = useConfigurationStore();

const isConfirmDialogVisible = ref<boolean>(false);

const generatePassword = async () => {
  const pass = await configurationStore.generatePassword();
  if (pass) {
    changePasswordParams.value.newPassword = pass;
    changePasswordParams.value.confirmNewPassword = pass;
  }
};

const handleSubmit = () => {
  refFormChangePassword.value?.validate().then(async ({ valid }) => {
    if (valid) {
      try {
        await userStore.changePassword(changePasswordParams.value);
        message.value = "Successfully";
        messageType.value = "success";
        isSnackbarVisible.value = true;
      } catch (error) {
        const { response } = error as ErrorResponse<ValidateErrors>;
        const { data, status } = response;
        if (status === 400) {
          errors.value = data.errors || null;
        }
        // @ts-expect-error
        message.value = data[0].description || "Something went wrong.";
        isSnackbarVisible.value = true;
      }
    }
  });
};

const handleUpdate = (isUpdate: boolean) => {
  if (isUpdate) emit("update", true);
};

const onGetExternalToken = async () => {
  remountGetExternalToken.value++;
  isGetExternalTokenDialogVisible.value = true;
};

const handleRemoveAllExternalToken = async (value: boolean) => {
  if (value) {
    await userStore.revokeAllExternalTokens();
    message.value = "Revoke successfully";
    messageType.value = "success";
    isSnackbarVisible.value = true;
  }
};
</script>

<template>
  <VRow>
    <VCol cols="12">
      <!-- 👉 Change password -->
      <VCard title="Change Password">
        <VCardText>
          <VAlert variant="tonal" color="primary" class="mb-4">
            <VAlertTitle>Ensure that these requirements are met.</VAlertTitle>
            <ul>
              <li>
                <span>Minimum 8 characters long.</span>
              </li>
              <li>
                <span>Must contain uppercase, symbol and number.</span>
              </li>
              <li>
                <span>New password and confirm new password must match.</span>
              </li>
            </ul>
          </VAlert>

          <VForm
            id="formChangePassword"
            ref="refFormChangePassword"
            @submit.prevent="handleSubmit"
          >
            <VRow>
              <VCol cols="12" md="4">
                <VTextField
                  density="compact"
                  v-model="changePasswordParams.oldPassword"
                  label="Old Password"
                  type="password"
                  :rules="[requiredValidator]"
                  :error-messages="errors?.OldPassword"
                />
              </VCol>

              <VCol cols="12" md="4">
                <VTextField
                  density="compact"
                  v-model="changePasswordParams.newPassword"
                  label="New Password"
                  type="password"
                  :error-messages="errors?.NewPassword"
                  class="custom-text-field-append"
                  :rules="[passwordValidator]"
                >
                  <template #append-inner>
                    <VTooltip text="Generate Password">
                      <template #activator="{ props }">
                        <VBtn
                          v-bind="props"
                          color="info"
                          @click="generatePassword"
                          :loading="configurationStore.loading"
                          icon="mdi-reload"
                          class="rounded-0"
                        ></VBtn>
                      </template>
                    </VTooltip>

                    <VTooltip text="Copy">
                      <template #activator="{ props }">
                        <VBtn
                          v-bind="props"
                          color="indigo"
                          @click="copyText(changePasswordParams.newPassword)"
                          icon="ri-file-copy-line"
                          class="custom-btn"
                        ></VBtn>
                      </template>
                    </VTooltip>
                  </template>
                </VTextField>
              </VCol>

              <VCol cols="12" md="4">
                <VTextField
                  density="compact"
                  v-model="changePasswordParams.confirmNewPassword"
                  label="Confirm New Password"
                  type="password"
                  :rules="[
                    confirmedValidator(
                      changePasswordParams.confirmNewPassword,
                      changePasswordParams.newPassword,
                    ),
                  ]"
                  :error-messages="errors?.ConfirmNewPassword"
                />
              </VCol>

              <VCol cols="12">
                <VBtn
                  form="formChangePassword"
                  type="submit"
                  :loading="userStore.loading"
                >
                  Change Password
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12">
      <!-- 👉 2FA -->
      <VCard title="Two Factor Authentication">
        <VCardText>
          <p>Keep your account secure with authentication step.</p>
          <p>
            Two-factor authentication adds an additional layer of security to
            your account by requiring more than just a password to log in.
          </p>

          <VBtn
            class="mb-3"
            :color="props.twoFactorEnabled ? 'error' : 'primary'"
            :variant="props.twoFactorEnabled ? 'outlined' : 'elevated'"
            @click="isVerifyCodeTwoFactorDialogVisible = true"
          >
            {{ props.twoFactorEnabled ? "Disable" : "Enable" }} Two Factor
            Authentication
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12">
      <VCard title="External Authentication Token">
        <VCardText>
          <p>Authenticate with third-party services using external tokens.</p>
          <p>
            External tokens allow secure access to your application by
            leveraging authentication from external providers like OAuth or API
            keys.
          </p>

          <VBtn class="mb-3 me-3" @click="onGetExternalToken">
            Get External Token
          </VBtn>

          <VBtn
            class="mb-3"
            color="error"
            @click="isConfirmDialogVisible = true"
          >
            Revoke External Token
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>

  <VerifyCodeTwoFactorDialog
    v-if="isVerifyCodeTwoFactorDialogVisible"
    v-model:is-dialog-visible="isVerifyCodeTwoFactorDialogVisible"
    @submit="(isUpdate) => handleUpdate(isUpdate)"
  />

  <GetExternalTokenDialog
    v-model:is-dialog-visible="isGetExternalTokenDialogVisible"
    :key="remountGetExternalToken"
  />

  <ConfirmDialog
    v-model:isDialogVisible="isConfirmDialogVisible"
    confirmation-question="Are you sure you want to revoke all external tokens?"
    @confirm="(value) => handleRemoveAllExternalToken(value)"
  ></ConfirmDialog>

  <Alert
    v-model:is-visible="isSnackbarVisible"
    :message="message"
    :type="messageType"
  ></Alert>
</template>

<style lang="scss" scoped>
::v-deep(.custom-text-field-append) {
  .v-field--appended {
    padding-inline-end: 0 !important;
  }

  .custom-btn {
    border-radius: 0 6px 6px 0;
  }
}
</style>
