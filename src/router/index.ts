import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

/* Layout */
import Layout from "@/layout/index.vue";

const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
      hidden: true,
    },
  },
  {
    path: "/401",
    component: () => import("@/views/401/index.vue"),
    meta: {
      title: "401",
      hidden: true,
    },
  },
  {
    path: "/404",
    component: () => import("@/views/404/index.vue"),
    meta: {
      title: "404",
      hidden: true,
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
        meta: {
          title: "dashboard",
          icon: "homepage",
          affix: true,
        },
      },
    ],
  },
  {
    path: "/guide",
    component: Layout,
    redirect: "/guide/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/guide/index.vue"),
        meta: {
          title: "guide",
          affix: true,
        },
      },
    ],
  },
  {
    path: "/permission",
    component: Layout,
    redirect: "/permission/index",
    meta: {
      title: "Permission",
      roles: ["admin", "editor"], // you can set roles in root nav
      icon: "system",
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/permission/index.vue"),
        meta: {
          title: "permission",
        },
      },
      {
        path: "admin",
        component: () => import("@/views/permission/admin.vue"),
        meta: {
          title: "admin",
        },
      },
    ],
  },
  {
    path: "/routePage",
    redirect: "/routePage/index",
    component: Layout,
    meta: {
      title: "路由示例",
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/routePage/index.vue"),
        meta: {
          title: "路由示例",
        },
        children: [
          {
            path: ":id",
            component: () => import("@/views/routePage/detail.vue"),
            meta: {
              title: "路由详情",
            },
          },
        ],
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
      title: "testAdmin",
    },
  },
  {
    path: "/testEditor",
    component: () => import("@/views/testEditor.vue"),
    meta: {
      roles: ["editor"],
      title: "testEditor",
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
