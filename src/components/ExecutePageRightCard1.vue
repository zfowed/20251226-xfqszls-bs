<template>
  <PageCard title="执行情况" bg-class="right">
    <div class="page-container">
      <div class="header-title">
        <img
          src="@/assets/global/images/card-title-icon.png"
          class="w-[30px] h-[32px] mr-[9px]"
        >
        <span>巡查统计</span>
      </div>
      <div class="grid grid-cols-[auto_auto] justify-between gap-row-[63px]">
        <div class="reservoir-item" v-for="(item, index) in reservoirInfo" :key="index">
          <img
            src="@/assets/global/images/inspection-order-icon.png"
            class="reservoir-item__icon mr-[14px]"
          >
          <div>
            <div class="reservoir-item__label">
              {{ item.name }}
            </div>
            <div>
              <ZfTweenNumber :value="item.value" class="reservoir-item__value" />
              <span class="reservoir-item__unit">{{ item.unit }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 分割 -->
      <div class="header-title mt-[50px] mb-[35px]">
        <img
          src="@/assets/global/images/card-title-icon.png"
          class="w-[30px] h-[32px] mr-[9px]"
        >
        <span class="mr-[30px]">巡查统计</span>
        <ElSelect
          v-model="filterWaterValue"
          placeholder="请选择"
          :teleported="false"
          class="app-select"
        >
          <ElOption
            v-for="item in optionsList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </ElSelect>
      </div>
      <div class="app-table mb-[35px]">
        <div class="table-tbody">
          <div v-for="item in sluiceList1" :key="item.id" class="table-tbody__tr">
            <div class="sluice-item">
              <div class="cricle" :class="item.type" />
              <div class="sluice-item__title">
                {{ item.name }}
              </div>
              <div class="sluice-item__value">
                <ZfTweenNumber :value="item.value" />
              </div>
              <span class="sluice-item__unit">{{ item.unit }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="h-[400px]" />
    </div>
  </PageCard>
</template>

<script setup lang="ts">
import { SeededRandom } from 'zf-utilz'

const filterWaterValue = ref('2026')
const optionsList = [
  { value: '2026', label: '2026' },
  { value: '2025', label: '2025' }
]

const sluiceList1 = ref<Record<string, any>[]>([
  { id: 'sluiceList1', name: '处理问题', type: 'normal', value: 0, unit: '个' },
  { id: 'sluiceList2', name: '上报问题', type: 'error', value: 0, unit: '个' }
])

const reservoirInfo = ref<Record<string, any>>([
  { name: '当前水位', value: 0, unit: 'm' },
  { name: '当前水量', value: 0, unit: '万m³' },
  { name: '入库流量', value: 0, unit: 'm³/s' },
  { name: '出库流量', value: 0, unit: 'm³/s' }
])

usePolling(async () => {
  const result: any = await service.xfqs.findSinlgeRsvrData({
    stcd: 'RV_001'
  })
  reservoirInfo.value[0].value = result[0].z ? result[0].z : 0
  reservoirInfo.value[1].value = result[0].v ? result[0].v : 0
  reservoirInfo.value[2].value = result[0].q ? result[0].q : 0
  reservoirInfo.value[3].value = result[0].otq ? result[0].otq : 0

  sluiceList1.value.forEach((item) => {
    item.value = SeededRandom.randomNumber(0, 100)
  })
})
</script>

<style lang="scss" scoped>
.page-container {
  padding: 68px 36px;
}

.header-title {
  position: relative;
  display: flex;
  align-items: center;
  font-size: 34px;
  color: #fff;
  margin-bottom: 36px;
  font-family: DINMedium, sans-serif;
}

.reservoir-item {
  display: flex;
  align-items: center;
  font-family: PingFangSC, sans-serif;

  .reservoir-item__label {
    font-size: 30px;
  }

  .reservoir-item__value {
    font-family: Quantico, sans-serif;
    font-size: 32px;
    font-weight: bold;
    color: #50fffc;
  }

  .reservoir-item__unit {
    font-size: 24px;
    color: #beeeff;
  }
}

.app-table {
  .table-header {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    height: 78px;
    width: 100%;
    background: rgb(0 42 93 / 0.52);
    border: 1px solid #92bbff;
    box-sizing: border-box;
  }

  .table-tbody {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    background: rgb(0 42 93 / 0.50);
    border: 1px solid #92bbff;
    box-sizing: border-box;

    &__tr {
      border-right: 1px solid #92bbff;

      &:nth-child(2n) {
        border-right: none;
      }

      &:last-child {
        border-right: none;
      }
    }
  }

  .sluice-btns {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0 20px;

    &.active {
      text-shadow: 0 0 3.6px #2bdfff;
    }

    border-right: 1px solid #92bbff;

    &:nth-child(2n) {
      border-right: none;
    }

    &:last-child {
      border-right: none;
    }
  }

  .sluice-item {
    position: relative;
    display: flex;
    align-items: center;
    font-family: PingFangSC, sans-serif;
    height: 78px;
    padding-left: 55px;

    .cricle {
      position: absolute;
      top: 50%;
      left: 30px;
      transform: translateY(-50%);
      content: "";
      width: 10px;
      height: 10px;
      border-radius: 50%;

      &.normal {
        background: #03e6ff;
        box-shadow: 0 0 4px #03e6ff;
      }

      &.error {
        background: red;
        box-shadow: 0 0 4px red;
      }
    }

    &__title {
      color: #fff;
      font-size: 28px;
    }

    &__value {
      font-size: 32px;
      color: #50fffc;
      font-family: Quantico, sans-serif;
      font-weight: bold;
      margin: 0 15px;
    }

    &__unit {
      color: #beeeff;
      font-size: 24px;
    }
  }
}

.app-select {
  width: 496px;

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
</style>
