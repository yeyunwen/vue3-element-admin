<script setup lang="ts">
defineOptions({
  name: "Hamburger",
});
defineProps({
  isActive: {
    type: Boolean,
    default: true,
    required: true,
  },
});
const emit = defineEmits(["toggleClick"]);

const toggleClick = () => {
  emit("toggleClick");
};
</script>
<template>
  <div class="hamburger-container" @click="toggleClick">
    <svg-icon class="hamburger-icon" :class="{ 'is-active': isActive }" icon-class="shrink" />
  </div>
</template>
<style lang="scss" scoped>
.hamburger-container {
  display: flex;
}

.hamburger-icon {
  cursor: pointer;
  transform: scaleX(-1);

  &.is-active {
    transform: scaleX(1);
  }
}
</style>
