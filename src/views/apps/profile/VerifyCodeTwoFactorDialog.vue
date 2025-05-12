<script setup lang="ts">
import { requiredValidator } from "@/@core/utils/validators";

import { useUserStore } from "@/stores/accounts/userStore";

import Alert from "@/components/Alert.vue";

interface Props {
  verifyCode?: string;
  isDialogVisible: boolean;
}
interface Emit {
  (e: "update:isDialogVisible", value: boolean): void;
  (e: "submit", value: boolean): void;
}
const props = defineProps<Props>();
const emit = defineEmits<Emit>();
const userStore = useUserStore();
const verifyCode = ref(structuredClone(toRaw(props.verifyCode)));
const isSnackbarVisible: Ref<boolean> = ref(false);
const message: Ref<string> = ref("");
const messageType = ref<string>("");

// Functions
const formSubmit = async () => {
  if (verifyCode.value) {
    try {
      await userStore.changeTwoFactor(verifyCode.value);
      emit("submit", true);
      emit("update:isDialogVisible", false);
      verifyCode.value = structuredClone(toRaw(props.verifyCode));
    } catch {
      message.value =
        "The verify code you entered is incorrect, please try again.";
      isSnackbarVisible.value = true;
      messageType.value = "error";
    }
  }
};

const resetVerifyCode = () => {
  verifyCode.value = structuredClone(toRaw(props.verifyCode));
  emit("update:isDialogVisible", false);
};

onMounted(async () => {
  verifyCode.value = structuredClone(toRaw(props.verifyCode));
  await userStore.getCodeChangeTwoFactor();
});
</script>

<template>
  <VDialog
    width="500"
    :model-value="props.isDialogVisible"
    persistent
    @update:model-value="(value) => $emit('update:isDialogVisible', value)"
  >
    <VCard class="pa-0 pa-sm-10">
      <!-- 👉 dialog close btn -->
      <DialogCloseBtn
        variant="text"
        size="default"
        @click.prevent="resetVerifyCode"
      />

      <VCardText class="pt-5">
        <div class="mb-2">
          <h5 class="text-h5 mb-2">
            Verify Code For Two Factor Authentication
          </h5>

          <div>Enter the verification code we just sent to your email.</div>
        </div>

        <VForm @submit.prevent="() => {}">
          <VOtpInput
            v-model="verifyCode"
            label="Verify Code"
            class="mb-6"
            :rules="[requiredValidator]"
          />

          <div class="d-flex flex-wrap justify-end gap-3">
            <VBtn
              color="secondary"
              variant="outlined"
              @click.prevent="resetVerifyCode"
            >
              Cancel
            </VBtn>
            <VBtn color="success" type="submit" @click.prevent="formSubmit">
              Submit
              <VIcon end icon="ri-check-line" class="flip-in-rtl" />
            </VBtn>
          </div>
        </VForm>
      </VCardText>
    </VCard>

    <Alert
      v-model:is-visible="isSnackbarVisible"
      :message="message"
      :type="messageType"
    ></Alert>
  </VDialog>
</template>
