<script lang="ts" setup>
defineOptions({
  name: "AppMain",
});
</script>

<template>
  <section>
    <router-view v-slot="{ Component, route }">
      <keep-alive v-if="route.meta.keepAlive">
        <component :is="Component" :key="route.path" />
      </keep-alive>
      <component v-else :is="Component" :key="route.path" />
    </router-view>
  </section>
</template>
