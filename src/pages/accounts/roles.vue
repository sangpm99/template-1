<script setup lang="ts">
import { avatarText } from "@/@core/utils/formatters";
import { pageIndex } from "@/enums";
import { useRoleStore } from "@/stores/accounts/roleStore";
import type { Role, SearchQueryGetRoles } from "@/types/accounts/roles";
import { useAbility } from "@casl/vue";
import { hydrateOnIdle } from "vue";

// 👉 Configs
definePage({
  meta: {
    action: "Read",
    subject: "Permission.Role",
  },
});

const ConfirmDialog = defineAsyncComponent({
  loader: () => import("@/components/dialogs/ConfirmDialog.vue"),
  hydrate: hydrateOnIdle(),
});

const CreateRoleDrawer = defineAsyncComponent({
  loader: () => import("@/views/apps/accounts/roles/CreateRoleDrawer.vue"),
  hydrate: hydrateOnIdle(),
});

const UpdateRoleDrawer = defineAsyncComponent({
  loader: () => import("@/views/apps/accounts/roles/UpdateRoleDrawer.vue"),
  hydrate: hydrateOnIdle(),
});

const { can } = useAbility();

// 👉 Stores
const roleStore = useRoleStore();

// 👉 States
/// get roles
const loading: Ref<boolean> = ref(false);
const searchQueryGetRoles: Ref<SearchQueryGetRoles> = ref({
  pageIndex: pageIndex,
  pageSize: 200,
  limitUsersPerRole: 200,
});
const roles: Ref<Role[]> = ref([]);
const seletedRoleId: Ref<string> = ref("");
/// create
const isCreateDrawerOpen: Ref<boolean> = ref(false);
/// update
const isUpdateDrawerOpen: Ref<boolean> = ref(false);
/// delete
const isConfirmDialog: Ref<boolean> = ref(false);

// 👉 Functions
const getRoles = async () => {
  loading.value = true;
  try {
    const data = await roleStore.getRoles(searchQueryGetRoles.value);
    roles.value = data.items;
  } catch {
  } finally {
    loading.value = false;
  }
};

const resolveUserRoleVariant = () => {
  const colorArr: string[] = ["success", "error", "info", "warning", "primary"];

  const random = (color: string[]): string => {
    const randomIndex = Math.floor(Math.random() * color.length);

    return color[randomIndex];
  };

  return { color: random(colorArr), icon: "ri-user-line" };
};

const confirmRemoveRole = (id: string) => {
  seletedRoleId.value = id;
  isConfirmDialog.value = true;
};

const handleRemoveRole = async (value: boolean) => {
  if (value) {
    await roleStore.deleteRole(seletedRoleId.value);
    getRoles();
  }
};

const handleEditRoleDialogVisible = (id: string) => {
  seletedRoleId.value = id;
  isUpdateDrawerOpen.value = true;
};

onMounted(async () => {
  getRoles();
});
</script>

<template>
  <section v-if="can('Read', 'Permission.Role')">
    <VRow>
      <VCol cols="12">
        <VTooltip text="Create">
          <template v-slot:activator="{ props }">
            <VBtn
              v-bind="props"
              class="rounded"
              icon="mdi-plus"
              v-if="can('Create', 'Permission.Role')"
              @click="isCreateDrawerOpen = true"
            >
            </VBtn>
          </template>
        </VTooltip>
      </VCol>

      <VCol cols="6" md="3" v-if="loading" v-for="n in 12">
        <Loading />
      </VCol>
      <!-- 👉 Roles  -->
      <VCol cols="12" v-else>
        <VRow>
          <VCol v-for="role in roles" :key="role.id" cols="12" sm="6" lg="3">
            <VCard>
              <VCardText class="d-flex align-center pb-4">
                <span>Total {{ role.usersCount }} users</span>

                <VSpacer />

                <div class="v-avatar-group">
                  <template v-for="(user, index) in role.users" :key="user">
                    <!-- Show avatar if role.usersCount <= 4 -->
                    <VAvatar
                      v-if="role.usersCount <= 4"
                      size="40"
                      :variant="!user.avatar ? 'tonal' : undefined"
                      :color="
                        !user.avatar
                          ? resolveUserRoleVariant().color
                          : undefined
                      "
                    >
                      <VImg v-if="user.avatar" :src="user.avatar" />
                      <span v-else>
                        {{
                          user?.fullName && user.fullName.length > 0
                            ? avatarText(user.fullName.split(" ")[0])
                            : avatarText("Avatar")
                        }}
                      </span>
                    </VAvatar>

                    <!-- Handle avatars for more than 4 users with limit on display -->
                    <VAvatar
                      v-if="role.usersCount > 4 && index < 3"
                      size="40"
                      :variant="!user.avatar ? 'tonal' : undefined"
                      :color="
                        !user.avatar
                          ? resolveUserRoleVariant().color
                          : undefined
                      "
                    >
                      <VImg v-if="user.avatar" :src="user.avatar" />
                      <span v-else>
                        {{
                          user?.fullName && user.fullName.length > 0
                            ? avatarText(user.fullName.split(" ")[0])
                            : avatarText("Avatar")
                        }}
                      </span>
                    </VAvatar>
                  </template>

                  <!-- Extra avatar for counts > 4 -->
                  <VAvatar v-if="role.usersCount > 4" size="40" color="#F0EFF0">
                    <span class="text-high-emphasis"
                      >+{{ role.usersCount - 3 }}</span
                    >
                  </VAvatar>

                  <!-- And No user -->
                  <VAvatar
                    v-if="role.usersCount === 0"
                    size="40"
                    color="#F0EFF0"
                  >
                    <span class="text-high-emphasis">0</span>
                  </VAvatar>
                </div>
              </VCardText>

              <VCardText>
                <div class="d-flex justify-space-between align-end">
                  <div>
                    <h5 class="text-h5 mb-1">
                      {{ role.name }}
                    </h5>
                    <a
                      v-if="can('Update', 'Permission.Role')"
                      href="javascript:void(0)"
                      @click="handleEditRoleDialogVisible(role.id)"
                    >
                      Edit Role
                    </a>
                  </div>

                  <VTooltip text="Delete">
                    <template v-slot:activator="{ props }">
                      <IconBtn
                        v-bind="props"
                        v-if="can('Delete', 'Permission.Role')"
                        color="error"
                        class="mt-n2"
                        @click="confirmRemoveRole(role.id)"
                      >
                        <VIcon icon="ri-delete-bin-line" />
                      </IconBtn>
                    </template>
                  </VTooltip>
                </div>
              </VCardText>
            </VCard>
          </VCol>
          <!--  -->
        </VRow>
      </VCol>
    </VRow>

    <ConfirmDialog
      v-model:isDialogVisible="isConfirmDialog"
      confirmation-question="Are you sure to delete this role?"
      @confirm="(value) => handleRemoveRole(value)"
    />

    <CreateRoleDrawer
      v-model:is-drawer-open="isCreateDrawerOpen"
      @update:submit="getRoles"
    />

    <UpdateRoleDrawer
      v-model:is-drawer-open="isUpdateDrawerOpen"
      :role-id="seletedRoleId"
      @submit="getRoles"
    />
  </section>
</template>
