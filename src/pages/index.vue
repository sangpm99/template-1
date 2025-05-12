<script setup lang="ts">
import { useAbility } from "@casl/vue";

const { can } = useAbility();

definePage({
  meta: {
    action: "Read",
    subject: "Permission.Public",
  },
});
</script>

<template>
  <section></section>
</template>
