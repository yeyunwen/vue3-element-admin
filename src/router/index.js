import { createRouter, createWebHashHistory } from "vue-router";

const constantRoutes = [
  {
    name: "login",
    path: "/login",
    component: () => import("@/views/login.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
});

export default router;
