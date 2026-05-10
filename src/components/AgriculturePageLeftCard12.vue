<template>
  <PageCard title="作物物候" bg-class="left">
    <div class="agriculture-monitor-card">
      <PageTable
        :thead-col="theadCol"
        :data-list="cropList"
        :index="false"
        class="agriculture-monitor-table"
      >
        <template #icon="scope">
          <div class="agriculture-monitor-table__icon-cell flex items-center justify-center">
            <img
              :src="scope.row.icon"
              :alt="scope.row.name"
              class="agriculture-monitor-table__icon mt-[10px]"
            >
          </div>
        </template>
        <template #water="scope">
          <div class="agriculture-monitor-table__water-cell">
            <span class="agriculture-monitor-table__water-value">{{ scope.row.dailyWater }}</span>
            <span class="agriculture-monitor-table__water-unit">{{ scope.row.waterUnit }}</span>
          </div>
        </template>
      </PageTable>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
type CropItem = {
  icon: string
  name: string
  sowingDate: string
  growthStage: string
  dailyWater: string
  waterUnit: string
}

const getPhotoUrl = (icon: string) => {
  return new URL(`../assets/global/images/flood/${icon}.png`, import.meta.url).href
}

const cropIconMap: Record<string, string> = {
  水稻: 'rice-icon',
  早稻: 'rice-icon',
  中稻: 'rice-icon',
  晚稻: 'rice-icon',
  玉米: 'corn-icon',
  油菜: 'rapeseed-icon',
  小麦: 'wheat-icon'
}

const theadCol = ref([
  { key: 'icon', name: '', width: 92, align: 'center' },
  { key: 'name', name: '种类', width: 160, align: 'left' },
  { key: 'sowingDate', name: '播种时间', width: 160, align: 'center' },
  { key: 'growthStage', name: '生长阶段', width: 150, align: 'center' },
  { key: 'water', name: '日需水量', width: 180, align: 'left' }
])

const cropList = ref<CropItem[]>([
  { icon: getPhotoUrl('rice'), name: '水稻', sowingDate: '26/5/12', growthStage: '黄熟期', dailyWater: '10.21', waterUnit: '万m³' },
  { icon: getPhotoUrl('rice'), name: '中稻', sowingDate: '26/5/12', growthStage: '黄熟期', dailyWater: '10.21', waterUnit: '万m³' },
  { icon: getPhotoUrl('rice'), name: '晚稻', sowingDate: '26/5/12', growthStage: '黄熟期', dailyWater: '10.21', waterUnit: '万m³' },
  { icon: getPhotoUrl('corn'), name: '玉米', sowingDate: '26/5/12', growthStage: '黄熟期', dailyWater: '10.21', waterUnit: '万m³' },
  { icon: getPhotoUrl('rapeseed'), name: '油菜', sowingDate: '26/5/12', growthStage: '生苗期', dailyWater: '10.21', waterUnit: '万m³' },
  { icon: getPhotoUrl('wheat'), name: '小麦', sowingDate: '26/5/12', growthStage: '生苗期', dailyWater: '10.21', waterUnit: '万m³' }
])

usePolling(async () => {
  const result: any = await service.xfqs.getShortPosition({
    time: '2026-04-29'
  })

  const firstPosition = Array.isArray(result) ? result[0] : result
  const firstDay = Array.isArray(firstPosition?.list) ? firstPosition.list[0] : null
  const data = Array.isArray(firstDay?.data) ? firstDay.data : []
  if (data.length === 0) return

  cropList.value = data.map((item: Record<string, any>) => {
    const cropName = item.crop || '--'
    const icon = cropIconMap[cropName] || 'rice'
    return {
      icon: getPhotoUrl(icon),
      name: cropName,
      sowingDate: item.time || firstDay?.time || '--',
      growthStage: '--',
      dailyWater: String(item.water ?? 0),
      waterUnit: '万m³'
    }
  })
})
</script>

<style lang="scss" scoped>
.agriculture-monitor-card {
  padding: 26px 34px 18px;
  height: 488px;
}

.agriculture-monitor-table {
  height: 100%;
}

.agriculture-monitor-table__icon {
  width: 50px;
  height: 50px;
}

.agriculture-monitor-table__water-value {
  font-family: DINAlternate, Arial, sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #4cf3ff;
  text-shadow: 0 0 10px rgb(76 243 255 / 0.32);
}

.agriculture-monitor-table__water-unit {
  font-size: 16px;
  color: rgb(218 245 255 / 0.8);
}

.agriculture-monitor-table__icon-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.agriculture-monitor-table__water-cell {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  width: 100%;
}
</style>
