<script lang="ts" setup>
import { useNavigationDrawerEscHandler } from "@/composables";
import { useDateFormatter } from "@/composables/useDateFormatter";
import { PerfectScrollbar } from "vue3-perfect-scrollbar";

import { useUserStore } from "@/stores/accounts/userStore";
import type { SearchQuery } from "@/types";
import type { Activity } from "@/types/accounts/users";

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
const userStore = useUserStore();
const activities: Ref<Activity[]> = ref([]);
const isConfirmDialogRevokeAllTokensVisible: Ref<boolean> = ref(false);
const isConfirmDialogRevokeTokenVisible: Ref<boolean> = ref(false);
const isLoadMore: Ref<boolean> = ref(false);
const nextActivities: Ref<Activity[]> = ref([]);
const getActivityParams: Ref<SearchQuery> = ref({
  pageIndex: 1,
  pageSize: 20,
});
const signInAt = ref<string>("");
const nextGetActivityParams: Ref<SearchQuery> = ref({
  pageIndex: 1,
  pageSize: 20,
});

const handleDrawerModelValueUpdate = (val: boolean) => {
  emit("update:isDrawerOpen", val);
};

useNavigationDrawerEscHandler("Escape", () =>
  handleDrawerModelValueUpdate(false),
);

const getLoadMore = async () => {
  nextGetActivityParams.value.pageIndex++;
  nextActivities.value = await userStore.getActivities(
    props.userId,
    nextGetActivityParams.value,
  );
  isLoadMore.value = nextActivities.value.length !== 0;
};

const getActivities = async () => {
  if (props.userId) {
    activities.value = await userStore.getActivities(
      props.userId,
      getActivityParams.value,
    );
    await getLoadMore();
  }
};

const handleLoadMore = async () => {
  activities.value = [...activities.value, ...nextActivities.value];
  await getLoadMore();
};

const handleRevokeAll = async (value: boolean) => {
  if (value) {
    props.userId && (await userStore.revokeAllJWTTokens(props.userId));
    setTimeout(() => {
      getActivities();
    }, 1000);
  }
};

const handleRevokeToken = async (value: boolean) => {
  if (value) {
    if (props.userId) {
      await userStore.revokeJWTToken(props.userId, signInAt.value);
    }
    await getActivities();
  }
};

watch(
  () => props.isDrawerOpen,
  (value) => {
    if (value) {
      getActivities();
    }
  },
);
</script>

<template>
  <VNavigationDrawer
    :model-value="props.isDrawerOpen"
    location="end"
    width="1500"
    temporary
    border="none"
    class="scrollable-content"
    order="10"
    @update:model-value="handleDrawerModelValueUpdate"
  >
    <AppDrawerHeaderSection
      title="Activities"
      @cancel="handleDrawerModelValueUpdate(false)"
    >
    </AppDrawerHeaderSection>

    <VDivider />

    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText>
          <VTable>
            <thead>
              <tr>
                <th class="text-left">Sign In At</th>
                <th class="text-left">Expire At</th>
                <th class="text-left">IP</th>
                <th class="text-left">User Agent</th>
                <th class="text-left">
                  <VBtn
                    size="small"
                    color="error"
                    density="compact"
                    class="btn-sync"
                    @click="isConfirmDialogRevokeAllTokensVisible = true"
                  >
                    Revoke all
                  </VBtn>
                </th>
              </tr>
            </thead>
            <tbody v-if="activities">
              <tr v-for="(activity, index) in activities" :key="index">
                <td>
                  {{ useDateFormatter().fromUnix(Number(activity.SignedInAt)) }}
                </td>
                <td>
                  {{ useDateFormatter().fromUnix(Number(activity.ExpiresAt)) }}
                </td>
                <td>
                  {{ activity.IpAddress }}
                </td>
                <td style="width: 40%">
                  {{ activity.UserAgent }}
                </td>
                <td>
                  <VBtn
                    size="small"
                    class="btn-sync"
                    :color="activity.Blocked ? 'grey' : 'warning'"
                    :disabled="activity.Blocked"
                    density="compact"
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

          <div class="text-center mt-3">
            <VBtn v-if="isLoadMore" @click="handleLoadMore"> Load More </VBtn>
          </div>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>

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
.btn-sync {
  width: 100px;
}
</style>
