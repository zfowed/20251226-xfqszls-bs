<template>
  <PageCard title="天气信息" bg-class="left">
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
        <div v-for="weatherItem in weatherList" :key="weatherItem.date" class="week-weather">
          <div class="mb-[7px]">
            {{ weatherItem.week }}
          </div>
          <div class="mb-[7px]">
            {{ weatherItem.date }}
          </div>
          <img :src="weatherItem.weather" class="mb-[7px] min-h-[41px]">
          <div class="mb-[7px]">
            {{ weatherItem.weatherText }}
          </div>
          <div class="mb-[7px]">
            <ZfTweenNumber :value="weatherItem.tempMin" />℃-<ZfTweenNumber :value="weatherItem.tempMax" />℃
          </div>
        </div>
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { SeededRandom } from 'zf-utilz'

const getPhotoUrl = (icon: string) => {
  return new URL(`../assets/global/images/weather/${icon}.png`, import.meta.url).href
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
const weatherList = ref<Record<string, any>>([])
const weekMap = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
const iconArrList = [
  {
    name: '多云',
    type: 'cloudy'
  }, {
    name: '晴',
    type: 'sun'
  },
  {
    name: '雷阵雨',
    type: 'thunder'
  }
]
usePolling(async () => {
  // 今日天气
  const randomWeather = iconArrList[SeededRandom.randomNumber(0, iconArrList.length - 1)]
  todayWeather.value = {
    date: '今日',
    direction: '东南风',
    weather: getPhotoUrl(randomWeather.type),
    weatherText: randomWeather.name,
    tempMin: SeededRandom.randomNumber(10, 24),
    tempMax: SeededRandom.randomNumber(25, 30),
    currentTemp: SeededRandom.randomNumber(15, 30),
    humidity: SeededRandom.randomNumber(10, 100)
  }

  const resultList = []
  for (let i = 0; i < 6; i++) {
    const currentDay = dayjs().add(i + 1, 'day')
    const randomWeather = iconArrList[SeededRandom.randomNumber(0, iconArrList.length - 1)]
    resultList.push({
      date: currentDay.format('MM-DD'),
      week: weekMap[currentDay.day()],
      weather: getPhotoUrl(randomWeather.type),
      weatherText: randomWeather.name,
      tempMin: SeededRandom.randomNumber(10, 24),
      tempMax: SeededRandom.randomNumber(25, 30),
      humidity: SeededRandom.randomNumber(10, 100)
    })
  }
  weatherList.value = resultList
})

</script>

<style lang="scss" scoped>
.page-container {
  padding: 45px 40px;
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

  // background: linear-gradient(180deg, rgb(38 82 117 / 31), rgb(9 39 54 / 48));

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
  background: url('@/assets/global/images/situation/weather-bg.png') no-repeat center top;
  background-size: 100% 100%;

  // background: linear-gradient(180deg, rgb(38 82 117 / 31), rgb(9 39 54 / 48));
  // border: 1px solid transparent;
  // border-bottom: none;
  // border-image: linear-gradient(180deg, #98BCE5, rgb(102 102 102 / 0)) 1;
  // border-radius: 4px;
}
</style>
