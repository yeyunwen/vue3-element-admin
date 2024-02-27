<script lang="ts" setup>
import { RouteLocationMatched, RouteLocationRaw } from "vue-router";
import { compile } from "path-to-regexp";

defineOptions({
  name: "Breadcrumb",
});

const router = useRouter();
const route = useRoute();

const breadcrumbList = ref<RouteLocationMatched[]>([]);
breadcrumbList.value = route.matched;

watch(route, () => {
  getBreadcrumbList();
});

const getBreadcrumbList = () => {
  breadcrumbList.value = route.matched.filter((item) => item.meta.title && item.meta.breadcrumb !== false);
};

const handleLink = (item: RouteLocationMatched) => {
  const { redirect, path } = item;
  if (redirect) {
    router.push(redirect as RouteLocationRaw);
    return;
  }

  router.push(pathCompile(path));
};

// 支持动态路由 如 /user/:id
const pathCompile = (path: string) => {
  const { params } = route;
  const toPath = compile(path);

  return toPath(params);
};
</script>

<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">
        <span v-if="index === breadcrumbList.length - 1">{{ item.meta?.title }}</span>
        <a v-else @click="handleLink(item)">{{ item.meta?.title }}</a>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
