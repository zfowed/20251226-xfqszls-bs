<template>
  <PageCard title="墒情监测" bg-class="right">
    <div class="page-container">
      <div class="grid grid-cols-3 justify-between gap-row-[63px]">
        <div class="reservoir-item" v-for="(item, index) in reservoirInfo" :key="index">
          <img
            src="@/assets/global/images/situation/reservoir-icon.png"
            class="reservoir-item__icon mr-[14px]"
          >
          <div>
            <div class="reservoir-item__label">
              {{ item.name }}
            </div>
            <div>
              <ZfTweenNumber :value="item.value" class="reservoir-item__value" />
              <span class="reservoir-item__unit">{{ item.unit }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
import { SeededRandom } from 'zf-utilz'

const reservoirInfo = ref<Record<string, any>>([
  { name: '工作温度', value: 0, unit: '℃' },
  { name: '土壤湿度', value: 0, unit: '%' },
  { name: '土壤温度', value: 0, unit: '℃' },
  { name: '测点间距', value: 0, unit: 'cm' },
  { name: '供电电流', value: 0, unit: 'V' },
  { name: '功耗', value: 0, unit: 'W' }
])

usePolling(async () => {
  reservoirInfo.value.forEach((item: any) => {
    item.value = SeededRandom.randomNumber(0, 100)
  })
})
</script>

<style lang="scss" scoped>
.page-container {
  padding: 68px 45px;
}

.reservoir-item {
  display: flex;
  align-items: center;
  font-family: PingFangSC, sans-serif;

  .reservoir-item__label {
    font-size: 30px;
  }

  .reservoir-item__value {
    font-family: Quantico, sans-serif;
    font-size: 32px;
    font-weight: bold;
    color: #50fffc;
  }

  .reservoir-item__unit {
    font-size: 24px;
    color: #beeeff;
  }
}
</style>
