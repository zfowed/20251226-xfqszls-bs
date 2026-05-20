<template>
  <PageCard title="水库洪水预报" bg-class="right">
    <div class="page-container">
      <div class="forecast-chart">
        <VueEcharts :option="echartOption" />
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
/** 设计稿节点 4005:44 — 与稿中刻度、图例一致 */
const NORMAL_STORAGE_M = 400
const FLOOD_LIMIT_STORAGE_M = 125
const CHART_FONT = '"Alibaba PuHuiTi 2.0", "PingFang SC", "Microsoft YaHei", sans-serif'
const CHART_FONT_AXIS_VALUE = '"Alibaba PuHuiTi 2.0", "PingFang SC", "Microsoft YaHei", sans-serif'
const CHART_FONT_X = '"PingFang SC", "Microsoft YaHei", sans-serif'
const FONT_SIZE = 20
const LINE_WIDTH = 1
const SYMBOL_SIZE = 6

const X_LABELS = ['12.20', '12.21', '12.22', '12.23', '12.24', '12.25', '12.25']

/** 坝上水位（m，左轴） */
const DAM_LEVEL_DEMO = [220, 235, 410, 380, 290, 260, 240]
/** 入库 / 出库流量（m³/s，右轴） */
const INFLOW_DEMO = [18, 32, 48, 42, 28, 22, 26]
const OUTFLOW_DEMO = [12, 22, 52, 46, 32, 24, 30]

const COLOR_INFLOW = '#32d74b'
const COLOR_OUTFLOW = '#f39800'
const COLOR_DAM = '#3c80c0'

type ForecastChartItem = {
  tm?: string
  z?: number | string | null
  q?: number | string | null
  otq?: number | string | null
}

const toChartNumber = (value: unknown) => {
  const numberValue = Number(value)
  return Number.isFinite(numberValue) ? Number(numberValue.toFixed(3)) : null
}

const formatChartTime = (value: unknown) => {
  return value ? String(value).slice(5, 16) : ''
}

const getForecastChartList = (result: Record<string, any>) => {
  const ddfaList = result?.detail?.hsybForecastccDdfafExtList
  const forecastExtList = Array.isArray(ddfaList) ? ddfaList[0]?.hsybForecastcExtList : []
  const forecastList = Array.isArray(forecastExtList) ? forecastExtList[0]?.hsybForecastList : []
  return Array.isArray(forecastList) ? forecastList : []
}

const updateForecastChart = (list: ForecastChartItem[]) => {
  const opt = echartOption.value as Record<string, any>
  const xLabels = list.map(item => formatChartTime(item.tm))

  opt.xAxis.data = xLabels
  opt.series[0].data = xLabels.map(() => 0)
  opt.series[1].data = list.map(item => toChartNumber(item.z))
  opt.series[2].data = list.map(item => toChartNumber(item.q))
  opt.series[3].data = list.map(item => toChartNumber(item.otq))
}

const getForecastDetailById = async (id: string) => {
  if (!id) return
  const result: any = await service.xfqs.hsybForecastccFindById({ id })
  console.log('水库洪水预报详情:', { id, result })

  updateForecastChart(getForecastChartList(result))
}

defineExpose({
  getForecastDetailById
})

const greenArea = {
  type: 'linear' as const,
  x: 0,
  y: 0,
  x2: 0,
  y2: 1,
  colorStops: [
    { offset: 0, color: 'rgba(50, 215, 75, 0.5)' },
    { offset: 1, color: 'rgba(50, 215, 75, 0)' }
  ]
}

const orangeArea = {
  type: 'linear' as const,
  x: 0,
  y: 0,
  x2: 0,
  y2: 1,
  colorStops: [
    { offset: 0, color: 'rgba(243, 152, 0, 0.5)' },
    { offset: 1, color: 'rgba(243, 152, 0, 0)' }
  ]
}

const markLabelCommon = {
  show: true,
  color: 'rgba(255,255,255,0.95)',
  fontSize: FONT_SIZE,
  fontFamily: CHART_FONT
}

/** 水平标线（设计稿） */
const levelMarkLine = {
  silent: true,
  symbol: 'none' as const,
  animation: false,
  z: 10,
  data: [
    {
      yAxis: NORMAL_STORAGE_M,
      lineStyle: {
        type: 'dashed' as const,
        color: 'rgba(255, 236, 160, 0.95)',
        width: LINE_WIDTH
      },
      label: {
        ...markLabelCommon,
        formatter: `正常蓄水位${NORMAL_STORAGE_M}mm`,
        position: 'start' as const,
        align: 'left' as const,
        verticalAlign: 'bottom' as const,
        offset: [8, -6]
      }
    },
    {
      yAxis: FLOOD_LIMIT_STORAGE_M,
      lineStyle: {
        type: 'dashed' as const,
        color: 'rgba(50, 215, 75, 0.9)',
        width: LINE_WIDTH
      },
      label: {
        ...markLabelCommon,
        formatter: `讯限蓄水位${FLOOD_LIMIT_STORAGE_M}mm`,
        position: 'start' as const,
        align: 'left' as const,
        verticalAlign: 'bottom' as const,
        offset: [8, -6]
      }
    }
  ]
}

