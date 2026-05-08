<template>
  <PageCard title="水量统计" bg-class="left">
    <div class="page-container">
      <div class="water-summary">
        <div v-for="item in summaryList" :key="item.key" class="water-summary__item">
          <img :src="item.icon" :alt="item.name" class="water-summary__icon">
          <div class="water-summary__content">
            <div class="water-summary__label">
              {{ item.name }}
            </div>
            <div class="water-summary__value-row">
              <ZfTweenNumber :value="item.value" class="water-summary__value" />
              <span class="water-summary__unit">{{ item.unit }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="water-rank">
        <PageTable :thead-col="theadCol" :data-list="rankList" :index="true" :limit-scroll="3">
          <template #index="scope">
            <div class="table-index">
              {{ scope.index }}
            </div>
          </template>
          <template #value="scope">
            <ZfTweenNumber :value="scope.row.value" class="water-rank__value" />
            <span class="water-rank__unit">{{ scope.row.unit }}</span>
          </template>
        </PageTable>
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
interface SummaryItem {
  key: string
  name: string
  value: number
  unit: string
  icon: string
}

interface RankItem {
  id: string
  name: string
  value: number
  unit: string
}

const getPhotoUrl = (icon: string) => {
  return new URL(`../assets/global/images/situation/SituationPageLeftCard3/${icon}.png`, import.meta.url).href
}

const summaryList = ref<SummaryItem[]>([
  { key: 'irrigation', name: '灌溉用水', value: 0, unit: '万m3', icon: getPhotoUrl('q1') },
  { key: 'ecology', name: '生态用水', value: 0, unit: '万m3', icon: getPhotoUrl('q2') }
])
const theadCol = ref([
  {
    key: 'name',
    name: '用水户'
  },
  {
    key: 'value',
    name: '最大小时降雨量',
    width: 240,
    align: 'center'
  }
])

const rankList = ref<RankItem[]>([
  { id: 'rank-1', name: 'XXX行政村', value: 1.97, unit: '万m3' },
  { id: 'rank-2', name: 'XXX行政村', value: 2.36, unit: '万m3' },
  { id: 'rank-3', name: 'XXX行政村', value: 4.18, unit: '万m3' }
])

const getNumberByKeys = (source: Record<string, any>, keys: string[]) => {
  for (const key of keys) {
    const value = Number(source?.[key])
    if (!Number.isNaN(value) && Number.isFinite(value)) {
      return value
    }
  }
  return 0
}

usePolling(async () => {
  const [waterUserResult, ecologyResult] = await Promise.all([
    service.xfqs.findWaterUserList({}),
    service.xfqs.getFactoryRealData({})
  ])

  const waterUserList = (waterUserResult?.list || []).map((item: Record<string, any>, index: number) => ({
    id: item.id || item.stcd || `water-user-${index}`,
    name: item.name || item.villagename || item.xzqmc || item.adnm || 'XXX行政村',
    value: getNumberByKeys(item, ['stw', 'water', 'supplyWater', 'maxWater', 'area']) / 100,
    unit: '万m3'
  }))

  const ecologyList = ecologyResult?.list || ecologyResult?.data || []

  const irrigationTotal = waterUserList.reduce((sum: number, item: RankItem) => sum + item.value, 0)
  const ecologyTotal = ecologyList.reduce((sum: number, item: Record<string, any>) => {
    return sum + getNumberByKeys(item, ['stw', 'water', 'supplyWater', 'flow'])
  }, 0) / 100

  summaryList.value[0].value = Number(irrigationTotal.toFixed(2))
  summaryList.value[1].value = Number(ecologyTotal.toFixed(2))

  if (waterUserList.length > 0) {
    rankList.value = waterUserList
      .sort((prev, next) => next.value - prev.value)
      .slice(0, 3)
      .map((item, index) => ({
        ...item,
        id: item.id || `rank-${index + 1}`,
        name: item.name || 'XXX行政村'
      }))
  }
})
</script>

<style lang="scss" scoped>
.page-container {
  padding: 30px 8px 0;
}

.water-summary {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 28px;
  margin-bottom: 34px;
  padding: 0 22px;
}

.water-summary__item {
  display: flex;
  align-items: center;
}

.water-summary__icon {
  width: 74px;
  height: 84px;
  margin-right: 16px;
  flex-shrink: 0;
}

.water-summary__content {
  display: flex;
  flex-direction: column;
}

.water-summary__label {
  margin-bottom: 8px;
  color: #fff;
  font-size: 26px;
  line-height: 1;
  font-family: PingFangSC, sans-serif;
}

.water-summary__value-row {
  display: flex;
  align-items: baseline;
}

.water-summary__value {
  color: #50fffc;
  font-size: 24px;
  line-height: 1;
  font-weight: bold;
  font-family: Quantico, sans-serif;
  text-shadow: 0 0 12px rgb(80 255 252 / 0.35);
}

.water-summary__unit {
  margin-left: 10px;
  color: #d8edff;
  font-size: 20px;
  font-family: PingFangSC, sans-serif;
}

.water-rank {
  height: 350px;
}

.table-index {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 49.68px;
  height: 59.61px;
  line-height: 59.61px;
  color: #fff;
  font-size: 40px;
  font-weight: bold;
  background: url('@/components/PageTable/assets/index-bg.png') no-repeat;
  background-size: 100% 100%;
}

.water-rank__value {
  color: #50fffc;
  font-size: 22px;
  font-weight: bold;
  font-family: Quantico, sans-serif;
}

.water-rank__unit {
  margin-left: 10px;
  color: #d8edff;
  font-size: 18px;
  font-family: PingFangSC, sans-serif;
}
</style>
