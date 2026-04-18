<template>
  <PageCard title="紧急预案" bg-class="left">
    <div class="page-container">
      <div class="flex mb-[20px]">
        <div class="flex flex-1 items-center">
          <span>响应类型：</span>
          <ElSelect
            v-model="filterWaterValue1"
            placeholder="请选择"
            :teleported="false"
            class="app-select flex-1"
          >
            <ElOption
              v-for="item in optionsList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </ElSelect>
        </div>
        <ElButton class="ml-[20px] app-button" @click="filterWaterValue1 = ''">
          搜索
        </ElButton>
      </div>
      <div class="flex">
        <div class="flex flex-1 items-center">
          <span>响应等级：</span>
          <ElSelect
            v-model="filterWaterValue2"
            placeholder="请选择"
            :teleported="false"
            class="app-select flex-1"
          >
            <ElOption
              v-for="item in optionsList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </ElSelect>
        </div>
        <ElButton class="ml-[20px] app-button" @click="filterWaterValue2 = ''">
          重置
        </ElButton>
      </div>

      <ElTable :data="dataList" class="files-table mt-[40px]" height="415px">
        <ElTableColumn prop="name" label="响应类型" />
        <ElTableColumn prop="value1" label="应急响应等级" />
        <ElTableColumn prop="value2" label="启动条件" />
        <ElTableColumn prop="value3" label="应急响应措施" />
        <ElTableColumn label="操作" width="200">
          <template #default>
            <div class="flex items-center">
              <div>
                <img class="mr-[20px]" src="@/assets/global/images/drop.png">
              </div>
              <el-popconfirm
                class="box-item"
                title="是否确认删除？"
                placement="top-start"
                effect="dark"
                confirm-button-text="确定"
                cancel-button-text="取消"
              >
                <template #reference>
                  <div>
                    <img src="@/assets/global/images/del.png">
                  </div>
                </template>
              </el-popconfirm>
            </div>
          </template>
        </ElTableColumn>
      </ElTable>
    </div>
  </PageCard>
</template>

<script setup lang="ts">

const filterWaterValue1 = ref('2026')
const filterWaterValue2 = ref('2025')
const optionsList = [
  { value: '2026', label: '1' },
  { value: '2025', label: '2' }
]

const dataList = ref<{ [key: string]: any }[]>([])
usePolling(async () => {
  dataList.value = [{
    name: '--',
    value1: '--',
    value2: '--',
    value3: '--'
  }, {
    name: '--',
    value1: '--',
    value2: '--',
    value3: '--'
  }, {
    name: '--',
    value1: '--',
    value2: '--',
    value3: '--'
  }, {
    name: '--',
    value1: '--',
    value2: '--',
    value3: '--'
  }]
})
</script>

<style lang="scss" scoped>
.page-container {
  padding: 35px 40px;
}

.app-select {
  &:deep(.el-select__wrapper.is-focused) {
    .el-input__inner {
      color: #fff;
    }
  }

  &:deep(.el-popper) {
    background: rgb(14 47 66 / 0.6);
    border: none;
    top: 70px !important;
    left: 0 !important;

    .el-popper__arrow {
      display: none;
    }

    .el-select-dropdown__item {
      height: 60px;
      color: #81E6FF;
      font-size: 30px;
      font-family: PingFangSC, sans-serif;
      line-height: 60px;

      &.is-hovering {
        background: rgb(92 133 255 / 0.51);
      }
    }
  }

  &:deep(.el-select__wrapper) {
    background: rgb(14 47 66 / 0.6);
    border: 1px solid #4896C6;
    box-shadow: none;

    &:hover,
    &:active {
      box-shadow: none !important;
    }

    .el-select__selection {
      height: 60px;
      line-height: 60px;
      font-size: 30px;
      font-family: PingFangSC, sans-serif;
      letter-spacing: 5px;

      .el-select__placeholder {
        color: #81E6FF;
      }
    }

    .el-select__suffix {
      display: flex;
      align-items: center;

      .el-select__icon {
        width: 30px;
        height: 30px;
        background: url('@/assets/global/images/flood/guide-triangle.png') no-repeat;
        background-size: 100%;
      }
    }
  }
}

.app-input {
  &:deep(.el-input__wrapper) {
    height: 65px;
    font-size: 28px;
    background: rgb(14 47 66 / 0.6);
    border: 1px solid #4896C6;
    box-shadow: none;

    .el-input__inner {
      color: #4BDBFF;
    }
  }
}

.app-button {
  background: rgb(14 47 66 / 0.6);
  border: 1px solid #4896C6;
  color: #81E6FF;
  font-size: 30px;
  font-family: PingFangSC, sans-serif;
  height: 65px;
  padding: 0 30px;

  &:hover {
    background: rgb(92 133 255 / 0.51);
    border-color: #4896C6;
    color: #81E6FF;
    box-shadow: none !important;
   }

   &:active {
    background: rgb(92 133 255 / 0.51);
    border-color: #4896C6;
    color: #81E6FF;
    box-shadow: none !important;
   }

}

:deep(.el-table) {
  /* 透明度为0，不显示背景色 */
  background-color: rgb(255 240 240 / 0);
}

.files-table {
  :deep(.el-table__inner-wrapper) {
    &::before {
      display: none;
    }

    tr {
      background: transparent;
    }

    .el-table__header-wrapper {
      th.el-table__cell {
        background: rgb(19 96 160 / 0.46);
        cursor: pointer;
        margin-bottom: 4px;
        border-bottom: none;
        color: #fff;
        font-family: PIngFangSC, sans-serif;
        font-size: 30px;

        // border: 1px solid #527191;
      }
    }

    .el-table__body {
      border-spacing: 0 4px;

      tr {
        background: transparent;

        &:hover {
          background: linear-gradient(180deg, rgb(30 83 132 / 0.52), rgb(0 132 255 / 0.52));
        }
      }
    }

    .el-table__body-wrapper {
      margin-top: 4px;

      td.el-table__cell {
        background: rgb(19 79 135 / 0.2);
        cursor: pointer;
        margin-bottom: 4px;
        color: #81E6FF;
        font-family: PIngFangSC, sans-serif;
        font-size: 30px;
        border: 1px solid #527191;

        &:not(:last-child) {
          border-right: none;
        }

        &:not(:first-child) {
          border-left: none;
        }
      }
    }

    .cell {
      height: 80px;
      line-height: 80px;
    }

  }
}
</style>
