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
            {{ weatherItem?.night?.wind?.direct }}/{{ weatherItem?.day?.wind?.power }}
          </div>
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
const weatherList = ref<Record<string, any>>([])
usePolling(async () => {
  const result: any = await service.xfqs.queryStationWeather({})
  // 18:00时间戳： 1767693600000
  // 未来一周天气
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

  // 今日天气
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
})

</script>

<style lang="scss" scoped>
.page-container {
  padding: 45px 40px;
  height: 465px;
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
