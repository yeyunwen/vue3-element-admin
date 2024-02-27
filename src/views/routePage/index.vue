<script lang="ts" setup>
const detailId = ref(null);

const router = useRouter();
</script>

<template>
  <div>routePage</div>
  <el-select v-model="detailId" @change="router.push(`/routePage/index/${detailId}`)">
    <el-option v-for="item in 10" :key="item" :value="item" />
  </el-select>
  <RouterView />
</template>
