<template>
  <PageCard title="工程巡检" bg-class="right">
    <div class="page-container">
      <div class="ditch-main mb-[40px]">
        <div class="grid grid-cols-2 gap-[106px] mb-[50px] ">
          <div class="ditch-total">
            <div class="ditch-total__label">
              巡查
            </div>
            <div class="mt-[10px]">
              <span>计划巡查次数</span>
              <ZfTweenNumber :value="totalInfo.planitchCount" class="mx-[10px]" />
              <span>次</span>
            </div>
            <div class="ditch-total__bg" />
          </div>
          <div class="ditch-total">
            <div class="ditch-total__label">
              巡查
            </div>
            <div class="mt-[10px]">
              <span>已经巡查次数</span>
              <ZfTweenNumber :value="totalInfo.doneDitchCount" class="mx-[10px]" />
              <span>次</span>
            </div>
            <div class="ditch-total__bg" />
          </div>
        </div>
        <div class="h-[343px]">
          <VueEcharts :option="echartOption" />
        </div>
      </div>
      <div class="ditch-main">
        <div class="grid grid-cols-2 gap-[106px] mb-[50px] ">
          <div class="ditch-total">
            <div class="ditch-total__label">
              巡查
            </div>
            <div class="mt-[10px]">
              <span>巡查上报事件</span>
              <ZfTweenNumber :value="totalInfo.reportEventCount" class="mx-[10px]" />
              <span>件</span>
            </div>
            <div class="ditch-total__bg" />
          </div>
          <div class="ditch-total">
            <div class="ditch-total__label">
              巡查
            </div>
            <div class="mt-[10px]">
              <span>巡查处理事件</span>
              <ZfTweenNumber :value="totalInfo.disposeEventCount" class="mx-[10px]" />
              <span>件</span>
            </div>
            <div class="ditch-total__bg" />
          </div>
        </div>
        <div class="h-[343px]">
          <VueEcharts :option="echartOption2" />
        </div>
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

// 渠系信息
const totalInfo = reactive({
  planitchCount: 0,
  doneDitchCount: 0,
  reportEventCount: 0,
  disposeEventCount: 0
})

const echartOption = ref({
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    top: -5,
    left: 'center',
    itemWidth: 30,
    itemHeight: 10,
    itemGap: 62,
    textStyle: {
      color: '#FFFFFF',
      fontSize: 20,
      fontFamily: 'PingFangSC, sans-serif',
      padding: [0, 0, 0, 8]
    },
    data: [
      { name: '未巡', icon: 'rect' },
      { name: '已巡', icon: 'rect' }
    ]
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
    name: '次数',
    nameGap: 25,
    type: 'value',
    position: 'left',
    offset: 10,
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
      name: '未巡',
      data: [] as any,
      type: 'bar',
      smooth: true,
      showSymbol: false,
      barWidth: 16,
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 1,
          x2: 0,
          y2: 0,
          colorStops: [
            { offset: 0, color: 'rgba(17, 46, 74, 0.2)' },
            { offset: 1, color: '#3C80C0' }
          ]
        }
      }
    },
    {
      name: '已巡',
      data: [] as any,
      type: 'bar',
      smooth: true,
      showSymbol: false,
      barWidth: 16,
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 1,
          x2: 0,
          y2: 0,
          colorStops: [
            { offset: 0, color: 'rgba(17, 74, 23, 0.2)' },
            { offset: 1, color: '#26C061' }
          ]
        }
      }
    }
  ]
})

