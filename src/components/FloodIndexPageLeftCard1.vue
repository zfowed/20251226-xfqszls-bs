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
  tooltip: {
    trigger: 'axis'
  },
  title: {
    text: '当日气温',
    top: 0,
    left: 0,
    textStyle: {
      color: '#FFFFFF',
      fontSize: 22,
      fontWeight: 'normal',
      fontFamily: 'PingFangSC, sans-serif'
    }
  },
  grid: {
    top: '18%',
    left: '4%',
    right: '4%',
    bottom: '8%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    axisTick: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(179,223,255, 0.45)',
        width: 2
      }
    },
    axisLabel: {
      color: '#fff',
      fontSize: 18,
      fontFamily: 'PingFangSC, sans-serif',
      margin: 14
    },
    data: [] as string[]
  },
  yAxis: {
    type: 'value',
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: '#d9efff',
      fontSize: 18,
      fontFamily: 'Quantico, sans-serif'
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
        color: 'rgba(217,231,255, 0.2)'
      }
    }
  },
  series: [
    {
      name: '气温',
      data: [] as number[],
      type: 'line',
      smooth: true,
      showSymbol: true,
      symbol: 'circle',
      symbolSize: 8,
      lineStyle: {
        color: '#FF932F',
        width: 3
      },
      itemStyle: {
        color: '#FF932F',
        borderColor: '#fff',
        borderWidth: 1
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
