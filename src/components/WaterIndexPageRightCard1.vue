<template>
  <PageCard title="供水预报" bg-class="right">
    <div class="page-container">
      <div class="header-title flex items-center mb-[30px]">
        <img src="@/assets/global/images/card-title-icon.png" class="w-[30px] h-[32px] mr-[9px]">
        <span>供水需求</span>
      </div>

      <div class="reservoir-summary">
        <div v-for="item in reservoirInfo" :key="item.name" class="reservoir-item">
          <img :src="item.icon" :alt="item.name" class="reservoir-item__icon">
          <div>
            <div class="reservoir-item__label">
              {{ item.name }}
            </div>
            <div class="reservoir-item__value-row">
              <ZfTweenNumber :value="item.value" class="reservoir-item__value" />
              <span class="reservoir-item__unit">{{ item.unit }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="header-title flex items-center mb-[30px] mt-[60px]">
        <img src="@/assets/global/images/card-title-icon.png" class="w-[30px] h-[32px] mr-[9px]">
        <span>作物需水</span>
      </div>
      <div class="chart">
        <VueEcharts :option="echartOption" />
      </div>

      <div class="header-title flex items-center mb-[30px] mt-[60px]">
        <img src="@/assets/global/images/card-title-icon.png" class="w-[30px] h-[32px] mr-[9px]">
        <span>灌溉需水</span>
      </div>
      <div class="table-solid">
        <div
          v-for="item in irrigationNeedList"
          :key="item.id"
          class="table-solid__item"
        >
          <div class="table-solid__top">
            <span class="table-solid__name">{{ item.name }}</span>
            <div class="table-solid__value-group">
              <span class="table-solid__value">{{ item.value.toFixed(2) }}</span>
              <span class="table-solid__unit">{{ item.unit }}</span>
            </div>
          </div>
          <div class="table-solid__track">
            <div class="table-solid__fill" :style="{ width: `${item.percent}%` }">
              <span class="table-solid__dot" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

const getSituationPhotoUrl = (icon: string) => {
  return new URL(`../assets/global/images/situation/SituationPageLeftCard3/${icon}.png`, import.meta.url).href
}

const reservoirInfo = ref<Record<string, any>>([
  { icon: getSituationPhotoUrl('q1'), name: '灌溉用水', value: 12.3, unit: '万m3' },
  { icon: getSituationPhotoUrl('q2'), name: '生态用水', value: 0.8, unit: '万m3' }
])
const irrigationNeedList = ref([
  { id: 'need-1', name: 'XXX行政村', value: 0.67, unit: 't', percent: 48 },
  { id: 'need-2', name: 'XXX行政村', value: 0.36, unit: 't', percent: 48 },
  { id: 'need-3', name: 'XXX行政村', value: 0.67, unit: 't', percent: 48 },
  { id: 'need-4', name: 'XXX行政村', value: 0.36, unit: 't', percent: 48 },
  { id: 'need-5', name: 'XXX行政村', value: 0.67, unit: 't', percent: 48 },
  { id: 'need-6', name: 'XXX行政村', value: 0.36, unit: 't', percent: 48 },
  { id: 'need-7', name: 'XXX行政村', value: 0.67, unit: 't', percent: 48 },
  { id: 'need-8', name: 'XXX行政村', value: 0.36, unit: 't', percent: 48 }
])
const tableDataList = ref<Record<string, any>[]>([
  { siteName: 'XXX站点', waterLevel: 2, waterDepth: 2, time: '26/4/23 10:00' },
  { siteName: 'XXX站点', waterLevel: 1, waterDepth: 1, time: '26/4/22 13:00' },
  { siteName: 'XXX站点', waterLevel: 0, waterDepth: 0, time: '26/4/21 12:00' },
  { siteName: 'XXX站点', waterLevel: 0, waterDepth: 0, time: '26/4/20 9:00' },
  { siteName: 'XXX站点', waterLevel: 0, waterDepth: 0, time: '26/4/20 16:00' }
])

const echartOption = ref({
  animation: false,
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  title: {
    text: '蓄水量（万m3）',
    top: 6,
    left: 0,
    textStyle: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'normal',
      fontFamily: 'PingFangSC, sans-serif'
    }
  },
  legend: {
    top: 6,
    right: 20,
    itemWidth: 18,
    itemHeight: 10,
    itemGap: 28,
    textStyle: {
      color: '#FFFFFF',
      fontSize: 16,
      fontFamily: 'PingFangSC, sans-serif',
      padding: [0, 0, 0, 8]
    },
    data: [
      { name: '油菜', icon: 'rect' },
      { name: '小麦', icon: 'rect' }
    ]
  },
  grid: {
    top: 48,
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
        color: 'rgba(179,223,255, 0.45)',
        width: 2
      }
    },
    axisLabel: {
      color: '#fff',
      fontSize: 16,
      fontFamily: 'DINAlternate, Arial, sans-serif',
      margin: 14
    },
    data: [] as string[]
  },
  yAxis: {
    type: 'value',
    min: 0,
    max: 60,
    interval: 15,
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: '#d9efff',
      fontSize: 16,
      fontFamily: 'Quantico, sans-serif'
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
        color: 'rgba(217,231,255, 0.16)'
      }
    }
  },
  series: [
    {
      name: '油菜',
      data: [] as number[],
      type: 'bar',
      barWidth: 16,
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 1,
          x2: 0,
          y2: 0,
          colorStops: [
            { offset: 0, color: 'rgba(106, 196, 129, 0.28)' },
            { offset: 1, color: 'rgba(121, 241, 138, 0.92)' }
          ]
        }
      }
    },
    {
      name: '小麦',
      data: [] as number[],
      type: 'bar',
      barWidth: 16,
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 1,
          x2: 0,
          y2: 0,
          colorStops: [
            { offset: 0, color: 'rgba(66, 124, 204, 0.28)' },
            { offset: 1, color: 'rgba(99, 170, 255, 0.92)' }
          ]
        }
      }
    }
  ]
})

