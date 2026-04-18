<template>
  <PageCard title="预警信息" bg-class="left">
    <div class="page-container">
      <div class="h-[1320px] overflow-y-auto">
        <div class="dispatch-item" v-for="item in dataList" :key="item.id">
          <div class="dispatch-item__header">
            <img
              src="@/assets/global/images/card-title-icon.png"
              class="w-[30px] h-[32px] mr-[9px]"
            >
            <span>{{ item.stnm }}</span>
          </div>
          <div class="dispatch-item__content">
            <div>
              <div class="mb-[10px]">
                预警状态：
              </div>
              <div :class="item.msg === 'warning' ? 'text-[#FF4D4F]' : 'text-[#65EB2B]'">
                {{ item.msg }}
              </div>
            </div>
            <div>
              <div class="mb-[10px]">
                监测时间：
              </div>
              <div class="min-h-[44px]">
                {{ item.tm }}
              </div>
            </div>
            <div>
              <div class="mb-[10px]">
                告警详情：
              </div>
              <div><ZfTweenNumber :value="item.avgValue" />%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
const dataList = ref<Record<string, any>>([])

const weatherInfo = reactive<any>({
  temperature: {
    value: 0,
    unit: '℃',
    datetime: ''
  },
  supply: {
    value: 0,
    unit: 'mm',
    datetime: ''
  },
  rain: {
    value: 0,
    unit: 'mm',
    datetime: ''
  }
})

usePolling(async () => {
  const result: any = await service.xfqs.getTemperatureAndPptnWarnInfoForBus({})
  if (result.airTemperature.msg === '无') {
    weatherInfo.temperature.value = '无'
    weatherInfo.temperature.datetime = '--'
    weatherInfo.temperature.unit = ''
  } else {
    // result.airTemperature.msg 有无高温预警，没有就显示无，有就显示红色的高温预警文字
    // 最高气温
    weatherInfo.temperature.value = Number(result.airTemperature.maxTemperature)
    // 最高气温时间
    weatherInfo.temperature.datetime = result.airTemperature.maxTime
    weatherInfo.temperature.unit = '℃'
  }

  // 连续无雨日
  // result.pptnData.PPTNSum1
  // 上一次降雨量
  weatherInfo.rain.value = result.pptnData.beforePptn.accp ? Number(result.pptnData.beforePptn.accp) : '--'
  weatherInfo.rain.unit = result.pptnData.beforePptn.accp ? 'mm' : ''
  // 上一次降雨时间
  weatherInfo.rain.datetime = result.pptnData.beforePptn.tm

  const resultRsvr: any = await service.xfqs.getRsvrWarnInfo({})
  weatherInfo.supply.value = Number(resultRsvr.currntZ)
  weatherInfo.supply.datetime = dayjs(resultRsvr.tm).format('YYYY-MM-DD HH:mm')

  const resultSoilWarn: any = await service.xfqs.getSoilWarnInfo({})
  dataList.value = resultSoilWarn.list
})
</script>

<style lang="scss" scoped>
.page-container {
  padding: 40px 30px;
  overflow: hidden;
}

.air-temperature {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 12px;
  margin-bottom: 40px;

  .weather-item {
    display: flex;
    flex-direction: column;
    height: 183px;
    flex: 0 0 268px;
    margin-right: 12px;
    background: url("@/assets/global/images/flood/weather-default.png") no-repeat center;
    background-size: 100% 100%;

    &:last-child {
      margin-right: 0;
    }

    &.warning {
      background: url("@/assets/global/images/flood/weather-warning.png") no-repeat center;
      background-size: 100% 100%;
    }

    .item-header {
      flex: 0 0 40px;
      padding-left: 45px;
      box-sizing: border-box;
      font-size: 30px;
    }

    .item-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-family: PingFangSC, sans-serif;
      font-size: 28px;
      color: #fff;
    }
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
    font-size: 30px;
    font-family: PingFangSC, sans-serif;
    border: 1px solid #527191;
  }

  .dispatch-item__header {
    height: 90px;
    padding: 0 30px;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(180deg, #1e5384 0%, #0084ff 100%);
      opacity: 0.52;
      z-index: -1;
    }
  }

  .dispatch-item__content {
    border-top: none;
    justify-content: space-between;
    padding: 29px 36px;

    &::after {
      content: "";
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
