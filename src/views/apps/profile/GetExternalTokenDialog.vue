<script setup lang="ts">
import { useUserStore } from "@/stores/accounts/userStore";
import { copyText } from "@/utils";

interface Props {
  isDialogVisible: boolean;
}

interface Emit {
  (e: "update:isDialogVisible", val: boolean): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emit>();

// Stores
const userStore = useUserStore();

// States
const token: Ref<string> = ref("");

// Functions
const dialogVisibleUpdate = (value: boolean) => {
  emit("update:isDialogVisible", value);
};

const getAuthCode = async () => {
  try {
    token.value = await userStore.getExternalToken();
  } catch {}
};

onMounted(() => {
  if (props.isDialogVisible) {
    getAuthCode();
  }
});
</script>

<template>
  <VDialog
    class="v-dialog-md"
    :model-value="props.isDialogVisible"
    @update:model-value="dialogVisibleUpdate"
    max-width="1000"
  >
    <VCard>
      <VCardText>
        <p class="text-h4 text-center">External Token</p>
        <div class="pt-10 pb-5 px-5 d-flex position-relative bg-black">
          <p
            class="position-absolute top-0 right-0 pa-3 bg-gray-dark w-100 d-flex justify-space-between"
          >
            <span>
              <VIcon icon="ri-code-s-slash-line"></VIcon>
            </span>
            <span class="cursor-pointer" @click="copyText(token)">Copy</span>
          </p>
          <p class="mt-5" style="width: 900px">
            {{ token }}
          </p>
        </div>
      </VCardText>
      <DialogCloseBtn
        @click="$emit('update:isDialogVisible', false)"
        variant="text"
        size="small"
      />
      <VCardText class="pt-5"> </VCardText>
    </VCard>
  </VDialog>
</template>

<style lang="css" scoped>
.bg-gray-dark {
  background-color: #313338;
  color: #fff;
}
</style>
