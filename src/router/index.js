import { createRouter, createWebHashHistory } from "vue-router";

/* Layout */
import Layout from "@/layout/index.vue";

const constantRoutes = [
  {
    name: "login",
    path: "/login",
    component: () => import("@/views/login.vue"),
  },
  {
    path: "/",
    redirect: "/dashboard",
    component: Layout,
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
});

export default router;
