<script setup lang="ts">
import { resolveImage } from "@/utils/formatters";
import { axiosDefault } from "@/plugins/axios";
import { Sortable } from "sortablejs-vue3";
import { useAbility } from "@casl/vue";

import type { AxiosProgressEvent } from "axios";
// @ts-expect-error
import lity from "lity";
import Alert from "@/components/Alert.vue";

const { can } = useAbility();
// 👉 Props & Emits
/// format: ".psd" || "gif" ||| <default is png, jpeg => don't need define>
/// multiple: true || false ||| <default is false>
type Props = {
  modelValue: string[];
  format?: string;
  multiple?: boolean;
  readonly?: boolean;
  maxSize?: number;
};

const props = withDefaults(defineProps<Props>(), {
  readonly: false,
});

const emit = defineEmits<{ "update:modelValue": [string[]]; close: [void] }>();

// 👉 Interface
type ImageElement = {
  id: number;
  url: string;
  alt?: string;
  dimensions?: { width: number; height: number };
};

// 👉 States
const files: Ref<File[]> = ref([]);
const progress: Ref<number[]> = ref([]);
const originImages: Ref<ImageElement[]> = ref([]);
const accept = computed(() => {
  // for specific format
  if (props.format) {
    return props.format;
  }
  // for normal format
  return "image/png, image/jpeg, .zip, .rar";
});
const isSnackbarVisible: Ref<boolean> = ref(false);
const message: Ref<string> = ref("");
const messageType = ref<string>("error");

// 👉 Functions
const changeFiles = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  files.value = Array.from(target.files || []).filter((e) => {
    if (props.maxSize && e.size / Math.pow(1024, 2) > props.maxSize) {
      message.value = `The maximum file size allowed for upload is under ${props.maxSize}MB.`;
      messageType.value = "error";
      isSnackbarVisible.value = true;
      return false;
    }
    return true;
  });
  await uploadFiles([...files.value]);
  files.value = [];
  handleChange();
};

const uploadFiles = async (files: File[]) => {
  const uploadPromises = files.map((file, index) => {
    const formData = new FormData();
    formData.append("file", file, file.name);

    const uploadProgress = (progressEvent: AxiosProgressEvent) => {
      if (progressEvent.total) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );
        progress.value[index] = percentCompleted;
      }
    };

    return axiosDefault.post<string>(`/File/UploadFile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: uploadProgress,
    });
  });

  const results = await Promise.allSettled(uploadPromises);

  const images: string[] = results
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value.data || "")
    .filter(([, value]) => value);

  if (props.multiple) {
    images.forEach((img) => {
      const newId =
        Math.max(
          ...(Object.values(
            originImages.value.map((e: ImageElement) => e.id),
          ) as Array<number>),
          0,
        ) + 1;

      originImages.value.push({
        id: newId,
        url: img,
      });
    });
  } else {
    originImages.value = images.map((img, index) => ({
      id: index + 1,
      url: img,
    }));
  }
  handleChange();
};

onMounted(() => {
  props.modelValue.forEach((img) => {
    const newId =
      Math.max(
        ...(Object.values(
          originImages.value.map((e: ImageElement) => e.id),
        ) as Array<number>),
        0,
      ) + 1;

    originImages.value.push({
      id: newId,
      url: img,
    });
  });
});

const onSort = ({ oldIndex, newIndex }: any) => {
  const movedItem = originImages.value.splice(oldIndex, 1)[0];
  originImages.value.splice(newIndex, 0, movedItem);

  handleChange();
};

const removeImage = (id: number, url: string) => {
  originImages.value = originImages.value.filter((e) => e.id !== id);
  handleChange();
  if (can("Delete", "Permission.Product")) {
    axiosDefault.delete(`/File/DeleteFile?url=${url}`);
  }
};

const handleChange = () => {
  const imgs = originImages.value.map((e) => e.url);
  emit("update:modelValue", imgs);
};
</script>

<template>
  <div cols="12" class="uploader">
    <VRow>
      <template v-if="props.readonly === false">
        <VCol cols="12">
          <div class="upload-content" style="display: block">
            <div class="upload-view">
              <div id="FileUpload">
                <div class="wrapper">
                  <div class="dzu-dropzone">
                    <label
                      class="dzu-inputLabel d-flex flex-column text-primary"
                      style="min-block-size: 10rem"
                    >
                      <VIcon icon="ri-upload-cloud-line"> </VIcon>
                      Click to Browse
                      <input
                        class="dzu-input"
                        type="file"
                        :accept="accept"
                        :multiple="props.multiple"
                        @change="changeFiles"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </VCol>

        <VCol
          cols="12"
          v-if="files && files.length > 0"
          class="position-absolute top-0 left-0 w-100 h-100 d-flex justify-center algin-center"
          style="z-index: 999; background-color: rgba(255, 255, 255, 90%)"
        >
          <VProgressCircular
            :size="50"
            width="3"
            color="primary"
            indeterminate
            class="fill-height"
          />
        </VCol>
      </template>
      <VCol cols="12">
        <Sortable
          :list="originImages"
          itemKey="id"
          @sort="onSort"
          class="d-flex flex-wrap"
          handle="draggable"
        >
          <template #item="{ element }">
            <VCol cols="3">
              <VCard
                class="draggable position-relative custom-card"
                :key="element.id"
                color="grey-lighten-1"
                width="100%"
                @click="lity(resolveImage(element.url))"
              >
                <VImg
                  class="custom-image"
                  cover
                  :src="resolveImage(element.url)"
                >
                </VImg>

                <div
                  v-if="props.readonly === false"
                  class="position-absolute top-0 right-0"
                >
                  <VIcon
                    icon="ri-delete-bin-line"
                    color="error"
                    style="z-index: 99"
                    @click.stop="removeImage(element.id, element.url)"
                    class="mt-1 me-1"
                    size="small"
                  ></VIcon>
                </div>
              </VCard>
            </VCol>
          </template>
        </Sortable>
      </VCol>
    </VRow>

    <Alert
      v-model:is-visible="isSnackbarVisible"
      :message="message"
      :type="messageType"
    ></Alert>
  </div>
</template>

<style lang="scss" scoped>
#FileUpload {
  display: flex;
  justify-content: center;
}

#FileUpload .wrapper {
  inline-size: 100%;
}

#FileUpload .wrapper .dzu-dropzone .dzu-inputLabel,
#FileUpload .wrapper .dzu-dropzone .dzu-inputLabelWithFiles {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed rgb(var(--v-theme-primary)) !important;
  border-radius: 5px;
  block-size: 100px;
  cursor: pointer;
  margin-block-end: 10px;
}

.dzu-input {
  display: none;
}

.ps {
  block-size: 650px;
}

.table {
  background: var(--bs-body-bg);

  th {
    position: sticky;
    z-index: 2;
    background: var(--bs-body-bg);
    inset-block-start: 0;
  }
}

.custom-card {
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    opacity: 0.05;
    transition: opacity 0.25s ease;
    cursor: move;
  }

  &:hover {
    &::after {
      opacity: 0.5;
    }
  }

  .custom-image {
    width: 100%;
    aspect-ratio: 1 / 1;
  }
}
</style>
