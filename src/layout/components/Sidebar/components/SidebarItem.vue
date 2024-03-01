<script lang="ts" setup>
import path from "path-browserify";
import type { RouteRecordRaw } from "vue-router";
import AppLink from "./Link.vue";
import { isExternal } from "@/utils/validate";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  basePath: {
    type: String,
    default: "",
  },
});

const onlyOneChild = ref<null | RouteRecordRaw>(null);

const hasOneShowingChild = (children: RouteRecordRaw[] = [], parent: RouteRecordRaw): boolean => {
  const showingChildren = children.filter((item) => {
    if (item.meta?.hidden) {
      return false;
    } else {
      onlyOneChild.value = item;
      return true;
    }
  });

  if (showingChildren.length === 1) {
    return true;
  }
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: "" }; // path 设为 "" 方便下次递归
    return true;
  }
  return false;
};

const resolvePath = (routePath: string) => {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath)) {
    return props.basePath;
  }

  return path.resolve(props.basePath, routePath);
};
</script>
<template>
  <template v-if="!item.meta?.hidden">
    <template v-if="hasOneShowingChild(item.children, item as RouteRecordRaw)">
      <AppLink :to="resolvePath(onlyOneChild!.path)">
        <el-menu-item :index="resolvePath(onlyOneChild!.path)">
          <el-icon>
            <SvgIcon v-if="onlyOneChild!.meta" :icon-class="onlyOneChild!.meta?.icon" />
          </el-icon>
          <template v-if="onlyOneChild" #title>
            <span>{{ onlyOneChild.meta?.title }}</span>
          </template>
        </el-menu-item>
      </AppLink>
    </template>

    <el-sub-menu v-else :index="resolvePath(item.path)">
      <template v-if="item.meta" #title>
        <el-icon>
          <SvgIcon v-if="item.meta.icon" :icon-class="item.meta.icon" />
        </el-icon>
        <span v-if="item.meta.title">{{ item.meta.title }}</span>
      </template>

      <SidebarItem v-for="child in item.children" :key="child.path" :item="child" :basePath="resolvePath(child.path)" />
    </el-sub-menu>
  </template>
</template>
