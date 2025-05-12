<script lang="ts" setup>
import {
  confirmedValidator,
  emailValidator,
  passwordValidator,
  requiredValidator,
} from "@/@core/utils/validators";
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import { VForm } from "vuetify/components";
import { copyText } from "@/utils";
import { useNavigationDrawerEscHandler } from "@/composables";

import { useRoleStore } from "@/stores/accounts/roleStore";
import { useUserStore } from "@/stores/accounts/userStore";
import { useConfigurationStore } from "@/stores/configurationStore";
import type { SearchQuery, ErrorResponse } from "@/types";
import type { RoleName } from "@/types/accounts/roles";
import type { Option } from "@/types/tenant";
import type {
  CreateUserParams,
  ValidateErrorsUser as ValidateErrors,
  Metadata,
} from "@/types/accounts/users";

import TenantTreeview from "@/components/treeviews/TenantTreeview.vue";

const roleStore = useRoleStore();
const userStore = useUserStore();
const configurationStore = useConfigurationStore();

interface Props {
  isDrawerOpen: boolean;
}
interface Emit {
  (e: "update:isDrawerOpen", value: boolean): void;
  (e: "update:submit", value: boolean): void;
}
const props = defineProps<Props>();
const emit = defineEmits<Emit>();

const departments: Ref<string[]> = ref([]);
const selectDepartments: Ref<string[]> = ref([]);
const loading: Ref<boolean> = ref(false);
const refFormCreate = ref<VForm>();
const roleNames: Ref<RoleName[]> = ref([]);
const getNamesParams: Ref<SearchQuery> = ref({
  pageIndex: 1,
  pageSize: 100,
});
const createUserParams: Ref<CreateUserParams> = ref({
  userName: "",
  password: "",
  confirmPassword: "",
  email: "",
  phoneNumber: "",
  fullName: "",
  avatar: "",
  department: "",
  address: "",
  roles: [],
  referenceId: "",
  tenantId: null,
  metadata: "",
});

const metadata = ref<Metadata>({
  timezone: 7,
});

const errors: Ref<ValidateErrors | null> = ref(null);
const tenant = ref<Option>();

const handleDrawerModelValueUpdate = (val: boolean) => {
  refFormCreate.value?.reset();
  refFormCreate.value?.resetValidation();
  emit("update:isDrawerOpen", val);
};

const getRoleNames = async () => {
  const res = await roleStore.getRoleNames(getNamesParams.value);
  roleNames.value = res.items || [];
};

const getDepartments = async () => {
  departments.value = await configurationStore.getDepartments();
};

const generatePassword = async () => {
  const pass = await configurationStore.generatePassword();
  if (pass) {
    createUserParams.value.password = pass;
    createUserParams.value.confirmPassword = pass;
  }
};

const handleUpdateTenant = (value: Option) => {
  tenant.value = value;
};

const handleSubmit = () => {
  refFormCreate.value?.validate().then(async ({ valid }) => {
    if (valid) {
      loading.value = true;
      try {
        createUserParams.value.department = selectDepartments.value.join(",");
        createUserParams.value.tenantId = tenant.value ? tenant.value.id : null;
        createUserParams.value.metadata = JSON.stringify(metadata.value);
        await userStore.createUser(createUserParams.value);
        handleDrawerModelValueUpdate(false);
        emit("update:submit", true);
      } catch (error) {
        const { response } = error as ErrorResponse<ValidateErrors>;
        const { data, status } = response;
        if (status === 400) {
          errors.value = data.errors || null;
        }
      } finally {
        loading.value = false;
      }
    }
  });
};

useNavigationDrawerEscHandler("Escape", () =>
  handleDrawerModelValueUpdate(false),
);

watch(
  () => props.isDrawerOpen,
  (value) => {
    if (value) {
      getRoleNames();
      getDepartments();
    }
  },
);
</script>

