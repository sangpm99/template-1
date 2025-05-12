<script setup lang="ts">
import { axiosDefault } from "@/plugins/axios";

definePage({
  meta: {
    action: "Read",
    subject: "Permission.Public",
  },
});

const loading = ref<boolean>(false);
const count = ref<number>(20);

const rawHtml: Ref<string> = ref("");
const rawData = ref<string[]>([]);
const data = ref<string[]>([]);
const keyWords: string[] = ["WARN", "INFO", "ERROR"];

const processLogData = () => {
  data.value = [];
  let temp = "";

  rawData.value.forEach((line) => {
    if (line.includes("401")) return;

    if (keyWords.some((keyword) => line.includes(keyword))) {
      if (temp) {
        data.value.push(temp);
      }
      temp = line;
    } else {
      temp += "<br />" + line;
    }
  });

  if (temp) {
    data.value.push(temp);
  }

  data.value = data.value.reverse();
};

const getApplicationLog = async () => {
  try {
    loading.value = true;
    rawHtml.value = (await axiosDefault.get("/Syslog/ApplicationLog")).data;
    rawData.value = rawHtml.value.split("<br />");
    processLogData();
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getApplicationLog();
});
</script>

<template>
  <section>
    <VRow>
      <VCol cols="12">
        <h4 class="text-h4">Application Log</h4>
      </VCol>
      <VCol cols="12" v-for="d in data">
        <VCard>
          <VCardText> <span v-html="d"></span> </VCardText>
        </VCard>
      </VCol>

      <template v-if="loading">
        <VCol cols="12" v-for="a in 20">
          <VSkeletonLoader type="article"></VSkeletonLoader>
        </VCol>
      </template>
    </VRow>
  </section>
</template>
