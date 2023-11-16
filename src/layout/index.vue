<script setup>
import { Sidebar } from "./components/index";
defineOptions({
  name: "Layout",
  inheritAttrs: false,
});
console.log(Sidebar);
</script>

<template>
  <div class="app-wrapper">
    <Sidebar />
    <router-view />
  </div>
</template>

<!-- <style lang="scss"></style> -->
