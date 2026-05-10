<template>
  <PageCard title="预报数据" bg-class="right">
    <div class="page-container">
      <div class="forecast-chart">
        <VueEcharts :option="echartOption" />
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
/** 正常蓄水位、汛限蓄水位（m），与设计稿刻度一致；图表样式与 FloodIndexPageRightCard1 对齐 */
const NORMAL_STORAGE_M = 400
const FLOOD_LIMIT_STORAGE_M = 125
const CHART_FONT = '"Alibaba PuHuiTi 2.0", "PingFang SC", "Microsoft YaHei", sans-serif'
const CHART_FONT_AXIS_VALUE = '"Alibaba PuHuiTi 2.0", "PingFang SC", "Microsoft YaHei", sans-serif'
const CHART_FONT_X = '"PingFang SC", "Microsoft YaHei", sans-serif'
const FONT_SIZE = 20
const LINE_WIDTH = 1

const X_LABELS = ['12.20', '12.21', '12.22', '12.23', '12.24', '12.25', '12.25']

/** 入库 / 出库流量演示数据（m³/s） */
const INFLOW_DEMO = [18, 32, 48, 42, 28, 22, 26]
const OUTFLOW_DEMO = [12, 22, 52, 46, 32, 24, 30]

const barGreen = {
  type: 'linear' as const,
  x: 0,
  y: 0,
  x2: 0,
  y2: 1,
  colorStops: [
    { offset: 0, color: 'rgba(154, 230, 110, 0.3)' },
    { offset: 1, color: 'rgba(154, 230, 110, 1)' }
  ]
}

const barOrange = {
  type: 'linear' as const,
  x: 0,
  y: 0,
  x2: 0,
  y2: 1,
  colorStops: [
    { offset: 0, color: 'rgba(255, 154, 60, 0.3)' },
    { offset: 1, color: 'rgba(255, 154, 60, 1)' }
  ]
}

const markLabelCommon = {
  show: true,
  color: 'rgba(255,255,255,0.95)',
  fontSize: FONT_SIZE,
  fontFamily: CHART_FONT
}

/** 水位参考线 + 当前时刻竖线 */
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
        formatter: `正常蓄水位${NORMAL_STORAGE_M}m`,
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
        formatter: `汛限蓄水位${FLOOD_LIMIT_STORAGE_M}m`,
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
        if (name.includes('蓄水位') || name === '__水位标线') continue
        const v = it.value
        const n = typeof v === 'object' && v !== null && 'value' in v ? Number((v as { value: number }).value) : Number(v)
        if (Number.isNaN(n)) continue
        if (name === '入库流量' || name === '出库流量') {
          lines.push(`${name}：${n} m³/s`)
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
      { name: '入库流量', icon: 'roundRect', itemStyle: { color: '#9AE66E', borderWidth: 0 } },
      { name: '出库流量', icon: 'roundRect', itemStyle: { color: '#FF9A3C', borderWidth: 0 } }
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
      name: '入库流量',
      type: 'bar' as const,
      yAxisIndex: 1,
      barMaxWidth: 22,
      barGap: '20%',
      data: [...INFLOW_DEMO],
      itemStyle: {
        color: barGreen,
        borderRadius: [2, 2, 0, 0]
      },
      z: 3
    },
    {
      name: '出库流量',
      type: 'bar' as const,
      yAxisIndex: 1,
      barMaxWidth: 22,
      barGap: '20%',
      data: [...OUTFLOW_DEMO],
      itemStyle: {
        color: barOrange,
        borderRadius: [2, 2, 0, 0]
      },
      z: 2
    },
    {
      name: '__水位标线',
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
