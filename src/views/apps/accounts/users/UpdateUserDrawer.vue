<script lang="ts" setup>
import { emailValidator, requiredValidator } from "@/@core/utils/validators";
import { useNavigationDrawerEscHandler } from "@/composables";
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import { VForm } from "vuetify/components/VForm";

import { useRoleStore } from "@/stores/accounts/roleStore";
import { useUserStore } from "@/stores/user";
import { useConfigurationStore } from "@/stores/configuration";
import type { ErrorResponse, SearchQuery } from "@/types";
import type { RoleName } from "@/types/accounts/roles";
import type {
  Metadata,
  UpdateUser,
  ValidateErrorsUser as ValidateErrors,
} from "@/types/accounts/users";
import type { Option } from "@/types/tenant";

import TenantTreeview from "@/components/treeviews/TenantTreeview.vue";

const roleStore = useRoleStore();
const userStore = useUserStore();
const configurationStore = useConfigurationStore();

interface Props {
  userId: string;
  isDrawerOpen: boolean;
}
interface Emit {
  (e: "update:isDrawerOpen", value: boolean): void;
  (e: "update:submit", value: boolean): void;
}
const props = defineProps<Props>();
const emit = defineEmits<Emit>();

const refFormUpdate = ref<VForm>();
const departments: Ref<string[]> = ref([]);
const selectDepartments: Ref<string[]> = ref([]);
const roleNames: Ref<RoleName[]> = ref([]);
const getNamesParams: Ref<SearchQuery> = ref({
  pageIndex: 1,
  pageSize: 100,
});
const userId = ref<string>();
const updateUser = ref<UpdateUser>({
  userName: "",
  email: "",
  avatar: "",
  fullName: "",
  referenceId: null,
  tenantId: null,
  tenantUpdated: false,
  phoneNumber: null,
  department: null,
  address: null,
  lockedOut: false,
  roles: [],
  metadata: "",
});
const tenant = ref<Option>();
const remountTenant = ref<number>(0);
const metadata = ref<Metadata>({
  timezone: 7,
});
const errors: Ref<ValidateErrors | null> = ref(null);

const handleDrawerModelValueUpdate = (val: boolean) => {
  refFormUpdate.value?.reset();
  refFormUpdate.value?.resetValidation();
  emit("update:isDrawerOpen", val);
};

useNavigationDrawerEscHandler("Escape", () =>
  handleDrawerModelValueUpdate(false),
);

const getRoleNames = async () => {
  const res = await roleStore.getRoleNames(getNamesParams.value);
  roleNames.value = res.items || [];
};

const getDepartments = async () => {
  departments.value = await configurationStore.getDepartments();
};

const handleUpdateTenant = (value: Option) => {
  tenant.value = value;
};

const handleSubmit = () => {
  refFormUpdate.value?.validate().then(async ({ valid }) => {
    if (valid) {
      updateUser.value.department = selectDepartments.value.join(",");
      updateUser.value.tenantId = tenant.value ? tenant.value.id : null;
      updateUser.value.metadata = JSON.stringify(metadata.value) ?? "";
      try {
        await userStore.updateUser(userId.value ?? "", updateUser.value);
        handleDrawerModelValueUpdate(false);
        emit("update:submit", true);
      } catch (error) {
        const { response } = error as ErrorResponse<ValidateErrors>;
        const { data, status } = response;
        if (status === 400) {
          errors.value = data.errors || null;
        }
      }
    }
  });
};

const getUser = async () => {
  const user = await userStore.getUser(props.userId);
  if (user) {
    userId.value = user.id;
    updateUser.value = {
      userName: user.userName,
      email: user.email,
      avatar: user.avatar,
      fullName: user.fullName,
      referenceId: user.referenceId,
      tenantId: user.tenant ? user.tenant.id : null,
      tenantUpdated: false,
      phoneNumber: user.phoneNumber,
      department: user.department,
      address: user.address,
      lockedOut: user.lockedOut,
      roles: user.roles,
      metadata: user.metadata,
    };
    tenant.value = {
      id: user.tenant.id ?? "",
      parentId: null,
      referenceId: user.tenant.referenceId ?? "",
      name: user.tenant.name ?? "",
      childrens: [],
    };
    selectDepartments.value = user.department.split(",");
    remountTenant.value++;
  } else {
    selectDepartments.value = [];
  }

  if (user.metadata && user.metadata.length > 0) {
    const metaObj = JSON.parse(user.metadata) as Metadata;
    metadata.value.timezone = metaObj.timezone ?? 7;
  }
};

watch(
  () => props.isDrawerOpen,
  () => {
    if (props.isDrawerOpen) {
      getRoleNames();
      getDepartments();
      getUser();
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
      title="Update User"
      @cancel="handleDrawerModelValueUpdate(false)"
    >
      <template #beforeClose>
        <VBtn
          form="formUpdate"
          type="submit"
          color="primary"
          class="me-4"
          :loading="userStore.loading"
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
            id="formUpdate"
            ref="refFormUpdate"
            @submit.prevent="handleSubmit"
          >
            <VRow>
              <VCol cols="12">
                <VTextField
                  v-model="updateUser.fullName"
                  density="compact"
                  label="Full Name"
                  placeholder="John Doe"
                  :rules="[requiredValidator]"
                  :error-messages="errors?.FullName"
                />
              </VCol>

              <VCol cols="12" md="6">
                <VTextField
                  v-model="updateUser.userName"
                  density="compact"
                  label="Username"
                  placeholder="johnDoe012"
                  :rules="[requiredValidator]"
                  :error-messages="errors?.UserName"
                />
              </VCol>

              <VCol cols="12" md="6">
                <VTextField
                  v-model="updateUser.referenceId"
                  density="compact"
                  label="Staff ID"
                  placeholder="12qwe-qwd12-131-d1d12d"
                  :error-messages="errors?.ReferenceId"
                />
              </VCol>

              <VCol cols="12" md="6">
                <VTextField
                  v-model="updateUser.email"
                  density="compact"
                  label="Email"
                  placeholder="johndoe@email.com"
                  :rules="[requiredValidator, emailValidator]"
                  :error-messages="errors?.Email"
                />
              </VCol>

              <VCol cols="12" md="6">
                <VTextField
                  v-model="updateUser.phoneNumber"
                  density="compact"
                  label="Phone Number"
                  placeholder="+1 9876543210"
                  :error-messages="errors?.PhoneNumber"
                />
              </VCol>

              <VCol cols="12" md="6">
                <VTextField
                  v-model="updateUser.address"
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

              <VCol cols="6">
                <VSelect
                  v-model="updateUser.roles"
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

              <VCol cols="12" md="6">
                <TenantTreeview
                  :id="updateUser.tenantId ?? undefined"
                  @option="handleUpdateTenant"
                  prepend-inner-icon=""
                  :key="remountTenant"
                ></TenantTreeview>
              </VCol>

              <VCol cols="12" md="6">
                <VSwitch
                  v-model="updateUser.tenantUpdated"
                  density="compact"
                  label="Tenant Update"
                ></VSwitch>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>
