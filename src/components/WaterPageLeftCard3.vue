<template>
  <PageCard title="配水调度" bg-class="left">
    <div class="page-container">
      <div class="h-[557px] overflow-y-auto">
        <div class="dispatch-item" v-for="item in dataList" :key="item.id">
          <div class="dispatch-item__header">
            <img src="@/assets/global/images/card-title-icon.png" class="w-[30px] h-[32px] mr-[9px]">
            <span>{{ item.name }}</span>
          </div>
          <div class="dispatch-item__content">
            <div>灌溉面积：<ZfTweenNumber :value="item.area" />亩</div>
            <div>灌溉总量：<ZfTweenNumber :value="item.total" />万m3</div>
          </div>
        </div>
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
import { SeededRandom } from 'zf-utilz'

const dataList = ref<Record<string, any>>([])

usePolling(async () => {
  const resultList = []
  for (let i = 0; i < 6; i++) {
    resultList.push({ id: i, name: `方案${i + 1}`, area: SeededRandom.randomNumber(1, 150), total: SeededRandom.randomNumber(1, 150) })
  }
  dataList.value = resultList
})

</script>

<style lang="scss" scoped>
.page-container {
  padding: 35px 30px 60px;
  overflow: hidden;
}

.dispatch-item {
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }

  .dispatch-item__header,
  .dispatch-item__content {
    position: relative;
    height: 90px;
    display: flex;
    align-items: center;
    padding: 0 30px;
    font-size: 30px;
    font-family: PingFangSC, sans-serif;
    border: 1px solid #527191;
  }

  .dispatch-item__header {
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
    justify-content: space-between;

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
