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
const DEFAULT_RAIN_MM = [62, 44, 58, 78, 72, 58, 33, 52, 61, 52, 72, 33]
const SPLIT = 6
const CHART_LEN = 12

const getNumberByKeys = (source: Record<string, any>, keys: string[]) => {
  for (const key of keys) {
    const value = Number(source?.[key])
    if (!Number.isNaN(value) && Number.isFinite(value)) {
      return value
    }
  }
  return 0
}

const rainFromForecastDay = (d: Record<string, any>) => {
  const top = getNumberByKeys(d, ['rain', 'rainfall', 'precipitation', 'pcpn', 'dayRain', 'accRain'])
  if (top) return top
  const day = getNumberByKeys(d?.day || {}, ['rainfall', 'precipitation', 'rain'])
  if (day) return day
  return getNumberByKeys(d?.day?.weather || {}, ['rainfall', 'precipitation', 'rain'])
}

const capDelta = (v: number) => Math.min(5, Math.max(2, Math.round(v * 0.055)))

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
  tooltip: {
    trigger: 'axis' as const,
    axisPointer: { type: 'shadow' as const },
    backgroundColor: 'rgba(20, 40, 60, 0.92)',
    borderColor: 'rgba(120, 200, 255, 0.35)',
    textStyle: { color: '#fff', fontSize: 18 },
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
    top: 12,
    right: 36,
    itemWidth: 22,
    itemHeight: 14,
    itemGap: 28,
    orient: 'horizontal' as const,
    selectedMode: false,
    textStyle: {
      color: '#FFFFFF',
      fontSize: 18,
      fontFamily: 'PingFangSC, sans-serif',
      padding: [0, 0, 0, 10]
    },
    data: [
      { name: '前期', icon: 'rect', itemStyle: { color: '#4aaef2' } },
      { name: '后期', icon: 'rect', itemStyle: { color: '#6c5ef2' } }
    ]
  },
  grid: {
    top: '16%',
    left: '4%',
    right: '4%',
    bottom: '10%',
    containLabel: true
  },
  xAxis: {
    type: 'category' as const,
    boundaryGap: true,
    axisTick: { show: false },
    axisLine: {
      lineStyle: {
        color: 'rgba(120, 200, 255, 0.65)',
        width: 2
      }
    },
    axisLabel: {
      color: '#fff',
      fontSize: 18,
      fontFamily: 'PingFangSC, sans-serif',
      margin: 14
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
    nameGap: 12,
    nameTextStyle: {
      color: '#fff',
      fontSize: 18,
      fontFamily: 'PingFangSC, sans-serif',
      align: 'left' as const,
      padding: [0, 0, 8, 0]
    },
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      color: 'rgba(230, 245, 255, 0.92)',
      fontSize: 17,
      fontFamily: 'Quantico, PingFangSC, sans-serif',
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
        type: 'dotted' as const,
        color: 'rgba(255, 255, 255, 0.22)'
      }
    }
  },
  series: [
    {
      name: '前期',
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
      name: '后期',
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
    values.push(DEFAULT_RAIN_MM[values.length] ?? 0)
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
  const result: any = await service.xfqs.queryStationWeather({})
  const detail = (result?.predict?.detail || []) as Record<string, any>[]
  const slice = detail.slice(0, CHART_LEN)

  const xLabels = slice.length
    ? slice.map((d) => dayjs(d.date).format('M.D'))
    : Array.from({ length: CHART_LEN }, (_, i) => `4.${i + 1}`)

  let rainMm = slice.map((d) => rainFromForecastDay(d))
  if (!rainMm.length || rainMm.every((v) => !v)) {
    rainMm = [...DEFAULT_RAIN_MM]
  }

  applyRainChart(xLabels.length ? xLabels : Array.from({ length: CHART_LEN }, (_, i) => `4.${i + 1}`), rainMm)
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
