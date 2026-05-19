<template>
  <PageCard title="长期来水预报" bg-class="left">
    <div class="page-container">
      <div class="h-[623px] relative">
        <span>来水量修正值（m³/s)</span>
        <VueEcharts :option="echartOption" class="mt-[40px]" />
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
    data: [{ name: '年枯水年来水量', icon: 'rect' }, { name: '年平水年来水量', icon: 'rect' }, { name: '年丰水年来水量', icon: 'rect' }]
  },
  grid: {
    top: '15%',
    left: '3%',
    right: '3%',
    bottom: '15%',
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
  series: [
    {
      name: '年枯水年来水量',
      data: [] as any,
      type: 'bar',
      smooth: true,
      showSymbol: false,
      barWidth: 12
    },
    {
      name: '年平水年来水量',
      data: [] as any,
      type: 'bar',
      smooth: true,
      showSymbol: false,
      barWidth: 12
    },
    {
      name: '年丰水年来水量',
      data: [] as any,
      type: 'bar',
      smooth: true,
      showSymbol: false,
      barWidth: 12
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
  echartOption.value.series[1].data = [
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
  echartOption.value.series[2].data = [
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
  padding: 58px 35px;
}
</style>
