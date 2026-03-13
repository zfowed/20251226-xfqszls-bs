<template>
  <PageCard title="灌区需水" bg-class="right">
    <div class="page-container">
      <ElSelect
        v-model="filterWaterValue"
        placeholder="请选择"
        :teleported="false"
        class="app-select mb-[40px]"
        @change="dataListTiggle.trigger()"
      >
        <ElOption
          v-for="item in optionsList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </ElSelect>
      <div class="h-[353px] relative">
        <span>需水量（万m3）</span>
        <VueEcharts v-if="filterWaterValue === 'long'" :option="echartOption" class="mt-[20px]" />
        <VueEcharts v-else-if="filterWaterValue === 'short'" :option="echartOption2" class="mt-[20px]" />
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

const filterWaterValue = ref('long')
const optionsList = [
  { value: 'long', label: '长期' },
  { value: 'short', label: '短期' }
]

const echartOption = ref({
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    top: -5,
    left: 'center',
    itemWidth: 30,
    itemHeight: 10,
    itemGap: 20,
    textStyle: {
      color: '#FFFFFF',
      fontSize: 20,
      fontFamily: 'PingFangSC, sans-serif',
      padding: [0, 0, 0, 8]
    },
    data: [] as any
  },
  grid: {
    top: '15%',
    left: '3%',
    right: '3%',
    bottom: '5%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    // boundaryGap: false,
    axisTick: {
      show: false
    },
    offset: 15,
    axisLine: {
      lineStyle: {
        type: 'solid',
        color: 'rgba(179,223,255, 0.5)'
      }
    },
    axisLabel: {
      color: '#fff',
      fontSize: 18,
      fontFamily: 'PingFangSC, sans-serif'
    },
    data: [] as string[]
  },
  yAxis: [{
    type: 'value',
    position: 'left',
    nameTextStyle: {
      color: '#fff',
      fontSize: 20,
      padding: [0, 55, 0, 0]
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
        color: 'rgba(217,231,255, 0.2)'
      }
    },
    axisLabel: {
      color: '#fff',
      fontSize: 20,
      fontFamily: 'PingFangSC, sans-serif'
    },
    axisTick: {
      show: false
    }
  }
  ],
  series: [] as any
})

const echartOption2 = ref({
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    top: -5,
    left: 'center',
    itemWidth: 30,
    itemHeight: 10,
    itemGap: 20,
    textStyle: {
      color: '#FFFFFF',
      fontSize: 20,
      fontFamily: 'PingFangSC, sans-serif',
      padding: [0, 0, 0, 8]
    },
    data: [] as any
  },
  grid: {
    top: '15%',
    left: '3%',
    right: '3%',
    bottom: '5%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    // boundaryGap: false,
    axisTick: {
      show: false
    },
    offset: 15,
    axisLine: {
      lineStyle: {
        type: 'solid',
        color: 'rgba(179,223,255, 0.5)'
      }
    },
    axisLabel: {
      color: '#fff',
      fontSize: 18,
      fontFamily: 'PingFangSC, sans-serif'
    },
    data: [] as string[]
  },
  yAxis: [{
    type: 'value',
    position: 'left',
    nameTextStyle: {
      color: '#fff',
      fontSize: 20,
      padding: [0, 55, 0, 0]
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
        color: 'rgba(217,231,255, 0.2)'
      }
    },
    axisLabel: {
      color: '#fff',
      fontSize: 20,
      fontFamily: 'PingFangSC, sans-serif'
    },
    axisTick: {
      show: false
    }
  }
  ],
  series: [] as any
})
const dataListTiggle = usePolling(async () => {
  if (filterWaterValue.value === 'short') {
    getShortWaterHandle()
  } else {
    getLongWaterHandle()
  }
})

async function getShortWaterHandle () {
  const result: any = await service.xfqs.getShortPosition({
    time: dayjs().format('YYYY-MM-DD')
  })

  if (result[0].list && result[0].cropType) {
    const dataSeries = []
    const legendList = []
    for (let index = 0; index < result[0].cropType.length; index++) {
      legendList.push({ name: result[0].cropType[index], icon: 'rect' })
      dataSeries.push({
        name: result[0].cropType[index],
        data: [] as any,
        type: 'bar',
        smooth: true,
        showSymbol: false,
        stack: 'a',
        barWidth: 16
      })
    }
    echartOption2.value.legend.data = legendList
    const nameKeys = []
    for (let index = 0; index < result[0].list.length; index++) {
      nameKeys.push(result[0].list[index].time)
      for (const element of result[0].list[index].data) {
        for (let j = 0; j < dataSeries.length; j++) {
          if (element.crop === dataSeries[j].name) {
            dataSeries[j].data.push(element.water)
          }
        }
      }
    }
    echartOption2.value.xAxis.data = nameKeys
    echartOption2.value.series = dataSeries
  }
}

async function getLongWaterHandle () {
  const result: any = await service.xfqs.getLongPosition({
    time: dayjs().format('YYYY')
  })

  if (result.length && result.length > 0) {
    const dataSeries = []
    const legendList = []
    for (let index = 0; index < result[0].cropType.length; index++) {
      legendList.push({ name: result[0].cropType[index], icon: 'rect' })
      dataSeries.push({
        name: result[0].cropType[index],
        data: [] as any,
        type: 'bar',
        smooth: true,
        showSymbol: false,
        stack: 'a',
        barWidth: 16
      })
    }
    echartOption.value.legend.data = legendList
    const nameKeys = []
    for (let index = 0; index < result[0].list.length; index++) {
      nameKeys.push(result[0].list[index].txun)
      for (const element of result[0].list[index].data) {
        for (let j = 0; j < dataSeries.length; j++) {
          if (element.crop === dataSeries[j].name) {
            dataSeries[j].data.push(element.water)
          }
        }
      }
    }
    echartOption.value.xAxis.data = nameKeys
    echartOption.value.series = dataSeries
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  padding: 78px 53px;
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
        background: url('@/assets/floor/preview/guide-triangle.svg') no-repeat;
        background-size: 100%;
      }
    }
  }
}
</style>
