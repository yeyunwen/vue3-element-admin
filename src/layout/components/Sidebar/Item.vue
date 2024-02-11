<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: "",
  },
});
</script>
<template>
  <div v-if="title">{{ title }}</div>
</template>
