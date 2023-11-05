<script setup>
import { Sidebar } from "./components/index";
console.log(Sidebar);
</script>
<script>
export default {
  name: "Layout",
};
</script>

<template>
  <div class="app-wrapper">
    <Sidebar />
    <router-view />
  </div>
</template>

<!-- <style lang="scss"></style> -->
