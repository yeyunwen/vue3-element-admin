<script lang="ts" setup>
import { getTargetSelectOptions, TARGET_ENUM, TYPE_ENUM, TYPE_ENUM_MAP } from "./enum";

const typeList = [
  {
    lable: "单选",
    value: TYPE_ENUM.单选,
    initData: {
      type: TYPE_ENUM.单选,
      content: "",
      required: true,
      questionOptions: [
        {
          content: "",
        },
        {
          content: "",
        },
        {
          content: "",
        },
      ],
    },
  },
  {
    lable: "多选",
    value: TYPE_ENUM.多选,
    initData: {
      type: TYPE_ENUM.多选,
      content: "",
      required: true,
      questionOptions: [
        {
          content: "",
        },
        {
          content: "",
        },
        {
          content: "",
        },
      ],
    },
  },
  {
    lable: "简答",
    value: TYPE_ENUM.文本,
    initData: {
      type: TYPE_ENUM.文本,
      content: "",
      required: true,
      questionOptions: [
        {
          content: "",
        },
      ],
    },
  },
  {
    lable: "手机",
    value: TYPE_ENUM.手机号,
    initData: {
      type: TYPE_ENUM.手机号,
      content: "",
      required: true,
      questionOptions: [
        {
          content: "",
        },
      ],
    },
  },
];

const surveyForm = ref({
  name: "",
  target: TARGET_ENUM.商家,
});
const surverRules = {
  name: [{ required: true, message: "请输入问卷标题", trigger: "blur" }],
  target: [{ required: true, message: "请选择问题对象", trigger: "blur" }],
};

type SurveyQuestions = {
  type: (typeof TYPE_ENUM)[keyof typeof TYPE_ENUM];
  content: string;
  required: boolean;
  questionOptions?: {
    content: string;
  }[];
}[];
const surveyQuestions = ref<SurveyQuestions>([
  {
    type: "single_choice",
    content: "",
    required: true,
    questionOptions: [
      {
        content: "",
      },
      {
        content: "",
      },
      {
        content: "",
      },
    ],
  },
]);
const curCheckedQuestions = ref(0);
const hasMobile = ref(false);
// const checkedSetting = computed(() => {
//   return typeList[curCheckedQuestions.value];
// });

const getQuestionOptionsInitData = () => {
  return {
    content: "",
  };
};

const handleChoseQuestion = (index: number) => {
  curCheckedQuestions.value = index;
};
const addQuestion = (type: (typeof TYPE_ENUM)[keyof typeof TYPE_ENUM]) => {
  if (type === TYPE_ENUM.手机号) {
    if (hasMobile.value) {
      ElMessage.error("您已经添加了手机号");
      return;
    }
    hasMobile.value = true;
  }
  const typeData = typeList.find((item) => item.value === type);
  if (!typeData) return;
  surveyQuestions.value.splice(curCheckedQuestions.value + 1, 0, typeData.initData);
  handleChoseQuestion(curCheckedQuestions.value + 1);
};
const deleteQuestion = (index: number) => {
  surveyQuestions.value.splice(index, 1);
};

const addQuestionOptions = (index: number) => {
  surveyQuestions.value[index].questionOptions?.push(getQuestionOptionsInitData());
};
const deleteQuestionOptions = (index: number, optionIndex: number) => {
  surveyQuestions.value[index].questionOptions?.splice(optionIndex, 1);
};
</script>

