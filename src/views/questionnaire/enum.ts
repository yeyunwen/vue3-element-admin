import { enumMap2arr4Select } from "@/utils";

export const TARGET_ENUM = {
  商家: "商家",
  用户: "用户",
};

export const TARGET_ENUM_MAP = {
  [TARGET_ENUM.商家]: "商家",
  [TARGET_ENUM.用户]: "用户",
};

export const getTargetSelectOptions = () => {
  return enumMap2arr4Select(TARGET_ENUM);
};

//单选single_choice,多选multiple_choice,文本text
export const TYPE_ENUM = {
  单选: "single_choice",
  多选: "multiple_choice",
  文本: "text",
  手机号: "mobile",
};

export const TYPE_ENUM_MAP: Record<(typeof TYPE_ENUM)[keyof typeof TYPE_ENUM], string> = {
  [TYPE_ENUM.单选]: "单选",
  [TYPE_ENUM.多选]: "多选",
  [TYPE_ENUM.文本]: "文本",
  [TYPE_ENUM.手机号]: "手机号",
};
