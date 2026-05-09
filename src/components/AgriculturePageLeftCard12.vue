<template>
  <PageCard title="作物物候" bg-class="left">
    <div class="agriculture-monitor-card">
      <div class="agriculture-monitor-table">
        <div class="agriculture-monitor-table__header">
          <div class="agriculture-monitor-table__icon-column" />
          <div
            v-for="column in tableColumns"
            :key="column.key"
            :class="['agriculture-monitor-table__header-cell', `agriculture-monitor-table__header-cell--${column.key}`]"
          >
            {{ column.label }}
          </div>
        </div>

        <div
          v-for="item in cropList"
          :key="item.name"
          class="agriculture-monitor-table__row"
        >
          <div class="agriculture-monitor-table__icon-column agriculture-monitor-table__icon-column--row">
            <img
              :src="item.icon"
              :alt="item.name"
              class="agriculture-monitor-table__icon"
            >
          </div>
          <div class="agriculture-monitor-table__cell agriculture-monitor-table__cell--name">
            {{ item.name }}
          </div>
          <div class="agriculture-monitor-table__cell agriculture-monitor-table__cell--date">
            {{ item.sowingDate }}
          </div>
          <div class="agriculture-monitor-table__cell agriculture-monitor-table__cell--stage">
            {{ item.growthStage }}
          </div>
          <div class="agriculture-monitor-table__cell agriculture-monitor-table__cell--water">
            <span class="agriculture-monitor-table__water-value">{{ item.dailyWater }}</span>
            <span class="agriculture-monitor-table__water-unit">{{ item.waterUnit }}</span>
          </div>
        </div>
      </div>
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

const tableColumns = [
  { key: 'name', label: '种类' },
  { key: 'date', label: '播种时间' },
  { key: 'stage', label: '生长阶段' },
  { key: 'water', label: '日需水量' }
]

const cropList = ref<CropItem[]>([
  { icon: getPhotoUrl('rice'), name: '水稻', sowingDate: '26/5/12', growthStage: '黄熟期', dailyWater: '10.21', waterUnit: '万m³' },
  { icon: getPhotoUrl('rice'), name: '中稻', sowingDate: '26/5/12', growthStage: '黄熟期', dailyWater: '10.21', waterUnit: '万m³' },
  { icon: getPhotoUrl('rice'), name: '晚稻', sowingDate: '26/5/12', growthStage: '黄熟期', dailyWater: '10.21', waterUnit: '万m³' },
  { icon: getPhotoUrl('corn'), name: '玉米', sowingDate: '26/5/12', growthStage: '黄熟期', dailyWater: '10.21', waterUnit: '万m³' },
  { icon: getPhotoUrl('rapeseed'), name: '油菜', sowingDate: '26/5/12', growthStage: '生苗期', dailyWater: '10.21', waterUnit: '万m³' },
  { icon: getPhotoUrl('wheat'), name: '小麦', sowingDate: '26/5/12', growthStage: '生苗期', dailyWater: '10.21', waterUnit: '万m³' }
])
</script>

<style lang="scss" scoped>
.agriculture-monitor-card {
  padding: 26px 34px 18px;
}

.agriculture-monitor-table {
  border: 1px solid rgb(132 196 255 / 0.35);
  background:
    linear-gradient(180deg, rgb(10 47 82 / 0.66) 0%, rgb(8 33 58 / 0.38) 100%);
  box-shadow: inset 0 0 24px rgb(110 186 255 / 0.12);
}

.agriculture-monitor-table__header,
.agriculture-monitor-table__row {
  display: grid;
  grid-template-columns: 92px 1.05fr 1fr 1fr 1.15fr;
  align-items: center;
}

.agriculture-monitor-table__header {
  min-height: 66px;
  background: linear-gradient(180deg, rgb(12 53 96 / 0.88) 0%, rgb(8 38 74 / 0.72) 100%);
  border-bottom: 1px solid rgb(156 218 255 / 0.3);
}

.agriculture-monitor-table__row {
  min-height: 68px;
  border-bottom: 1px solid rgb(156 218 255 / 0.2);
}

.agriculture-monitor-table__row:last-child {
  border-bottom: none;
}

.agriculture-monitor-table__icon-column,
.agriculture-monitor-table__header-cell,
.agriculture-monitor-table__cell {
  display: flex;
  align-items: center;
}

.agriculture-monitor-table__icon-column {
  justify-content: center;
}

.agriculture-monitor-table__icon-column--row {
  padding-left: 6px;
}

.agriculture-monitor-table__header-cell {
  font-family: PingFangSC, sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #f0fbff;
  letter-spacing: 1px;
}

.agriculture-monitor-table__cell {
  font-family: PingFangSC, sans-serif;
  font-size: 18px;
  color: rgb(255 255 255 / 0.92);
}

.agriculture-monitor-table__cell--name {
  font-size: 20px;
  font-weight: 600;
}

.agriculture-monitor-table__cell--water {
  justify-content: flex-start;
  gap: 8px;
}

.agriculture-monitor-table__icon {
  width: 36px;
  height: 36px;
  object-fit: contain;
  filter: drop-shadow(0 0 8px rgb(154 245 255 / 0.45));
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
</style>