<template>
  <div class="new-container">
    <div class="type-warpper">
      <div class="title">添加问题</div>
      <div class="type-list">
        <el-button v-for="item in typeList" :key="item.value" class="type-item" @click="addQuestion(item.value)">{{
          item.lable
        }}</el-button>
      </div>
    </div>
    <div class="question-warpper">
      <ElForm :model="surveyForm" :rules="surverRules">
        <ElFormItem label="问题标题" prop="name">
          <ElInput v-model="surveyForm.name" placeholder="请输入问卷标题" />
        </ElFormItem>
        <ElFormItem label="问题对象" prop="target">
          <el-radio-group v-model="surveyForm.target">
            <el-radio v-for="item in getTargetSelectOptions()" :key="item.value" :label="item.value">{{
              item.label
            }}</el-radio>
          </el-radio-group>
        </ElFormItem>
        <div
          v-for="(item, index) in surveyQuestions"
          :key="index"
          @click="handleChoseQuestion(index)"
          :class="{ active: index === curCheckedQuestions }"
        >
          <template v-if="item.type === TYPE_ENUM.单选 || item.type === TYPE_ENUM.多选">
            <el-row>
              <el-col :span="24">
                <el-col :offset="1" :span="1.5">
                  <el-checkbox size="large" :label="`问题${index + 1}`" />
                </el-col>
              </el-col>
              <el-col :offset="1" :span="20">
                <ElFormItem>
                  <ElInput v-model="item.content" placeholder="请输入问题" />
                </ElFormItem>
              </el-col>
              <el-col :span="3">
                <el-icon :size="20" class="pointer" @click="addQuestionOptions(index)"> <i-ep-plus /></el-icon>
                <el-icon :size="20" class="pointer" @click="deleteQuestion(index)"> <i-ep-minus /></el-icon>
              </el-col>
              <el-col :span="24">
                <el-row :gutter="10">
                  <el-col
                    :offset="1"
                    :span="10"
                    v-for="(optionItem, optionIndex) in item.questionOptions"
                    :key="optionIndex"
                  >
                    <div :class="{ supplementTop: optionIndex < 2 }">
                      <div style="display: flex; justify-content: space-between; width: 100%; font-size: 14px">
                        <span>选项{{ optionIndex + 1 }}：</span>
                        <span v-if="optionIndex > 1">
                          <el-icon :size="20" @click="deleteQuestionOptions(index, optionIndex)"
                            ><i-ep-minus
                          /></el-icon>
                        </span>
                      </div>
                      <div>
                        <el-form-item>
                          <el-input v-model="optionItem.content" placeholder="请输入选项" clearable />
                        </el-form-item>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>

          <template v-else-if="item.type === TYPE_ENUM.文本">
            <el-row>
              <el-col :span="24">
                <el-col :offset="1" :span="1.5">
                  <el-checkbox size="large" :label="`问题${index + 1}`" />
                </el-col>
              </el-col>
              <el-col :offset="1" :span="20">
                <ElFormItem>
                  <ElInput v-model="item.content" placeholder="请输入问题" />
                </ElFormItem>
                <ElFormItem>
                  <ElInput type="textarea" />
                </ElFormItem>
              </el-col>
            </el-row>
          </template>
          <template v-else-if="item.type === TYPE_ENUM.手机号">
            <el-row>
              <el-col :span="24">
                <el-col :offset="1" :span="1.5">
                  <el-checkbox size="large" :label="`手机号`" />
                </el-col>
              </el-col>
              <el-col :offset="1" :span="20">
                <ElFormItem>
                  <ElInput />
                </ElFormItem>
              </el-col>
            </el-row>
          </template>
        </div>
      </ElForm>
    </div>
    <div class="setting-wrapper">
      <div class="title">题型设置</div>
      <div class="setting-list">
        <div class="setting-item">
          <div class="lable">当前题型：</div>
          <div class="value">{{ TYPE_ENUM_MAP[surveyQuestions[curCheckedQuestions].type] }}</div>
        </div>
        <div class="setting-item">
          <div class="lable">是否必填：</div>
          <div class="value"><el-switch v-model:model-value="surveyQuestions[curCheckedQuestions].required" /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.new-container {
  display: flex;
  width: 100%;
  height: 100%;

  .type-warpper {
    width: 200px;
    padding: 12px;
    border-radius: 5px;

    .title {
      margin-bottom: 10px;
    }

    .type-list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;

      :deep(.el-button + .el-button) {
        margin-left: 0;
      }
    }
  }

  .question-warpper {
    flex: 1 0 500px;
    margin: 0 20px;

    .active {
      border: 1px solid var(--el-color-primary);
      outline: 2px solid var(--el-color-primary);
    }
  }

  .setting-wrapper {
    width: 200px;
    padding: 12px;
    border-radius: 5px;

    .title {
      margin-bottom: 10px;
    }

    .setting-list {
      .setting-item {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
