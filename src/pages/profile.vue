<script setup lang="ts">
import UserBioPanel from "@/views/apps/profile/UserBioPanel.vue";
import UserTabOverview from "@/views/apps/profile/UserTabOverview.vue";
import UserTabSecurity from "@/views/apps/profile/UserTabSecurity.vue";

definePage({
  meta: {
    action: "Read",
    subject: "Permission.Public",
  },
});

const tabs = [
  { icon: "ri-group-line", title: "Overview" },
  { icon: "ri-lock-2-line", title: "Security" },
];

// States
const userTab = ref(null);
const updateBioPanel: Ref<number> = ref(0);
const twoFactorEnabled: Ref<boolean> = ref(false);
const updateUserTabSecurity: Ref<number> = ref(0);

// Functions
const handleGetTwoFactorEnabled = (value: boolean) => {
  twoFactorEnabled.value = value;
  updateUserTabSecurity.value++;
};
</script>

<template>
  <VRow>
    <VCol cols="12" md="3">
      <UserBioPanel
        :key="updateBioPanel"
        @two-factor-enabled="(value) => handleGetTwoFactorEnabled(value)"
      />
    </VCol>

    <VCol cols="12" md="9">
      <VTabs v-model="userTab" class="v-tabs-pill">
        <VTab v-for="tab in tabs" :key="tab.icon">
          <VIcon start :icon="tab.icon" />
          <span>{{ tab.title }}</span>
        </VTab>
      </VTabs>

      <VWindow
        v-model="userTab"
        class="mt-6 disable-tab-transition"
        :touch="false"
      >
        <VWindowItem>
          <UserTabOverview />
        </VWindowItem>

        <VWindowItem>
          <UserTabSecurity
            :key="updateUserTabSecurity"
            :two-factor-enabled="twoFactorEnabled"
            @update="
              (isUpdate) => {
                if (isUpdate) updateBioPanel++;
              }
            "
          />
        </VWindowItem>
      </VWindow>
    </VCol>
  </VRow>
</template>
