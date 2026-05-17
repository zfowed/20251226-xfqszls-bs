<template>
  <PageCard title="土壤墒情" bg-class="right">
    <div class="reservoir-card__header text-right">
      <ElSelect
        v-model="selectedReservoirId"
        class="reservoir-card__select"
        popper-class="reservoir-card__select-popper"
        placeholder="请选择墒情站"
        @change="handleStationChange"
      >
        <ElOption
          v-for="item in reservoirList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </ElSelect>
    </div>
    <div class="agriculture-moisture-card">
      <VueEcharts
        :option="echartOption"
        class="p-[20px] agriculture-moisture-card__chart"
      />
    </div>
  </PageCard>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

type SoilStation = {
  id: string
  name: string
  stcd: string
  raw: Record<string, any>
}

const selectedReservoirId = ref('')
const reservoirList = ref<SoilStation[]>([])

const humiditySeriesNames = ['10cm平均湿度', '20cm平均湿度', '40cm平均湿度']
const temperatureSeriesNames = ['10cm平均温度', '20cm平均温度', '40cm平均温度']

const createAreaGradient = (topColor: string, bottomColor: string) => {
  return {
    colorStops: [
      { offset: 0, color: topColor },
      { offset: 1, color: bottomColor }
    ]
  }
}

const createLineSeries = (
  name: string,
  color: string,
  data: Array<number | null>,
  areaColor?: { colorStops: { offset: number; color: string }[] },
  yAxisIndex = 0,
  z = 3,
  lineType: 'solid' | 'dashed' = 'solid'
) => {
  return {
    name,
    type: 'line',
    smooth: true,
    yAxisIndex,
    data,
    z,
    showSymbol: true,
    symbol: 'circle',
    symbolSize: 7,
    lineStyle: {
      width: 2,
      color,
      type: lineType,
      shadowBlur: 10,
      shadowColor: color
    },
    itemStyle: {
      color,
      borderColor: color,
      borderWidth: 0,
      shadowBlur: 10,
      shadowColor: color
    },
    emphasis: {
      focus: 'series'
    },
    areaStyle: areaColor
      ? {
          color: areaColor
        }
      : undefined
  }
}

const echartOption = ref<Record<string, any>>({
  animation: false,
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(7, 23, 44, 0.92)',
    borderColor: 'rgba(122, 210, 255, 0.35)',
    borderWidth: 1,
    textStyle: {
      color: '#EAF7FF',
      fontSize: 14
    },
    valueFormatter: (value: number | string | null) => {
      return value === null || value === undefined || value === ''
        ? '--'
        : value
    },
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: 'rgba(170, 228, 255, 0.24)'
      }
    }
  },
  legend: {
    top: 6,
    right: 0,
    itemWidth: 18,
    itemHeight: 8,
    itemGap: 18,
    // icon: 'roundRect',
    textStyle: {
      color: 'rgba(233, 244, 255, 0.92)',
      fontSize: 18,
      fontFamily: 'PingFangSC, sans-serif',
      padding: [0, 0, 0, 6]
    },
    data: [...humiditySeriesNames, ...temperatureSeriesNames]
  },
  grid: {
    top: 100,
    left: 80,
    right: 80,
    bottom: 40
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [],
    axisTick: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(128, 188, 228, 0.55)',
        width: 2
      }
    },
    axisLabel: {
      margin: 18,
      color: 'rgba(228, 240, 255, 0.86)',
      fontSize: 18,
      fontFamily: 'DINAlternate, Arial, sans-serif'
    },
    splitLine: {
      show: false
    }
  },
  yAxis: [
    {
      type: 'value',
      min: 0,
      max: 60,
      name: '%',
      nameGap: 14,
      nameTextStyle: {
        color: 'rgba(228, 240, 255, 0.9)',
        fontSize: 24,
        align: 'left',
        padding: [0, 0, 0, -28]
      },
      axisLabel: {
        color: 'rgba(228, 240, 255, 0.9)',
        fontSize: 24
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color: 'rgba(177, 214, 239, 0.14)'
        }
      }
    },
    {
      type: 'value',
      min: 0,
      max: 40,
      name: '℃',
      nameGap: 14,
      nameTextStyle: {
        color: 'rgba(228, 240, 255, 0.9)',
        fontSize: 24,
        align: 'right',
        padding: [0, -28, 0, 0]
      },
      axisLabel: {
        color: 'rgba(228, 240, 255, 0.9)',
        fontSize: 24
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      }
    }
  ],
  series: []
})

