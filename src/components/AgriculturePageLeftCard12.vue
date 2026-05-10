<template>
  <PageCard title="作物物候" bg-class="left">
    <div class="agriculture-monitor-card">
      <PageTable
        :thead-col="theadCol"
        :data-list="cropList"
        :index="false"
        class="agriculture-monitor-table"
        :limit-scroll="7"
      >
        <template #icon="scope">
          <div class="agriculture-monitor-table__icon-cell flex items-center justify-center">
            <img
              :src="scope.row.icon"
              :alt="scope.row.name"
              class="agriculture-monitor-table__icon mt-[15px]"
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
  height: 608px;
}

.agriculture-monitor-table {
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
  :deep(.table-body__tr:nth-child(3) .agriculture-monitor-table__water-unit) {
    color: #fff;
  }

  :deep(.table-body__tr:nth-child(3):hover) {
    color: #fff;
    background: linear-gradient(0deg, rgb(0 132 255 / 0.52), rgb(30 83 132 / 0.52));
  }
}

.agriculture-monitor-table__icon {
  width: 42px;
  height: 42px;
}

.agriculture-monitor-table__water-value {
  font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
  font-size: 30px;
}

.agriculture-monitor-table__water-unit {
  color: #beeeff;
  font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
  font-size: 24px;
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
  gap: 6px;
  width: 100%;
}
</style>
