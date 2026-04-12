<template>
  <PageCard title="工程巡查" bg-class="left">
    <div class="page-container">
      <div class="app-table mb-[35px]">
        <div class="table-header">
          <div
            class="sluice-btns"
            :class="{ active: item.active }"
            v-for="item in sluiceBtns"
            :key="item.id"
            @click="clickSluiceHandle(item)"
          >
            <img :src="item.icon" class="mr-[20px]">
            <span :class="item.active ? 'text-white' : 'text-[#9BA7B3]'">{{
              item.name
            }}</span>
          </div>
        </div>
      </div>
      <!-- 分割 -->

      <div class="h-[425px] flex mb-[70px]">
        <VideoPlay
          :src="monitorUrl"
          :controls="true"
          :muted="true"
          :loop="false"
          ratio="16:9"
          empty-text="正在加载中"
          class="flex-1 mr-[16px]"
        />
      </div>

      <!-- 分割 -->
      <div class="header-title">
        灌区概述
      </div>
      <div class="app-table mb-[35px]">
        <div class="table-tbody">
          <div v-for="item in sluiceList1" :key="item.id" class="table-tbody__tr">
            <div class="sluice-item">
              <div class="cricle" :class="item.type" />
              <div class="sluice-item__title">
                {{ item.name }}
              </div>
              <div class="sluice-item__value">
                <ZfTweenNumber :value="item.value" />
              </div>
              <span class="sluice-item__unit">{{ item.unit }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="h-[443px] mt-[151px]">
        <VueEcharts :option="echartOption" />
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
import { SeededRandom } from 'zf-utilz'

const getPhotoUrl = (icon: string) => {
  return new URL(`../assets/global/images/preview/${icon}.png`, import.meta.url).href
}

// 水源工程
const sluiceList1 = ref<Record<string, any>[]>([
  { id: 'sluiceList1', name: '监测测点数量', type: 'normal', value: 0, unit: '个' },
  { id: 'sluiceList2', name: '预警监测数量', type: 'error', value: 0, unit: '个' }
])

const sluiceBtns = ref<Record<string, any>[]>([
  { id: 'sluice1', icon: getPhotoUrl('sluice-icon-2'), name: '坝体结构', active: true },
  { id: 'sluice2', icon: getPhotoUrl('sluice-icon-2'), name: '仪器检测', active: false }
])

const monitorUrl = ref<string>('')

const clickSluiceHandle = (item: Record<string, any>) => {
  sluiceBtns.value.forEach((btn) => {
    btn.active = false
  })
  item.active = true
  // triggerPolling.trigger()
}

const echartOption = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    top: -5,
    left: 'center',
    itemWidth: 30,
    itemHeight: 10,
    itemGap: 62,
    textStyle: {
      color: '#FFFFFF',
      fontSize: 20,
      fontFamily: 'PingFangSC, sans-serif',
      padding: [0, 0, 0, 8]
    },
    data: [
      { name: '监测点数量', icon: 'rect' },
      { name: '监测测点数量', icon: 'rect' }
    ]
  },
  grid: {
    top: '15%',
    left: '3%',
    right: '3%',
    bottom: '5%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    // boundaryGap: false,
    axisTick: {
      show: false
    },
    offset: 15,
    axisLine: {
      lineStyle: {
        type: 'solid',
        color: 'rgba(179,223,255, 0.5)'
      }
    },
    axisLabel: {
      color: '#fff',
      fontSize: 18,
      fontFamily: 'PingFangSC, sans-serif'
    },
    data: [] as string[]
  },
  yAxis: [{
    type: 'value',
    position: 'left',
    offset: 10,
    nameTextStyle: {
      color: '#fff',
      fontSize: 20,
      padding: [0, 55, 0, 0]
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
        color: 'rgba(217,231,255, 0.2)'
      }
    },
    axisLabel: {
      color: '#fff',
      fontSize: 20,
      fontFamily: 'PingFangSC, sans-serif'
    },
    axisTick: {
      show: false
    }
  }
  ],
  series: [
    {
      name: '监测点数量',
      data: [] as any,
      type: 'bar',
      smooth: true,
      showSymbol: false,
      barWidth: 16,
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 1,
          x2: 0,
          y2: 0,
          colorStops: [
            { offset: 0, color: 'rgba(17, 46, 74, 0.2)' },
            { offset: 1, color: '#3C80C0' }
          ]
        }
      }
    },
    {
      name: '监测测点数量',
      data: [] as any,
      type: 'bar',
      smooth: true,
      showSymbol: false,
      barWidth: 16,
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 1,
          x2: 0,
          y2: 0,
          colorStops: [
            { offset: 0, color: 'rgba(17, 74, 23, 0.2)' },
            { offset: 1, color: '#26C061' }
          ]
        }
      }
    }
  ]
})

usePolling(async () => {
  sluiceList1.value.forEach((item) => {
    item.value = SeededRandom.randomNumber(0, 100)
  })

  sluiceList1.value[0].value = 1015
  sluiceList1.value[1].value = 10.21

  const nameKeys = ['渗压计', '水位计', 'GNSS位移测点', '量水堰']
  echartOption.value.xAxis.data = nameKeys
  echartOption.value.series[0].data = nameKeys.map(() => SeededRandom.randomNumber(0, 100))
  echartOption.value.series[1].data = nameKeys.map(() => SeededRandom.randomNumber(0, 100))
})
</script>

<style lang="scss" scoped>
.page-container {
  padding: 35px 32px 30px;
}

.header-title {
  position: relative;
  display: flex;
  font-size: 34px;
  color: #fff;
  margin-bottom: 36px;
  font-family: DINMedium, sans-serif;
  padding-left: 50px;

  &::after {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background: url("@/assets/global/images/card-title-icon.png") no-repeat;
    background-position: left center;
  }
}

.app-table {
  .table-header {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    height: 78px;
    width: 100%;
    background: rgb(0 42 93 / 0.52);
    border: 1px solid #92bbff;
    box-sizing: border-box;
  }

  .table-tbody {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    background: rgb(0 42 93 / 0.50);
    border: 1px solid #92bbff;
    box-sizing: border-box;

    &__tr {
      border-right: 1px solid #92bbff;

      &:nth-child(2n) {
        border-right: none;
      }

      &:last-child {
        border-right: none;
      }
    }
  }

  .sluice-btns {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0 20px;

    &.active {
      text-shadow: 0 0 3.6px #2bdfff;
    }

    border-right: 1px solid #92bbff;

    &:nth-child(2n) {
      border-right: none;
    }

    &:last-child {
      border-right: none;
    }
  }

  .sluice-item {
    position: relative;
    display: flex;
    align-items: center;
    font-family: PingFangSC, sans-serif;
    height: 78px;
    padding-left: 55px;

    .cricle {
      position: absolute;
      top: 50%;
      left: 30px;
      transform: translateY(-50%);
      content: "";
      width: 10px;
      height: 10px;
      border-radius: 50%;

      &.normal {
        background: #03e6ff;
        box-shadow: 0 0 4px #03e6ff;
      }

      &.error {
        background: red;
        box-shadow: 0 0 4px red;
      }
    }

    &__title {
      color: #fff;
      font-size: 28px;
    }

    &__value {
      font-size: 32px;
      color: #50fffc;
      font-family: Quantico, sans-serif;
      font-weight: bold;
      margin: 0 15px;
    }

    &__unit {
      color: #beeeff;
      font-size: 24px;
    }
  }
}

</style>