<template>
  <VNavigationDrawer
    :model-value="props.isDrawerOpen"
    location="end"
    width="1200"
    temporary
    border="none"
    class="scrollable-content"
    order="10"
    @update:model-value="handleDrawerModelValueUpdate"
  >
    <!-- replace -->
    <AppDrawerHeaderSection
      title="Create User"
      @cancel="handleDrawerModelValueUpdate(false)"
    >
      <template #beforeClose>
        <VBtn
          form="formCreate"
          type="submit"
          color="primary"
          class="me-4"
          :loading="loading"
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
          <VForm
            v-if="props.isDrawerOpen"
            id="formCreate"
            ref="refFormCreate"
            @submit.prevent="handleSubmit"
          >
            <VRow>
              <VCol cols="12">
                <VTextField
                  v-model="createUserParams.fullName"
                  density="compact"
                  label="Full Name"
                  placeholder="John Doe"
                  :rules="[requiredValidator]"
                  :error-messages="errors?.FullName"
                />
              </VCol>

              <VCol cols="12" md="6">
                <VTextField
                  v-model="createUserParams.userName"
                  density="compact"
                  label="Username"
                  placeholder="johnDoe012"
                  :rules="[requiredValidator]"
                  :error-messages="errors?.UserName"
                />
              </VCol>

              <VCol cols="12" md="6">
                <VTextField
                  v-model="createUserParams.referenceId"
                  density="compact"
                  label="Staff ID"
                  placeholder="12qwe-qwd12-131-d1d12d"
                  :error-messages="errors?.ReferenceId"
                />
              </VCol>

              <VCol cols="12" md="6">
                <VTextField
                  density="compact"
                  v-model="createUserParams.password"
                  label="Password"
                  type="password"
                  :error-messages="errors?.Password"
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
                          @click="copyText(createUserParams.password)"
                          icon="ri-file-copy-line"
                          class="custom-btn"
                        ></VBtn>
                      </template>
                    </VTooltip>
                  </template>
                </VTextField>
              </VCol>

              <VCol cols="12" md="6">
                <VTextField
                  v-model="createUserParams.confirmPassword"
                  density="compact"
                  label="Confirm Password"
                  type="password"
                  placeholder="********"
                  :rules="[
                    confirmedValidator(
                      createUserParams.password,
                      createUserParams.confirmPassword,
                    ),
                  ]"
                  :error-messages="errors?.Password"
                />
              </VCol>

              <VCol cols="12" md="6">
                <VTextField
                  v-model="createUserParams.email"
                  density="compact"
                  label="Email"
                  placeholder="johndoe@email.com"
                  :rules="[requiredValidator, emailValidator]"
                  :error-messages="errors?.Email"
                />
              </VCol>

              <VCol cols="12" md="6">
                <VTextField
                  v-model="createUserParams.phoneNumber"
                  density="compact"
                  label="Phone Number"
                  placeholder="+1 9876543210"
                  :error-messages="errors?.PhoneNumber"
                />
              </VCol>

              <VCol cols="12" md="6">
                <VTextField
                  v-model="createUserParams.address"
                  density="compact"
                  label="Address"
                  placeholder="United State"
                  :error-messages="errors?.Address"
                />
              </VCol>

              <VCol cols="12" md="6">
                <VSelect
                  v-model="selectDepartments"
                  density="compact"
                  :items="departments"
                  label="Department"
                  multiple
                  :error-messages="errors?.Department"
                />
              </VCol>

              <VCol cols="12" md="6">
                <VSelect
                  v-model="createUserParams.roles"
                  density="compact"
                  :items="roleNames"
                  item-title="name"
                  item-value="name"
                  label="Roles"
                  multiple
                  :rules="[requiredValidator]"
                  :error-messages="errors?.Roles"
                />
              </VCol>

              <VCol cols="12" md="6">
                <TenantTreeview
                  @option="handleUpdateTenant"
                  prepend-inner-icon=""
                ></TenantTreeview>
              </VCol>

              <VCol cols="12">
                <VTextField
                  v-model="metadata.timezone"
                  density="compact"
                  label="Time Zone"
                  placeholder="-8"
                  :errors="metadata.timezone < -12 || metadata.timezone > 14"
                  :error-messages="
                    metadata.timezone < -12 || metadata.timezone > 14
                      ? 'Timezone need in range -12 to 14'
                      : ''
                  "
                  type="number"
                  min="-12"
                  max="14"
                />
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
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
