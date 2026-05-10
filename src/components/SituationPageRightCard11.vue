<template>
  <PageCard title="未来24h水库水情" bg-class="right">
    <div class="page-container">
      <div class="header-title flex items-center mb-[30px]">
        <img src="@/assets/global/images/card-title-icon.png" class="w-[30px] h-[32px] mr-[9px]">
        <span>熊渡水库水位</span>
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

      <div class="reservoir-chart">
        <VueEcharts :option="echartOption" />
      </div>

      <div class="header-title flex items-center mb-[30px]">
        <img src="@/assets/global/images/card-title-icon.png" class="w-[30px] h-[32px] mr-[9px]">
        <span>渠道水位</span>
      </div>

      <div class="reservoir-table">
        <PageTable
          class="rehearsal-table"
          :thead-col="theadCol"
          :data-list="tableDataList"
          :limit-scroll="5"
        >
          <template #siteName="scope">
            <div class="reservoir-table__site">
              <img
                src="@/components/PageTable/assets/index-bg-1.png"
                class="flow-table__site-icon"
              >
              <span>{{ scope.row.siteName }}</span>
            </div>
          </template>
          <template #waterLevel="scope">
            <span class="reservoir-table__value">{{ scope.row.waterLevel }}</span>
            <span class="reservoir-table__unit">m</span>
          </template>
          <template #waterDepth="scope">
            <span class="reservoir-table__value">{{ scope.row.waterDepth }}</span>
            <span class="reservoir-table__unit">m</span>
          </template>
        </PageTable>
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

const getSituationPhotoUrl = (icon: string) => {
  return new URL(`../assets/global/images/situation/SituationPageLeftCard3/${icon}.png`, import.meta.url).href
}

const getWaterPhotoUrl = (icon: string) => {
  return new URL(`../assets/global/images/water/${icon}.png`, import.meta.url).href
}

const reservoirInfo = ref<Record<string, any>>([
  { icon: getSituationPhotoUrl('q1'), name: '总库容', value: 12.3, unit: '万m3' },
  { icon: getWaterPhotoUrl('home-icon'), name: '较上年度', value: 0.8, unit: '万m3' },
  { icon: getSituationPhotoUrl('q2'), name: '较多年同期', value: -2.3, unit: '万m3' }
])
const theadCol = ref([
  {
    key: 'siteName',
    name: '站点',
    width: 230
  },
  {
    key: 'waterLevel',
    name: '水位',
    width: 120,
    align: 'center'
  },
  {
    key: 'waterDepth',
    name: '水深',
    width: 120,
    align: 'center'
  },
  {
    key: 'time',
    name: '时间',
    width: 240,
    align: 'center'
  }
])
const tableDataList = ref<Record<string, any>[]>([
  { siteName: 'XXX站点', waterLevel: 2, waterDepth: 2, time: '26/4/23 10:00' },
  { siteName: 'XXX站点', waterLevel: 1, waterDepth: 1, time: '26/4/22 13:00' },
  { siteName: 'XXX站点', waterLevel: 0, waterDepth: 0, time: '26/4/21 12:00' },
  { siteName: 'XXX站点', waterLevel: 0, waterDepth: 0, time: '26/4/20 9:00' },
  { siteName: 'XXX站点', waterLevel: 0, waterDepth: 0, time: '26/4/20 16:00' }
])

