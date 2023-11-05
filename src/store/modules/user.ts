import { defineStore } from "pinia";
import { store } from "@/store";
import { loginApi, getUserInfo } from "@/api/user";

import { LoginData, UserInfo } from "@/api/user/types";

export const useUserStore = defineStore("user", () => {
  const token = ref("");
  const user = ref({});

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

  return {
    token,
    user,
    login,
    getInfo,
  };
});

export function useUserStoreHook() {
  return useUserStore(store);
}
