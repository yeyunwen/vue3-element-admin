import axios from "axios";
import { ElMessage } from "element-plus";

const service = axios.create({
  baseURL: "/api", // 存在硬编码 强耦合
  timeout: 50000,
});

service.interceptors.response.use(
  (response) => {
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
