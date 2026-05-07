<template>
  <PageCard title="年降水量情况" bg-class="right">
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
    data: [{ name: '降水量', icon: 'rect' }]
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
  yAxis: [
    {
      name: 'mm',
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
      name: '降水量',
      data: [] as any,
      type: 'bar',
      smooth: true,
      showSymbol: false,
      yAxisIndex: 0,
      barWidth: 16,
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 1,
          x2: 0,
          y2: 0,
          colorStops: [
            { offset: 0, color: 'rgba(59, 255, 170, 0.2)' },
            { offset: 1, color: '#7CC0FF' }
          ]
        }
      }
    }
  ]
})
usePolling(async () => {
  echartOption.value.xAxis.data = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  echartOption.value.series[0].data = [
    SeededRandom.randomNumber(0, 100),
    SeededRandom.randomNumber(0, 100),
    SeededRandom.randomNumber(0, 100),
    SeededRandom.randomNumber(0, 100),
    SeededRandom.randomNumber(0, 100),
    SeededRandom.randomNumber(0, 100),
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
  padding: 35px 32px 32px;
}
</style>
