<template>
  <PageCard title="气象预报" bg-class="left">
    <div class="page-container">
      <div class="today-weather">
        <img :src="todayWeather.weather" class="mb-[14px] h-[81px]">
        <div>
          <div class="mb-[6px] flex justify-between text-[32px]">
            <span>{{ todayWeather.date }}{{ todayWeather.weatherText }}</span>
            <span>{{ todayWeather.direction }}</span>
          </div>
          <div class="flex justify-between text-[#6DEEFF] text-[24px] min-w-[320px]">
            <div>
              温度：<ZfTweenNumber :value="todayWeather.tempMin" />℃-<ZfTweenNumber :value="todayWeather.tempMax" />℃
            </div>
            <div>
              湿度：<ZfTweenNumber :value="todayWeather.humidity" />%
            </div>
          </div>
        </div>
        <div class="today-weather__temp">
          {{ todayWeather.currentTemp }}℃
        </div>
      </div>
      <div class="grid grid-cols-6 gap-col-[12px]">
        <div
          v-for="(weatherItem, index) in weatherList"
          :key="weatherItem.date"
          class="week-weather"
          :class="{ 'week-weather--active': index === activeForecastIndex }"
          @click="activeForecastIndex = index"
        >
          <div class="mb-[7px]">
            {{ weatherItem.week }}
          </div>
          <div class="mb-[7px]">
            {{ weatherItem.date }}
          </div>
          <div class="week-weather__icon-wrap mb-[7px]">
            <img :src="weatherItem.weather" class="min-h-[41px]">
          </div>
          <div class="mb-[7px]">
            <!-- {{ weatherItem?.night?.wind?.direct }}/{{ weatherItem?.day?.wind?.power }} -->
            {{ weatherItem?.day?.wind?.power }}
          </div>
          <div class="mb-[7px]">
            {{ weatherItem.weatherText }}
          </div>
          <div class="mb-[7px]">
            <ZfTweenNumber :value="weatherItem.tempMin" />℃-<ZfTweenNumber :value="weatherItem.tempMax" />℃
          </div>
        </div>
      </div>

      <div class="temp-chart">
        <VueEcharts :option="echartOption" />
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

/** 图表样式与 FloodIndexPageRightCard2 对齐 */
const CHART_FONT = '"Alibaba PuHuiTi 2.0", "PingFang SC", "Microsoft YaHei", sans-serif'
const CHART_FONT_AXIS_VALUE = '"Alibaba PuHuiTi 2.0", "PingFang SC", "Microsoft YaHei", sans-serif'
const CHART_FONT_X = '"PingFang SC", "Microsoft YaHei", sans-serif'
const FONT_SIZE = 20
const LINE_WIDTH = 1

const getPhotoUrl = (icon: string) => {
  return new URL(`../assets/global/images/weather/${icon}.png`, import.meta.url).href
}

const weekTextMap: Record<number, string> = {
  0: '星期日',
  1: '星期一',
  2: '星期二',
  3: '星期三',
  4: '星期四',
  5: '星期五',
  6: '星期六'
}

const formatWeekText = (date: string) => {
  return weekTextMap[dayjs(date).day()] ?? ''
}

const todayWeather = ref<Record<string, any>>({
  date: '',
  weather: '',
  weatherText: '',
  direction: '',
  tempMin: 0,
  tempMax: 0,
  currentTemp: 0,
  humidity: 0
})
const weatherList = ref<Record<string, any>[]>([])
const activeForecastIndex = ref(4)

