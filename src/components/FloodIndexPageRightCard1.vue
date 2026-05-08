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
/** 正常蓄水位、讯限蓄水位（m），与设计稿刻度一致 */
const NORMAL_STORAGE_M = 400
const FLOOD_LIMIT_STORAGE_M = 125

const X_LABELS = ['12.20', '12.21', '12.22', '12.23', '12.24', '12.25', '12.25']

/** 入库 / 出库流量演示数据（m³/s），与设计稿走势相近 */
const INFLOW_DEMO = [18, 32, 48, 42, 28, 22, 26]
const OUTFLOW_DEMO = [12, 22, 52, 46, 32, 24, 30]

const greenArea = {
  type: 'linear' as const,
  x: 0,
  y: 0,
  x2: 0,
  y2: 1,
  colorStops: [
    { offset: 0, color: 'rgba(140, 230, 90, 0.55)' },
    { offset: 1, color: 'rgba(140, 230, 90, 0)' }
  ]
}

const orangeArea = {
  type: 'linear' as const,
  x: 0,
  y: 0,
  x2: 0,
  y2: 1,
  colorStops: [
    { offset: 0, color: 'rgba(255, 150, 60, 0.55)' },
    { offset: 1, color: 'rgba(255, 150, 60, 0)' }
  ]
}

/** 水位参考线：用 markLine 画线并带文字（数据点 label 在 symbol:none 时往往不渲染） */
const levelMarkLine = {
  silent: true,
  symbol: 'none' as const,
  animation: false,
  lineStyle: {
    type: 'dashed' as const,
    color: 'rgba(255, 236, 160, 0.95)',
    width: 1
  },
  label: {
    show: true,
    color: 'rgba(255,255,255,0.95)',
    fontSize: 14,
    fontFamily: 'PingFangSC, sans-serif'
  },
  data: [
    {
      yAxis: NORMAL_STORAGE_M,
      label: {
        formatter: `正常蓄水位${NORMAL_STORAGE_M}m`,
        position: 'start' as const,
        align: 'left' as const,
        verticalAlign: 'bottom' as const,
        offset: [10, -18]
      }
    },
    {
      yAxis: FLOOD_LIMIT_STORAGE_M,
      label: {
        formatter: `讯限蓄水位${FLOOD_LIMIT_STORAGE_M}m`,
        position: 'start' as const,
        align: 'left' as const,
        verticalAlign: 'bottom' as const,
        offset: [10, -18]
      }
    }
  ]
}

const echartOption = ref({
  tooltip: {
    trigger: 'axis' as const,
    axisPointer: { type: 'line' as const, lineStyle: { color: 'rgba(255,255,255,0.35)', type: 'dashed' as const } },
    backgroundColor: 'rgba(20, 40, 60, 0.92)',
    borderColor: 'rgba(120, 200, 255, 0.35)',
    textStyle: { color: '#fff', fontSize: 16 },
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
    top: 8,
    left: 'center',
    itemWidth: 28,
    itemHeight: 3,
    itemGap: 36,
    textStyle: {
      color: '#FFFFFF',
      fontSize: 18,
      fontFamily: 'PingFangSC, sans-serif',
      padding: [0, 0, 0, 10]
    },
    data: [
      { name: '入库流量', icon: 'roundRect', itemStyle: { color: '#9AE66E' } },
      { name: '出库流量', icon: 'roundRect', itemStyle: { color: '#FF9A3C' } }
    ]
  },
  grid: {
    top: '22%',
    left: '4%',
    right: '5%',
    bottom: '12%',
    containLabel: true
  },
  xAxis: {
    type: 'category' as const,
    boundaryGap: false,
    axisTick: { show: false },
    offset: 10,
    axisLine: {
      lineStyle: {
        color: 'rgba(179, 223, 255, 0.5)'
      }
    },
    axisLabel: {
      color: '#fff',
      fontSize: 17,
      fontFamily: 'PingFangSC, sans-serif'
    },
    data: [...X_LABELS]
  },
  yAxis: [
    {
      type: 'value' as const,
      position: 'left' as const,
      name: '水位 (m)',
      min: 0,
      max: 600,
      interval: 150,
      nameLocation: 'end' as const,
      nameGap: 12,
      nameTextStyle: {
        color: '#fff',
        fontSize: 17,
        fontFamily: 'PingFangSC, sans-serif'
      },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed' as const,
          color: 'rgba(217, 231, 255, 0.2)'
        }
      },
      axisLabel: {
        color: '#fff',
        fontSize: 17,
        fontFamily: 'Quantico, PingFangSC, sans-serif'
      }
    },
    {
      type: 'value' as const,
      position: 'right' as const,
      name: '流量 (m³/s)',
      min: 0,
      max: 60,
      interval: 15,
      nameLocation: 'end' as const,
      nameGap: 12,
      nameTextStyle: {
        color: '#fff',
        fontSize: 17,
        fontFamily: 'PingFangSC, sans-serif'
      },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: {
        color: '#fff',
        fontSize: 17,
        fontFamily: 'Quantico, PingFangSC, sans-serif'
      }
    }
  ],
  series: [
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
    },
    {
      name: '入库流量',
      type: 'line' as const,
      yAxisIndex: 1,
      smooth: true,
      showSymbol: true,
      symbol: 'circle',
      symbolSize: 8,
      data: [...INFLOW_DEMO],
      lineStyle: { color: '#9AE66E', width: 2 },
      itemStyle: { color: '#9AE66E' },
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
      symbolSize: 8,
      data: [...OUTFLOW_DEMO],
      lineStyle: { color: '#FF9A3C', width: 2 },
      itemStyle: { color: '#FF9A3C' },
      areaStyle: { color: orangeArea },
      z: 2
    }
  ]
})
</script>

<style lang="scss" scoped>
.page-container {
  padding: 28px 36px 32px;
  box-sizing: border-box;
}

.forecast-chart {
  height: 480px;
}
</style>
