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
    text: '流量（m³/s）',
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

const toNumber = (value: unknown) => {
  const numberValue = Number(value)
  return Number.isFinite(numberValue) ? numberValue : 0
}

const getModelDetail = (result: Record<string, any>) => {
  const modelDetailText = result?.list?.[0]?.modelDetail
  if (!modelDetailText) return {}

  try {
    return typeof modelDetailText === 'string'
      ? JSON.parse(modelDetailText)
      : modelDetailText
  } catch (error) {
    console.log('modelDetail parse error', error)
    return {}
  }
}

const getReservoirModel = (modelDetail: Record<string, any>) => {
  return modelDetail['62'] || Object.values(modelDetail).find((item: any) => item?.real || item?.fore || item?.dayResList) || {}
}

const getDayKey = (time: unknown) => {
  return time ? dayjs(String(time)).format('YYYY-MM-DD') : ''
}

const formatDayLabel = (day: string) => {
  return day ? dayjs(day).format('M.D') : ''
}

const getDailyLastValueMap = (list: Record<string, any>[], valueKey: string) => {
  return list.reduce((map: Record<string, number>, item: Record<string, any>) => {
    const day = getDayKey(item.tm)
    if (!day) return map

    map[day] = toNumber(item[valueKey])
    return map
  }, {})
}

const getDailySumValueMap = (list: Record<string, any>[], valueKey: string) => {
  return list.reduce((map: Record<string, number>, item: Record<string, any>) => {
    const day = getDayKey(item.tm)
    if (!day) return map

    map[day] = Number(((map[day] || 0) + toNumber(item[valueKey])).toFixed(2))
    return map
  }, {})
}

const getDayResValueMap = (list: Record<string, any>[], valueKey: string) => {
  return list.reduce((map: Record<string, number>, item: Record<string, any>) => {
    const day = getDayKey(item.tm)
    if (!day) return map

    map[day] = toNumber(item[valueKey])
    return map
  }, {})
}

const getChartDataByDays = (days: string[], valueMap: Record<string, number>) => {
  return days.map((day) => day in valueMap ? valueMap[day] : null)
}

const updateChartByModelDetail = (modelDetail: Record<string, any>) => {
  const reservoirModel = getReservoirModel(modelDetail) as Record<string, any>
  const realList = Array.isArray(reservoirModel.real) ? reservoirModel.real : []
  const foreList = Array.isArray(reservoirModel.fore) ? reservoirModel.fore : []
  const dayResList = Array.isArray(reservoirModel.dayResList) ? reservoirModel.dayResList : []

  const realWaterLevelMap = getDailyLastValueMap(realList, 'z')
  const forecastRainMap = getDailySumValueMap(foreList, 'drp')
  const forecastWaterLevelMap = getDailyLastValueMap(foreList, 'z')
  const forecastFlowMap = getDayResValueMap(dayResList, 'fq')
  const forecastWaterAmountMap = getDayResValueMap(dayResList, 'fz_verify')
  const days = Array.from(new Set([
    ...Object.keys(realWaterLevelMap),
    ...Object.keys(forecastRainMap),
    ...Object.keys(forecastWaterLevelMap),
    ...Object.keys(forecastFlowMap),
    ...Object.keys(forecastWaterAmountMap)
  ])).sort((prev, next) => dayjs(prev).valueOf() - dayjs(next).valueOf())

  if (!days.length) return

  const chartOption = echartOption.value as Record<string, any>
  const forecastRainData = getChartDataByDays(days, forecastRainMap)
  const actualWaterLevelData = getChartDataByDays(days, realWaterLevelMap)
  const forecastWaterLevelData = getChartDataByDays(days, forecastWaterLevelMap)
  const forecastFlowData = getChartDataByDays(days, forecastFlowMap)
  const forecastWaterAmountData = getChartDataByDays(days, forecastWaterAmountMap)
  const rainMax = Math.max(...forecastRainData.map((value) => value || 0), 1)
  const lineValues = [
    ...actualWaterLevelData,
    ...forecastWaterLevelData,
    ...forecastFlowData,
    ...forecastWaterAmountData
  ].filter((value): value is number => typeof value === 'number')
  const lineMax = Math.max(...lineValues, 1)

  chartOption.legend.data = [
    { name: '预报降雨量', icon: 'rect' },
    { name: '实际水位', icon: 'rect' },
    { name: '预报水位', icon: 'rect' },
    { name: '预报流量', icon: 'rect' },
    { name: '预报来水量', icon: 'rect' }
  ]
  chartOption.title.text = '水位/流量'
  chartOption.xAxis.data = days.map(formatDayLabel)
  chartOption.yAxis[0].max = Math.ceil(rainMax * 1.2)
  chartOption.yAxis[0].interval = undefined
  chartOption.yAxis[1].max = Math.ceil(lineMax * 1.2)
  chartOption.yAxis[1].interval = undefined
  chartOption.series = [
    {
      name: '预报降雨量',
      type: 'bar',
      yAxisIndex: 0,
      barWidth: 12,
      data: forecastRainData,
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
      name: '实际水位',
      type: 'line',
      yAxisIndex: 1,
      data: actualWaterLevelData,
      smooth: false,
      connectNulls: false,
      symbol: 'circle',
      symbolSize: 4,
      lineStyle: {
        width: 2,
        color: '#72FF62'
      },
      itemStyle: {
        color: '#72FF62',
        borderColor: '#72FF62'
      }
    },
    {
      name: '预报水位',
      type: 'line',
      yAxisIndex: 1,
      data: forecastWaterLevelData,
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
      name: '预报流量',
      type: 'line',
      yAxisIndex: 1,
      data: forecastFlowData,
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
      },
      markPoint: reservoirModel.hfdata
        ? {
            symbol: 'pin',
            symbolSize: 42,
            data: [
              {
                name: '洪峰',
                coord: [
                  formatDayLabel(getDayKey(reservoirModel.hfdata.tm)),
                  toNumber(reservoirModel.hfdata.q)
                ],
                value: toNumber(reservoirModel.hfdata.q)
              }
            ]
          }
        : undefined
    },
    {
      name: '预报来水量',
      type: 'line',
      yAxisIndex: 1,
      data: forecastWaterAmountData,
      smooth: false,
      connectNulls: false,
      symbol: 'circle',
      symbolSize: 4,
      lineStyle: {
        width: 2,
        color: '#B37CFF'
      },
      itemStyle: {
        color: '#B37CFF',
        borderColor: '#B37CFF'
      }
    }
  ]
}

usePolling(async () => {
  const result: any = await service.xfqs.getIwfShortAchievementList({
    start: 1,
    limit: 1000,
    currentDate: dayjs().format('YYYY-MM-DD')
  })
  const modelDetail = getModelDetail(result)
  console.log('modelDetail', modelDetail)
  updateChartByModelDetail(modelDetail)
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
