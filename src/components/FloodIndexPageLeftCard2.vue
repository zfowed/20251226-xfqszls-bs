<template>
  <PageCard title="降雨预报" bg-class="left">
    <div class="page-container">
      <div class="rain-chart">
        <VueEcharts :option="echartOption" />
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

/** 设计稿参考值（mm），接口无有效降雨数据时使用 */
const DEFAULT_PAST_RAIN_MM = [0, 0, 38.39, 41.6, 78.5, 2.09, 0]
const DEFAULT_FUTURE_RAIN_MM = [0.4, 4.09, 13.59, 11.19, 46.6, 19.5, 0]
const SPLIT = 7
const CHART_LEN = 14

/** 图表样式与 FloodIndexPageRightCard2 对齐 */
const CHART_FONT = '"Alibaba PuHuiTi 2.0", "PingFang SC", "Microsoft YaHei", sans-serif'
const CHART_FONT_AXIS_VALUE = '"Alibaba PuHuiTi 2.0", "PingFang SC", "Microsoft YaHei", sans-serif'
const CHART_FONT_X = '"PingFang SC", "Microsoft YaHei", sans-serif'
const FONT_SIZE = 20
const LINE_WIDTH = 1

type PptnChartItem = {
  date: string
  value: number
}

const toNumber = (value: unknown) => {
  const numberValue = Number(value)
  return Number.isFinite(numberValue) ? numberValue : 0
}

const parsePptnList = (list: unknown): PptnChartItem[] => {
  if (!Array.isArray(list)) return []

  return list.flatMap((item) => {
    if (!item || typeof item !== 'object') return []

    return Object.entries(item as Record<string, unknown>).map(([date, value]) => ({
      date,
      value: toNumber(value)
    }))
  })
}

const capDelta = (v: number) => Math.min(v, Math.min(5, Math.max(2, Math.round(v * 0.055))))

const gradientBlue = {
  type: 'linear' as const,
  x: 0,
  y: 1,
  x2: 0,
  y2: 0,
  colorStops: [
    { offset: 0, color: '#2d8fd4' },
    { offset: 0.45, color: '#4aaef2' },
    { offset: 1, color: '#a8e6ff' }
  ]
}

const gradientPurple = {
  type: 'linear' as const,
  x: 0,
  y: 1,
  x2: 0,
  y2: 0,
  colorStops: [
    { offset: 0, color: '#3a3cd4' },
    { offset: 0.5, color: '#5c5ef0' },
    { offset: 1, color: '#b8b4ff' }
  ]
}

const capBlue = {
  type: 'linear' as const,
  x: 0,
  y: 1,
  x2: 0,
  y2: 0,
  colorStops: [
    { offset: 0, color: '#7fd4ff' },
    { offset: 1, color: '#f0fbff' }
  ]
}

const capPurple = {
  type: 'linear' as const,
  x: 0,
  y: 1,
  x2: 0,
  y2: 0,
  colorStops: [
    { offset: 0, color: '#a8a4ff' },
    { offset: 1, color: '#f2f0ff' }
  ]
}

function buildSeriesData (values: number[]) {
  const bodyEarly: (number | null)[] = []
  const capEarly: (number | null)[] = []
  const bodyLate: (number | null)[] = []
  const capLate: (number | null)[] = []

  for (let i = 0; i < CHART_LEN; i++) {
    const v = values[i] ?? 0
    const cap = v > 0 ? capDelta(v) : 0
    const body = Math.max(v - cap, 0)

    if (i < SPLIT) {
      bodyEarly.push(body)
      capEarly.push(cap)
      bodyLate.push(null)
      capLate.push(null)
    } else {
      bodyEarly.push(null)
      capEarly.push(null)
      bodyLate.push(body)
      capLate.push(cap)
    }
  }

  return { bodyEarly, capEarly, bodyLate, capLate }
}

