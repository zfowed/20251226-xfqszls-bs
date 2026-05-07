<template>
  <PageCard title="来水预报" bg-class="left">
    <div class="page-container">
      <div class="datetime-list">
        <div class="btns" v-for="item in dateBtns" :key="item.value" :class="{ active: item.value === currentDateBtn }" @click="currentDateBtn = item.value">
          {{ item.label }}
        </div>
      </div>
      <div class="h-[443px]">
        <VueEcharts :option="echartOption" />
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { SeededRandom } from 'zf-utilz'

const currentDateBtn = ref('7d')
const dateBtns = reactive([
  { label: '周', value: '7d' },
  { label: '月', value: '30d' },
  { label: '年', value: '360d' }
])

const echartOption = ref({
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    top: -5,
    left: 'right',
    itemWidth: 30,
    itemHeight: 10,
    itemGap: 20,
    textStyle: {
      color: '#FFFFFF',
      fontSize: 20,
      fontFamily: 'PingFangSC, sans-serif',
      padding: [0, 0, 0, 8]
    },
    data: [{ name: '降雨流量' }]
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
      name: '（mm)',
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
      name: '降雨流量',
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
            { offset: 0, color: 'rgba(136, 229, 120, 50)' },
            { offset: 1, color: 'rgba(0, 0, 0, 0)' }
          ]
        }
      },
      lineStyle: { color: '#5DFF68' },
      itemStyle: {
        color: '#5DFF68'
      }
    }
  ]
})

const last7Days = Array.from({ length: 7 }, (_, i) => dayjs().subtract(6 - i, 'day').format('MM-DD'))
usePolling(async () => {
  echartOption.value.xAxis.data = last7Days
  echartOption.value.series[0].data = [
    SeededRandom.randomNumber(0, 10000),
    SeededRandom.randomNumber(0, 10000),
    SeededRandom.randomNumber(0, 10000),
    SeededRandom.randomNumber(0, 10000),
    SeededRandom.randomNumber(0, 10000),
    SeededRandom.randomNumber(0, 10000),
    SeededRandom.randomNumber(0, 10000)
  ]
})
</script>

<style lang="scss" scoped>
.page-container {
  padding: 45px 35px;
}

.datetime-list {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;

  .btns {
    padding: 3px 13px;
    background: rgb(58 74 97 / 80);
    margin-right: 20px;
    min-width: 80px;
    min-height: 34px;
    text-align: center;
    cursor: pointer;
    text-shadow: 0 0 10px #0091FF;

    &:last-child {
      margin-right: 0;
    }

    &:hover,
    &.active {
      background: url("@/assets/global/images/water/btns-active-bg.png") no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