const echartOption = ref({
  animation: false,
  tooltip: {
    trigger: 'axis' as const,
    axisPointer: {
      type: 'line' as const,
      lineStyle: { color: 'rgba(255, 255, 255, 0.35)', type: 'dashed' as const, width: LINE_WIDTH }
    },
    backgroundColor: 'rgba(20, 40, 60, 0.92)',
    borderColor: 'rgba(120, 200, 255, 0.35)',
    textStyle: { color: '#fff', fontSize: FONT_SIZE, fontFamily: CHART_FONT }
  },
  title: {
    text: '当日气温',
    top: 0,
    left: 0,
    textStyle: {
      color: '#FFFFFF',
      fontSize: FONT_SIZE,
      fontWeight: 'normal',
      fontFamily: CHART_FONT
    }
  },
  grid: {
    top: '22%',
    left: '5%',
    right: '6%',
    bottom: '14%',
    containLabel: true
  },
  xAxis: {
    type: 'category' as const,
    boundaryGap: false,
    axisTick: {
      show: false
    },
    offset: 8,
    axisLine: {
      lineStyle: {
        color: 'rgba(179, 223, 255, 0.5)',
        width: LINE_WIDTH
      }
    },
    axisLabel: {
      color: '#fff',
      fontSize: FONT_SIZE,
      fontFamily: CHART_FONT_X
    },
    data: [] as string[]
  },
  yAxis: {
    type: 'value' as const,
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: '#fff',
      fontSize: FONT_SIZE,
      fontFamily: CHART_FONT_AXIS_VALUE
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed' as const,
        color: 'rgba(217, 231, 255, 0.2)',
        width: LINE_WIDTH
      }
    }
  },
  series: [
    {
      name: '气温',
      data: [] as number[],
      type: 'line' as const,
      smooth: true,
      showSymbol: true,
      symbol: 'circle',
      symbolSize: 8,
      lineStyle: {
        color: '#FF932F',
        width: 2
      },
      itemStyle: {
        color: '#FF932F',
        borderColor: '#fff',
        borderWidth: LINE_WIDTH
      }
    }
  ]
})

usePolling(async () => {
  const result: any = await service.xfqs.queryStationWeather({})
  const dayWeatherList = []
  for (const dayItem of result.predict.detail) {
    dayWeatherList.push({
      ...dayItem,
      date: dayjs(dayItem.date).format('MM-DD'),
      week: formatWeekText(dayItem.date),
      weather: dayjs().valueOf() >= 1767693600000 ? getPhotoUrl(dayItem.night.weather.info) : getPhotoUrl(dayItem.day.weather.info),
      weatherText: dayItem.textDay,
      tempMin: dayItem.night.weather.temperature,
      tempMax: dayItem.day.weather.temperature,
      humidity: dayItem.humidity
    })
  }
  weatherList.value = dayWeatherList.slice(1, 7)

  todayWeather.value = {
    date: '今日',
    direction: result.real.wind.direct,
    weather: dayjs().valueOf() >= 1767693600000 ? getPhotoUrl(result.real.weather.info) : getPhotoUrl(result.real.weather.info),
    weatherText: result.real.weather.info,
    tempMin: result.predict.detail[0].night.weather.temperature,
    tempMax: result.predict.detail[0].day.weather.temperature,
    currentTemp: Math.round(result.real.weather.temperature),
    humidity: result.real.weather.humidity
  }

  const detail = result.predict?.detail || []
  const chartSlice = detail.slice(0, 12)
  const xData = chartSlice.map((d: Record<string, any>) => dayjs(d.date).format('M.D'))
  const yData = chartSlice.map((d: Record<string, any>) => Number(d.day?.weather?.temperature ?? 0))

  echartOption.value.xAxis.data = xData
  echartOption.value.series[0].data = yData

  if (yData.length > 0) {
    const dataMin = Math.min(...yData)
    const dataMax = Math.max(...yData)
    const pad = Math.max(1, Math.round((dataMax - dataMin) * 0.15) || 2)
    ;(echartOption.value.yAxis as Record<string, any>).min = Number((dataMin - pad).toFixed(0))
    ;(echartOption.value.yAxis as Record<string, any>).max = Number((dataMax + pad).toFixed(0))
  }
})
</script>

<style lang="scss" scoped>
.page-container {
  padding: 45px 40px 40px;
  box-sizing: border-box;
}

.today-weather {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 22px;
  border-radius: 6px;
  padding: 37px 69px;
  box-sizing: border-box;
  font-family: PingFangSC, sans-serif;
  background: url('@/assets/global/images/situation/today-weather-bg.png') no-repeat center top;
  background-size: 100% 100%;

  .today-weather__temp {
    font-size: 64px;
    color: #FFF;
    font-family: DINAlternateBold, sans-serif;
    text-shadow: 0 0 5px #56EBFF;
  }
}

.week-weather {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 24px;
  font-family: PingFangSC, sans-serif;
  padding: 20px 0;
  box-sizing: border-box;
  cursor: pointer;
  background: url('@/assets/global/images/situation/weather-bg.png') no-repeat center top;
  background-size: 100% 100%;

  .week-weather__icon-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 49px;
    padding: 4px;
    border-radius: 8px;
    border: 2px solid transparent;
    box-sizing: border-box;
  }

  &--active .week-weather__icon-wrap {
    border-color: #56EBFF;
    box-shadow: 0 0 8px rgb(86 235 255 / 0.45);
  }
}

.temp-chart {
  margin-top: 28px;
  height: 320px;
}
</style>