const echartOption2 = ref({
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    top: 0,
    left: 'center',
    itemWidth: 30,
    itemHeight: 10,
    itemGap: 62,
    textStyle: {
      color: '#FFFFFF',
      fontSize: 20,
      fontFamily: 'PingFangSC, sans-serif',
      padding: [0, 0, 0, 8]
    },
    data: [
      { name: '上报问题', icon: 'rect' },
      { name: '处理问题', icon: 'rect' }
    ]
  },
  grid: {
    top: '12%',
    left: '3%',
    right: '3%',
    bottom: '5%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    // 柱状图建议留左右间距，避免柱子超出坐标系
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
  yAxis: {
    type: 'value',
    position: 'left',
    offset: 10,
    nameTextStyle: {
      color: '#fff',
      fontSize: 20
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
  },
  series: [
    {
      name: '处理问题',
      data: [] as any,
      type: 'line',
      smooth: true,
      showSymbol: true,
      symbol: 'circle',
      symbolSize: 6,
      areaStyle: {
        color: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(136, 229, 120, 0.5)' },
            { offset: 1, color: 'rgba(0, 0, 0, 0)' }
          ]
        }
      },
      lineStyle: { color: '#5DFF68' },
      itemStyle: {
        color: '#5DFF68'
      }
    },
    {
      name: '上报问题',
      data: [] as any,
      type: 'line',
      smooth: true,
      showSymbol: true,
      symbol: 'circle',
      symbolSize: 6,
      areaStyle: {
        color: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(255, 162, 55, 0.34)' },
            { offset: 1, color: 'rgba(0, 0, 0, 0)' }
          ]
        }
      },
      lineStyle: { color: '#FF932F' },
      itemStyle: {
        color: '#FF932F'
      }
    }
  ]
})

usePolling(async () => {
  const nameKeys = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  echartOption.value.xAxis.data = nameKeys
  echartOption2.value.xAxis.data = nameKeys

  const result: any = await service.xfqs.getPatrolList({
    tabId: 0,
    year: dayjs().format('YYYY')
  })
  totalInfo.planitchCount = result.plan_num
  totalInfo.doneDitchCount = result.comp_num

  // 巡查统计
  if (result.planStatistic && result.planStatistic.length > 0) {
    const arrList1 = []
    const arrList2 = []
    for (const planItem of result.planStatistic) {
      arrList1.push(planItem.plan_num - planItem.complete_num)
      arrList2.push(planItem.complete_num)
    }
    echartOption.value.series[0].data = arrList1
    echartOption.value.series[1].data = arrList2
  }

  // 巡查事件统计
  if (result.event && result.event.length > 0) {
    const arrList1 = []
    const arrList2 = []
    for (const eventItem of result.event) {
      arrList1.push(eventItem.num)
    }
    for (const disposeItem of result.dispose) {
      arrList2.push(disposeItem.num)
    }
    totalInfo.reportEventCount = arrList1.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    totalInfo.disposeEventCount = arrList2.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    echartOption2.value.series[0].data = arrList1
    echartOption2.value.series[1].data = arrList2
  }
})

</script>

<style lang="scss" scoped>
.page-container {
  padding: 40px 32px 52px;
}

.ditch-main {
  padding: 0 35px;

  .ditch-total {
    position: relative;
    font-size: 28px;
    font-family: PingFangSC, sans-serif;
    display: flex;
    align-items: center;

    .ditch-total__label {
      height: 40px;
      line-height: 40px;
      padding: 0 12px;
      text-align: center;
      color: #D1E4FF;
      margin-right: 14px;
      background: url('@/assets/global/images/preview/total-label-bg.png') no-repeat;
      background-size: 100% 100%;
      font-family: PangMenZhengDao, sans-serif;
      font-size: 20px;
      box-sizing: border-box;
    }

    .ditch-total__bg {
      position: absolute;
      left: 4px;
      bottom: -10px;
      width: calc(100% - 4px);
      height: 100%;
      background: url('@/assets/global/images/preview/total-line-bg.png') no-repeat;
      background-size: 100% 100%;
    }
  }

  .ditch-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 157px;
    background: url('@/assets/global/images/preview/ditch-item-bg.png') no-repeat;
    background-size: 100% 100%;
    color: #BEEEFF;
    font-family: PingFangSC, sans-serif;

    &__title {
      font-size: 20px;
    }

    &__value {
      font-size: 36px;
      color: #50FFFC;
      font-family: Quantico, sans-serif;
      margin-right: 5px;
      font-weight: bold;
    }

    &__unit {
      font-size: 20px;
    }
  }
}

</style>