function toChartNumber (value: unknown) {
  if (value === null || value === undefined || value === '') {
    return null
  }

  const numberValue = Number(value)
  return Number.isFinite(numberValue) ? numberValue : null
}

function getSoilStepRows (result: any) {
  if (Array.isArray(result?.list)) {
    return result.list
  }

  if (Array.isArray(result?.data?.list)) {
    return result.data.list
  }

  if (Array.isArray(result)) {
    return result
  }

  return []
}

function updateChartOption (soilStepResult: any) {
  const rows = getSoilStepRows(soilStepResult)
    .slice()
    .sort((prev: Record<string, any>, next: Record<string, any>) => {
      return (
        dayjs(prev.tm || prev.tmMin).valueOf() -
        dayjs(next.tm || next.tmMin).valueOf()
      )
    })

  const xAxisData = rows.map((item: Record<string, any>) => {
    const time = item.tm || item.tmMin
    return time ? dayjs(time).format('MM.DD HH:mm') : ''
  })

  const humidity10Data = rows.map((item: Record<string, any>) =>
    toChartNumber(item.humidityAvg1)
  )
  const humidity20Data = rows.map((item: Record<string, any>) =>
    toChartNumber(item.humidityAvg2)
  )
  const humidity40Data = rows.map((item: Record<string, any>) =>
    toChartNumber(item.humidityAvg3)
  )
  const temperature10Data = rows.map((item: Record<string, any>) =>
    toChartNumber(item.tempAvg1)
  )
  const temperature20Data = rows.map((item: Record<string, any>) =>
    toChartNumber(item.tempAvg2)
  )
  const temperature40Data = rows.map((item: Record<string, any>) =>
    toChartNumber(item.tempAvg3)
  )

  echartOption.value = {
    ...echartOption.value,
    xAxis: {
      ...echartOption.value.xAxis,
      data: xAxisData
    },
    series: [
      createLineSeries(
        humiditySeriesNames[0],
        '#F2A451',
        humidity10Data,
        createAreaGradient('rgba(242, 164, 81, 0.38)', 'rgba(242, 164, 81, 0)')
      ),
      createLineSeries(
        humiditySeriesNames[1],
        '#F3DF48',
        humidity20Data,
        createAreaGradient('rgba(243, 223, 72, 0.26)', 'rgba(243, 223, 72, 0)')
      ),
      createLineSeries(
        humiditySeriesNames[2],
        '#56F567',
        humidity40Data,
        createAreaGradient('rgba(86, 245, 103, 0.22)', 'rgba(86, 245, 103, 0)')
      ),
      createLineSeries(
        temperatureSeriesNames[0],
        '#4EC8FF',
        temperature10Data,
        undefined,
        1,
        4,
        'dashed'
      ),
      createLineSeries(
        temperatureSeriesNames[1],
        '#B27DFF',
        temperature20Data,
        undefined,
        1,
        4,
        'dashed'
      ),
      createLineSeries(
        temperatureSeriesNames[2],
        '#FF6F91',
        temperature40Data,
        undefined,
        1,
        4,
        'dashed'
      )
    ]
  }
}

function getStationCode (station: Record<string, any> | undefined) {
  return (
    station?.stcd ||
    station?.stcds ||
    station?.code ||
    station?.stCode ||
    station?.stationCode ||
    ''
  )
}

function buildSoilStepParams (station: SoilStation | undefined) {
  return {
    stcd: station?.stcd || getStationCode(station?.raw),
    startTime: `${dayjs().subtract(1, 'day').format('YYYY-MM-DD')} 08:00:00`,
    endTime: `${dayjs().format('YYYY-MM-DD')} 08:00:00`,
    h: '1'
  }
}

