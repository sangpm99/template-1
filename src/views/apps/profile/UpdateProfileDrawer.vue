<script lang="ts" setup>
import { requiredValidator } from "@/@core/utils/validators";
import { useNavigationDrawerEscHandler } from "@/composables";
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import { VForm } from "vuetify/components/VForm";

import { useUserStore } from "@/stores/accounts/userStore";
import { useConfigurationStore } from "@/stores/configurationStore";
import type { ErrorResponse } from "@/types";
import type {
  User,
  ChangeProfileParams,
  Metadata,
  ValidateErrorsUser as ValidateErrors,
} from "@/types/accounts/users";

interface Props {
  isDrawerOpen: boolean;
  user: User;
}
interface Emit {
  (e: "update:isDrawerOpen", value: boolean): void;
  (e: "update:submit", value: boolean): void;
}
const props = defineProps<Props>();
const emit = defineEmits<Emit>();
const userStore = useUserStore();
const configurationStore = useConfigurationStore();
const refForm = ref<VForm>();
const departments: Ref<string[]> = ref([]);
const changeProfileParams: Ref<ChangeProfileParams> = ref({
  userName: "",
  email: "",
  phoneNumber: "",
  fullName: "",
  department: null,
  address: "",
  metadata: "",
});
const metadata = ref<Metadata>({
  timezone: 0,
  TelegramId: "",
});

const getData = () => {
  changeProfileParams.value.userName = props.user.userName;
  changeProfileParams.value.email = props.user.email;
  changeProfileParams.value.phoneNumber = props.user.phoneNumber;
  changeProfileParams.value.fullName = props.user.fullName;
  changeProfileParams.value.department = props.user.department;
  changeProfileParams.value.address = props.user.address;
  changeProfileParams.value.metadata = props.user.metadata;
  if (props.user.metadata) {
    metadata.value = JSON.parse(props.user.metadata) as Metadata;
  }
};
const errors: Ref<ValidateErrors | null> = ref(null);

const handleDrawerModelValueUpdate = (val: boolean) => {
  refForm.value?.reset();
  refForm.value?.resetValidation();
  emit("update:isDrawerOpen", val);
};

const getDepartments = async () => {
  departments.value = await configurationStore.getDepartments();
};

const handleSubmit = () => {
  refForm.value?.validate().then(async ({ valid }) => {
    if (valid) {
      try {
        if (metadata.value) {
          changeProfileParams.value.metadata = JSON.stringify(metadata.value);
        }
        await userStore.changeProfile(changeProfileParams.value);
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

useNavigationDrawerEscHandler("Escape", () =>
  handleDrawerModelValueUpdate(false),
);

watch(
  () => props.isDrawerOpen,
  (value) => {
    if (value) {
      getData();
      getDepartments();
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
    <!-- replace -->
    <AppDrawerHeaderSection
      title="Update Profile"
      @cancel="handleDrawerModelValueUpdate(false)"
    >
      <template #beforeClose>
        <VBtn
          form="form"
          type="submit"
          color="primary"
          class="me-4"
          size="small"
        >
          Submit
        </VBtn>
      </template>
    </AppDrawerHeaderSection>

    <VDivider />

    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText>
          <VForm id="form" ref="refForm" @submit.prevent="handleSubmit">
            <VRow>
              <!-- 👉 First Name -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="changeProfileParams.fullName"
                  label="Full Name"
                  placeholder="John Doe"
                  :rules="[requiredValidator]"
                  :error-messages="errors?.FullName"
                />
              </VCol>

              <!-- 👉 User Name  -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="changeProfileParams.userName"
                  label="Username"
                  placeholder="johndoe012"
                  :rules="[requiredValidator]"
                  :error-messages="errors?.UserName"
                />
              </VCol>

              <!-- 👉 Billing Email -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="changeProfileParams.email"
                  label="Email"
                  placeholder="johndoe@email.com"
                  :rules="[requiredValidator]"
                  :error-messages="errors?.Email"
                />
              </VCol>

              <!-- 👉 Phone Number -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="changeProfileParams.phoneNumber"
                  label="Phone"
                  placeholder="+1 9876543210"
                  :error-messages="errors?.PhoneNumber"
                />
              </VCol>

              <!-- 👉 Address -->
              <VCol cols="12" md="6">
                <VTextField
                  v-model="changeProfileParams.address"
                  label="Address"
                  placeholder="United State"
                  :error-messages="errors?.Address"
                />
              </VCol>

              <!-- 👉 Department -->
              <VCol cols="12" md="6">
                <VSelect
                  v-model="changeProfileParams.department"
                  :items="departments"
                  label="Department"
                  :error-messages="errors?.Department"
                />
              </VCol>

              <VCol cols="6">
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

              <VCol cols="6">
                <VTextField
                  v-model="metadata.TelegramId"
                  density="compact"
                  label="Telegram ID"
                  placeholder="123-abc-456-def"
                />
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>
