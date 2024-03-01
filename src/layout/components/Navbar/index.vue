<script setup lang="ts">
import NavRight from "./NavRight.vue";
import { useAppStore } from "@/store/modules/app";

defineOptions({
  name: "Navbar",
});

const appStore = useAppStore();

const toggleSideBar = () => {
  appStore.toggleSideBar();
};
</script>
<template>
  <div class="navbar">
    <!-- 左侧面包屑 -->
    <div class="navbar-item">
      <hamburger :isActive="appStore.sidebar.opened" @toggle-click="toggleSideBar" />
      <breadcrumb />
    </div>

    <!-- 右侧导航设置 -->
    <div class="navbar-item">
      <NavRight />
    </div>
  </div>
</template>
<style lang="scss">
@use "@/styles/variables" as *;

.navbar {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: $navbarHeight;
  padding: 0 10px;
  background-color: #fff;
  box-shadow: 0 0 1px #0003;

  .navbar-item {
    display: flex;
    gap: 10px;
    align-items: center;
  }
}
</style>
