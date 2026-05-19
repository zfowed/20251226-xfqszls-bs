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
          v-for="(weatherItem) in weatherList"
          :key="weatherItem.date"
          class="week-weather"
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

/** 接口用 9999 表示缺测 */
const isWeatherMissing = (v: unknown) => {
  if (v === null || v === undefined) return true
  const s = String(v).trim()
  return s === '' || s === '9999' || Number(s) === 9999
}

/** 预报温度转数字，缺测返回 undefined */
const parseForecastTemp = (v: unknown): number | undefined => {
  if (isWeatherMissing(v)) return undefined
  const n = Number(v)
  return Number.isFinite(n) && n < 9990 ? n : undefined
}

/** 实况/预报天气文字 → 现有 png 文件名（无对应资源时回退） */
const resolveWeatherIconName = (info: unknown): string => {
  if (isWeatherMissing(info)) return '多云'
  const t = String(info).trim()
  const alias: Record<string, string> = {
    阴: '阴天',
    阴天: '阴天',
    雾: '阴天',
    霾: '阴天',
    小雨: '阴天',
    中雨: '雷阵雨',
    大雨: '雷阵雨',
    暴雨: '雷阵雨',
    雷阵雨: '雷阵雨',
    雨: '阴天',
    雪: '阴天'
  }
  return alias[t] ?? t
}

const getPhotoUrlByInfo = (info: unknown) => {
  return getPhotoUrl(resolveWeatherIconName(info))
}

/** 优先用白天预报图标，缺测则用夜间 */
const pickForecastWeatherInfoForIcon = (daySlot: Record<string, any>, nightSlot: Record<string, any>) => {
  const d = daySlot?.weather?.info
  const n = nightSlot?.weather?.info
  if (!isWeatherMissing(d)) return d
  if (!isWeatherMissing(n)) return n
  return '多云'
}

/** 列表展示：昼夜天气文案（无 textDay 字段） */
const formatForecastWeatherText = (daySlot: Record<string, any>, nightSlot: Record<string, any>) => {
  const di = isWeatherMissing(daySlot?.weather?.info) ? '' : String(daySlot.weather.info).trim()
  const ni = isWeatherMissing(nightSlot?.weather?.info) ? '' : String(nightSlot.weather.info).trim()
  if (di && ni && di !== ni) return `${di}转${ni}`
  return di || ni || '—'
}

/** 与 predict.detail[].date 对齐的 tempchart 行（time 形如 2026/05/10） */
const findTempchartRow = (tempchart: Record<string, any>[] | undefined, ymd: string) => {
  if (!tempchart?.length) return undefined
  const target = dayjs(ymd)
  return tempchart.find((row) => {
    const rowDay = row?.time ? dayjs(String(row.time).replace(/\//g, '-')) : null
    return rowDay?.isValid() && rowDay.isSame(target, 'day')
  })
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
      data: [] as (number | null)[],
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
  const weatherResult: any = await service.xfqs.queryWeather({})
  console.log('queryWeatherResult', weatherResult)

  const result: any = await service.xfqs.queryStationWeather({})
  const detail = (result?.predict?.detail || []) as Record<string, any>[]
  const tempchart = (result?.tempchart || []) as Record<string, any>[]

  const dayWeatherList: Record<string, any>[] = []
  for (const dayItem of detail) {
    const night = dayItem.night || {}
    const day = dayItem.day || {}
    const tcRow = dayItem.date ? findTempchartRow(tempchart, dayItem.date) : undefined
    const chartMin = tcRow && typeof tcRow.min_temp === 'number' ? tcRow.min_temp : parseForecastTemp(tcRow?.min_temp)
    const chartMax = tcRow && typeof tcRow.max_temp === 'number' ? tcRow.max_temp : parseForecastTemp(tcRow?.max_temp)
    const nightT = parseForecastTemp(night?.weather?.temperature) ?? chartMin
    const dayT = parseForecastTemp(day?.weather?.temperature) ?? chartMax
    const tMin = nightT ?? dayT ?? 0
    const tMax = dayT ?? nightT ?? tMin
    dayWeatherList.push({
      ...dayItem,
      date: dayjs(dayItem.date).format('MM-DD'),
      week: formatWeekText(dayItem.date),
      weather: getPhotoUrlByInfo(pickForecastWeatherInfoForIcon(day, night)),
      weatherText: formatForecastWeatherText(day, night),
      tempMin: Math.min(tMin, tMax),
      tempMax: Math.max(tMin, tMax)
    })
  }
  weatherList.value = dayWeatherList.slice(1, 7)

  const first = detail[0]
  const tc0 = first?.date ? findTempchartRow(tempchart, first.date) : undefined
  let todayMin = parseForecastTemp(first?.night?.weather?.temperature)
  let todayMax = parseForecastTemp(first?.day?.weather?.temperature)
  if (tc0) {
    const cmin = typeof tc0.min_temp === 'number' ? tc0.min_temp : parseForecastTemp(tc0.min_temp)
    const cmax = typeof tc0.max_temp === 'number' ? tc0.max_temp : parseForecastTemp(tc0.max_temp)
    if (todayMin === undefined && cmin !== undefined) todayMin = cmin
    if (todayMax === undefined && cmax !== undefined) todayMax = cmax
  }
  if (todayMin === undefined) todayMin = parseForecastTemp(first?.day?.weather?.temperature)
  if (todayMax === undefined) todayMax = parseForecastTemp(first?.night?.weather?.temperature)
  if (todayMin !== undefined && todayMax !== undefined && todayMax < todayMin) {
    const t = todayMin
    todayMin = todayMax
    todayMax = t
  }
  todayWeather.value = {
    date: '今日',
    direction: result.real?.wind?.direct ?? '—',
    weather: getPhotoUrlByInfo(result.real?.weather?.info),
    weatherText: isWeatherMissing(result.real?.weather?.info) ? '—' : String(result.real.weather.info),
    tempMin: todayMin ?? 0,
    tempMax: todayMax ?? todayMin ?? 0,
    currentTemp: Math.round(Number(result.real?.weather?.temperature) || 0),
    humidity: Number(result.real?.weather?.humidity) || 0
  }

  const chartList = (weatherResult?.list || []) as Record<string, any>[]
  const xData = chartList.map((item) => {
    const tm = String(item.tm || '')
    return tm.includes(' ') ? tm.split(' ')[1] : tm
  })
  const yData = chartList.map((item) => parseForecastTemp(item.temperature) ?? null) as (number | null)[]

  echartOption.value.xAxis.data = xData
  ;(echartOption.value.series[0] as Record<string, any>).data = yData

  const validY = yData.filter((v): v is number => v !== null && Number.isFinite(v))
  if (validY.length > 0) {
    const dataMin = Math.min(...validY)
    const dataMax = Math.max(...validY)
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
