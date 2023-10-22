import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import ElementPlus from "element-plus";
import { setUpStore } from "@/store";

import "normalize.css";
import "element-plus/dist/index.css";
import "@/styles/index.scss";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

setUpStore(app);

app.use(ElementPlus).use(router).mount("#app");
