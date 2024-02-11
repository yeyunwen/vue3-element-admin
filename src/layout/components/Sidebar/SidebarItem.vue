<script lang="ts" setup>
import path from "path-browserify";
import type { RouteRecordRaw } from "vue-router";
import AppLink from "./Link.vue";
import Item from "./Item.vue";
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
    onlyOneChild.value = { ...parent, path: "" };
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
  console.log(props.basePath, routePath);

  console.log(path.resolve(props.basePath, routePath));

  return path.resolve(props.basePath, routePath);
};
</script>
<template>
  <div v-if="!item.meta?.hidden">
    <template v-if="hasOneShowingChild(item.children, item as RouteRecordRaw)">
      <AppLink :to="resolvePath(onlyOneChild!.path)">
        <el-menu-item :index="resolvePath(onlyOneChild!.path)">
          <Item :title="onlyOneChild?.meta?.title" />
        </el-menu-item>
      </AppLink>
    </template>

    <el-sub-menu v-else :index="resolvePath(item.path)">
      <template #title>
        <Item v-if="item.meta" :title="item.meta.title" />
      </template>

      <SidebarItem v-for="child in item.children" :key="child.path" :item="child" :basePath="resolvePath(child.path)" />
    </el-sub-menu>
  </div>
</template>