const echartOption = ref({
  tooltip: {
    trigger: 'axis'
  },
  title: {
    text: '水位mm',
    top: 8,
    left: 0,
    textStyle: {
      color: '#FFFFFF',
      fontSize: 20,
      fontWeight: 'normal',
      fontFamily: 'PingFangSC, sans-serif'
    }
  },
  legend: {
    top: 8,
    right: 20,
    itemWidth: 24,
    itemHeight: 8,
    textStyle: {
      color: '#FFFFFF',
      fontSize: 20,
      fontFamily: 'PingFangSC, sans-serif',
      padding: [0, 0, 0, 8]
    },
    data: [{ name: '熊渡水库', icon: 'roundRect' }]
  },
  grid: {
    top: '22%',
    left: '6%',
    right: '6%',
    bottom: '10%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
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
      fontSize: 18,
      fontFamily: 'PingFangSC, sans-serif',
      margin: 18
    },
    data: [] as string[]
  },
  yAxis: {
    type: 'value',
    splitNumber: 3,
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
      name: '熊渡水库',
      data: [] as number[],
      type: 'line',
      smooth: true,
      showSymbol: false,
      lineStyle: {
        color: '#72FF62',
        width: 3
      },
      itemStyle: {
        color: '#72FF62'
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(114, 255, 98, 0.55)' },
            { offset: 1, color: 'rgba(114, 255, 98, 0)' }
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

  let xAxisData = ['12.20', '12.21', '12.22', '12.23', '12.24', '12.25']
  let seriesData = [50.1, 56.1, 53.2, 54.8, 50.5, 56.4]

  if (pageResult.list.length > 0) {
    const echartsResult: any = await service.xfqs.hsybForecastccFindById({
      id: pageResult.list[0].id
    })
    const hsybForecastList =
      echartsResult?.hsybForecastccDdfafExtList?.[0]?.hsybForecastcExtList?.[0]?.hsybForecastList || []

    if (hsybForecastList.length > 0) {
      xAxisData = hsybForecastList.map((item: Record<string, any>) => dayjs(item.tm).format('MM.DD'))
      seriesData = hsybForecastList.map((item: Record<string, any>) => Number(item.z) || 0)
    }
  }

  const currentValue = Number(warnInfoResult?.currntZ) || seriesData[seriesData.length - 1] || 12.3
  const previousYearValue = seriesData.length > 1 ? currentValue - Number(seriesData[seriesData.length - 2] || 0) : 0.8
  const multiYearValue = seriesData.length > 0
    ? currentValue - seriesData.reduce((sum: number, item: number) => sum + item, 0) / seriesData.length
    : -2.3

  reservoirInfo.value[0].value = Number((currentValue || 12.3).toFixed(1))
  reservoirInfo.value[1].value = Number((previousYearValue || 0.8).toFixed(1))
  reservoirInfo.value[2].value = Number((multiYearValue || -2.3).toFixed(1))

  echartOption.value.xAxis.data = xAxisData
  echartOption.value.series[0].data = seriesData

  const dataMin = Math.min(...seriesData)
  const dataMax = Math.max(...seriesData)
  echartOption.value.yAxis.min = Number((dataMin - 3).toFixed(1))
  echartOption.value.yAxis.max = Number((dataMax + 3).toFixed(1))

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

.reservoir-table {
  height: 405px;
}

.reservoir-table__site {
  display: flex;
  align-items: center;
  color: #81e6ff;
  font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
  font-size: 30px;
}

.reservoir-table__site-icon {
  width: 28px;
  height: 28px;
  margin-right: 14px;
}

.reservoir-table__value {
  font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
  font-size: 30px;
}

.reservoir-table__unit {
  margin-left: 6px;
  color: #beeeff;
  font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
  font-size: 24px;
}

.rehearsal-table {
  height: 100%;

  :deep(.table-header__tr) {
    font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
    font-size: 30px;
    font-weight: 500;
  }

  :deep(.table-body__th) {
    font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
    font-size: 30px;
  }

  :deep(.table-body__tr:nth-child(3)) {
    color: #fff;
    background: linear-gradient(0deg, rgb(0 132 255 / 0.52), rgb(30 83 132 / 0.52));
  }

  :deep(.table-body__tr:nth-child(3) .table-body__th),
  :deep(.table-body__tr:nth-child(3) .reservoir-table__site),
  :deep(.table-body__tr:nth-child(3) .reservoir-table__unit) {
    color: #fff;
  }

  :deep(.table-body__tr:nth-child(3):hover) {
    color: #fff;
    background: linear-gradient(0deg, rgb(0 132 255 / 0.52), rgb(30 83 132 / 0.52));
  }
}
</style>
