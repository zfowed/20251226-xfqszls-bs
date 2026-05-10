<template>
  <PageCard title="墒情预警" bg-class="right">
    <div class="soil-monitor-card">
      <div class="soil-monitor-card__grid">
        <div
          v-for="item in monitorPointList"
          :key="item.id"
          class="soil-monitor-card__item"
        >
          <div class="soil-monitor-card__item-header">
            <img
              :src="item.icon"
              :alt="item.name"
              class="soil-monitor-card__item-icon"
            >
            <div class="soil-monitor-card__item-title">
              {{ item.name }}
            </div>
          </div>

          <div class="soil-monitor-card__item-body">
            <div class="soil-monitor-card__metric">
              <span class="soil-monitor-card__metric-label">墒情监测</span>
              <span class="soil-monitor-card__metric-value soil-monitor-card__metric-value--status">{{ item.status }}</span>
            </div>
            <div class="soil-monitor-card__metric">
              <span class="soil-monitor-card__metric-label">墒情值</span>
              <span class="soil-monitor-card__metric-value">{{ item.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
const soilIcon = new URL('../assets/global/images/situation/reservoir-icon-1.png', import.meta.url).href

const monitorPointList = ref([
  { id: 'monitor-1', name: '墒情监测点#1', status: '正常', value: '67%', icon: soilIcon },
  { id: 'monitor-2', name: '墒情监测点#2', status: '正常', value: '45%', icon: soilIcon },
  { id: 'monitor-3', name: '墒情监测点#3', status: '正常', value: '53%', icon: soilIcon },
  { id: 'monitor-4', name: '墒情监测点#4', status: '正常', value: '76%', icon: soilIcon }
])

usePolling(async () => {
  const result: any = await service.xfqs.getSoilWarnInfo({})
  console.log('墒情预警数据：', result)
})
</script>

<style lang="scss" scoped>
.soil-monitor-card {
  padding: 20px 40px;
}

.soil-monitor-card__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px 26px;
}

.soil-monitor-card__item {
  min-height: 152px;
  background: linear-gradient(180deg, rgb(19 70 116 / 0.82) 0%, rgb(10 45 81 / 0.7) 100%);
  border: 1px solid rgb(112 194 255 / 0.36);
  box-shadow:
    inset 0 0 22px rgb(91 187 255 / 0.12),
    0 0 16px rgb(26 103 152 / 0.16);
}

.soil-monitor-card__item-header {
  display: flex;
  align-items: center;
  min-height: 64px;
  padding: 0 16px 0 14px;
  border-top: 4px solid rgb(105 184 255 / 0.74);
  border-bottom: 1px solid rgb(131 199 255 / 0.28);
  background: linear-gradient(180deg, rgb(18 66 111 / 0.74) 0%, rgb(13 48 84 / 0.4) 100%);
}

.soil-monitor-card__item-icon {
  width: 32px;
  height: 32px;
  margin-right: 10px;
  object-fit: contain;
  opacity: 0.92;
  filter: brightness(2.4) saturate(0) contrast(1.1);
}

.soil-monitor-card__item-title {
  color: #eef9ff;
  font-size: 18px;
  line-height: 1.2;
  font-weight: 600;
  font-family: PingFangSC, sans-serif;
  word-break: break-word;
}

.soil-monitor-card__item-body {
  padding: 10px 16px 12px;
}

.soil-monitor-card__metric {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 38px;
}

.soil-monitor-card__metric-label {
  color: rgb(239 246 255 / 0.92);
  font-size: 18px;
  font-family: PingFangSC, sans-serif;
}

.soil-monitor-card__metric-value {
  color: #45f4ff;
  font-size: 18px;
  font-family: DINAlternate, Arial, sans-serif;
  text-shadow: 0 0 10px rgb(69 244 255 / 0.22);
}

.soil-monitor-card__metric-value--status {
  font-family: PingFangSC, sans-serif;
  font-weight: 600;
}
</style>
