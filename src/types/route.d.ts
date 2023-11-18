// typings.d.ts or router.ts
import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    /**
     * 页面标题
     */
    title?: string;
    /**
     * 用户角色列表
     */
    roles?: string[];
  }
}
