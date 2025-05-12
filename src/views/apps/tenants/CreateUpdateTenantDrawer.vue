<script lang="ts" setup>
import { requiredValidator } from "@/@core/utils/validators";
import { useNavigationDrawerEscHandler } from "@/composables";
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import { VForm } from "vuetify/components/VForm";

import { useTenantStore } from "@/stores/tenantStore";
import type { Tenant, TenantForm } from "@/types/tenant";

import TenantTreeview from "@/components/treeviews/TenantTreeview.vue";

interface Props {
  tenant?: Tenant;
  isDrawerOpen: boolean;
}
interface Emit {
  (e: "update:isDrawerOpen", value: boolean): void;
  (e: "update", value: Tenant): void;
}
const props = defineProps<Props>();
const emit = defineEmits<Emit>();

const tenantStore = useTenantStore();
const tenantForm = ref<TenantForm>({
  parentId: "",
  referenceId: "",
  name: "",
  telegramId: "",
});
const refForm = ref<VForm>();

const handleReset = () => {
  refForm.value?.resetValidation();
};

const handleDrawerModelValueUpdate = (val: boolean) => {
  emit("update:isDrawerOpen", val);
};

const handleSubmit = () => {
  refForm.value?.validate().then(async ({ valid }) => {
    if (valid) {
      if (!props.tenant) {
        await tenantStore.createTenant(tenantForm.value);
      } else {
        await tenantStore.updateTenant(props.tenant.id, tenantForm.value);
      }
      emit("update", true);
      handleDrawerModelValueUpdate(false);
    }
  });
};

// type esc to close drawer
useNavigationDrawerEscHandler("Escape", () =>
  handleDrawerModelValueUpdate(false),
);

watch(
  () => props.isDrawerOpen,
  () => {
    if (props.isDrawerOpen) {
      handleReset();
      if (props.tenant) {
        tenantForm.value = {
          parentId: props.tenant.parentId,
          referenceId: props.tenant.referenceId,
          name: props.tenant.name,
          telegramId: "",
        };
      }
    }
  },
);
</script>

<template>
  <VNavigationDrawer
    :model-value="props.isDrawerOpen"
    location="end"
    width="800"
    temporary
    border="none"
    class="scrollable-content"
    order="10"
    @update:model-value="handleDrawerModelValueUpdate"
  >
    <AppDrawerHeaderSection
      :title="`${props.tenant ? 'Update' : 'Create'} Tenant`"
      @cancel="handleDrawerModelValueUpdate(false)"
    >
      <template #beforeClose>
        <VBtn
          form="form"
          type="submit"
          color="primary"
          class="me-4"
          :loading="tenantStore.loading"
          size="small"
        >
          Submit
        </VBtn>
      </template>
    </AppDrawerHeaderSection>

    <VDivider />

    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat v-if="props.isDrawerOpen">
        <VCardText>
          <VForm id="form" ref="refForm" @submit.prevent="handleSubmit">
            <VRow>
              <VCol cols="12">
                <VTextField
                  v-model="tenantForm.name"
                  density="compact"
                  label="Full Name"
                  prepend-inner-icon="mdi-order-alphabetical-ascending"
                  placeholder="Mr John"
                  :rules="[requiredValidator]"
                ></VTextField>
              </VCol>

              <VCol cols="12">
                <TenantTreeview
                  :id="tenantForm.parentId ?? undefined"
                  @option="
                    (value) => {
                      tenantForm.parentId = value?.id ?? null;
                    }
                  "
                  label="Tenant Parent"
                ></TenantTreeview>
              </VCol>

              <VCol cols="12">
                <VTextField
                  v-model="tenantForm.referenceId"
                  density="compact"
                  label="Ref ID"
                  prepend-inner-icon="ri-barcode-box-line"
                  placeholder="123-abc-456-def"
                ></VTextField>
              </VCol>

              <VCol cols="12">
                <VTextField
                  v-model="tenantForm.telegramId"
                  density="compact"
                  label="Telegram ID"
                  prepend-inner-icon="ri-barcode-box-line"
                  placeholder="123-abc-456-def"
                ></VTextField>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>
