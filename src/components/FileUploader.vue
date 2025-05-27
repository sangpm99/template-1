<script lang="ts" setup>
import { resolveImage } from "@/utils/formatters";

import { useFileStore } from "@/stores/file";

// @ts-expect-error
import lity from "lity";
import Alert from "@/components/Alert.vue";

interface Props {
  modelValue?: string;
  width?: string;
  height?: string;
  accept?: string;
  maxSize?: number;
  video?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  width: "300px",
  height: "300px",
  accept: "image/*",
  maxSize: 0,
});

interface Emit {
  (e: "update:modelValue", value: string): void;
}
const emit = defineEmits<Emit>();

const fileStore = useFileStore();
const pasteArea = ref(null);
const fileUrl = ref<string | undefined>(props.modelValue);
const file = ref<File | null>();
const fileInput = ref<HTMLInputElement | null>(null);
const maxSizeBytes = computed(() =>
  props.maxSize ? props.maxSize * 1024 * 1024 : Infinity,
);
const isSnackbarVisible = ref<boolean>(false);
const message = ref<string>("");
const messageType = ref<string>("error");

const validateFileType = (f: File) => {
  if (!props.accept) return true;

  const acceptedTypes = props.accept.split(",").map((type) => type.trim());
  const isValid = acceptedTypes.some((acceptedType) => {
    if (acceptedType === "image/*") return f.type.startsWith("image/");
    return f.type === acceptedType;
  });

  if (!isValid) {
    message.value = `Invalid file type! This file is not accepted.`;
    messageType.value = "error";
    isSnackbarVisible.value = true;
    return false;
  }
  return true;
};

const validateFileSize = (f: File) => {
  if (f.size > maxSizeBytes.value) {
    message.value = `File too large! Please select an image smaller than ${props.maxSize}MB.`;
    messageType.value = "error";
    isSnackbarVisible.value = true;
    return false;
  }
  return true;
};

const validateFile = (f: File) => {
  return !(!validateFileType(f) || !validateFileSize(f));
};

const handlePaste = (event: ClipboardEvent) => {
  if (event.clipboardData) {
    const files = event.clipboardData.files;
    if (files.length > 0) {
      const f = files[0];

      if (!validateFile(f)) return;

      file.value = f;

      handleUploadFile();
    }
  }
};

const handlePasteFromClipboard = async () => {
  const clipboardItems = await navigator.clipboard.read();
  for (const item of clipboardItems) {
    for (const type of item.types) {
      if (type.startsWith("image/")) {
        const blob = await item.getType(type);
        const f = new File([blob], "pasted-image.png", { type });

        if (!validateFile(f)) return;

        file.value = f;

        await handleUploadFile();
      }
    }
  }
};

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    const f = target.files[0];

    if (!validateFile(f)) return;

    file.value = f;

    handleUploadFile();
  }
};

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleUploadFile = async () => {
  if (!file.value) return;
  fileUrl.value = await fileStore.uploadFile(file.value);
  emit("update:modelValue", fileUrl.value);
};

const onDelete = () => {
  fileUrl.value = undefined;
  file.value = null;
  emit("update:modelValue", "");
};
</script>

<template>
  <VRow>
    <VCol cols="12" ref="pasteArea" @paste="handlePaste">
      <div
        class="paste-area pa-5 d-flex justify-center align-center bg-gray cursor-text"
      >
        <div
          v-if="!fileUrl && !fileStore.loading"
          class="d-flex flex-column align-center"
        >
          <p class="mb-0" v-if="!props.video">
            Press Ctrl + V to paste the image here
          </p>
          <p class="mb-0" v-else>Upload video here</p>
          <div class="d-flex gap-4 mt-4">
            <VTooltip text="Paste" v-if="!props.video">
              <template v-slot:activator="{ props }">
                <VBtn
                  v-bind="props"
                  @click="handlePasteFromClipboard"
                  icon="ri-clipboard-line"
                  class="rounded"
                ></VBtn>
              </template>
            </VTooltip>

            <VTooltip text="Choose file">
              <template v-slot:activator="{ props }">
                <VBtn
                  v-bind="props"
                  icon="ri-file-upload-line"
                  class="rounded"
                  color="indigo"
                  @click="triggerFileInput"
                ></VBtn>
              </template>
            </VTooltip>

            <input
              ref="fileInput"
              type="file"
              :accept="props.accept"
              style="display: none"
              @change="handleFileSelect"
            />
          </div>
        </div>

        <VCard v-if="fileUrl">
          <VCardText class="pa-2">
            <div class="position-relative d-flex">
              <img
                v-if="!props.video"
                :src="fileUrl"
                alt="Image"
                class="cursor-pointer"
                @click="lity(resolveImage(fileUrl))"
                :style="`height: ${props.height}; width: ${props.width}`"
              />

              <video
                v-else
                controls
                :style="`height: ${props.height}; width: ${props.width}`"
              >
                <source :src="fileUrl" type="video/mp4" />
                <source :src="fileUrl" type="video/webm" />
                <source :src="fileUrl" type="video/ogg" />
                Your browser does not support video.
              </video>

              <VBtn
                icon="ri-close-line"
                class="position-absolute top-0 right-0 rounded-0"
                color="error"
                size="x-small"
                @click="onDelete"
              ></VBtn>
            </div>
          </VCardText>
        </VCard>

        <VProgressCircular
          v-if="!fileUrl && fileStore.loading"
          size="50"
          indeterminate
        ></VProgressCircular>
      </div>
    </VCol>
  </VRow>

  <Alert
    v-model:is-visible="isSnackbarVisible"
    :message="message"
    :type="messageType"
  ></Alert>
</template>
