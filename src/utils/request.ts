import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { useUserStoreHook } from "@/store/modules/user";

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
});

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const userStore = useUserStoreHook();
    if (userStore.token) {
      config.headers.Authorization = userStore.token;
    }
    console.log(userStore.token);
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, msg } = response.data;
    if (code === 200) {
      return response.data;
    }
    ElMessage.error(msg || "系统出错");
  },
  (error) => {
    console.log("err", error);
    ElMessage.error(error);

    return Promise.reject(error);
  }
);

export default service;
