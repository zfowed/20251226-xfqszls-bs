<template>
  <PageCard title="农情监测" bg-class="left">
    <div class="page-container">
      <div class="header-title">
        农情概述
      </div>
      <div class="details-text">
        农情监测包括农田土壤墒情和作物基本情况的监测。尽管地面监测点可以获取连续高精度农情信息，但数量较少。因此，除了增加地面农情监测点外，也需要提升面向灌区农田大范围区域的监测能力。为此，针对幸福渠灌区种植结构、作物需耗水、灌溉面积、作物长势和土壤墒情等，分析已建农情监测现状，结合数字孪生幸福渠灌区的建设需求，采用卫星遥感影像解译为主、无人机飞行拍摄为辅以及土壤墒情监测的天空地一体化方式开展灌区作物种植结构、灌溉面积、作物长势、土壤墒情等农情监测与分析。
      </div>
      <div class="grid grid-cols-3 gap-col-[29px] gap-row-[60px]">
        <div class="reservoir-item" v-for="(item, index) in reservoirInfo" :key="index">
          <img
            :src="item.icon"
            class="reservoir-item__icon mr-[14px]"
          >
          <div>
            <div class="reservoir-item__label">
              {{ item.name }}
            </div>
            <div v-if="typeof item.value == 'string'">
              <span class="text-[30px] mr-[8px]">{{ item.value }}</span>
              <span class="text-[16px]">{{ item.unit }}</span>
            </div>
            <div v-else>
              <ZfTweenNumber :value="item.value" class="reservoir-item__value" />
              <span class="reservoir-item__unit">{{ item.unit }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 农作物耗水 -->
      <div class="header-title mt-[100px]">
        农作物耗水
      </div>
      <div class="h-[328px]">
        <VueEcharts :option="echartOption" />
      </div>

      <!-- 农作物长势 -->
      <div class="header-title mt-[100px]">
        农作物长势
      </div>
      <div class="h-[428px]">
        <VueEcharts :option="echartOption" />
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
import { SeededRandom } from 'zf-utilz'

const getPhotoUrl = (icon: string) => {
  return new URL(`../assets/global/images/flood/${icon}.png`, import.meta.url).href
}
const reservoirInfo = ref<Record<string, any>>([
  { icon: getPhotoUrl('rice'), name: '水稻', value: 0, unit: '亩' },
  { icon: getPhotoUrl('rice'), name: '中稻', value: 0, unit: '亩' },
  { icon: getPhotoUrl('rice'), name: '晚稻', value: 0, unit: '亩' },
  { icon: getPhotoUrl('corn'), name: '玉米', value: 0, unit: '亩' },
  { icon: getPhotoUrl('rapeseed'), name: '油菜', value: 0, unit: '亩' },
  { icon: getPhotoUrl('wheat'), name: '小麦', value: 0, unit: '亩' }
])

const echartOption = ref({
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    top: '12%',
    left: '3%',
    right: '3%',
    bottom: '5%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    // 柱状图建议留左右间距，避免柱子超出坐标系
    boundaryGap: false,
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
  yAxis: [
    {
      type: 'value',
      position: 'left',
      offset: 10,
      nameTextStyle: {
        color: '#fff',
        fontSize: 20
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
      name: '耗水量量',
      data: [] as any,
      type: 'line',
      smooth: true,
      showSymbol: true,
      symbol: 'circle',
      symbolSize: 10,
      areaStyle: {
        color: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: '#29AABE' },
            { offset: 1, color: 'rgba(130, 183, 200, 0)' }
          ]
        }
      },
      lineStyle: { color: '#fff' },
      itemStyle: {
        color: '#fff'
      }
    }
  ]
})

usePolling(async () => {
  reservoirInfo.value[0].value = SeededRandom.randomNumber(0, 10000)
  reservoirInfo.value[1].value = SeededRandom.randomNumber(0, 10000)
  reservoirInfo.value[2].value = SeededRandom.randomNumber(0, 10000)
  reservoirInfo.value[3].value = SeededRandom.randomNumber(0, 10000)
  reservoirInfo.value[4].value = SeededRandom.randomNumber(0, 10000)
  reservoirInfo.value[5].value = SeededRandom.randomNumber(0, 10000)

  echartOption.value.xAxis.data = ['1月', '2月', '3月', '4月', '5月', '6月']
  echartOption.value.series[0].data = [
    reservoirInfo.value[0].value,
    reservoirInfo.value[1].value,
    reservoirInfo.value[2].value,
    reservoirInfo.value[3].value,
    reservoirInfo.value[4].value,
    reservoirInfo.value[5].value
  ]
})
</script>

<style lang="scss" scoped>
.page-container {
  padding: 45px 68px;
}

.header-title {
  position: relative;
  display: flex;
  font-size: 34px;
  color: #fff;
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
    background: url("@/assets/global/images/card-title-icon.png") no-repeat;
    background-position: left center;
  }
}

.details-text {
  font-size: 30px;
  color: #fff;
  font-family: PingFangSC, sans-serif;
  margin-bottom: 40px;
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
