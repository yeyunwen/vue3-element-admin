<script setup>
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
</script>
<script>
export default {
  name: "App",
};
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <router-view />
  </ElConfigProvider>
</template>

<!-- <style scoped></style> -->
