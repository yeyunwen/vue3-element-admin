import { defineStore } from "pinia";
import { store } from "@/store";
import { loginApi, getUserInfo } from "@/api/user";
import { useStorage } from "@vueuse/core";

import { LoginData, UserInfo } from "@/api/user/types";

export const useUserStore = defineStore("user", () => {
  const token = useStorage("token", "");
  const user = ref<UserInfo>({
    roles: [],
  });

  function login(loginData: LoginData) {
    return new Promise<void>((resolve, reject) => {
      loginApi(loginData)
        .then((res) => {
          token.value = res.data.token;
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  function getInfo() {
    return new Promise<UserInfo>((resolve, reject) => {
      getUserInfo()
        .then(({ data }) => {
          user.value = data;
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  function resetToken() {
    return new Promise<void>((reslove) => {
      token.value = "";
      reslove();
    });
  }

  function logout() {
    return new Promise<void>(async (reslove) => {
      await resetToken();
      reslove();
    });
  }

  return {
    token,
    user,
    login,
    getInfo,
    resetToken,
    logout,
  };
});

export function useUserStoreHook() {
  return useUserStore(store);
}
