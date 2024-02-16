import { defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {
  const sidebar = reactive({
    opened: true,
  });

  const toggleSideBar = () => {
    sidebar.opened = !sidebar.opened;
  };

  return {
    sidebar,
    toggleSideBar,
  };
});
