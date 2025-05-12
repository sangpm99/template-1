<script setup lang="ts">
import PaginationFrame from "@/components/PaginationFrame.vue";
import { useDateFormatter } from "@/composables/useDateFormatter";
import { pageIndex, pageSize, pageSizeOptions } from "@/enums";
import { useSyslogStore } from "@/stores/syslogStore";
import type { GetAuditLogsParams, PaginatedAuditLogs } from "@/types/syslog";
import { UserOption } from "@/types/accounts/users";
import DateRangeSelect from "@/components/selects/DateRangeSelect.vue";

definePage({
  meta: {
    action: "Read",
    subject: "Permission.Public",
  },
});

// Configs
const headers = [
  {
    title: "Actor",
    key: "actor",
    width: "150px",
  },
  {
    title: "Operation",
    key: "operation",
    width: "300px",
  },
  {
    title: "New Value",
    key: "newValue",
  },
  {
    title: "Old Value",
    key: "oldValue",
  },

  {
    title: "Time",
    key: "timestamp",
    width: "200px",
  },
  {
    title: "IP Address",
    key: "ipAddress",
    width: "100px",
  },
];

// Stores
const syslogStore = useSyslogStore();

// States
const userSelected = ref<UserOption>();
const remountUser = ref<number>(0);
const initData: Ref<GetAuditLogsParams> = ref({
  actor: null,
  operation: null,
  entity: null,
  record: null,
  from: null,
  to: null,
  pageIndex: pageIndex,
  pageSize: pageSize,
});
const from: Ref<number | null> = ref(null);
const to: Ref<number | null> = ref(null);
const remount = ref<number>(0);
const getAuditLogsParams: Ref<GetAuditLogsParams> = ref(
  structuredClone(toRaw(initData.value)),
);
const paginatedAuditLogs: Ref<PaginatedAuditLogs | null> = ref(null);
const totalPages: Ref<number> = ref(1);

const expandedItems = ref<number[]>([]);

// Functions
const toggleExpand = (index: number) => {
  const itemIndex = expandedItems.value.indexOf(index);
  if (itemIndex === -1) {
    expandedItems.value.push(index);
  } else {
    expandedItems.value.splice(itemIndex, 1);
  }
};

const getAuditLogs = async () => {
  try {
    getAuditLogsParams.value.from = from.value;
    getAuditLogsParams.value.to = to.value;
    paginatedAuditLogs.value = await syslogStore.getAuditLogs(
      getAuditLogsParams.value,
    );
    if (paginatedAuditLogs.value && paginatedAuditLogs.value.itemsCount > 0) {
      totalPages.value = Math.ceil(
        paginatedAuditLogs.value?.itemsCount /
          paginatedAuditLogs.value?.pageSize,
      );
    }
  } catch (error) {}
};

const handleResetFilter = () => {
  from.value = null;
  to.value = null;
  getAuditLogsParams.value = structuredClone(toRaw(initData.value));
  getAuditLogs();
  remount.value++;
};

onMounted(() => {
  getAuditLogs();
});
</script>

