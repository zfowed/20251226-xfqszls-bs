<template>
  <PageCard title="土壤墒情" bg-class="right">
    <div class="reservoir-card__header text-right">
      <ElSelect
        v-model="selectedReservoirId"
        class="reservoir-card__select"
        popper-class="reservoir-card__select-popper"
        placeholder="请选择水库"
      >
        <ElOption
          v-for="item in reservoirList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </ElSelect>
    </div>
    <div class="agriculture-moisture-card">
      <VueEcharts :option="echartOption" class="p-[20px] agriculture-moisture-card__chart" />
    </div>
  </PageCard>
</template>

<script setup lang="ts">
const selectedReservoirId = ref('station-1')
const reservoirList = ref([
  { id: 'station-1', name: '贾家河站' },
  { id: 'station-2', name: '幸福渠站' },
  { id: 'station-3', name: '红旗渠站' },
  { id: 'station-4', name: '沿山河站' }
])

const xAxisData = ['4.21', '4.22', '4.23', '4.24', '4.25', '4.26', '4.27']

const moisture10Data = [26, 57, 68, 54, 39, 43, 27]
const moisture20Data = [40, 71, 82, 68, 52, 54, 41]
const moisture40Data = [11, 22, 19, 15, 13, 23, 11]
const riceWaterLevelData = [230, 255, 292, 246, 206, 268, 192]

const createAreaGradient = (topColor: string, bottomColor: string) => {
  return {
    colorStops: [
      { offset: 0, color: topColor },
      { offset: 1, color: bottomColor }
    ]
  }
}

const createLineSeries = (
  name: string,
  color: string,
  data: number[],
  areaColor?: { colorStops: { offset: number, color: string }[] },
  yAxisIndex = 0,
  z = 3
) => {
  return {
    name,
    type: 'line',
    smooth: true,
    yAxisIndex,
    data,
    z,
    showSymbol: true,
    symbol: 'circle',
    symbolSize: 7,
    lineStyle: {
      width: 2,
      color,
      shadowBlur: 10,
      shadowColor: color
    },
    itemStyle: {
      color,
      borderColor: color,
      borderWidth: 0,
      shadowBlur: 10,
      shadowColor: color
    },
    areaStyle: areaColor
      ? {
          color: areaColor
        }
      : undefined
  }
}

const echartOption = ref({
  animation: false,
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(7, 23, 44, 0.92)',
    borderColor: 'rgba(122, 210, 255, 0.35)',
    borderWidth: 1,
    textStyle: {
      color: '#EAF7FF',
      fontSize: 14
    },
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: 'rgba(170, 228, 255, 0.24)'
      }
    }
  },
  legend: {
    top: 6,
    right: 0,
    itemWidth: 18,
    itemHeight: 8,
    itemGap: 18,
    // icon: 'roundRect',
    textStyle: {
      color: 'rgba(233, 244, 255, 0.92)',
      fontSize: 24,
      fontFamily: 'PingFangSC, sans-serif',
      padding: [0, 0, 0, 6]
    },
    data: ['10公分含水率', '20公分含水率', '40公分含水率', '稻田水层']
  },
  grid: {
    top: 100,
    left: 80,
    right: 80,
    bottom: 40
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: xAxisData,
    axisTick: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(128, 188, 228, 0.55)',
        width: 2
      }
    },
    axisLabel: {
      margin: 18,
      color: 'rgba(228, 240, 255, 0.86)',
      fontSize: 24,
      fontFamily: 'DINAlternate, Arial, sans-serif'
    },
    splitLine: {
      show: false
    }
  },
  yAxis: [
    {
      type: 'value',
      min: 0,
      max: 90,
      interval: 23,
      name: '%',
      nameGap: 14,
      nameTextStyle: {
        color: 'rgba(228, 240, 255, 0.9)',
        fontSize: 24,
        align: 'left',
        padding: [0, 0, 0, -28]
      },
      axisLabel: {
        color: 'rgba(228, 240, 255, 0.9)',
        fontSize: 24
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color: 'rgba(177, 214, 239, 0.14)'
        }
      }
    },
    {
      type: 'value',
      min: 180,
      max: 360,
      interval: 30,
      axisLabel: {
        color: 'rgba(228, 240, 255, 0.9)',
        fontSize: 24
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      }
    }
  ],
  series: [
    createLineSeries(
      '10公分含水率',
      '#F2A451',
      moisture10Data,
      createAreaGradient('rgba(242, 164, 81, 0.44)', 'rgba(242, 164, 81, 0)')
    ),
    createLineSeries(
      '20公分含水率',
      '#F3DF48',
      moisture20Data,
      createAreaGradient('rgba(243, 223, 72, 0.30)', 'rgba(243, 223, 72, 0)')
    ),
    createLineSeries(
      '40公分含水率',
      '#56F567',
      moisture40Data,
      createAreaGradient('rgba(86, 245, 103, 0.26)', 'rgba(86, 245, 103, 0)'),
      0,
      2
    ),
    createLineSeries(
      '稻田水层',
      '#4EC8FF',
      riceWaterLevelData,
      createAreaGradient('rgba(78, 200, 255, 0.28)', 'rgba(78, 200, 255, 0)'),
      1,
      4
    )
  ]
})
</script>