usePolling(async () => {
  const warnInfoResult: any = await service.xfqs.getRsvrWarnInfo({})
  const pageResult: any = await service.xfqs.hsybForecastccFindPage({
    start: 1,
    limit: 1,
    lx: 1
  })

  let xAxisData = ['4.1', '4.2', '4.3', '4.4', '4.5', '4.6', '4.7', '4.8', '4.9', '4.10', '4.11', '4.12']
  let rapeseedData = [35, 44, 17, 14, 13, 21, 22, 9, 29, 17, 29, 57]
  let wheatData = [29, 44, 29, 14, 20, 21, 15, 9, 29, 17, 29, 57]

  if (pageResult.list.length > 0) {
    const echartsResult: any = await service.xfqs.hsybForecastccFindById({
      id: pageResult.list[0].id
    })
    const hsybForecastList =
      echartsResult?.hsybForecastccDdfafExtList?.[0]?.hsybForecastcExtList?.[0]?.hsybForecastList || []

    if (hsybForecastList.length > 0) {
      xAxisData = hsybForecastList.slice(0, 12).map((item: Record<string, any>) => dayjs(item.tm).format('M.D'))
      const sourceData = hsybForecastList.slice(0, 12).map((item: Record<string, any>) => Number(item.z) || 0)
      if (sourceData.length > 0) {
        rapeseedData = sourceData.map((item: number, index: number) => Number((item + (index % 3 === 0 ? 4 : -2)).toFixed(1)))
        wheatData = sourceData.map((item: number, index: number) => Number((item + (index % 2 === 0 ? -2 : 3)).toFixed(1)))
      }
    }
  }

  const currentValue = Number(warnInfoResult?.currntZ) || rapeseedData[rapeseedData.length - 1] || 12.3
  const previousYearValue = rapeseedData.length > 1 ? currentValue - Number(rapeseedData[rapeseedData.length - 2] || 0) : 0.8
  // const multiYearValue = rapeseedData.length > 0
  //   ? currentValue - rapeseedData.reduce((sum: number, item: number) => sum + item, 0) / rapeseedData.length
  //   : -2.3

  reservoirInfo.value[0].value = Number((currentValue || 12.3).toFixed(1))
  reservoirInfo.value[1].value = Number((previousYearValue || 0.8).toFixed(1))

  echartOption.value.xAxis.data = xAxisData
  echartOption.value.series[0].data = rapeseedData
  echartOption.value.series[1].data = wheatData

  const allSeriesData = [...rapeseedData, ...wheatData]
  const dataMax = Math.max(...allSeriesData)
  const yAxisInterval = 15
  const yAxisMax = Math.ceil((dataMax + yAxisInterval * 0.4) / yAxisInterval) * yAxisInterval
  echartOption.value.yAxis.max = yAxisMax

  const gateResult: any = await service.xfqs.getGatePageList({
    start: 1,
    limit: 5,
    sttp: 'DD'
  })

  if (gateResult?.list?.length > 0) {
    tableDataList.value = gateResult.list.slice(0, 5).map((item: Record<string, any>) => ({
      siteName: item.stnm || 'XXX站点',
      waterLevel: Number(item.inz || 0),
      waterDepth: Number(item.otz || 0),
      time: item.tm ? dayjs(item.tm).format('YY/M/DD H:mm') : '--'
    }))
  }
})
</script>

