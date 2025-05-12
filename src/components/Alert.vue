<script lang="ts" setup>
interface Props {
  type: string;
  message: string;
  isVisible: boolean;
  timeout?: number;
}
const props = withDefaults(defineProps<Props>(), {
  type: "info",
  timeout: 3000,
});
interface Emit {
  (e: "update:isVisible", value: boolean): void;
}
const emit = defineEmits<Emit>();

const resolveIcon = (type: string) => {
  switch (type) {
    case "success": {
      return "ri-check-line";
    }
    case "warning": {
      return "ri-error-warning-line";
    }
    case "error": {
      return "ri-error-warning-line";
    }
    default: {
      return "ri-information-line";
    }
  }
};

const resolveTitle = (type: string) => {
  switch (type) {
    case "success": {
      return "Success";
    }
    case "warning": {
      return "Warning";
    }
    case "error": {
      return "Error";
    }
    default: {
      return "Information";
    }
  }
};

const resolveType = (type: string) => {
  switch (type) {
    case "success": {
      return "success";
    }
    case "warning": {
      return "warning";
    }
    case "error": {
      return "error";
    }
    default: {
      return "info";
    }
  }
};

const isVisible = computed({
  get() {
    return props.isVisible;
  },
  set(value) {
    emit("update:isVisible", value);
  },
});
</script>

<template>
  <VSnackbar
    v-model="isVisible"
    location="top end"
    :timeout="props.timeout"
    close
    class="custom-snackbar"
    transition="scroll-x-reverse-transition"
  >
    <VAlert
      :type="resolveType(props.type)"
      variant="tonal"
      :title="resolveTitle(props.type)"
      size="sm"
      :icon="resolveIcon(props.type)"
      density="compact"
      class="border"
    >
      <p class="text-black text-sm mb-0">{{ props.message }}</p>
    </VAlert>

    <template v-slot:actions>
      <VBtn
        variant="text"
        @click="emit('update:isVisible', false)"
        icon="ri-close-line"
        :color="props.type"
      >
      </VBtn>
    </template>
  </VSnackbar>
</template>

<style lang="scss">
.custom-snackbar {
  .v-snackbar--variant-elevated,
  .v-snackbar--variant-flat {
    background-color: rgba(255, 255, 255, 0.8) !important;
    color: #333 !important;
    backdrop-filter: blur(8px);
  }

  .v-snackbar__content {
    padding: 0 !important;

    .v-alert-title {
      font-size: 16px !important;
    }
  }

  .v-snackbar__actions {
    position: absolute;
    top: 0;
    right: -0.75rem;
  }
}
</style>
