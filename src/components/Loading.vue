<script setup lang="ts">
interface Props {
  type?: string;
  quantity?: number;
}

const props = withDefaults(defineProps<Props>(), {
  type: "card-avatar, article, actions",
  quantity: 1,
});
</script>

<template>
  <VSkeletonLoader :type="props.type" v-for="n in props.quantity" :key="n">
  </VSkeletonLoader>
</template>
