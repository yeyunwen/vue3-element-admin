import { createPinia } from "pinia";

const store = createPinia();

export function setUpStore(app) {
  app.use(store);
}

export { store };
