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
        <PageTable
          class="rehearsal-table"
          :thead-col="theadCol"
          :data-list="rankList"
          :index="true"
          :limit-scroll="3"
        >
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
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 30px;
  padding: 0 24px;
}

.water-summary__item {
  display: flex;
  align-items: center;
  min-width: 0;
}

.water-summary__icon {
  width: 100px;
  height: 100px;
  margin-right: 14px;
  flex-shrink: 0;
  object-fit: contain;
  object-position: left center;
}

.water-summary__content {
  display: flex;
  flex-direction: column;
}

.water-summary__label {
  margin-bottom: 21px;
  color: #fff;
  font-size: 30px;
  font-weight: 400;
  line-height: normal;
  font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
  white-space: nowrap;
}

.water-summary__value-row {
  display: flex;
  align-items: flex-end;
}

.water-summary__value {
  color: #50fffc;
  font-size: 32px;
  font-weight: bold;
  line-height: 28px;
  letter-spacing: -2.56px;
  font-family: Quantico, sans-serif;
}

.water-summary__unit {
  margin-left: 4px;
  padding-bottom: 1px;
  color: #beeeff;
  font-size: 24px;
  font-weight: 300;
  line-height: 22px;
  font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
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
  color: #fff;
  font-family: JiangChengHeiTi, 'Alibaba PuHuiTi 2.0', sans-serif;
  font-size: 36px;
  font-weight: 600;
  line-height: 59.61px;
  background: url('@/components/PageTable/assets/index-bg.png') no-repeat;
  background-size: 100% 100%;
}

.water-rank__value {
  font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
  font-size: 30px;
}

.water-rank__unit {
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

  :deep(.table-body__tr:nth-child(3) .water-rank__unit) {
    color: #fff;
  }

  :deep(.table-body__tr:nth-child(3):hover) {
    color: #fff;
    background: linear-gradient(0deg, rgb(0 132 255 / 0.52), rgb(30 83 132 / 0.52));
  }
}
</style>