const echartOption = ref({
  animation: false,
  tooltip: {
    trigger: 'axis' as const,
    axisPointer: { type: 'line' as const, lineStyle: { color: 'rgba(255, 255, 255, 0.35)', type: 'dashed' as const, width: LINE_WIDTH } },
    backgroundColor: 'rgba(20, 40, 60, 0.92)',
    borderColor: 'rgba(120, 200, 255, 0.35)',
    textStyle: { color: '#fff', fontSize: FONT_SIZE, fontFamily: CHART_FONT },
    formatter (items: Record<string, any>[]) {
      if (!items?.length) return ''
      const axis = items[0].axisValueLabel ?? items[0].name
      const lines: string[] = [String(axis)]
      for (const it of items) {
        const name = it.seriesName as string
        if (name.includes('蓄水位') || name === '__标线层') continue
        const v = it.value
        const n = typeof v === 'object' && v !== null && 'value' in v ? Number((v as { value: number }).value) : Number(v)
        if (Number.isNaN(n)) continue
        if (name === '入库流量' || name === '出库流量') {
          lines.push(`${name}：${n} m³/s`)
        } else if (name === '坝上水位') {
          lines.push(`${name}：${n} m`)
        }
      }
      return lines.join('<br/>')
    }
  },
  legend: {
    top: 10,
    left: 'center',
    itemWidth: 32,
    itemHeight: 10,
    itemGap: 40,
    textStyle: {
      color: '#FFFFFF',
      fontSize: FONT_SIZE,
      fontFamily: CHART_FONT,
      padding: [0, 0, 0, 10]
    },
    data: [
      { name: '坝上水位', icon: 'roundRect', itemStyle: { color: COLOR_DAM, borderWidth: 0 } },
      { name: '入库流量', icon: 'roundRect', itemStyle: { color: COLOR_INFLOW } },
      { name: '出库流量', icon: 'roundRect', itemStyle: { color: COLOR_OUTFLOW } }
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
    boundaryGap: false,
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
    data: [...X_LABELS]
  },
  yAxis: [
    {
      type: 'value' as const,
      position: 'left' as const,
      name: '水位（m)',
      min: 0,
      max: 600,
      interval: 150,
      nameLocation: 'end' as const,
      nameGap: 28,
      nameTextStyle: {
        color: '#fff',
        fontSize: FONT_SIZE,
        fontFamily: CHART_FONT
      },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed' as const,
          color: 'rgba(217, 231, 255, 0.2)',
          width: LINE_WIDTH
        }
      },
      axisLabel: {
        color: '#fff',
        fontSize: FONT_SIZE,
        fontFamily: CHART_FONT_AXIS_VALUE
      }
    },
    {
      type: 'value' as const,
      position: 'right' as const,
      name: '流量（m³/s)',
      min: 0,
      max: 60,
      interval: 15,
      nameLocation: 'end' as const,
      nameGap: 28,
      nameTextStyle: {
        color: '#fff',
        fontSize: FONT_SIZE,
        fontFamily: CHART_FONT
      },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: {
        color: '#fff',
        fontSize: FONT_SIZE,
        fontFamily: CHART_FONT_AXIS_VALUE
      }
    }
  ],
  series: [
    {
      name: '__标线层',
      type: 'line' as const,
      yAxisIndex: 0,
      xAxisIndex: 0,
      data: X_LABELS.map(() => 0),
      showSymbol: false,
      lineStyle: { width: 0, opacity: 0 },
      emphasis: { disabled: true },
      showInLegend: false,
      silent: true,
      tooltip: { show: false },
      markLine: levelMarkLine,
      z: 8
    },
    {
      name: '坝上水位',
      type: 'line' as const,
      yAxisIndex: 0,
      smooth: true,
      showSymbol: true,
      symbol: 'circle',
      symbolSize: SYMBOL_SIZE,
      data: [...DAM_LEVEL_DEMO],
      lineStyle: { color: COLOR_DAM, width: LINE_WIDTH },
      itemStyle: { color: COLOR_DAM },
      z: 4
    },
    {
      name: '入库流量',
      type: 'line' as const,
      yAxisIndex: 1,
      smooth: true,
      showSymbol: true,
      symbol: 'circle',
      symbolSize: SYMBOL_SIZE,
      data: [...INFLOW_DEMO],
      lineStyle: { color: COLOR_INFLOW, width: LINE_WIDTH },
      itemStyle: { color: COLOR_INFLOW },
      areaStyle: { color: greenArea },
      z: 3
    },
    {
      name: '出库流量',
      type: 'line' as const,
      yAxisIndex: 1,
      smooth: true,
      showSymbol: true,
      symbol: 'circle',
      symbolSize: SYMBOL_SIZE,
      data: [...OUTFLOW_DEMO],
      lineStyle: { color: COLOR_OUTFLOW, width: LINE_WIDTH },
      itemStyle: { color: COLOR_OUTFLOW },
      areaStyle: { color: orangeArea },
      z: 2
    }
  ]
})
</script>

<style lang="scss" scoped>
.page-container {
  padding: 20px 32px 28px;
  box-sizing: border-box;
}

.forecast-chart {
  height: 480px;
}
</style>
