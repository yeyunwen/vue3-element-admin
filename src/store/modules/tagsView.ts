export const useTagsViewStore = defineStore("tagsView", () => {
  const visitedViews = ref<TagView[]>([]);

  function addTag(view: TagView) {
    if (visitedViews.value.some((v) => v.path === view.path)) return;

    visitedViews.value.push(view);
  }

  function delTag(view: TagView) {
    for (const [i, v] of visitedViews.value.entries()) {
      if (v.path === view.path) {
        visitedViews.value.splice(i, 1);
        break;
      }
    }
  }

  return {
    visitedViews,
    addTag,
    delTag,
  };
});
