export type TablePaginationConfig = {
  currentPage?: number;
  total?: number;
  pageSize?: number;
  pageSizes?: number[];
  layout?: string;
};

export type UseListParams = {
  net: (params: any) => Promise<any>;
  pagination?: TablePaginationConfig;
};

const defaultPagination: Required<TablePaginationConfig> = {
  currentPage: 1,
  pageSize: 10,
  total: 0,
  pageSizes: [10, 20, 50, 100],
  layout: "prev, pager, next, total",
};

export const useList = ({ net, pagination: customPagination }: UseListParams) => {
  const loading = ref(false);
  const dataSource = ref<any[]>([]);
  const pagination = reactive<Required<TablePaginationConfig>>({
    ...defaultPagination,
    ...customPagination,
  });
  // 前端分页暂存数据
  let tempDataSource: any[] = [];

  const onSearch = (_params: any) => {
    pagination.currentPage = 1;
    loading.value = true;
    console.log("_params: ", _params);
    net(_params)
      .then((res: any) => {
        // 前端分页， 此时默认后端返回的是所有数据的数组
        if (Array.isArray(res)) {
          tempDataSource = tempDataSource.concat(res);
          dataSource.value = fePagination.value;
          pagination.total = res.length;
        }
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const onTableChange = (currentPage: number, pageSize: number) => {
    pagination.currentPage = currentPage;
    pagination.pageSize = pageSize;
    dataSource.value = fePagination.value;
  };

  const fePagination = computed(() => {
    return tempDataSource.slice(
      (pagination.currentPage - 1) * pagination.pageSize,
      pagination.currentPage * pagination.pageSize
    );
  });
  return {
    loading,
    dataSource,
    pagination,
    onSearch,
    onTableChange,
  };
};
