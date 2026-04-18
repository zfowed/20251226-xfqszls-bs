<template>
  <PageCard title="方案对比" bg-class="left">
    <div class="page-container">
      <div class="flex mb-[20px]">
        <div class="flex flex-1 items-center">
          <span>起止时间：</span>
          <el-date-picker
            class="flex-1 app-datepicker"
            v-model="filterValue"
            type="datetimerange"
            :teleported="false"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="A hh:mm:ss"
          />
        </div>
        <ElButton class="ml-[20px] app-button" @click="filterValue = ''">
          播放
        </ElButton>
      </div>
      <div class="flex">
        <div class="flex flex-1 items-center">
          <span>断面方案：</span>
          <ElSelect
            v-model="filterWaterValue"
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
        <ElButton class="ml-[20px] app-button" @click="filterValue = ''">
          搜索
        </ElButton>
      </div>

      <div class="h-[454px] flex mt-[40px]">
        <VideoPlay
          :src="monitorUrl"
          :controls="true"
          :muted="true"
          :loop="false"
          ratio="16:9"
          empty-text="正在加载中"
          class="flex-1 mr-[16px]"
        />
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">

const filterValue = ref<string | number>('')

const filterWaterValue = ref('2026')
const optionsList = [
  { value: '2026', label: '测站类型1' },
  { value: '2025', label: '测站类型2' }
]

const monitorUrl = ref<string>('')
usePolling(async () => {
  monitorUrl.value = ''
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

:deep(.el-date-editor) {
  height: 65px;
  font-size: 28px;
  background: rgb(14 47 66 / 0.9);
  border: 1px solid #4896C6;
  box-shadow: none;

  .el-range-input {
    font-size: 30px;
  }

  .el-icon {
    font-size: 25px;
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

.monitor-section {
  flex: 0 0 378px;
  color: #81E6FF;
  font-size: 30px;
  font-family: "PingFang SC", sans-serif;
  overflow: auto;

  .monitor-item {
    padding-bottom: 13px;
    margin-bottom: 20px;
    border-bottom: 2px dotted rgb(217 231 255 / 0.2);
    cursor: pointer;

    &:hover,
    &.active {
      color: #fff;
    }

    &:last-child {
      margin-bottom: 0;
      border-bottom: none;
    }
  }
}
</style>
