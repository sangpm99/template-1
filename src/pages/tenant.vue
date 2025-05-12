<script setup lang="ts">
import { useAbility } from "@casl/vue";

import { useTenantStore } from "@/stores/tenantStore";
import { getLocalStorageUser } from "@/stores/authorizeStore";
import type { Tenant } from "@/types/tenant";
import type { User } from "@/types/authorize";

import CreateUpdateTenantDrawer from "@/views/apps/tenants/CreateUpdateTenantDrawer.vue";

const { can } = useAbility();

definePage({
  meta: {
    action: "Read",
    subject: "Permission.Tenant",
  },
});

const headers = [
  { title: "Name", key: "name" },
  { title: "Actions", key: "actions", width: "50px" },
];
const currentUser: Ref<User | null> = ref(getLocalStorageUser());
const tenantStore = useTenantStore();

interface SortTenant extends Tenant {
  level: number;
}

const tenants = ref<Tenant[]>([]);
const sortedTenants = ref<SortTenant[]>([]);
const itemLength = ref<number>(0);
const selectedTenant = ref<Tenant>();
const isCreateUpdateTenantDrawerOpen = ref<boolean>(false);
const isConfirmDeleteTenantDialogVisible = ref<boolean>(false);

const getTenants = async () => {
  tenants.value = await tenantStore.getTenants();
  sortedTenants.value = sortTenants(tenants.value);
};

const sortTenants = (originTenant: Tenant[]): SortTenant[] => {
  let rawTenants = [...originTenant];
  let result: SortTenant[] = rawTenants
    .filter((tenant) => tenant.parentId === null)
    .map((tenant) => ({
      ...tenant,
      level: 0,
    }));

  rawTenants = rawTenants.filter((tenant) => tenant.parentId !== null);

  while (rawTenants.length > 0) {
    for (let i = 0; i < result.length; i++) {
      let matched = false;
      for (let j = 0; j < rawTenants.length; j++) {
        if (result[i].id === rawTenants[j].parentId) {
          result.splice(i + 1, 0, {
            ...rawTenants[j],
            level: result[i].level + 1,
          });
          rawTenants.splice(j, 1);
          matched = true;
          break;
        }
      }
      if (matched) {
        break;
      }
    }
  }

  return result;
};

const onOpenCreateTenant = () => {
  selectedTenant.value = undefined;
  isCreateUpdateTenantDrawerOpen.value = true;
};

const onOpenUpdateTenant = async (sortTenant: SortTenant) => {
  selectedTenant.value = {
    id: sortTenant.id,
    referenceId: sortTenant.referenceId,
    name: sortTenant.name,
    path: sortTenant.path,
    parentId: sortTenant.parentId,
    createdOnUtc: sortTenant.createdOnUtc,
  };
  isCreateUpdateTenantDrawerOpen.value = true;
};

const onOpenConfirmDeleteTenantDialog = async (sortTenant: SortTenant) => {
  selectedTenant.value = {
    id: sortTenant.id,
    referenceId: sortTenant.referenceId,
    name: sortTenant.name,
    path: sortTenant.path,
    parentId: sortTenant.parentId,
    createdOnUtc: sortTenant.createdOnUtc,
  };
  isConfirmDeleteTenantDialogVisible.value = true;
};

const onDeleteTenant = async (isDelete: boolean) => {
  if (isDelete && selectedTenant.value) {
    await tenantStore.deleteTenant(selectedTenant.value.id);
  }
  selectedTenant.value = undefined;
  await getTenants();
  sortedTenants.value = sortTenants(tenants.value);
};

onMounted(() => {
  if (can("Read", "Permission.Tenant")) {
    getTenants();
  }
});
</script>

<template>
  <section>
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardText>
            <div class="d-flex gap-4">
              <VTooltip
                text="Create"
                v-if="
                  can('Create', 'Permission.Tenant') &&
                  currentUser &&
                  !currentUser.tenantId
                "
              >
                <template #activator="{ props }">
                  <VBtn
                    v-bind="props"
                    icon="mdi-plus"
                    class="rounded"
                    @click="onOpenCreateTenant"
                  ></VBtn>
                </template>
              </VTooltip>
            </div>
          </VCardText>
        </VCard>
      </VCol>

      <VCol cols="12">
        <VCard>
          <VCardText>
            <VDataTableServer
              density="compact"
              :loading="tenantStore.loading"
              :items="sortedTenants"
              :items-length="itemLength"
              item-value="id"
              :headers="headers"
              hide-default-footer
              hover
              disable-sort
            >
              <template v-slot:item.name="{ item }">
                <p
                  class="mb-0"
                  :style="`margin-left: calc(${item.level} * 2rem)`"
                >
                  {{ item.name }}
                </p>
              </template>

              <template v-slot:item.actions="{ item }">
                <div class="d-flex">
                  <VTooltip
                    text="Edit"
                    v-if="can('Update', 'Permission.Tenant')"
                  >
                    <template v-slot:activator="{ props }">
                      <VBtn
                        v-bind="props"
                        icon="ri-edit-box-line"
                        class="rounded"
                        variant="text"
                        @click="onOpenUpdateTenant(item)"
                      ></VBtn>
                    </template>
                  </VTooltip>

                  <VTooltip
                    text="Delete"
                    v-if="
                      can('Delete', 'Permission.Tenant') &&
                      currentUser &&
                      !currentUser.tenantId
                    "
                  >
                    <template v-slot:activator="{ props }">
                      <VBtn
                        v-bind="props"
                        icon="ri-delete-bin-7-line"
                        class="rounded"
                        color="error"
                        variant="text"
                        @click="onOpenConfirmDeleteTenantDialog(item)"
                      ></VBtn>
                    </template>
                  </VTooltip>
                </div>
              </template>
            </VDataTableServer>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </section>

  <CreateUpdateTenantDrawer
    v-model:is-drawer-open="isCreateUpdateTenantDrawerOpen"
    :tenant="selectedTenant"
    @update="getTenants"
  ></CreateUpdateTenantDrawer>

  <ConfirmDialog
    v-model:isDialogVisible="isConfirmDeleteTenantDialogVisible"
    :confirmation-question="'Are you sure you want to delete this tenant?'"
    @confirm="(value) => onDeleteTenant(value)"
  ></ConfirmDialog>
</template>
