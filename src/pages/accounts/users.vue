<script lang="ts" setup>
import { avatarText } from "@/@core/utils/formatters";
import { randomAvatarColor, copyText } from "@/utils";
import { useAbility } from "@casl/vue";
import { pageIndex, pageSize, pageSizeOptions } from "@/enums";

import { useUserStore } from "@/stores/accounts/userStore";
import { getLocalStorageUser } from "@/stores/authorizeStore";
import type { PagedResponse } from "@/types";
import type {
  UpdateUserParams,
  Users,
  SearchQuery,
} from "@/types/accounts/users";
import type { User } from "@/types/authorize";

import CreateUserDrawer from "@/views/apps/accounts/users/CreateUserDrawer.vue";
import UpdateUserDrawer from "@/views/apps/accounts/users/UpdateUserDrawer.vue";
import GetActivitiesDrawer from "@/views/apps/accounts/users/GetActivitiesDrawer.vue";
import ConfirmDialog from "@/components/dialogs/ConfirmDialog.vue";

definePage({
  meta: {
    action: "Read",
    subject: "Permission.User",
  },
});

const { can } = useAbility();

const headers = [
  { title: "User", key: "user" },
  { title: "Staff Id", key: "staffId" },
  { title: "tenant", key: "tenant" },
  { title: "Department", key: "department" },
  { title: "Roles", key: "roles" },
  {
    title: "2FA Enabled",
    key: "twoFactorEnabled",
    width: "150px",
  },
  { title: "Lock Out", key: "lockedOut", width: "130px" },
  { title: "Actions", key: "actions", width: "150px" },
];

// Store
const userStore = useUserStore();

// State
const currentUser: Ref<User | null> = ref(getLocalStorageUser()); // yourself
const userId: Ref<string> = ref(""); // choose a user
const totalPage: Ref<number> = ref(1);
const isCreateUserDrawerOpen: Ref<boolean> = ref(false);
const isUpdateUserDrawerOpen: Ref<boolean> = ref(false);
const isGetActivitiesDrawerOpen: Ref<boolean> = ref(false);
const isConfirmDialogRemoveUserVisible: Ref<boolean> = ref(false);
const isConfirmDialogLockedOutVisible: Ref<boolean> = ref(false);

/// change lockout
const updateUserParams: Ref<UpdateUserParams> = ref({
  id: "",
  payload: [],
});

const getUsersParams: Ref<SearchQuery> = ref({
  pageIndex: pageIndex,
  pageSize: pageSize,
  searchValue: "",
});

const usersResponse: Ref<PagedResponse<Users> | null> = ref(null);

// Function
// - Get Users
const getUsers = async () => {
  usersResponse.value = await userStore.getUsers(getUsersParams.value);
  if (usersResponse.value) {
    totalPage.value = Math.ceil(
      usersResponse.value.itemsCount / usersResponse.value.pageSize,
    );
  }
};

// - Get Activities
const handleOpenGetActivitiesDrawer = (id: string) => {
  userId.value = id;
  isGetActivitiesDrawerOpen.value = true;
};

// - Edit User
const handleOpenUpdateUserDrawer = (id: string) => {
  userId.value = id;
  isUpdateUserDrawerOpen.value = true;
};

// - Change Lock Out
const handleOpenDialogLockedOut = async (id: string, lockedOut: boolean) => {
  userId.value = id;
  if (!lockedOut) {
    isConfirmDialogLockedOutVisible.value = true;
  } else {
    updateUserParams.value.payload = [];

    updateUserParams.value.id = userId.value;
    updateUserParams.value.payload.push({
      operationType: 0,
      op: "replace",
      path: "/lockedOut",
      value: false,
    });
    await userStore.updateUserPatch(updateUserParams.value);
  }
};

const handleChangeLockedOut = async (submit: boolean) => {
  if (submit) {
    updateUserParams.value.payload = [];

    updateUserParams.value.id = userId.value;
    updateUserParams.value.payload.push({
      operationType: 0,
      op: "replace",
      path: "/lockedOut",
      value: true,
    });
    await userStore.updateUserPatch(updateUserParams.value);
  }
  await getUsers();
};

