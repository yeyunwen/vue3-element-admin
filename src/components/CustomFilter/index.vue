<script lang="ts" setup>
/**
 * 自定义筛选组件
 * 应有功能
 * 1. 数据绑定
 * 2. 选项自定义 支持 select input
 * 3. 搜索
 * 4. 重置
 * 5. 类型支持
 */
import type {
  BreakPoint,
  CustomFilterComponent,
  CustomFilterOptionItem,
  SearchParams,
  DefaultOptionType,
} from "./types";
import { isDef } from "@/utils/validate";
import { cloneDeep, debounce } from "lodash-es";

// 后续需要优化
// 因为动态导入不支持动态组件，这里手动按需导入可能会出现的组件和对应的样式
import { ElInput, ElSelect } from "element-plus";
import "element-plus/es/components/select/style/css";

defineOptions({
  name: "CustomFilter",
});

const componentMap: Record<CustomFilterComponent, any> = {
  ElInput,
  ElSelect,
};

const { gap, colsOptions, formOptions, onSearch } = withDefaults(
  defineProps<{
    gap?: [number, number] | number;
    colsOptions?: Record<BreakPoint, number>;
    formOptions: CustomFilterOptionItem[];
    onSearch: (params: any) => void;
  }>(),
  {
    gap: 16,
    colsOptions: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }),
  }
);

const customFilterRef = ref();

const getOptions = (): CustomFilterOptionItem[] => {
  const cloneOptions = cloneDeep(formOptions);

  const res = cloneOptions.map((optionItem, index) => {
    const { defaultValue, optionsFn, options } = optionItem;

    if (isDef(defaultValue)) {
      optionItem.value = defaultValue;
    }

    let tmpOptions: DefaultOptionType = [];
    let optionRes;
    if (options) {
      tmpOptions = options;
    }
    if (typeof optionsFn === "function") {
      optionRes = optionsFn();
      if (optionRes instanceof Promise) {
        optionRes.then((res) => {
          _options.value[index].options = res; // 这里是异步的，此时_options已经为ref数据，可以触发响应式。
        });
      } else {
        tmpOptions = optionRes;
      }
    }

    return {
      ...optionItem,
      options: tmpOptions,
    };
  });

  return res;
};
const _options = ref<CustomFilterOptionItem[]>(getOptions());

const params = computed((): SearchParams => {
  return _options.value.map((item) => {
    if (item.key) {
      return {
        [item.key]: item.value,
      };
    }
  });
});

const onReset = () => {
  _options.value.forEach((item) => {
    item.value = item.defaultValue || undefined;
  });
  onSearch(params.value);
};

//#region gird布局
const breakPoint = ref<BreakPoint>("xl");
const showNum = ref();
const expand = ref(false);

const showDropdown = computed(() => {
  return showNum.value < _options.value.length;
});

const onExpand = () => {
  expand.value = !expand.value;
};
const windowResize = debounce(() => {
  const width = customFilterRef.value?.offsetWidth;
  switch (!!width) {
    case width < 768:
      breakPoint.value = "xs";
      showNum.value = 1;
      break;
    case width >= 768 && width < 992:
      breakPoint.value = "sm";
      showNum.value = 3;
      break;
    case width >= 992 && width < 1200:
      breakPoint.value = "md";
      showNum.value = 5;
      break;
    case width >= 1200 && width < 1920:
      breakPoint.value = "lg";
      showNum.value = 7;
      break;
    case width >= 1920:
      breakPoint.value = "xl";
      break;
  }
}, 200);

const gridGap = () => {
  if (Array.isArray(gap)) {
    return `${gap[0]}px ${gap[1]}px`;
  } else {
    return `${gap}px`;
  }
};

const gridCols = computed(() => {
  return colsOptions[breakPoint.value];
});

const gridStyle = computed(() => {
  return {
    display: "grid",
    gridGap: gridGap(),
    gridTemplateColumns: `repeat(${gridCols.value}, minmax(0, 1fr))`,
  };
});

//#endregion

onMounted(() => {
  windowResize();
  window.addEventListener("resize", windowResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", windowResize);
});
</script>

<template>
  <div ref="customFilterRef" class="custom-filter-container" :style="gridStyle">
    <div
      v-for="(item, index) in _options"
      :key="item.key"
      v-show="index < showNum || expand"
      class="custom-filter-item"
    >
      <div v-if="item.label" class="item-label">
        {{ item.label }}
      </div>
      <!-- 这里哪怕item没有value这个属性，因为v-model的原因。-->
      <component :is="componentMap[item.component]" v-bind="item.props" v-model="item.value" class="item-control">
        <template v-if="item.component === 'ElSelect'">
          <ElOption v-for="option in item?.options" :key="option.value" :label="option.label" :value="option.value" />
        </template>
      </component>
    </div>

    <div class="btn-container">
      <ElButton type="primary" @click="onSearch(params)">搜索</ElButton>
      <ElButton @click="onReset">重置</ElButton>
      <ElButton v-if="showDropdown" type="text" size="small" @click="onExpand">
        {{ expand ? "收起" : "展开" }}
      </ElButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.custom-filter-container {
  --label-scope: 8px;

  .custom-filter-item {
    display: flex;
    align-items: center;

    .item-label {
      margin-right: var(--label-scope);
      white-space: nowrap;
    }

    .item-control {
      flex: 1;
    }
  }
}
</style>
