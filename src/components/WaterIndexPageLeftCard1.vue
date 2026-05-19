<template>
  <PageCard title="可供水量" bg-class="left">
    <div class="page-container">
      <div class="grid grid-cols-[auto_auto] justify-between gap-row-[63px]">
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

const reservoirInfo = ref<Record<string, any>>([
  { name: '当前水位', value: 0, unit: 'm' },
  { name: '当前水量', value: 0, unit: 'm³' },
  { name: '入库流量', value: 0, unit: 'm³/s' },
  { name: '出库流量', value: 0, unit: 'm³/s' }
])

usePolling(async () => {
  const result: any = await service.xfqs.findSinlgeRsvrData({
    stcd: 'RV_001'
  })
  reservoirInfo.value[0].value = result[0].z ? result[0].z : 0
  reservoirInfo.value[1].value = result[0].v ? result[0].v : 0
  reservoirInfo.value[2].value = result[0].q ? result[0].q : 0
  reservoirInfo.value[3].value = result[0].otq ? result[0].otq : 0
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
    color: #50fffc;
  }

  .reservoir-item__unit {
    font-size: 24px;
    color: #beeeff;
  }
}
</style>
