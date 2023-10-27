<script setup>
import { UserFilled, Lock } from "@element-plus/icons-vue";
import { useUserStore } from "@/store/modules/user";

const userStore = useUserStore();

const loginData = ref({
  username: "admin",
  password: "111111",
});

function handleLogin() {
  userStore.login(loginData.value).then(() => userStore.getInfo());
}
</script>

<template>
  <div class="login-container">
    <div class="login-form">
      <el-form ref="loginForm" :model="loginData">
        <el-form-item>
          <el-input
            v-model="loginData.username"
            :prefix-icon="UserFilled"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-input
            v-model="loginData.password"
            :prefix-icon="Lock"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button class="login-btn" type="primary" @click="handleLogin"
        >登录</el-button
      >
    </div>
  </div>
</template>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;
.login-container {
  .el-input {
    height: 45px;
  }
}
</style>

<style lang="scss">
$bg: #283443;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form {
    width: 400px;
    .login-btn {
      width: 100%;
    }
  }
}
</style>
