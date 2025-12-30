<template>
  <PageCard title="可供水量" bg-class="left">
    <div class="page-container">
      <div class="grid grid-cols-[auto_auto] justify-between gap-row-[63px]">
        <div class="reservoir-item" v-for="(item, index) in reservoirInfo" :key="index">
          <img src="@/assets/global/images/situation/reservoir-icon.png" class="reservoir-item__icon mr-[14px]">
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
  { name: '总降雨', value: 0, unit: 'mm' },
  { name: '总来水量', value: 0, unit: 'mm' },
  { name: '当前水库水位', value: 0, unit: 'mm' },
  { name: '当前需水量', value: 0, unit: 'mm' }
])

usePolling(async () => {
  reservoirInfo.value[0].value = SeededRandom.randomNumber(1, 150)
  reservoirInfo.value[1].value = SeededRandom.randomNumber(1, 150)
  reservoirInfo.value[2].value = SeededRandom.randomNumber(1, 150)
  reservoirInfo.value[3].value = SeededRandom.randomNumber(1, 150)
})

</script>

<style lang="scss" scoped>
.page-container {
  padding: 68px 96px;
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
    color: #50FFFC;
  }

  .reservoir-item__unit {
    font-size: 24px;
    color: #BEEEFF;
  }
}

</style>
