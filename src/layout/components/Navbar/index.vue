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
    <div class="flex">
      <hamburger :isActive="appStore.sidebar.opened" @toggle-click="toggleSideBar" />
      <breadcrumb />
    </div>

    <!-- 右侧导航设置 -->
    <div class="flex">
      <NavRight />
    </div>
  </div>
</template>
<style lang="scss">
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  background-color: #fff;
  box-shadow: 0 0 1px #0003;
}

.flex {
  display: flex;
}
</style>