const echartOption = ref({
  animation: false,
  tooltip: {
    trigger: 'axis' as const,
    axisPointer: {
      type: 'shadow' as const,
      shadowStyle: { color: 'rgba(255, 255, 255, 0.08)' }
    },
    backgroundColor: 'rgba(20, 40, 60, 0.92)',
    borderColor: 'rgba(120, 200, 255, 0.35)',
    textStyle: { color: '#fff', fontSize: FONT_SIZE, fontFamily: CHART_FONT },
    formatter: (items: Record<string, any>[]) => {
      if (!items?.length) return ''
      const axis = items[0].axisValueLabel ?? items[0].name
      let sum = 0
      for (const it of items) {
        const n = Number(it.value)
        if (!Number.isNaN(n)) sum += n
      }
      return `${axis}<br/>降雨量：${sum.toFixed(1)} mm`
    }
  },
  legend: {
    top: 10,
    left: 'center',
    itemWidth: 32,
    itemHeight: 10,
    itemGap: 40,
    orient: 'horizontal' as const,
    selectedMode: false,
    textStyle: {
      color: '#FFFFFF',
      fontSize: FONT_SIZE,
      fontFamily: CHART_FONT,
      padding: [0, 0, 0, 10]
    },
    data: [
      { name: '前7天', icon: 'rect', itemStyle: { color: '#4aaef2' } },
      { name: '后7天', icon: 'rect', itemStyle: { color: '#6c5ef2' } }
    ]
  },
  grid: {
    top: '26%',
    left: '5%',
    right: '6%',
    bottom: '14%',
    containLabel: true
  },
  xAxis: {
    type: 'category' as const,
    boundaryGap: true,
    axisTick: { show: false },
    offset: 8,
    axisLine: {
      lineStyle: {
        color: 'rgba(179, 223, 255, 0.5)',
        width: LINE_WIDTH
      }
    },
    axisLabel: {
      color: '#fff',
      fontSize: FONT_SIZE,
      fontFamily: CHART_FONT_X
    },
    data: [] as string[]
  },
  yAxis: {
    type: 'value' as const,
    min: 0,
    max: 90,
    interval: 22.5,
    name: '降雨量 (mm)',
    nameLocation: 'end' as const,
    nameGap: 28,
    nameTextStyle: {
      color: '#fff',
      fontSize: FONT_SIZE,
      fontFamily: CHART_FONT,
      align: 'left' as const,
      padding: [0, 0, 8, 0]
    },
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      color: '#fff',
      fontSize: FONT_SIZE,
      fontFamily: CHART_FONT_AXIS_VALUE,
      formatter: (val: number) => {
        const rounded = Math.round(val * 2) / 2
        if (rounded === 22.5) return '23'
        if (rounded === 67.5) return '68'
        return String(Math.round(val))
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed' as const,
        color: 'rgba(217, 231, 255, 0.2)',
        width: LINE_WIDTH
      }
    }
  },
  series: [
    {
      name: '前7天',
      type: 'bar' as const,
      stack: 'early',
      barMaxWidth: 14,
      barCategoryGap: '42%',
      data: [] as (number | null)[],
      itemStyle: { color: gradientBlue },
      z: 2
    },
    {
      name: '__cap_early',
      type: 'bar' as const,
      stack: 'early',
      barMaxWidth: 18,
      data: [] as (number | null)[],
      itemStyle: { color: capBlue },
      showInLegend: false,
      tooltip: { show: false },
      emphasis: { disabled: true },
      legendHoverLink: false,
      silent: true,
      z: 3
    },
    {
      name: '后7天',
      type: 'bar' as const,
      stack: 'late',
      barMaxWidth: 14,
      barCategoryGap: '42%',
      data: [] as (number | null)[],
      itemStyle: { color: gradientPurple },
      z: 2
    },
    {
      name: '__cap_late',
      type: 'bar' as const,
      stack: 'late',
      barMaxWidth: 18,
      data: [] as (number | null)[],
      itemStyle: { color: capPurple },
      showInLegend: false,
      tooltip: { show: false },
      emphasis: { disabled: true },
      legendHoverLink: false,
      silent: true,
      z: 3
    }
  ]
})

function applyRainChart (xLabels: string[], rainMm: number[]) {
  const values = rainMm.slice(0, CHART_LEN)
  while (values.length < CHART_LEN) {
    values.push(0)
  }
  const { bodyEarly, capEarly, bodyLate, capLate } = buildSeriesData(values)

  const opt = echartOption.value as Record<string, any>
  opt.xAxis.data = xLabels.slice(0, CHART_LEN)
  opt.series[0].data = bodyEarly
  opt.series[1].data = capEarly
  opt.series[2].data = bodyLate
  opt.series[3].data = capLate

  const maxVal = Math.max(...values, 1)
  if (maxVal > 85) {
    const yMax = Math.ceil(maxVal / 10) * 10 + 10
    opt.yAxis.max = yMax
    opt.yAxis.interval = yMax / 4
  } else {
    opt.yAxis.max = 90
    opt.yAxis.interval = 22.5
  }
}

usePolling(async () => {
  const pptnInfoResult: any = await service.xfqs.getPptnInfo({})

  const pastList = parsePptnList(pptnInfoResult?.pastList)
  const futureList = parsePptnList(pptnInfoResult?.fList)
  const chartList = [...pastList, ...futureList]

  if (!chartList.length) {
    applyRainChart(
      Array.from({ length: CHART_LEN }, (_, i) => dayjs().add(i - SPLIT, 'day').format('M.D')),
      [...DEFAULT_PAST_RAIN_MM, ...DEFAULT_FUTURE_RAIN_MM]
    )
    return
  }

  applyRainChart(
    chartList.map((item) => dayjs(item.date).format('M.D')),
    chartList.map((item) => item.value)
  )
})
</script>

<style lang="scss" scoped>
.page-container {
  padding: 28px 36px 32px;
  box-sizing: border-box;
}

.rain-chart {
  height: 380px;
}
</style>
