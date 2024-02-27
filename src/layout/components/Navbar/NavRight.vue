<script lang="ts" setup>
import { useUserStore } from "@/store/modules/user";

const useStore = useUserStore();
const router = useRouter();
const route = useRoute();

const { isFullscreen, toggle } = useFullscreen();
const handleLogout = () => {
  ElMessageBox.confirm("确定注销并退出系统吗?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    useStore.logout().then(() => {
      router.push(`/login?redirect=${route.fullPath}`);
    });
  });
};
</script>

<template>
  <!-- 全屏 -->
  <SvgIcon :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" @click="toggle" />

  <el-divider direction="vertical" />

  <!-- 个人中心 -->
  <el-dropdown trigger="click">
    <div class="avatar">
      <img src="@/assets/images/avatar.png" alt="" />
      <el-icon>
        <i-ep-caret-bottom />
      </el-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss">
.avatar {
  display: flex;
  align-items: center;

  img {
    width: 40px;
    height: 40px;
    border-radius: 10%;
  }
}
</style>
