<script setup lang="ts">
import { avatarText } from "@/@core/utils/formatters";
import { useUserStore } from "@/stores/user";
import {
  getLocalStorageUser,
  setLocalStorageUser,
  useAuthorizeStore,
} from "@/stores/authorize";
import type { Metadata, User } from "@/types/accounts/users";
import UpdateProfileDrawer from "@/views/apps/profile/UpdateProfileDrawer.vue";

// Props & Emits
interface Emit {
  (e: "twoFactorEnabled", value: boolean): void;
}
const emit = defineEmits<Emit>();

const resolveUserRoleVariant = (role: string) => {
  if (role === "subscriber") return { color: "primary", icon: "ri-user-line" };
  if (role === "author")
    return { color: "warning", icon: "ri-settings-2-line" };
  if (role === "maintainer")
    return { color: "success", icon: "ri-database-2-line" };
  if (role === "editor") return { color: "info", icon: "ri-pencil-line" };
  if (role === "SuperAdmin") return { color: "error", icon: "ri-server-line" };
  if (role === "Designer") return { color: "warning", icon: "ri-server-line" };

  return { color: "primary", icon: "ri-user-line" };
};

const userLocal = getLocalStorageUser();

// Stores
const userStore = useUserStore();
const authorizeStore = useAuthorizeStore();

// States
const isUpdateProfileDrawerOpen: Ref<boolean> = ref(false);
const user: Ref<User | null> = ref(null);
const metadata = ref<Metadata>();

// Functions
const getData = async () => {
  if (userLocal) {
    user.value = await userStore.getUser(userLocal.id);
    emit("twoFactorEnabled", user.value.twoFactorEnabled);
    if (user.value) {
      userLocal.userName = user.value.userName;
      userLocal.email = user.value.email;
      userLocal.phoneNumber = user.value.phoneNumber;
      userLocal.fullName = user.value.fullName;
      userLocal.department = user.value.department;
      userLocal.address = user.value.address;
      userLocal.metadata = user.value.metadata;
      setLocalStorageUser({
        ...userLocal,
      });
      if (user.value.metadata) {
        metadata.value = JSON.parse(user.value.metadata) as Metadata;
      }
    }
  }
};

onMounted(() => {
  getData();
});

const logOut = async () => {
  await authorizeStore.logOut();
  window.location.href = "/login";
};

const handleUpdated = (value: boolean) => {
  if (value) getData();
};
</script>

<template>
  <VRow>
    <!-- SECTION User Details -->
    <VCol cols="12">
      <VCard>
        <VSkeletonLoader
          v-if="userStore.loading"
          loading
          type="table-heading, list-item-two-line, image, table-tfoot"
        />
        <div v-else>
          <VCardText class="text-center pt-12 pb-6">
            <!-- 👉 Avatar -->
            <VAvatar
              rounded="lg"
              :size="120"
              :color="user && user.avatar ? user.avatar : 'primary'"
              :variant="user && user.avatar ? undefined : 'tonal'"
            >
              <VImg v-if="user && user.avatar" :src="user.avatar" />
              <span v-else class="text-5xl font-weight-medium">
                {{
                  user && user.fullName
                    ? avatarText(user.fullName)
                    : avatarText("Avatar")
                }}
              </span>
            </VAvatar>

            <!-- 👉 User fullName -->
            <h5 class="text-h5 mt-4">
              {{ user?.fullName }}
            </h5>

            <!-- 👉 Roles chip -->
            <VChip
              v-if="user"
              v-for="(role, index) in user.roles"
              :key="index"
              :color="resolveUserRoleVariant(role).color"
              size="small"
              class="mt-4 me-1"
            >
              {{ role }}
            </VChip>
          </VCardText>

          <!-- 👉 Details -->
          <VCardText class="pb-6">
            <VDivider class="my-4" />

            <!-- 👉 User Details list -->
            <VList class="card-list">
              <VListItem>
                <VListItemTitle class="text-sm">
                  <span class="font-weight-medium"> Full Name: </span>
                  <span class="text-body-1">{{ user?.fullName }}</span>
                </VListItemTitle>
              </VListItem>

              <VListItem>
                <VListItemTitle class="text-sm">
                  <span class="font-weight-medium"> Username: </span>
                  <span class="text-body-1">
                    {{ user?.userName }}
                  </span>
                </VListItemTitle>
              </VListItem>

              <VListItem>
                <VListItemTitle class="text-sm">
                  <span class="font-weight-medium"> Email: </span>
                  <span class="text-body-1">{{ user?.email }}</span>
                </VListItemTitle>
              </VListItem>

              <VListItem>
                <VListItemTitle class="text-sm">
                  <span class="font-weight-medium"> Phone Number: </span>
                  <span class="text-body-1">{{ user?.phoneNumber }}</span>
                </VListItemTitle>
              </VListItem>

              <VListItem>
                <VListItemTitle class="text-sm">
                  <span class="font-weight-medium"> Department: </span>
                  <span class="text-body-1">{{ user?.department }}</span>
                </VListItemTitle>
              </VListItem>

              <VListItem>
                <VListItemTitle class="text-sm">
                  <span class="font-weight-medium">Roles: </span>
                  <span class="text-capitalize text-body-1">
                    {{ user && user.roles && user.roles.join(", ") }}
                  </span>
                </VListItemTitle>
              </VListItem>

              <VListItem>
                <VListItemTitle class="text-sm">
                  <span class="font-weight-medium">2FA: </span>
                  <span class="text-capitalize text-body-1">
                    <VChip
                      v-if="user"
                      :color="user.twoFactorEnabled ? 'success' : 'secondary'"
                      size="small"
                      class="text-capitalize me-1"
                    >
                      {{ user.twoFactorEnabled ? "Enabled" : "Disabled" }}
                    </VChip>
                  </span>
                </VListItemTitle>
              </VListItem>

              <VListItem>
                <VListItemTitle class="text-sm">
                  <span class="font-weight-medium">Time Zone: </span>
                  <span class="text-capitalize text-body-1">
                    {{ metadata?.timezone }}</span
                  >
                </VListItemTitle>
              </VListItem>
            </VList>
          </VCardText>

          <!-- 👉 Edit button -->
          <VCardText class="d-flex justify-center">
            <VBtn
              variant="elevated"
              class="me-4"
              @click="isUpdateProfileDrawerOpen = true"
            >
              Edit
            </VBtn>

            <VBtn color="error" variant="elevated" class="me-4" @click="logOut">
              Log Out
            </VBtn>
          </VCardText>
        </div>
      </VCard>
    </VCol>
    <!-- !SECTION -->
  </VRow>

  <!-- 👉 Edit user info dialog -->
  <UpdateProfileDrawer
    v-if="user && user.id.length !== 0"
    v-model:is-drawer-open="isUpdateProfileDrawerOpen"
    :user="user"
    @update:submit="(value: boolean) => handleUpdated(value)"
  />
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 0.5rem;
}

.current-plan {
  border: 2px solid rgb(var(--v-theme-primary));
}
</style>
