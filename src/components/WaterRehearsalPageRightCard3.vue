<template>
  <PageCard title="灌区需水量" bg-class="right">
    <div class="page-container">
      <div class="flex mb-[25px]">
        <ElInput v-model.number="filterTextValue" class="app-input mr-[30px]" style="width: 350px;" />
        <ElSelect
          v-model="filterWaterValue"
          placeholder="请选择"
          :teleported="false"
          class="app-select mb-[40px]"
          @change="dataListTiggle.execute()"
        >
          <ElOption
            v-for="item in optionsList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </ElSelect>
      </div>
      <div class="h-[423px] relative">
        <VueEcharts :option="echartOption" />
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { SeededRandom } from 'zf-utilz'

const filterTextValue = ref<string | number>('')

const filterWaterValue = ref('long')
const optionsList = [
  { value: 'long', label: '聂家河村' },
  { value: 'short', label: '聂家河村' }
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
    bottom: '15%',
    containLabel: false
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
  series: [
    {
      name: '玉米',
      data: [] as any,
      type: 'bar',
      smooth: true,
      showSymbol: false,
      stack: 'aa',
      barWidth: 22
    },
    {
      name: '中稻',
      data: [] as any,
      type: 'bar',
      smooth: true,
      showSymbol: false,
      stack: 'aa',
      barWidth: 22
    },
    {
      name: '小麦',
      data: [] as any,
      type: 'bar',
      smooth: true,
      showSymbol: false,
      stack: 'aa',
      barWidth: 22
    },
    {
      name: '晚稻',
      data: [] as any,
      type: 'bar',
      smooth: true,
      showSymbol: false,
      stack: 'bbb',
      barWidth: 22
    },
    {
      name: '早稻',
      data: [] as any,
      type: 'bar',
      smooth: true,
      showSymbol: false,
      stack: 'bbb',
      barWidth: 22
    },
    {
      name: '油菜',
      data: [] as any,
      type: 'bar',
      smooth: true,
      showSymbol: false,
      stack: 'bbb',
      barWidth: 22
    }
  ]
})

const dataListTiggle = usePolling(async () => {
  const last6Months = Array.from({ length: 6 }, (_, idx) =>
    dayjs().subtract(5 - idx, 'month').format('YYYY-MM')
  )
  echartOption.value.xAxis.data = last6Months

  echartOption.value.legend.data = ['玉米', '中稻', '小麦', '晚稻', '早稻', '油菜']
  echartOption.value.series.forEach((series) => {
    series.data = Array.from({ length: 6 }, () =>
      SeededRandom.randomNumber(20, 120)
    )
  })

  // 处理柱状图圆角
  const stackInfo: any = {}
  for (let i = 0; i < echartOption.value.series[0].data.length; ++i) {
    for (let j = 0; j < echartOption.value.series.length; ++j) {
      const stackName = echartOption.value.series[j].stack
      if (!stackName) {
        continue
      }
      if (!stackInfo[stackName]) {
        stackInfo[stackName] = {
          stackStart: [],
          stackEnd: []
        }
      }
      const info = stackInfo[stackName]
      const data = echartOption.value.series[j].data[i]
      if (data && data !== '-') {
        if (info.stackStart[i] == null) {
          info.stackStart[i] = j
        }
        info.stackEnd[i] = j
      }
    }
  }
  for (let i = 0; i < echartOption.value.series.length; ++i) {
    const data = echartOption.value.series[i].data
    const info = stackInfo[echartOption.value.series[i].stack]
    for (let j = 0; j < echartOption.value.series[i].data.length; ++j) {
    // const isStart = info.stackStart[j] === i;
      const isEnd = info.stackEnd[j] === i
      const topBorder = isEnd ? 20 : 0
      const bottomBorder = 0
      data[j] = {
        value: data[j],
        itemStyle: {
          borderRadius: [topBorder, topBorder, bottomBorder, bottomBorder]
        }
      }
    }
  }
})

</script>

<style lang="scss" scoped>
.page-container {
  padding: 38px 35px;
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
</style>
