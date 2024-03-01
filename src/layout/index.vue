<script setup>
import { useAppStore } from "@/store/modules/app";

defineOptions({
  name: "Layout",
  inheritAttrs: false,
});

const appStore = useAppStore();

const classObj = computed(() => {
  return {
    hideSidebar: !appStore.sidebar.opened,
  };
});
</script>

<template>
  <div class="app-wrapper" :class="classObj">
    <Sidebar class="sidebar-container" />
    <div class="main-container">
      <header>
        <Navbar />
        <TagsView />
      </header>
      <AppMain class="app-main" />
    </div>
  </div>
</template>

<style lang="scss">
@use "@/styles/layout.scss";
</style>