<template>
  <section>
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardText>
            <VRow justify="end">
              <VCol cols="auto" class="d-flex flex-wrap gap-x-4 gap-y-6">
                <UserAutoComplete
                  v-model="userSelected"
                  @update:modelValue="getAuditLogsParams.actor = $event?.id"
                  width="200"
                  :key="remountUser"
                  label="User"
                ></UserAutoComplete>

                <VSelect
                  density="compact"
                  label="Operation"
                  width="200"
                  :items="['Added', 'Modified', 'Deleted']"
                  clearable
                  v-model="getAuditLogsParams.operation"
                />
                <VTextField
                  density="compact"
                  label="Entity"
                  width="200"
                  clearable
                  v-model="getAuditLogsParams.entity"
                />
                <VTextField
                  density="compact"
                  label="Record"
                  width="200"
                  clearable
                  v-model="getAuditLogsParams.record"
                />
                <DateRangeSelect
                  v-model:from="from"
                  v-model:to="to"
                  :key="remount"
                ></DateRangeSelect>
                <VBtn
                  icon="ri-search-line"
                  @click="getAuditLogs"
                  class="rounded"
                  variant="outlined"
                >
                </VBtn>
                <VBtn
                  class="rounded"
                  color="error"
                  variant="outlined"
                  icon="ri-filter-off-line"
                  @click="handleResetFilter"
                >
                </VBtn>
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCol>

      <VCol cols="12">
        <VCard>
          <VCardText>
            <VDataTableServer
              v-if="paginatedAuditLogs"
              v-model:items-per-page="paginatedAuditLogs.pageSize"
              v-model:page="paginatedAuditLogs.pageIndex"
              :loading="syslogStore.loading"
              :items="paginatedAuditLogs.items"
              :items-length="paginatedAuditLogs.itemsCount"
              :headers="headers"
              hide-default-footer
              hover
              density="compact"
              disable-sort
            >
              <!-- Actor -->
              <template #item.actor="{ item }">
                <span class="d-flex flex-column text-sm">
                  <span>{{ item.actor }}</span>
                </span>
              </template>

              <!-- Operation -->
              <template #item.operation="{ item }">
                <div class="d-flex flex-column text-sm">
                  <span class="text-error">{{ item.operation }}</span>
                  <span class="text-warning">{{ item.entity }}</span>
                  <span>{{ item.record }}</span>
                </div>
              </template>

              <!-- New Value -->
              <template #item.newValue="{ item, index }">
                <div class="box text-sm" v-if="item.newValue">
                  <span>
                    {{
                      item.newValue &&
                      item.newValue.length > 100 &&
                      !expandedItems.includes(index)
                        ? `${item.newValue.slice(0, 100)} ... `
                        : item.newValue
                    }}
                  </span>
                  <a @click="toggleExpand(index)" class="cursor-pointer">
                    {{
                      item.newValue && item.newValue.length > 100
                        ? expandedItems.includes(index)
                          ? " Show less"
                          : " Show more"
                        : ""
                    }}
                  </a>
                </div>
              </template>

              <!-- Old Value -->
              <template #item.oldValue="{ item, index }">
                <div class="box text-sm" v-if="item.oldValue">
                  <span>
                    {{
                      item.oldValue &&
                      item.oldValue.length > 100 &&
                      !expandedItems.includes(index)
                        ? `${item.oldValue.slice(0, 100)} ... `
                        : item.oldValue
                    }}
                  </span>
                  <a @click="toggleExpand(index)" class="cursor-pointer">
                    {{
                      item.oldValue && item.oldValue.length > 100
                        ? expandedItems.includes(index)
                          ? " Show less"
                          : " Show more"
                        : ""
                    }}
                  </a>
                </div>
              </template>

              <!-- Time -->
              <template #item.timestamp="{ item }">
                <span class="text-sm">{{
                  item.timestamp
                    ? useDateFormatter().fromUnix(item.timestamp)
                    : ""
                }}</span>
              </template>

              <!-- IP Address -->
              <template #item.ipAddress="{ item }">
                <span class="text-sm">{{ item.ipAddress }}</span>
              </template>

              <template #bottom>
                <PaginationFrame>
                  <template #pageSize>
                    <VSelect
                      v-model="getAuditLogsParams.pageSize"
                      :items="pageSizeOptions"
                      variant="outlined"
                      density="compact"
                      @update:model-value="getAuditLogs"
                    />
                  </template>

                  <template #pagination>
                    <VPagination
                      v-model="getAuditLogsParams.pageIndex"
                      :length="totalPages"
                      total-visible="4"
                      @update:model-value="getAuditLogs"
                    />
                  </template>
                </PaginationFrame>
              </template>
            </VDataTableServer>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </section>
</template>

<style lang="scss" scoped>
::v-deep(.box) {
  word-break: break-word;
}
</style>
