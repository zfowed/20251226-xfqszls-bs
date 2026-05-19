<template>
  <PageCard title="监测数据" bg-class="left">
    <div class="page-container">
      <div class="h-[1410px] overflow-y-auto">
        <div class="dispatch-item" v-for="(item, index) in dataList" :key="item.id">
          <div class="dispatch-item__header">
            <div>
              <img src="@/assets/global/images/card-title-icon.png" class="w-[30px] h-[32px] mr-[9px]">
              <span>{{ index + 1 }}. {{ item.name }}</span>
            </div>
            <div>{{ item.date }}</div>
          </div>
          <div class="dispatch-item__content">
            <div>
              <span>蓄水量 ：</span>
              <span>
                <ZfTweenNumber :value="item.value1 === '' ? 0 : Number(item.value1)" />
                m³/s
              </span>
            </div>
            <div>
              <span>库水位：</span>
              <span>
                <ZfTweenNumber :value="item.value2 === '' ? 0 : Number(item.value2)" />
                m³/s
              </span>
            </div>
          </div>
          <div class="dispatch-item__content">
            <div>
              <span>入库流量：</span>
              <span>
                <ZfTweenNumber :value="item.in === '' ? 0 : Number(item.in)" />
                m³/s
              </span>
            </div>
            <div>
              <span>出库流量：</span>
              <span>
                <ZfTweenNumber :value="item.out === '' ? 0 : Number(item.out)" />
                m³/s
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { SeededRandom } from 'zf-utilz'

const dataList = ref<Record<string, any>>([])
usePolling(async () => {
  for (let i = 0; i < 10; i++) {
    dataList.value.push({
      id: i,
      name: `水库${i + 1}`,
      date: dayjs().subtract(i, 'day').format('YYYY-MM-DD HH:mm:ss'),
      value1: SeededRandom.randomNumber(100, 200),
      value2: SeededRandom.randomNumber(100, 200),
      in: SeededRandom.randomNumber(100, 200),
      out: SeededRandom.randomNumber(100, 200)
    })
  }
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
    justify-content: space-between;

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
