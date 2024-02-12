import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import { setUpStore } from "@/store";

import "@/permission";

import "normalize.css";
import "@/styles/index.scss";

// 本地SVG图标
import "virtual:svg-icons-register";

const app = createApp(App);

setUpStore(app);

app.use(router).mount("#app");
