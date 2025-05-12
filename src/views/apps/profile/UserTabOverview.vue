<script setup lang="ts">
import { useDateFormatter } from "@/composables/useDateFormatter";
import { useUserStore } from "@/stores/accounts/userStore";
import { getLocalStorageUser } from "@/stores/authorizeStore";
import type { SearchQuery } from "@/types";
import type { User } from "@/types/authorize";
import type { Activity } from "@/types/accounts/users";
import ConfirmDialog from "@/components/dialogs/ConfirmDialog.vue";

// Store
const userStore = useUserStore();

// State
const activities: Ref<Activity[]> = ref([]);
const isConfirmDialogRevokeAllTokensVisible: Ref<boolean> = ref(false);
const isConfirmDialogRevokeTokenVisible: Ref<boolean> = ref(false);
const user: Ref<User | null> = ref(getLocalStorageUser());

// Initial State
const getActivityParams: Ref<SearchQuery> = ref({
  pageIndex: 1,
  pageSize: 10,
});

const signInAt = ref<string>("");

// Functions
const getActivities = async () => {
  if (user.value) {
    activities.value = await userStore.getActivities(
      user.value.id,
      getActivityParams.value,
    );
  } else {
    window.location.href = "/login";
  }
};

const handleRevokeAll = async (value: boolean) => {
  if (value) {
    user.value && (await userStore.revokeAllJWTTokens(user.value.id));
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  }
};

const handleRevokeToken = async (value: boolean) => {
  if (value) {
    if (user.value) {
      await userStore.revokeJWTToken(user.value.id, signInAt.value);
    }
    await getActivities();
  }
};

onMounted(() => {
  getActivities();
});
</script>

<template>
  <VRow>
    <VCol cols="12">
      <section>
        <VCard title="Recent Activities">
          <VTable hover class="w-100">
            <thead>
              <tr>
                <th class="text-left">Section Information</th>
                <th class="text-left">IP</th>
                <th class="text-left">User Agent</th>
                <th class="text-center">
                  <VBtn
                    color="error"
                    size="small"
                    density="compact"
                    class="btn-revoke"
                    @click="isConfirmDialogRevokeAllTokensVisible = true"
                  >
                    Revoke All
                  </VBtn>
                </th>
              </tr>
            </thead>
            <tbody v-if="activities">
              <tr v-for="(activity, index) in activities" :key="index">
                <td class="py-5">
                  Sign In At:
                  {{ useDateFormatter().fromUnix(Number(activity.SignedInAt)) }}
                  <br />
                  Expire At:
                  {{ useDateFormatter().fromUnix(Number(activity.ExpiresAt)) }}
                </td>
                <td>
                  {{ activity.IpAddress }}
                </td>
                <td style="width: 40%">
                  {{ activity.UserAgent }}
                </td>
                <td class="text-center">
                  <VBtn
                    :color="activity.Blocked ? 'grey' : 'warning'"
                    :disabled="activity.Blocked"
                    size="small"
                    density="compact"
                    class="btn-revoke"
                    @click="
                      () => {
                        isConfirmDialogRevokeTokenVisible = true;
                        signInAt = activity.SignedInAt;
                      }
                    "
                  >
                    Revoke
                  </VBtn>
                </td>
              </tr>
            </tbody>
          </VTable>
          <!-- !SECTION -->
        </VCard>
      </section>
    </VCol>
  </VRow>
  <ConfirmDialog
    v-model:isDialogVisible="isConfirmDialogRevokeAllTokensVisible"
    confirmation-question="Are you sure to revoke all sections?"
    @confirm="(value) => handleRevokeAll(value)"
  />

  <ConfirmDialog
    v-model:isDialogVisible="isConfirmDialogRevokeTokenVisible"
    confirmation-question="Are you sure to revoke this sections?"
    @confirm="(value) => handleRevokeToken(value)"
  />
</template>

<style lang="scss" scoped>
.btn-revoke {
  width: 6rem;
}
</style>
