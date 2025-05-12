<script setup lang="ts">
import { requiredValidator } from "@/@core/utils/validators";
import { useNavigationDrawerEscHandler } from "@/composables";
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import { VForm } from "vuetify/components";
import { VTreeview } from "vuetify/labs/components";

import { useRoleStore } from "@/stores/accounts/roleStore";
import type { ErrorResponse } from "@/types";
import type {
  RoleDetail,
  UpdateRole,
  ValidateErrors,
} from "@/types/accounts/roles";

const props = defineProps<Props>();
const emit = defineEmits<Emit>();

interface Props {
  roleId: string;
  isDrawerOpen: boolean;
}
interface Emit {
  (e: "update:isDrawerOpen", value: boolean): void;
  (e: "submit", value: boolean): void;
}
interface PermissionNode {
  id: number;
  title: string;
  name?: string;
  children?: PermissionNode[];
}
const roleStore = useRoleStore();
const loading: Ref<boolean> = ref(false);
const permissions: Ref<string[]> = ref([]);
const data: Ref<PermissionNode[]> = ref([]);
const items: Ref<PermissionNode[]> = ref([]);
const selected: Ref<number[]> = ref([]);
const role = ref<RoleDetail>();
const updateRole: Ref<UpdateRole> = ref({
  name: "",
  permissions: [],
});
const refForm = ref<VForm>();
const errors: Ref<ValidateErrors | null> = ref(null);

const handleDrawerModelValueUpdate = (val: boolean) => {
  refForm.value?.reset();
  refForm.value?.resetValidation();
  selected.value = [];
  updateRole.value = {
    name: "",
    permissions: [],
  };
  emit("update:isDrawerOpen", val);
};

useNavigationDrawerEscHandler("Escape", () =>
  handleDrawerModelValueUpdate(false),
);

let uniqueId = 2;

const transformPermissions = (permissions: string[]): PermissionNode[] => {
  const result: PermissionNode[] = [];

  permissions.forEach((permission) => {
    const parts: string[] = permission.split(".");

    parts.shift();
    let currentLevel: PermissionNode[] = result;

    parts.forEach((part: string, index: number) => {
      let existingNode = currentLevel.find((item) => item.title === part);

      if (!existingNode) {
        existingNode = { id: uniqueId++, title: part, children: [] };
        currentLevel.push(existingNode);
      }

      if (!existingNode.children) existingNode.children = [];

      currentLevel = existingNode.children;

      if (index === parts.length - 1) {
        existingNode.name = permission;
        delete existingNode.children;
      }
    });
  });

  return result;
};

const getNamesByIds = (ids: number[]): string[] => {
  const names: string[] = [];

  const findNames = (items: PermissionNode[]) => {
    items.forEach((item) => {
      if (ids.includes(item.id)) {
        if (item.name) names.push(item.name);
      }

      if (item.children) findNames(item.children);
    });
  };

  findNames(items.value);

  return names;
};

const getIdsByNames = (names: string[]): number[] => {
  const ids: number[] = [];

  const findIds = (items: PermissionNode[]) => {
    items.forEach((item) => {
      if (item.name && names.includes(item.name)) ids.push(item.id);

      if (item.children) findIds(item.children);
    });
  };

  findIds(items.value);

  return ids;
};

const handleSubmit = async () => {
  refForm.value?.validate().then(async ({ valid }) => {
    if (valid) {
      const selectedPermissions = getNamesByIds(selected.value);
      try {
        if (props.roleId && role.value) {
          updateRole.value.permissions = selectedPermissions;
          await roleStore.updateRole(role.value.id, updateRole.value);
          handleDrawerModelValueUpdate(false);
          emit("submit", true);
        }
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

watch(
  () => props.isDrawerOpen,
  async (value) => {
    if (props.roleId && value) {
      loading.value = true;
      permissions.value = await roleStore.getPermissions();
      data.value = transformPermissions(permissions.value);
      items.value = [
        {
          id: 1,
          title: "All Permission",
          children: [...data.value],
        },
      ];

      role.value = await roleStore.getRole(props.roleId);
      selected.value = getIdsByNames(role.value.permissions);
      updateRole.value.name = role.value.name;
      loading.value = false;
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
      title="Update Role"
      @cancel="handleDrawerModelValueUpdate(false)"
    >
      <template #beforeClose>
        <VBtn
          form="formUpdateRole"
          type="submit"
          color="primary"
          class="me-4"
          :loading="roleStore.loading"
          size="small"
        >
          Submit
        </VBtn>
      </template>
    </AppDrawerHeaderSection>

    <VDivider />

    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText v-if="props.isDrawerOpen">
          <Loading v-if="loading" :quantity="2" />
          <VForm
            v-else
            id="formUpdateRole"
            ref="refForm"
            @submit.prevent="handleSubmit"
            class="w-100"
          >
            <VRow>
              <VCol cols="12">
                <!-- Replace -->
                <label>Role Name</label>
                <VTextField
                  v-model="updateRole.name"
                  density="compact"
                  placeholder="Admin"
                  :rules="[requiredValidator]"
                  :error-messages="errors?.RoleName"
                />
              </VCol>

              <VCol cols="12">
                <label>Permission</label>
                <VTreeview
                  v-model:selected="selected"
                  :items="items"
                  item-value="id"
                  item-title="title"
                  select-strategy="classic"
                  selectable
                  collapse-icon="ri-arrow-up-s-fill"
                  expand-icon="ri-arrow-down-s-fill"
                  open-all
                  class="custom-radius"
                  :error-messages="errors?.Permissions"
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
.custom-radius {
  border-radius: 8px 0 0 8px;
}

.custom-radius.v-theme--light {
  border: 1px solid #cfd0d6;
}

.custom-radius.v-theme--dark {
  border: 1px solid #545670;
}
</style>
