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
    /**
     * 活动页面
     */
    activeMenu?: string;
    /**
     * 是否隐藏
     */
    hidden?: boolean;
    /**
     * 是否固定
     */
    affix?: boolean;
    /**
     * 是否缓存
     */
    keepAlive?: boolean;
    /**
     * 图标
     */
    icon?: string;
  }
}
