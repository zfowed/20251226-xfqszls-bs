<template>
  <PageCard title="供水统计" bg-class="left">
    <div class="page-container">
      <div class="grid grid-cols-[auto_auto_auto] justify-between mb-[50px] px-[23px]">
        <div class="reservoir-item" v-for="(item, index) in reservoirInfo" :key="index">
          <img src="@/assets/global/images/water/water-icon.png" class="reservoir-item__icon mr-[14px]">
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
      <div class="h-[1100px] overflow-y-auto">
        <div class="dispatch-item" v-for="item in dataList" :key="item.id">
          <div class="dispatch-item__header">
            <img src="@/assets/global/images/card-title-icon.png" class="w-[30px] h-[32px] mr-[9px]">
            <span>用水户：{{ item.name }}</span>
          </div>
          <div class="dispatch-item__content">
            <div class="flex flex-col items-center">
              <img src="@/assets/global/images/water/day-water-icon.png" class="mb-[9px]">
              <div class="mb-[9px]">
                当日供水
              </div>
              <div><ZfTweenNumber :value="item.daySupplyW === '' ? 0 : Number(item.daySupplyW)" />m3/s</div>
            </div>
            <div class="flex flex-col items-center">
              <img src="@/assets/global/images/water/month-water-icon.png" class="mb-[9px]">
              <div class="mb-[9px]">
                当月供水
              </div>
              <div><ZfTweenNumber :value="item.mthSupplyW === '' ? 0 : Number(item.mthSupplyW)" />m3/s</div>
            </div>
            <div class="flex flex-col items-center">
              <img src="@/assets/global/images/water/year-water-icon.png" class="mb-[9px]">
              <div class="mb-[9px]">
                当年供水
              </div>
              <div><ZfTweenNumber :value="item.yrSupplyW === '' ? 0 : Number(item.yrSupplyW)" />m3/s</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">

const dataList = ref<Record<string, any>>([])

const reservoirInfo = ref<Record<string, any>>([
  { name: '当日供水', value: 0, unit: 'm3' },
  { name: '当月供水', value: 0, unit: 'm3' },
  { name: '当年供水', value: 0, unit: 'm3' }
])

usePolling(async () => {
  const result: any = await service.xfqs.getGongshuiInfo({})
  reservoirInfo.value[0].value = Number(result.data.dayTotalW)
  reservoirInfo.value[1].value = Number(result.data.mthTotalW)
  reservoirInfo.value[2].value = Number(result.data.yrTotalW)

  dataList.value = result.data.list
})

</script>

<style lang="scss" scoped>
.page-container {
  padding: 35px 30px;
  overflow: hidden;
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

.dispatch-item {
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }

  .dispatch-item__header,
  .dispatch-item__content {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 30px;
    font-size: 28px;
    font-family: PingFangSC, sans-serif;
    border: 1px solid #527191;
  }

  .dispatch-item__header {
    height: 90px;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(180deg, #1E5384 0%, #0084FF 100%);
      opacity: 0.52;
      z-index: -1;
    }
  }

  .dispatch-item__content {
    border-top: none;
    justify-content: space-around;
    padding: 18px 0;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgb(19 79 135 / 0.2);
      z-index: -1;
    }
  }
}

</style>
