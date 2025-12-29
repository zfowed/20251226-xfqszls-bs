<template>
  <PageCard title="工程巡检" bg-class="right">
    <div class="page-container">
      <div class="ditch-main">
        <div class="grid grid-cols-2 gap-[106px] mb-[70px] ">
          <div class="ditch-total">
            <div class="ditch-total__label">
              巡查
            </div>
            <div class="mt-[10px]">
              <span>年巡查次数</span>
              <ZfTweenNumber :value="totalInfo.totalDitchCount" class="mx-[10px]" />
              <span>次</span>
            </div>
            <div class="ditch-total__bg" />
          </div>
          <div class="ditch-total">
            <div class="ditch-total__label">
              养护
            </div>
            <div class="mt-[10px]">
              <span>年养护次数</span>
              <ZfTweenNumber :value="totalInfo.totalDitchLength" class="mx-[10px]" />
              <span>次</span>
            </div>
            <div class="ditch-total__bg" />
          </div>
        </div>
        <div class="h-[343px]">
          <VueEcharts :option="echartOption" />
        </div>
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
import { SeededRandom } from 'zf-utilz'

// 渠系信息
const totalInfo = reactive({
  totalDitchCount: 0,
  totalDitchLength: 0
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
      { name: '巡检', icon: 'rect' },
      { name: '养护', icon: 'rect' }
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
      name: '巡检',
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
      name: '养护',
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

usePolling(async () => {
  const nameKeys = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  const arrList1 = []
  const arrList2 = []
  for (let i = 0; i < 12; i++) {
    arrList1.push(SeededRandom.randomNumber(50, 150))
    arrList2.push(SeededRandom.randomNumber(50, 150))
  }
  echartOption.value.xAxis.data = nameKeys
  echartOption.value.series[0].data = arrList1
  echartOption.value.series[1].data = arrList2

  totalInfo.totalDitchCount = SeededRandom.randomNumber(0, 100)
  totalInfo.totalDitchLength = SeededRandom.randomNumber(0, 100)
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
