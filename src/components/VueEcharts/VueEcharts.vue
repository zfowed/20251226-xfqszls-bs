<template>
  <div
    ref="echartElement"
    class="vue-echarts"
  />
</template>

<script setup lang="ts">
import type { EChartsCoreOption, EChartsType } from 'echarts/core'
import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { GraphicComponent, GridComponent, LegendComponent, TitleComponent, ToolboxComponent, TooltipComponent } from 'echarts/components'
import { BarChart, GraphChart, LineChart, PieChart, RadarChart, GaugeChart, PictorialBarChart } from 'echarts/charts'
import ResizeObserver from 'resize-observer-polyfill'

echarts.use([CanvasRenderer])
echarts.use([GraphicComponent, GridComponent, LegendComponent, TitleComponent, ToolboxComponent, TooltipComponent])
echarts.use([BarChart, GraphChart, LineChart, PieChart, RadarChart, GaugeChart, PictorialBarChart])

const props = defineProps<{
  option: EChartsCoreOption
}>()

const echartElement = ref<HTMLInputElement>()
let echartInstance: EChartsType

// 初始化
onMounted(() => {
  nextTick(() => {
    if (!echartElement.value) return
    echartInstance = echarts.init(echartElement.value, undefined, {
      devicePixelRatio: window.devicePixelRatio * 2, // 设备像素比
      renderer: 'svg', // 渲染器
      useDirtyRect: false, // 脏矩形渲染
      locale: 'ZH'
    })
    echartInstance.setOption(props.option)
  })
})
onUnmounted(() => echartInstance.dispose())

// 数据变化
watch(() => props.option, (value) => {
  return echartInstance && echartInstance.setOption(value)
}, { deep: true })

// 监听窗口变化
const robserver = new ResizeObserver(() => echartInstance && echartInstance.resize())
onMounted(() => echartElement.value && robserver.observe(echartElement.value))
onUnmounted(() => robserver.disconnect())
</script>

<style lang="css" scoped>
.vue-echarts {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}
</style>
