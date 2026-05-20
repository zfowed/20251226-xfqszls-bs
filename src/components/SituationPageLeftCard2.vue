<template>
  <PageCard bg-class="left">
    <template #title>
      <div class="card-title">
        <span
          class="card-title__tab"
          :class="{ 'card-title__tab--active': currentMonitorType === 'rainfall' }"
          @click="switchMonitorType('rainfall')"
        >降雨监测</span>
        <!-- <span class="card-title__divider">/</span>
        <span
          class="card-title__tab"
          :class="{ 'card-title__tab--active': currentMonitorType === 'weather' }"
          @click="switchMonitorType('weather')"
        >气象监测</span> -->
      </div>
    </template>

    <div class="page-container">
      <div class="rain-summary">
        <div
          v-for="item in currentSummaryList"
          :key="item.key"
          class="rain-summary__item"
        >
          <img :src="item.icon" :alt="item.name" class="rain-summary__icon">
          <div class="rain-summary__content">
            <div class="rain-summary__label">
              {{ item.name }}
            </div>
            <div class="rain-summary__value-row">
              <ZfTweenNumber :value="item.value" class="rain-summary__value" />
              <span class="rain-summary__unit">{{ item.unit }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="rain-rank">
        <PageTable
          class="rehearsal-table"
          :thead-col="currentTheadCol"
          :data-list="currentRankList"
          :index="true"
          :limit-scroll="5"
        >
          <template #index="scope">
            <div class="table-index">
              {{ scope.index }}
            </div>
          </template>
          <template #metricValue1="scope">
            <div class="rain-rank__value-cell">
              <ZfTweenNumber
                :value="scope.row.metricValue1"
                class="rain-rank__value"
              />
              <span class="rain-rank__unit">{{ scope.row.unit }}</span>
            </div>
          </template>
          <template #metricValue2="scope">
            <div class="rain-rank__value-cell">
              <ZfTweenNumber
                :value="scope.row.metricValue2"
                class="rain-rank__value"
              />
              <span class="rain-rank__unit">{{ scope.row.unit2 || scope.row.unit }}</span>
            </div>
          </template>
        </PageTable>
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
// import dayjs from 'dayjs'

interface SummaryItem {
  key: string
  name: string
  value: number
  unit: string
  icon: string
}

interface MonitorRankItem {
  id: string
  name: string
  metricValue1: number
  metricValue2: number
  unit: string
  unit2?: string
}

const getPhotoUrl = (icon: string) => {
  return new URL(
    `../assets/global/images/situation/SituationPageLeftCard2/${icon}.png`,
    import.meta.url
  ).href
}

const currentMonitorType = ref<'rainfall' | 'weather'>('rainfall')

const rainfallSummaryList = ref<SummaryItem[]>([
  { key: 'maxRainfall', name: '最大降雨', value: 0, unit: 'mm', icon: getPhotoUrl('w1') },
  { key: 'currentRainfall', name: '当前降雨', value: 0, unit: 'mm', icon: getPhotoUrl('w1') },
  { key: 'totalRainfall', name: '累计降雨', value: 0, unit: 'mm', icon: getPhotoUrl('w1') }
])
const weatherSummaryList = ref<SummaryItem[]>([
  { key: 'maxTemp', name: '最高气温', value: 0, unit: '℃', icon: getPhotoUrl('w1') },
  { key: 'currentTemp', name: '当前气温', value: 0, unit: '℃', icon: getPhotoUrl('w1') },
  { key: 'humidity', name: '空气湿度', value: 0, unit: '%', icon: getPhotoUrl('w1') }
])
const currentSummaryList = computed(() => {
  return currentMonitorType.value === 'rainfall'
    ? rainfallSummaryList.value
    : weatherSummaryList.value
})

const rainfallTheadCol = ref([
  {
    key: 'name',
    name: '站点'
  },
  {
    key: 'metricValue1',
    name: '时段累计降雨量',
    width: 220,
    align: 'center'
  },
  {
    key: 'metricValue2',
    name: '最大小时降雨量',
    width: 220,
    align: 'center'
  }
])
const weatherTheadCol = ref([
  {
    key: 'name',
    name: '日期'
  },
  {
    key: 'metricValue1',
    name: '最低气温',
    width: 220,
    align: 'center'
  },
  {
    key: 'metricValue2',
    name: '最高气温',
    width: 220,
    align: 'center'
  }
])
const currentTheadCol = computed(() => {
  return currentMonitorType.value === 'rainfall'
    ? rainfallTheadCol.value
    : weatherTheadCol.value
})

const rainfallRankList = ref<MonitorRankItem[]>([
  { id: 'rain-1', name: 'XXX站点', metricValue1: 9.97, metricValue2: 9.97, unit: 'mm' },
  { id: 'rain-2', name: 'XXX站点', metricValue1: 3.36, metricValue2: 3.36, unit: 'mm' },
  { id: 'rain-3', name: 'XXX站点', metricValue1: 3.18, metricValue2: 3.18, unit: 'mm' },
  { id: 'rain-4', name: 'XXX站点', metricValue1: 3.46, metricValue2: 3.46, unit: 'mm' },
  { id: 'rain-5', name: 'XXX站点', metricValue1: 3.46, metricValue2: 3.46, unit: 'mm' }
])
const weatherRankList = ref<MonitorRankItem[]>([
  { id: 'weather-1', name: '05-08', metricValue1: 18, metricValue2: 27, unit: '℃' },
  { id: 'weather-2', name: '05-09', metricValue1: 19, metricValue2: 28, unit: '℃' },
  { id: 'weather-3', name: '05-10', metricValue1: 20, metricValue2: 29, unit: '℃' },
  { id: 'weather-4', name: '05-11', metricValue1: 18, metricValue2: 26, unit: '℃' },
  { id: 'weather-5', name: '05-12', metricValue1: 17, metricValue2: 25, unit: '℃' }
])
const currentRankList = computed(() => {
  return currentMonitorType.value === 'rainfall'
    ? rainfallRankList.value
    : weatherRankList.value
})

const switchMonitorType = (type: 'rainfall' | 'weather') => {
  currentMonitorType.value = type
}

const toNumber = (value: unknown) => {
  const numberValue = Number(value)
  return Number.isFinite(numberValue) ? numberValue : 0
}

const getAverage = (list: number[]) => {
  if (!list.length) return 0

  return list.reduce((sum, value) => sum + value, 0) / list.length
}

usePolling(async () => {
  const result: any = await service.xfqs.getPptnPage({
    start: 1,
    limit: 1000,
    sttp: 'MM'
  })

  const rainfallList = Array.isArray(result?.list) ? result.list : []
  if (!rainfallList.length) return

  const periodRainfallList = rainfallList.map((item: Record<string, any>) => toNumber(item.drp))
  const currentRainfallList = rainfallList.map((item: Record<string, any>) => toNumber(item.dyp))
  const totalRainfallList = rainfallList.map((item: Record<string, any>) => toNumber(item.accp))

  rainfallSummaryList.value[0].value = Number(Math.max(...periodRainfallList).toFixed(2))
  rainfallSummaryList.value[1].value = Number(getAverage(currentRainfallList).toFixed(2))
  rainfallSummaryList.value[2].value = Number(totalRainfallList.reduce((sum: number, value: number) => sum + value, 0).toFixed(2))

  rainfallRankList.value = rainfallList.map((item: Record<string, any>, index: number) => ({
    id: String(item.id || item.stcd || `rain-${index + 1}`),
    name: item.stnm || `雨量站${index + 1}`,
    metricValue1: Number(toNumber(item.drp).toFixed(2)),
    metricValue2: Number(toNumber(item.dyp).toFixed(2)),
    unit: 'mm'
  }))
})
</script>

<style lang="scss" scoped>
.page-container {
  padding: 26px 12px 0;
}

.card-title {
  display: flex;
  align-items: center;
  font-family: DINMedium, sans-serif;
}

.card-title__tab {
  cursor: pointer;
  transition: color 0.2s ease, -webkit-text-fill-color 0.2s ease;
  position: relative;
  color: #eeeeee69;
  font-size: 52px;
  font-weight: bold;
  font-family: DINAlternateBold, sans-serif;
  background-image: linear-gradient(to bottom, #eeeeee69 20%, #eeeeee69 81%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.card-title__tab--active {
  color: #f7faff;
  background-image: linear-gradient(to bottom, #91dcff 20%, #fff 81%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 1px 3px rgb(5 12 25 / 0.6)) drop-shadow(0 0 7px rgb(75 180 229 / 0.69));
}

.card-title__divider {
  margin: 0 10px;
  color: rgb(155 211 255 / 0.52);
  font-size: 34px;
  background-image: none;
  background-clip: border-box;
  -webkit-text-fill-color: rgb(155 211 255 / 0.52);
}

.rain-summary {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 30px;
  padding: 0 24px;
}

.rain-summary__item {
  display: flex;
  align-items: center;
  min-width: 0;
}

.rain-summary__icon {
  width: 100px;
  height: 100px;
  margin-right: 14px;
  flex-shrink: 0;
  object-fit: contain;
  object-position: left center;
}

.rain-summary__content {
  display: flex;
  flex-direction: column;
}

.rain-summary__label {
  margin-bottom: 21px;
  color: #fff;
  font-size: 30px;
  font-weight: 400;
  line-height: normal;
  font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
  white-space: nowrap;
}

.rain-summary__value-row {
  display: flex;
  align-items: flex-end;
}

.rain-summary__value {
  color: #50fffc;
  font-size: 32px;
  font-weight: bold;
  line-height: 28px;
  letter-spacing: -2.56px;
  font-family: Quantico, sans-serif;
}

.rain-summary__unit {
  margin-left: 4px;
  padding-bottom: 1px;
  color: #beeeff;
  font-size: 24px;
  font-weight: 300;
  line-height: 22px;
  font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
}

.rain-rank {
  height: 525px;
}

.table-index {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 49.68px;
  height: 59.61px;
  color: #fff;
  font-family: JiangChengHeiTi, 'Alibaba PuHuiTi 2.0', sans-serif;
  font-size: 36px;
  font-weight: 600;
  line-height: 59.61px;
  background: url('@/components/PageTable/assets/index-bg.png') no-repeat;
  background-size: 100% 100%;
}

.rain-rank__value-cell {
  display: flex;
  align-items: baseline;
  justify-content: center;
}

.rain-rank__value {
  font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
  font-size: 30px;
}

.rain-rank__unit {
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

  :deep(.table-body__tr:nth-child(3) .table-body__th) {
    color: #fff;
  }

  :deep(.table-body__tr:nth-child(3) .rain-rank__unit) {
    color: #fff;
  }

  :deep(.table-body__tr:nth-child(3):hover) {
    color: #fff;
    background: linear-gradient(0deg, rgb(0 132 255 / 0.52), rgb(30 83 132 / 0.52));
  }
}
</style>
