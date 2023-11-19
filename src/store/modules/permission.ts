import { defineStore } from "pinia";
import { store } from "@/store";
import { RouteRecordRaw } from "vue-router";
import { constantRoutes, asyncRoutes } from "@/router";

/**
 * 根据用户角色检查是否具有访问给定路由的权限。
 *
 * @param {string[]} roles - 分配给用户的角色的数组。
 * @param {RouteRecordRaw} route - 要检查权限的路由。
 * @return {boolean} 如果用户具有权限则返回true，否则返回false。
 */
const hasPermission = (roles: string[], route: RouteRecordRaw) => {
  if (route?.meta?.roles) {
    return roles.some((role) => route.meta?.roles?.includes(role));
  } else {
    return true;
  }
};

/**
 * 根据提供的角色来过滤给定的路由。
 *
 * @param {string[]} roles - 要过滤路由的角色。
 * @param {RouteRecordRaw[]} routes - 要过滤的路由。
 * @return {RouteRecordRaw[]} 过滤后的路由。
 */
const filterAsyncRoutes = (roles: string[], routes: RouteRecordRaw[]) => {
  const asyncRoutes: RouteRecordRaw[] = [];
  routes.forEach((route) => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(roles, tmp.children);
      }
      asyncRoutes.push(tmp);
    }
  });

  return asyncRoutes;
};

export const usePermissionStore = defineStore("permission", () => {
  const routes = ref<RouteRecordRaw[]>([]);

  function setRoutes(newRoutes: RouteRecordRaw[]) {
    routes.value = constantRoutes.concat(newRoutes);
  }

  function generateRoutes(roles: string[]) {
    return new Promise<RouteRecordRaw[]>((resolve) => {
      let accessedRoutes = [];
      if (roles.includes("admin")) {
        accessedRoutes = asyncRoutes;
      } else {
        accessedRoutes = filterAsyncRoutes(roles, asyncRoutes);
      }

      setRoutes(accessedRoutes);
      resolve(accessedRoutes);
    });
  }

  return {
    routes,
    setRoutes,
    generateRoutes,
  };
});

export const usePermissionStoreHook = () => {
  return usePermissionStore(store);
};
