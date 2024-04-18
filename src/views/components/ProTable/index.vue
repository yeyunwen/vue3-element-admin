<script lang="ts" setup>
import type { CustomFilterOptionItem } from "@/components/CustomFilter/types";
import { useList } from "@/hooks/useList";

defineOptions({
  name: "ProTable",
});

const customFilterOptions: CustomFilterOptionItem[] = [
  {
    label: "用户名",
    key: "name",
    component: "ElInput",
  },
  {
    label: "年龄",
    key: "age",
    component: "ElInput",
  },
  {
    label: "年龄",
    key: "age",
    component: "ElInput",
  },
  {
    label: "性别",
    key: "sex",
    component: "ElSelect",
    options: [
      {
        label: "男",
        value: 1,
      },
      {
        label: "女",
        value: 0,
      },
    ],
  },
];

const fetchData = () => {
  return new Promise((resolve) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((res) => {
        resolve(res);
      });
  });
};

const { loading, dataSource, pagination, onSearch, onTableChange } = useList({
  net: fetchData,
  pagination: {
    pageSize: 5,
  },
});

console.log(pagination);
</script>

<template>
  <div>
    <CustomFilter :form-options="customFilterOptions" :onSearch="onSearch" />
    <ElTable :data="dataSource" v-loading="loading" @change="onTableChange">
      <ElTableColumn prop="name" label="姓名" />
      <ElTableColumn prop="email" label="邮箱" />
    </ElTable>
    <div class="pagination-container">
      <ElPagination
        class="pagination"
        :total="pagination.total"
        :page-size="pagination.pageSize"
        :page-sizes="pagination.pageSizes"
        :layout="pagination.layout"
        @change="onTableChange"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pagination-container {
  display: flex;
  margin-top: 20px;

  .pagination {
    margin-right: 20px;
    margin-left: auto;
  }
}
</style>
