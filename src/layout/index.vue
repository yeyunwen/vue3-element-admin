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
    <Sidebar class="sidebar-container" />
    <div class="main-container">
      <div>
        <Navbar />
      </div>
      <router-view />
    </div>
  </div>
</template>

<!-- <style lang="scss"></style> -->
