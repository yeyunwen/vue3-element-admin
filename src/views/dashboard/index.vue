<script setup lang="ts">
defineOptions({
  name: "Dashboard",
  inheritAttrs: false,
});

const handleClick = (e: MouseEvent) => {
  console.log("click", e.currentTarget);
};
</script>

<template>
  <div>
    <a @click="handleClick">
      <button @click.stop="handleClick">Click</button>
    </a>
  </div>
</template>

<!-- <style lang="scss"></style> -->
