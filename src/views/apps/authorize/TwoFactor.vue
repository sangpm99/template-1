<script setup lang="ts">
import {
  getLocalStorageUser,
  useAuthorizeStore,
} from "@/stores/authorizeStore";
import { requiredValidator } from "@/@core/utils/validators";
import { VForm } from "vuetify/components/VForm";

import type { TwoFactorParams } from "@/types/authorize";

const authorizeStore = useAuthorizeStore();
const twoFactorParams: Ref<TwoFactorParams> = ref({
  email: "",
  token: "",
  twoFactorCode: "",
  rememberMe: false,
});
const refFormTwoFactor = ref<VForm>();

const handleSubmit = async () => {
  refFormTwoFactor.value?.validate().then(async ({ valid }) => {
    if (valid) {
      const user = getLocalStorageUser();
      if (!user) return;

      twoFactorParams.value.email = user.email;
      twoFactorParams.value.token = user.token ?? "";

      await authorizeStore.twoFactor(twoFactorParams.value);
      window.location.href = "/";
    }
  });
};
</script>

<template>
  <VCardText>
    <VForm
      id="formTwoFactor"
      ref="refFormTwoFactor"
      @submit.prevent="handleSubmit"
    >
      <VRow>
        <VCol cols="12">
          <VTextField
            v-model="twoFactorParams.twoFactorCode"
            label="Verify Code"
            type="text"
            placeholder="123456"
            :rules="[requiredValidator]"
          />
        </VCol>

        <VCol cols="12">
          <VBtn form="formTwoFactor" block type="submit"> Submit </VBtn>
        </VCol>
      </VRow>
    </VForm>
  </VCardText>
</template>
