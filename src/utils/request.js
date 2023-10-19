import axios from "axios";

const service = axios.create({
  baseURL: "/dev/api",
  timeout: 50000,
});

service.interceptors.response.use((response) => {
  const { code } = response.data;
  if (code === 200) {
    return response.data;
  }
});

export default service;
