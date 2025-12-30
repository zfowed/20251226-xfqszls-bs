<template>
  <PageCard title="可供水量" bg-class="left">
    <div class="page-container">
      <div class="grid grid-cols-2 gap-col-[40px] mb-[70px]">
        <div class="total-banner user-shadow">
          <span>用户名：</span>
          <ZfTweenNumber :value="totalInfo.totalUseWater" />
          个
        </div>
        <div class="total-banner ditch-shadow">
          <span>干支渠：</span>
          <ZfTweenNumber :value="totalInfo.totalDitch" />
          条
        </div>
      </div>
      <div class="grid grid-cols-[auto_auto] justify-between gap-row-[63px]">
        <div class="reservoir-item" v-for="(item, index) in reservoirInfo" :key="index">
          <img src="@/assets/global/images/water/reservoir-icon.png" class="reservoir-item__icon mr-[14px]">
          <div>
            <div class="reservoir-item__label">
              {{ item.name }}
            </div>
            <div class="flex items-baseline">
              <div class="text-[28px]">
                需水量：
              </div>
              <div>
                <ZfTweenNumber :value="item.value" class="reservoir-item__value" />
                <span class="reservoir-item__unit">{{ item.unit }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
import { SeededRandom } from 'zf-utilz'

const totalInfo = reactive({
  totalUseWater: 0,
  totalDitch: 0
})

const reservoirInfo = ref<Record<string, any>>([])

usePolling(async () => {
  totalInfo.totalUseWater = SeededRandom.randomNumber(1000, 5000)
  totalInfo.totalDitch = SeededRandom.randomNumber(500, 3000)

  const resultList = []
  for (let i = 0; i < 6; i++) {
    resultList.push({ name: `巡检工程：${i + 1}`, value: SeededRandom.randomNumber(1, 150), unit: 'mm' })
  }
  reservoirInfo.value = resultList
})

</script>

<style lang="scss" scoped>
.page-container {
  padding: 45px 96px;
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

.total-banner {
  height: 83px;
  line-height: 83px;
  font-family: 'DIN Medium', sans-serif;
  font-size: 30px;
  padding-left: 79px;
  box-sizing: border-box;

  &.user-shadow {
    background: url('@/assets/global/images/water/user-shadow-bg.png') no-repeat center;
    background-size: 100% 100%;
  }

  &.ditch-shadow {
    background: url('@/assets/global/images/water/ditch-shadow-bg.png') no-repeat center;
    background-size: 100% 100%;
  }
}

</style>
