import { defineConfig, loadEnv, ConfigEnv } from "vite";
import vue from "@vitejs/plugin-vue";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";

import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

import { resolve } from "path";

const pathSrc = resolve(__dirname, "src");
// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
  // 获得当前env对象 如 .env.development 文件中的内容
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      vue(),
      AutoImport({
        imports: ["vue", "vue-router", "pinia", "@vueuse/core"],
        // 第三方组件库的解析器
        resolvers: [
          // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
          ElementPlusResolver(),
          IconsResolver({}),
        ],
        // dts: false,
        dts: "src/types/auto-imports.d.ts",
        eslintrc: {
          enabled: false,
          filepath: "./.eslintrc-auto-import.json",
          globalsPropValue: true,
        },
      }),
      Components({
        resolvers: [
          // 自动导入 Element Plus 组件
          ElementPlusResolver(),
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ["ep"], // @iconify-json/ep 是 Element Plus 的图标库
          }),
        ],
        dirs: ["src/components", "src/**/components"],
        // dts: false,
        dts: "src/types/components.d.ts",
      }),
      Icons({
        autoInstall: true,
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve(pathSrc, "assets/icons")],
        // 指定symbolId格式
        symbolId: "icon-[dir]-[name]",
      }),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
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
          rewrite: (path) => path.replace(new RegExp("^" + env.VITE_APP_BASE_API), env.VITE_APP_TARGET_BASE_API),
        },
      },
      // 预热常用文件，提高初始页面加载速度
      warmup: {
        clientFiles: ["./src/layout/**/*.vue"],
      },
    },
  };
});
