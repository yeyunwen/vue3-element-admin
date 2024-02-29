import { resolve } from "path-browserify";
import { RouteRecordRaw } from "vue-router";
import { usePermissionStoreHook } from "./permission";

const permissionStore = usePermissionStoreHook();

export const useTagsViewStore = defineStore("tagsView", () => {
  const visitedViews = ref<TagView[]>([]);
  const affixdViews = ref<TagView[]>([]);

  const filterAffixTags = (routes: RouteRecordRaw[], basePath: string = "/") => {
    const affixTags: TagView[] = [];
    routes.forEach((route) => {
      if (route.meta?.affix) {
        const tagPath = resolve(basePath, route.path);
        affixTags.push({
          fullPath: tagPath,
          path: tagPath,
          name: (route.name as string) || "",
          title: route.meta.title || "",
          affix: route.meta.affix,
        });
      }
      if (route.children) {
        const tempTags = filterAffixTags(route.children, route.path);
        if (tempTags.length >= 1) {
          affixTags.push(...tempTags);
        }
      }
    });
    return affixTags;
  };

  const initTags = () => {
    affixdViews.value = filterAffixTags(permissionStore.routes);
    visitedViews.value = [...affixdViews.value];
  };

  initTags(); // 初始化tag

  const addTag = (view: TagView) => {
    if (visitedViews.value.some((v) => v.path === view.path)) return;

    visitedViews.value.push(view);
  };

  const delTag = (view: TagView) => {
    for (const [i, v] of visitedViews.value.entries()) {
      if (v.path === view.path) {
        visitedViews.value.splice(i, 1);
        break;
      }
    }
  };

  const delAllTag = () => {
    visitedViews.value = [...affixdViews.value];
  };

  return {
    visitedViews,
    affixdViews,
    // initTags, 初始化状态应该由内部管理，暂时不暴露
    addTag,
    delTag,
    delAllTag,
    filterAffixTags,
  };
});
