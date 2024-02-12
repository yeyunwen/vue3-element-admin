<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
  },
});
</script>
<template>
  <SvgIcon v-if="icon" :icon-class="icon" />
  <div v-if="title">{{ title }}</div>
</template>
