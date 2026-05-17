<template>
  <PageCard title="来水预报" bg-class="left">
    <div class="water-supply-card">
      <VueEcharts :option="echartOption" class="water-supply-card__chart" />
    </div>
  </PageCard>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

const echartOption = ref({
  animation: false,
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    top: 6,
    left: 'center',
    itemWidth: 18,
    itemHeight: 10,
    itemGap: 22,
    textStyle: {
      color: '#FFFFFF',
      fontSize: 16,
      fontFamily: 'PingFangSC, sans-serif',
      padding: [0, 0, 0, 8]
    },
    data: [
      { name: '面雨量', icon: 'rect' },
      { name: '预报面雨量', icon: 'rect' },
      { name: '上游面雨量', icon: 'rect' },
      { name: '河道流量', icon: 'rect' }
    ]
  },
  title: {
    text: '流量（万m3）',
    left: 0,
    top: 42,
    textStyle: {
      color: '#fff',
      fontSize: 16,
      fontFamily: 'PingFangSC, sans-serif',
      fontWeight: 'normal'
    }
  },
  grid: {
    top: 76,
    left: '4%',
    right: '3%',
    bottom: '4%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: true,
    axisTick: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(179,223,255, 0.5)'
      }
    },
    axisLabel: {
      color: '#fff',
      fontSize: 16,
      fontFamily: 'DINAlternate, Arial, sans-serif',
      margin: 14
    },
    data: ['4.1', '4.2', '4.3', '4.4', '4.5', '4.6', '4.7', '4.8', '4.9', '4.10', '4.11', '4.12']
  },
  yAxis: [
    {
      type: 'value',
      min: 0,
      max: 90,
      interval: 25,
      inverse: true,
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color: 'rgba(217,231,255, 0.14)'
        }
      },
      axisLabel: {
        color: '#fff',
        fontSize: 16
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      }
    },
    {
      type: 'value',
      min: 0,
      max: 2,
      interval: 1,
      position: 'left',
      offset: 0,
      splitLine: {
        show: false
      },
      axisLabel: {
        color: '#fff',
        fontSize: 16
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      }
    }
  ],
  series: [
    {
      name: '面雨量',
      type: 'bar',
      barWidth: 12,
      data: [72, 8, 8, 28, 36, 22, 0, 0, 0, 0, 0, 0],
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 1,
          x2: 0,
          y2: 0,
          colorStops: [
            { offset: 0, color: 'rgba(59, 150, 255, 0.92)' },
            { offset: 1, color: 'rgba(194, 228, 255, 0.92)' }
          ]
        }
      }
    },
    {
      name: '预报面雨量',
      type: 'bar',
      barWidth: 12,
      data: [0, 0, 0, 0, 0, 0, 12, 24, 28, 12, 24, 40],
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 1,
          x2: 0,
          y2: 0,
          colorStops: [
            { offset: 0, color: 'rgba(84, 74, 255, 0.92)' },
            { offset: 1, color: 'rgba(132, 147, 255, 0.92)' }
          ]
        }
      }
    },
    {
      name: '上游面雨量',
      type: 'line',
      yAxisIndex: 1,
      data: [1.6, 1.6, 1.6, 1.6, 1.6, 1.6, null, null, null, null, null, null],
      smooth: false,
      connectNulls: false,
      symbol: 'circle',
      symbolSize: 4,
      lineStyle: {
        width: 2,
        color: '#FFAF39'
      },
      itemStyle: {
        color: '#FFAF39',
        borderColor: '#FFAF39'
      }
    },
    {
      name: '河道流量',
      type: 'line',
      yAxisIndex: 1,
      data: [null, null, null, null, null, null, 1.6, 1.6, 1.6, 1.6, 1.6, 1.6],
      smooth: false,
      connectNulls: false,
      symbol: 'circle',
      symbolSize: 4,
      lineStyle: {
        width: 2,
        color: '#5EE8FF'
      },
      itemStyle: {
        color: '#5EE8FF',
        borderColor: '#5EE8FF'
      }
    }
  ]
})

usePolling(async () => {
  const result: any = await service.xfqs.getIwfShortAchievementList({
    start: 1,
    limit: 1000,
    currentDate: dayjs().format('YYYY-MM-DD')
  })
  const modelDetail = JSON.parse(result.list[0].modelDetail)
  console.log('modelDetail', modelDetail)
})
</script>

<style lang="scss" scoped>
.water-supply-card {
  padding: 20px 18px 10px;
}

.water-supply-card__chart {
  width: 100%;
  height: 530px;
}
</style>
