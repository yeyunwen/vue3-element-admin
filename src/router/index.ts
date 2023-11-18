import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

/* Layout */
import Layout from "@/layout/index.vue";

const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
    },
  },
  {
    path: "/401",
    component: () => import("@/views/401/index.vue"),
    meta: {
      title: "401",
    },
  },
  {
    path: "/404",
    component: () => import("@/views/404/index.vue"),
    meta: {
      title: "404",
    },
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

const asyncRoutes: RouteRecordRaw[] = [
  {
    path: "/testAdmin",
    component: () => import("@/views/testAdmin.vue"),
    meta: {
      roles: ["admin"],
    },
  },
  {
    path: "/testEditor",
    component: () => import("@/views/testEditor.vue"),
    meta: {
      roles: ["editor"],
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
});

const resetRouter = () => {
  router.replace({ path: "/login" });
};

export default router;
export { constantRoutes, asyncRoutes, resetRouter };
