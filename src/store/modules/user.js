import { defineStore } from "pinia";
import { store } from "@/store";
import { ref } from "vue";
import { loginApi, getUserInfo } from "@/api/user";

export const useUserStore = defineStore("user", () => {
  const token = ref("");
  const user = ref({});

  function login(loginData) {
    return new Promise((resolve, reject) => {
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
    getUserInfo().then((res) => {
      user.value = res.data;
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
