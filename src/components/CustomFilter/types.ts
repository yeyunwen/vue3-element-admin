export type DefaultOptionType = {
  label: string;
  value: any;
}[];

export type CustomFilterComponent = "ElSelect" | "ElInput";

export type CustomFilterOptionItem = {
  /**
   * 组件
   */
  component: CustomFilterComponent;
  /**
   * key
   */
  key?: string;
  /**
   * label文字
   */
  label?: string;
  props?: {
    [key: string]: any;
  };
  value?: any;
  /**
   * 默认值
   */
  defaultValue?: any;
  /**
   * select 选项
   */
  options?: DefaultOptionType;
  /**
   * select 选项
   */
  optionsFn?: () => Promise<DefaultOptionType> | DefaultOptionType;
};

export type SearchParams = Record<string, any>;

export type BreakPoint = "xs" | "sm" | "md" | "lg" | "xl";
