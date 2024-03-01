<script lang="ts" setup>
import { useTagsViewStore } from "@/store/modules/tagsView";

defineOptions({
  name: "TagsView",
});

const route = useRoute();
const router = useRouter();
const tagsViewStore = useTagsViewStore();

const visitedViews = computed(() => tagsViewStore.visitedViews);

const addTag = () => {
  tagsViewStore.addTag({
    ...route,
    title: route.meta?.title as string,
    name: route.name as string,
    affix: route.meta?.affix,
  }); // route是响应式对象
};

const closeSelectedTag = (view: TagView) => {
  tagsViewStore.delTag(view);
  if (isActive(view)) {
    toLastView(visitedViews.value);
  }
};

const isActive = (view: TagView) => {
  return view.path === route.path;
};

const isAffix = (view: TagView) => {
  return view.affix;
};

const toLastView = (visitedViews: TagView[]) => {
  const lastView = visitedViews.at(-1);
  router.push(lastView!.fullPath);
};

watch(
  route,
  () => {
    addTag();
  },
  { immediate: true }
);
</script>

<template>
  <div class="tags-view">
    <el-scrollbar class="scrollbar-container">
      <router-link
        :to="tag.fullPath"
        v-for="tag in visitedViews"
        :key="tag.fullPath"
        class="tags-view-item"
        :class="{ active: isActive(tag) }"
      >
        {{ tag.title }}
        <i-ep-close v-if="!isAffix(tag)" class="close-icon" @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.tags-view {
  box-sizing: border-box;
  height: 34px;
  padding: 4px 10px;

  .scrollbar-container {
    white-space: nowrap;
  }

  .tags-view-item {
    display: inline-block;
    padding: 3px 8px;
    margin-right: 5px;
    font-size: 12px;
    border: 1px solid #d8dce5;
    border-radius: 2px;

    &:not(:last-of-type) {
      margin-right: 5px;
    }

    &:hover {
      color: var(--el-color-primary);
    }

    &.active {
      color: #fff;
      background-color: var(--el-color-primary);

      .close-icon {
        &:hover {
          color: var(--el-color-primary);
          background-color: var(--el-fill-color-light);
        }
      }

      &::before {
        display: inline-block;
        width: 8px;
        height: 8px;
        margin-right: 5px;
        content: "";
        background-color: #fff;
        border-radius: 50%;
      }
    }

    .close-icon {
      width: 12px;
      height: 12px;
      margin-bottom: -2px;
      border-radius: 50%;

      &:hover {
        color: #fff;
        background-color: var(--el-color-primary);
      }
    }
  }
}
</style>
