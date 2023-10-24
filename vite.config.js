import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 获得当前env对象 如 .env.development 文件中的内容
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // 在开发环境下提供一个服务
    server: {
      // 开启服务时自动在浏览器打开
      open: true,
      // 设置代理解决跨域
      proxy: {
        [env.VITE_APP_BASE_API]: {
          // 后端接口地址
          target: env.VITE_APP_TARGET_URL,
          // 默认情况下，代理时会保留主机头的来源，可以将 changeOrigin 设置为 true 以覆盖此行为
          // 来自webpack的devServer > proxy > changeOrigin 解释
          changeOrigin: true,
          // 路径重新，可能后端接口路径并没有 env.VITE_APP_BASE_API
          rewrite: (path) =>
            path.replace(
              new RegExp("^" + env.VITE_APP_BASE_API),
              env.VITE_APP_TARGET_BASE_API
            ),
        },
      },
    },
  };
});
