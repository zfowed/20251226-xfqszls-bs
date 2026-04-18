<template>
  <PageCard title="航摄农情" bg-class="right">
    <div class="page-container">
      <div class="h-[428px]">
        <VueEcharts :option="echartOption" />
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
import { SeededRandom } from 'zf-utilz'

const echartOption = ref({
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    top: 0,
    right: 0,
    itemWidth: 30,
    itemHeight: 10,
    textStyle: {
      color: '#FFFFFF',
      fontSize: 20,
      fontFamily: 'PingFangSC, sans-serif',
      padding: [0, 0, 0, 8]
    },
    data: [{ name: '巡查次数', icon: 'rect' }]
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
    boundaryGap: false,
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
  yAxis: [
    {
      name: '次数',
      nameGap: 25,
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
    }
  ],
  series: [
    {
      name: '巡查次数',
      data: [] as any,
      type: 'line',
      smooth: true,
      showSymbol: true,
      symbol: 'circle',
      symbolSize: 10,
      areaStyle: {
        color: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: '#29AABE' },
            { offset: 1, color: 'rgba(130, 183, 200, 0)' }
          ]
        }
      },
      lineStyle: { color: '#fff' },
      itemStyle: {
        color: '#fff'
      }
    }
  ]
})

usePolling(async () => {
  echartOption.value.xAxis.data = ['1月', '2月', '3月', '4月', '5月', '6月']
  echartOption.value.series[0].data = [
    SeededRandom.randomNumber(0, 100),
    SeededRandom.randomNumber(0, 100),
    SeededRandom.randomNumber(0, 100),
    SeededRandom.randomNumber(0, 100),
    SeededRandom.randomNumber(0, 100),
    SeededRandom.randomNumber(0, 100)
  ]
})
</script>

<style lang="scss" scoped>
.page-container {
  padding: 45px 68px;
}

.header-title {
  position: relative;
  display: flex;
  font-size: 34px;
  color: #fff;
  margin-bottom: 36px;
  font-family: DINMedium, sans-serif;

  &::after {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: -38px;
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background: url("@/assets/global/images/card-title-icon.png") no-repeat;
    background-position: left center;
  }
}

.details-text {
  font-size: 30px;
  color: #fff;
  font-family: PingFangSC, sans-serif;
  margin-bottom: 40px;
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
</style>