// - Remove User
const handleOpenDialogRemove = (id: string) => {
  if (id) {
    userId.value = id;
    isConfirmDialogRemoveUserVisible.value = true;
  }
};

const handleRemove = async (isRemove: boolean) => {
  if (isRemove && userId.value) {
    try {
      await userStore.removeUser(userId.value);
      await getUsers();
    } catch (err) {}
  }
};

const onReset = () => {
  getUsersParams.value = {
    pageIndex: pageIndex,
    pageSize: pageSize,
  };
  getUsers();
};

onMounted(async () => {
  if (can("Read", "Permission.User")) {
    await getUsers();
  }
});
</script>

<template>
  <section v-if="can('Read', 'Permission.User')">
    <!-- Main -->
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardText>
            <VRow>
              <!-- Header -->
              <VCol cols="12">
                <VRow justify="space-between">
                  <VCol cols="auto">
                    <VTooltip text="Create">
                      <template v-slot:activator="{ props }">
                        <VBtn
                          v-bind="props"
                          icon="mdi-plus"
                          class="rounded"
                          v-if="can('Create', 'Permission.User')"
                          @click="isCreateUserDrawerOpen = true"
                        >
                        </VBtn>
                      </template>
                    </VTooltip>
                  </VCol>
                  <VCol cols="auto" class="d-flex gap-4">
                    <DepartmentSelect
                      v-model="getUsersParams.department"
                    ></DepartmentSelect>
                    <VTextField
                      v-model="getUsersParams.searchValue"
                      placeholder="Search User"
                      density="compact"
                      class="app-user-search-filter"
                      @keyup.enter="getUsers"
                      clearable
                      width="200"
                    />
                    <VBtn
                      class="rounded"
                      icon="ri-search-line"
                      @click="getUsers"
                      variant="outlined"
                    />
                    <VBtn
                      class="rounded"
                      icon="ri-filter-off-line"
                      color="error"
                      @click="onReset"
                      variant="outlined"
                    />
                  </VCol>
                </VRow>
              </VCol>
              <!-- /Header -->

              <!-- Table -->
              <VCol cols="12">
                <VDataTableServer
                  v-model:items-per-page="getUsersParams.pageSize"
                  v-model:page="getUsersParams.pageIndex"
                  :loading="userStore.loading"
                  :items="usersResponse ? usersResponse.items : []"
                  item-value="id"
                  :items-length="usersResponse ? usersResponse.itemsCount : 0"
                  :headers="headers"
                  hide-default-footer
                  disable-sort
                  density="compact"
                >
                  <!-- User -->
                  <template #item.user="{ item }">
                    <div class="d-flex align-center" style="width: 30%">
                      <VAvatar
                        size="34"
                        :variant="item.avatar ? undefined : 'tonal'"
                        :color="
                          item.avatar ? undefined : randomAvatarColor().color
                        "
                        class="me-3"
                      >
                        <VImg v-if="item.avatar" :src="item.avatar" />
                        <!-- Make avatar by first and last name -->
                        <span v-else>
                          {{
                            item.fullName
                              ? avatarText(item.fullName.split(" ")[0])
                              : avatarText("Avatar")
                          }}
                        </span>
                      </VAvatar>

                      <div class="d-flex flex-column">
                        <span class="text-link text-base font-weight-medium">
                          {{ item.fullName }}
                        </span>

                        <span class="text-sm text-medium-emphasis">{{
                          item.email
                        }}</span>
                      </div>
                    </div>
                  </template>

                  <template #item.staffId="{ item }">
                    <div>
                      <span>{{ item.referenceId }}</span>
                      <VTooltip v-if="item.referenceId" text="Copy">
                        <template v-slot:activator="{ props }">
                          <VIcon
                            v-bind="props"
                            icon="ri-file-copy-line"
                            size="x-small"
                            @click="copyText(item.referenceId)"
                          ></VIcon>
                        </template>
                      </VTooltip>
                    </div>
                  </template>

                  <template #item.tenant="{ item }">
                    {{ item.tenant ? item.tenant.name : "" }}
                  </template>

                  <!-- Department -->
                  <template #item.department="{ item }">
                    <div class="d-flex gap-2">
                      <span class="text-high-emphasis">{{
                        item.department
                      }}</span>
                    </div>
                  </template>

                  <!-- Roles -->
                  <template #item.roles="{ item }">
                    <div class="d-flex gap-2">
                      <span class="text-high-emphasis">{{
                        item.roles.join(", ")
                      }}</span>
                    </div>
                  </template>

                  <!-- 2FA -->
                  <template #item.twoFactorEnabled="{ item }">
                    <VChip
                      :color="item.twoFactorEnabled ? 'success' : 'secondary'"
                      size="small"
                    >
                      {{ item.twoFactorEnabled ? "Enabled" : "Disabled" }}
                    </VChip>
                  </template>

                  <!-- lockedOut -->
                  <template #item.lockedOut="{ item }">
                    <VSwitch
                      id="customizer-semi-dark"
                      v-model="item.lockedOut"
                      class="ms-2"
                      :disabled="currentUser?.id === item.id"
                      @click="
                        handleOpenDialogLockedOut(item.id, item.lockedOut)
                      "
                    />
                  </template>

                  <!-- Actions -->
                  <template #item.actions="{ item }">
                    <div class="d-flex gap-2">
                      <VTooltip text="Activities">
                        <template v-slot:activator="{ props }">
                          <VBtn
                            v-bind="props"
                            variant="text"
                            icon="ri-eye-line"
                            color="info"
                            size="small"
                            @click="handleOpenGetActivitiesDrawer(item.id)"
                          />
                        </template>
                      </VTooltip>

                      <VTooltip text="Edit">
                        <template v-slot:activator="{ props }">
                          <VBtn
                            v-bind="props"
                            :disabled="
                              !(
                                currentUser?.id !== item.id &&
                                can('Update', 'Permission.User')
                              )
                            "
                            variant="text"
                            icon="ri-edit-box-line"
                            size="small"
                            @click="handleOpenUpdateUserDrawer(item.id)"
                          ></VBtn>
                        </template>
                      </VTooltip>

                      <VTooltip text="Delete">
                        <template v-slot:activator="{ props }">
                          <VBtn
                            v-bind="props"
                            :disabled="
                              !(
                                currentUser?.id !== item.id &&
                                can('Delete', 'Permission.User')
                              )
                            "
                            variant="text"
                            icon="ri-delete-bin-7-line"
                            color="error"
                            size="small"
                            @click="handleOpenDialogRemove(item.id)"
                          />
                        </template>
                      </VTooltip>
                    </div>
                  </template>

                  <template #bottom>
                    <VRow class="align-center border-t-thin mt-1 mx-1 pt-2">
                      <div class="ms-5">Page Size:</div>
                      <div class="ms-1">
                        <VSelect
                          v-model="getUsersParams.pageSize"
                          :items="pageSizeOptions"
                          variant="outlined"
                          density="compact"
                          @update:model-value="getUsers"
                        />
                      </div>
                      <div>
                        <VPagination
                          v-model="getUsersParams.pageIndex"
                          :length="totalPage"
                          total-visible="6"
                          @update:model-value="getUsers"
                        />
                      </div>
                    </VRow>
                  </template>
                </VDataTableServer>
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <CreateUserDrawer
      v-model:is-drawer-open="isCreateUserDrawerOpen"
      @update:submit="getUsers"
    />

    <UpdateUserDrawer
      v-model:is-drawer-open="isUpdateUserDrawerOpen"
      :user-id="userId"
      @update:submit="getUsers"
    />

    <GetActivitiesDrawer
      v-model:is-drawer-open="isGetActivitiesDrawerOpen"
      :user-id="userId"
    />

    <ConfirmDialog
      v-model:isDialogVisible="isConfirmDialogLockedOutVisible"
      confirmation-question="Are you sure you want to block this user?"
      @confirm="(value) => handleChangeLockedOut(value)"
    />

    <ConfirmDialog
      v-model:isDialogVisible="isConfirmDialogRemoveUserVisible"
      confirmation-question="Are you sure you want to delete this user?"
      @confirm="(value) => handleRemove(value)"
    />
  </section>
</template>

<style lang="scss" scoped>
.app-user-search-filter {
  inline-size: 15.625rem;
}
</style>
