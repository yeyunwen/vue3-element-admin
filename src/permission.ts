import router from "@/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useUserStoreHook } from "@/store/modules/user";
import { usePermissionStoreHook } from "@/store/modules/permission";

const permissionStore = usePermissionStoreHook();

const whiteList = ["/login"];

router.beforeEach(async (to, from, next) => {
  NProgress.start();

  document.title = to.meta.title || "vue3-element-admin";
  const hasToken = localStorage.getItem("token");

  if (hasToken) {
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      const userStore = useUserStoreHook();
      const hasRoles = userStore.user.roles && userStore.user.roles.length > 0;
      if (hasRoles) {
        if (to.matched.length === 0) {
          from.path ? next({ path: from.path }) : next({ path: "/404" });
        } else {
          next();
        }
      } else {
        try {
          const { roles } = await userStore.getInfo();
          const asyncRoutes = await permissionStore.generateRoutes(roles);
          asyncRoutes.forEach((route) => {
            router.addRoute(route);
          });
          // 这里的 replace: true 的作用是在导航过程中替换当前的历史记录，而不是添加新的历史记录。
          // 换句话说，它会将当前导航替换为新的导航，而不会在浏览器的历史记录中留下记录。
          // 这通常用于在登录后重定向用户到之前访问的页面时，避免用户回退到登录页面。
          next({ ...to, replace: true });
        } catch (err) {
          // 移除 token 并跳转登录页
          await userStore.resetToken();
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next("/login");
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
