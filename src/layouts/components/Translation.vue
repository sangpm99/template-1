<script lang="ts" setup>
import { useUserStore } from "@/stores/accounts/userStore";
import {
  getLocalStorageUser,
  setLocalStorageUser,
} from "@/stores/authorizeStore";
import type { ChangeProfileParams, Metadata } from "@/types/accounts/users";
import type { User } from "@/types/authorize";

interface Language {
  title: string;
  value: string;
}

const languages: Language[] = [
  { title: "English", value: "en" },
  { title: "Tiếng Việt", value: "vi" },
];
const userStore = useUserStore();
const changeProfileParams: Ref<ChangeProfileParams> = ref({
  userName: "",
  email: "",
  phoneNumber: "",
  fullName: "",
  department: null,
  address: "",
  metadata: "",
});

const onChange = async (value: string) => {
  const userLocal = getLocalStorageUser();
  if (!userLocal) return;
  const user = await userStore.getUser(userLocal.id);
  if (user && user.metadata) {
    const metadata = JSON.parse(user.metadata) as Metadata;
    metadata.language = value;

    changeProfileParams.value = {
      userName: user.userName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      fullName: user.fullName,
      department: user.department,
      address: user.address,
      metadata: JSON.stringify(metadata),
    };

    await changeProfile(userLocal, metadata);
  }
};

const changeProfile = async (user: User, metadata: Metadata) => {
  await userStore.changeProfile(changeProfileParams.value);
  setLocalStorageUser({
    ...user,
    metadata: JSON.stringify(metadata),
  });
  window.location.reload();
};
</script>

<template>
  <VMenu v-bind="$attrs">
    <template v-slot:activator="{ props }">
      <VBtn
        color="secondary"
        v-bind="props"
        icon="ri-translate-2"
        variant="text"
      >
      </VBtn>
    </template>
    <VList>
      <VListItem
        link
        v-for="language in languages"
        :key="language.value"
        @click="onChange(language.value)"
      >
        <VListItemTitle>{{ language.title }}</VListItemTitle>
      </VListItem>
    </VList>
  </VMenu>
</template>
