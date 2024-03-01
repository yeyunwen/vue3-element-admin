<script setup lang="ts">
import { useRoute } from "vue-router";
import { usePermissionStore } from "@/store/modules/permission";
import { useAppStore } from "@/store/modules/app";
import variables from "@/styles/variables.module.scss";

defineOptions({
  name: "Sidebar",
});

const currRoute = useRoute();
const activeMenu = computed(() => {
  if (currRoute.meta.activeMenu) {
    return currRoute.meta.activeMenu;
  }
  return currRoute.path;
});
const permissionStore = usePermissionStore();
const appStore = useAppStore();
</script>

<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :default-active="activeMenu"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      :background-color="variables.menuBg"
      :collapse="!appStore.sidebar.opened"
      :collapse-transition="false"
    >
      <SidebarItem v-for="route in permissionStore.routes" :key="route.name" :item="route" :basePath="route.path" />
    </el-menu>
  </el-scrollbar>
</template>