async function loadSoilStep (station: SoilStation | undefined) {
  const soilStepParams = buildSoilStepParams(station)
  // console.log('墒情统计 soil/stat/step 请求参数：', soilStepParams)

  if (!soilStepParams.stcd) {
    console.warn(
      '当前墒情点位缺少 stcd，无法请求 soil/stat/step：',
      station?.raw || station
    )
    return
  }

  const soilStepResult: any = await service.xfqs.getSoilStatStep(soilStepParams)
  // console.log('墒情统计 soil/stat/step：', soilStepResult)
  updateChartOption(soilStepResult)
}

async function handleStationChange () {
  const station = reservoirList.value.find(
    (item: any) => item.id === selectedReservoirId.value
  )
  await loadSoilStep(station)
}

onMounted(async () => {
  const soilPageResult: any = await service.xfqs.getSoilPage({
    limit: 1000,
    lx: 1,
    start: 1
  })

  const soilStationList = Array.isArray(soilPageResult?.list)
    ? soilPageResult.list
    : Array.isArray(soilPageResult)
      ? soilPageResult
      : []
  reservoirList.value = soilStationList.map(
    (item: Record<string, any>, index: number) => {
      const stcd = getStationCode(item)
      return {
        id: stcd || String(item.id || `station-${index + 1}`),
        name:
          item.stnm || item.name || item.stationName || `墒情站${index + 1}`,
        stcd,
        raw: item
      }
    }
  )

  selectedReservoirId.value = reservoirList.value[0]?.id || ''
  await loadSoilStep(reservoirList.value[0])
})
</script>

<style lang="scss" scoped>
.reservoir-card__header {
  padding: 12px 18px 0;
}

.reservoir-card__select {
  width: 314px;
}

.agriculture-moisture-card {
  padding: 12px 18px 10px 8px;
}

.agriculture-moisture-card__chart {
  width: 100%;
  height: 522px;
}

:deep(.reservoir-card__select .el-select__wrapper) {
  min-height: 38px;
  padding: 0 14px 0 16px;
  background: linear-gradient(
    180deg,
    rgb(20 74 122 / 0.72) 0%,
    rgb(7 42 83 / 0.76) 100%
  );
  border-radius: 0;
  box-shadow:
    inset 0 0 0 1px rgb(106 197 255 / 0.36),
    inset 0 0 16px rgb(72 182 255 / 0.14),
    0 0 0 1px rgb(79 164 219 / 0.56);
}

:deep(.reservoir-card__select .el-select__wrapper.is-focused) {
  box-shadow:
    inset 0 0 0 1px rgb(116 219 255 / 0.5),
    inset 0 0 20px rgb(87 198 255 / 0.18),
    0 0 0 1px rgb(106 197 255 / 0.72);
}

:deep(.reservoir-card__select .el-select__selection) {
  min-height: 38px;
}

:deep(.reservoir-card__select .el-select__placeholder),
:deep(.reservoir-card__select .el-select__selected-item),
:deep(.reservoir-card__select .el-select__input-text) {
  color: #dff5ff;
  font-size: 18px;
  font-family: PingFangSC, sans-serif;
  font-weight: 600;
}

:deep(.reservoir-card__select .el-select__placeholder) {
  color: rgb(223 245 255 / 0.7);
}

:deep(.reservoir-card__select .el-select__suffix) {
  margin-left: 8px;
}

:deep(.reservoir-card__select .el-select__caret) {
  color: #86eaff;
  font-size: 18px;
  font-weight: 700;
}

:global(.reservoir-card__select-popper.el-popper) {
  background: linear-gradient(
    180deg,
    rgb(11 43 82 / 0.96) 0%,
    rgb(6 28 56 / 0.96) 100%
  );
  border: 1px solid rgb(96 192 255 / 0.32);
  border-radius: 0;
  box-shadow: 0 10px 24px rgb(3 14 30 / 0.42);
}

:global(.reservoir-card__select-popper .el-popper__arrow) {
  display: none;
}

:global(.reservoir-card__select-popper .el-select-dropdown__item) {
  height: 36px;
  padding: 0 16px;
  color: rgb(223 245 255 / 0.88);
  font-size: 16px;
  font-family: PingFangSC, sans-serif;
  line-height: 36px;
}

:global(.reservoir-card__select-popper .el-select-dropdown__item.is-hovering),
:global(.reservoir-card__select-popper .el-select-dropdown__item.is-selected) {
  background: rgb(71 154 217 / 0.24);
  color: #eefbff;
}
</style>
