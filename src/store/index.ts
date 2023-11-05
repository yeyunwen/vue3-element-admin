import { App } from "vue";
import { createPinia } from "pinia";

const store = createPinia();

export function setUpStore(app: App<Element>) {
  app.use(store);
}

export { store };
