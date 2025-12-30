<template>
  <PageCard title="灌区需水" bg-class="right">
    <div class="page-container">
      <div class="grid grid-cols-[auto_auto_auto] justify-between mb-[90px]">
        <div class="reservoir-item" v-for="(item, index) in reservoirInfo" :key="index">
          <img :src="item.icon" class="reservoir-item__icon mr-[14px]">
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
      <div class="header-title">
        灌溉需水：<ZfTweenNumber :value="totalIrrigationWater" />万m3
      </div>
      <div>
        <div>
          <div v-for="progressItem in progressList" :key="progressItem.id" class="mb-[50px]">
            <div class="progress-item">
              <div class="progress-item__label">
                {{ progressItem.label }}
              </div>
              <div>
                <ZfTweenNumber class="progress-item__value" :value="progressItem.value" />
                <span class="progress-item__unit">t</span>
              </div>
            </div>
            <div class="progress-container mr-[23px]">
              <div class="progress" :style="{'width': progressItem.process + '%'}" />
              <div class="progress-right-side" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
import { SeededRandom } from 'zf-utilz'

const getPhotoUrl = (icon: string) => {
  return new URL(`../assets/global/images/water/${icon}.png`, import.meta.url).href
}

const totalIrrigationWater = ref<number>(0)
const reservoirInfo = ref<Record<string, any>>([
  { icon: getPhotoUrl('reservoir-icon'), name: '农业需水', value: 0, unit: '万m3' },
  { icon: getPhotoUrl('home-icon'), name: '生活需水', value: 0, unit: '万m3' },
  { icon: getPhotoUrl('ecology-icon'), name: '生态需水', value: 0, unit: '万m3' }
])

const progressList = ref<Record<string, any>>([])

usePolling(async () => {
  totalIrrigationWater.value = SeededRandom.randomNumber(300, 800)

  reservoirInfo.value[0].value = SeededRandom.randomNumber(1, 150)
  reservoirInfo.value[1].value = SeededRandom.randomNumber(1, 150)
  reservoirInfo.value[2].value = SeededRandom.randomNumber(1, 150)

  const resultList = []
  for (let i = 0; i < 7; i++) {
    resultList.push({
      id: i,
      label: `西干果直灌区${i + 1}`,
      value: SeededRandom.randomNumber(10, 100),
      process: SeededRandom.randomNumber(0, 100)
    })
  }
  progressList.value = resultList
})

</script>

<style lang="scss" scoped>
.page-container {
  padding: 45px 53px;
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

.header-title {
  position: relative;
  display: flex;
  font-size: 34px;
  color: #FFF;
  margin-bottom: 36px;
  font-family: DINMedium, sans-serif;

  &::after {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: -38px;
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background: url('@/assets/global/images/card-title-icon.png') no-repeat;
    background-position: left center;
  }
}

.progress-container {
  display: flex;
  align-items: center;
  width: 100%;
  height: 10px;
  background-color: #98C1FF36;

  .progress {
    width: 0%;
    height: 10px;
    background: linear-gradient(-90deg, rgb(36 145 200 / 0.4) 0%, #5CE4FF 100%);
    transition: all 0.8s;
    animation: width-transition 1s;

    @keyframes width-transition {
      0% {
        width: 0;
      }

      100% {
        // width: 100%
      }
    }
  }

  .progress-right-side {
    width: 18px;
    height: 18px;
    background: #FFF;
    box-shadow: 0 0 4px 0 #98EEFF;
    border-radius: 100%;
  }
}

.progress-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: PingFangSC, sans-serif;
  margin-bottom: 10px;

  .progress-item__label {
    font-size: 30px;
  }

  .progress-item__value {
    font-family: Quantico, sans-serif;
    font-size: 24px;
    font-weight: bold;
    color: #50FFFC;
    margin-right: 16px;
  }

  .progress-item__unit {
    font-size: 24px;
    color: #BEEEFF;
  }
}
</style>
