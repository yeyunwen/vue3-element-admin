<script setup lang="ts">
import { UserFilled, Lock } from "@element-plus/icons-vue";
import router from "@/router";

// 状态管理
import { useUserStore } from "@/store/modules/user";

// api
import { LoginData } from "@/api/user/types";

// 类型
import { FormInstance, FormRules } from "element-plus";
import { LocationQuery, LocationQueryValue, useRoute } from "vue-router";

const userStore = useUserStore();
const route = useRoute();

const loginFormRef = ref<FormInstance>();
const loginData = ref<LoginData>({
  username: "admin",
  password: "111111",
});
const loginRules = ref<FormRules>({
  username: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
  ],
});
function handleLogin() {
  loginFormRef.value?.validate((valid) => {
    if (valid) {
      userStore.login(loginData.value).then(() => {
        const query: LocationQuery = route.query;
        const redirect = (query.redirect as LocationQueryValue) ?? "/";

        const queryOtherParams = Object.keys(query).reduce((acc, key) => {
          if (key !== "redirect") {
            acc[key] = query[key];
          }
          return acc;
        }, {} as LocationQuery);

        router.push({ path: redirect, query: queryOtherParams });
      });
    }
  });
}
</script>

<template>
  <div class="login-container">
    <div class="login-form">
      <el-form ref="loginFormRef" :model="loginData" :rules="loginRules">
        <el-form-item prop="username">
          <el-input v-model="loginData.username" :prefix-icon="UserFilled" />
        </el-form-item>

        <el-form-item prop="password">
          <el-input v-model="loginData.password" :prefix-icon="Lock" show-password />
        </el-form-item>
      </el-form>
      <el-button class="login-btn" type="primary" @click="handleLogin">登录</el-button>
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  background-color: $bg;

  .login-form {
    width: 400px;

    .login-btn {
      width: 100%;
    }
  }
}
</style>