<style lang="scss" scoped>
.page-container {
  padding: 35px 40px;
}

.flow-table__site-icon {
  width: 42px;
  height: 42px;
  margin-right: 14px;
}

.reservoir-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 29px;
}

.reservoir-item {
  display: flex;
  align-items: center;
  font-family: PingFangSC, sans-serif;

  .reservoir-item__icon {
    width: 76px;
    height: 84px;
    margin-right: 14px;
    flex-shrink: 0;
  }

  .reservoir-item__label {
    margin-bottom: 6px;
    font-size: 30px;
    color: #fff;
    white-space: nowrap;
  }

  .reservoir-item__value-row {
    display: flex;
    align-items: baseline;
  }

  .reservoir-item__value {
    font-family: Quantico, sans-serif;
    font-size: 32px;
    font-weight: bold;
    color: #50fffc;
    text-shadow: 0 0 10px rgb(80 255 252 / 0.3);
  }

  .reservoir-item__unit {
    margin-left: 8px;
    font-size: 24px;
    color: #beeeff;
  }
}

.reservoir-chart {
  height: 428px;
  margin: 50px 0 30px;
}

.chart {
  height: 460px;
}

.table-solid {
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding: 0 4px 10px;
}

.table-solid__item {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.table-solid__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.table-solid__name {
  color: #fff;
  font-size: 22px;
  font-family: PingFangSC, sans-serif;
}

.table-solid__value-group {
  display: flex;
  align-items: baseline;
}

.table-solid__value {
  color: #50fffc;
  font-size: 22px;
  font-family: Quantico, sans-serif;
  font-weight: 700;
  text-shadow: 0 0 10px rgb(80 255 252 / 0.28);
}

.table-solid__unit {
  margin-left: 8px;
  color: #d8edff;
  font-size: 18px;
}

.table-solid__track {
  position: relative;
  width: 100%;
  height: 10px;
  background: rgb(121 163 198 / 0.18);
  box-shadow: inset 0 0 4px rgb(122 188 235 / 0.1);
}

.table-solid__fill {
  position: relative;
  height: 100%;
  background: linear-gradient(90deg, rgb(62 157 214 / 0.9) 0%, rgb(93 225 255 / 0.92) 100%);
}

.table-solid__dot {
  position: absolute;
  top: 50%;
  right: -9px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 10px rgb(255 255 255 / 0.45);
  transform: translateY(-50%);
}

.reservoir-table {
  height: 405px;
}

.reservoir-table__site {
  display: flex;
  align-items: center;
  color: #81e6ff;
}

.reservoir-table__site-icon {
  width: 28px;
  height: 28px;
  margin-right: 14px;
}

.reservoir-table__value {
  color: #50fffc;
  font-size: 22px;
  font-family: Quantico, sans-serif;
}

.reservoir-table__unit {
  margin-left: 6px;
  color: #d8edff;
  font-size: 18px;
}
</style>
