<template>
  <PageCard title="灌片需水" bg-class="left">
    <div class="page-container">
      <div class="h-[343px]">
        <VueEcharts :option="echartOption" />
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

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

usePolling(async () => {
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
    echartOption.value.legend.data = legendList
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
    echartOption.value.xAxis.data = nameKeys
    echartOption.value.series = dataSeries
  }
})
</script>

<style lang="scss" scoped>
.page-container {
  padding: 78px 96px;
}
</style>
