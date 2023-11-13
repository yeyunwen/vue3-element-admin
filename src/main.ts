import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import { setUpStore } from "@/store";

import "@/permission";

import "normalize.css";
import "@/styles/index.scss";

const app = createApp(App);

setUpStore(app);

app.use(router).mount("#app");