<style lang="scss" scoped>
.reservoir-card__header {
  padding: 12px 18px 0;
}

.reservoir-card__select {
  width: 314px;
}

.agriculture-moisture-card {
  padding: 12px 18px 10px 8px;
}

.agriculture-moisture-card__chart {
  width: 100%;
  height: 522px;
}

:deep(.reservoir-card__select .el-select__wrapper) {
  min-height: 38px;
  padding: 0 14px 0 16px;
  background: linear-gradient(180deg, rgb(20 74 122 / 0.72) 0%, rgb(7 42 83 / 0.76) 100%);
  border-radius: 0;
  box-shadow:
    inset 0 0 0 1px rgb(106 197 255 / 0.36),
    inset 0 0 16px rgb(72 182 255 / 0.14),
    0 0 0 1px rgb(79 164 219 / 0.56);
}

:deep(.reservoir-card__select .el-select__wrapper.is-focused) {
  box-shadow:
    inset 0 0 0 1px rgb(116 219 255 / 0.5),
    inset 0 0 20px rgb(87 198 255 / 0.18),
    0 0 0 1px rgb(106 197 255 / 0.72);
}

:deep(.reservoir-card__select .el-select__selection) {
  min-height: 38px;
}

:deep(.reservoir-card__select .el-select__placeholder),
:deep(.reservoir-card__select .el-select__selected-item),
:deep(.reservoir-card__select .el-select__input-text) {
  color: #dff5ff;
  font-size: 18px;
  font-family: PingFangSC, sans-serif;
  font-weight: 600;
}

:deep(.reservoir-card__select .el-select__placeholder) {
  color: rgb(223 245 255 / 0.7);
}

:deep(.reservoir-card__select .el-select__suffix) {
  margin-left: 8px;
}

:deep(.reservoir-card__select .el-select__caret) {
  color: #86eaff;
  font-size: 18px;
  font-weight: 700;
}

:global(.reservoir-card__select-popper.el-popper) {
  background: linear-gradient(180deg, rgb(11 43 82 / 0.96) 0%, rgb(6 28 56 / 0.96) 100%);
  border: 1px solid rgb(96 192 255 / 0.32);
  border-radius: 0;
  box-shadow: 0 10px 24px rgb(3 14 30 / 0.42);
}

:global(.reservoir-card__select-popper .el-popper__arrow) {
  display: none;
}

:global(.reservoir-card__select-popper .el-select-dropdown__item) {
  height: 36px;
  padding: 0 16px;
  color: rgb(223 245 255 / 0.88);
  font-size: 16px;
  font-family: PingFangSC, sans-serif;
  line-height: 36px;
}

:global(.reservoir-card__select-popper .el-select-dropdown__item.is-hovering),
:global(.reservoir-card__select-popper .el-select-dropdown__item.is-selected) {
  background: rgb(71 154 217 / 0.24);
  color: #eefbff;
}
</style>
