<template>
  <div class="layout">
    <div class="layout-header">
      <!-- <div class="layout-header__title ">
        幸福渠数字孪生
      </div> -->
      <div class="layout-header__date">
        <span>{{ serverDateTime.date }}</span>
        <span>{{ serverDateTime.week }}</span>
        <span>{{ serverDateTime.time }}</span>
      </div>
      <div class="layout-header__weather">
        <img :src="weatherInfo.icon">
        <div class="mr-[40px]">
          <ZfTweenNumber :value="weatherInfo.min" />
          <span>~</span>
          <ZfTweenNumber :value="weatherInfo.max" />
          <span>℃</span>
        </div>
        <span>{{ weatherInfo.text }}</span>
      </div>
    </div>

    <div class="layout-container">
      <RouterView v-slot="{ Component }">
        <Transition>
          <component :is="Component" />
        </Transition>
      </RouterView>
    </div>

    <div class="layout-footer">
      <div class="navbar-menu" :class="{'navbar-menu__active': route.path.includes(navbar.path)}" v-for="navbar in menuList" :key="navbar.path" @click="navbarBtnHandle(navbar)">
        {{ navbar.name }}
      </div>
    </div>

    <!-- 左右边框图片 -->
    <div class="layout-left__border" />
    <div class="layout-right__border" />
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
const router = useRouter()
const route = useRoute()

const getPhotoUrl = (icon: string) => {
  return new URL(`../../assets/global/images/weather/${icon}.png`, import.meta.url).href
}

const isWeatherMissing = (v: unknown) => {
  if (v === null || v === undefined) return true
  const s = String(v).trim()
  return s === '' || s === '9999' || Number(s) === 9999
}

const parseForecastTemp = (v: unknown): number | undefined => {
  if (isWeatherMissing(v)) return undefined
  const n = Number(v)
  return Number.isFinite(n) && n < 9990 ? n : undefined
}

/** 与 FloodIndexPageLeftCard1 一致：实况文案 → 现有 png 名 */
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

const getPhotoUrlByInfo = (info: unknown) => getPhotoUrl(resolveWeatherIconName(info))

const findTempchartRow = (tempchart: Record<string, any>[] | undefined, ymd: string) => {
  if (!tempchart?.length) return undefined
  const target = dayjs(ymd)
  return tempchart.find((row) => {
    const rowDay = row?.time ? dayjs(String(row.time).replace(/\//g, '-')) : null
    return rowDay?.isValid() && rowDay.isSame(target, 'day')
  })
}

const menuList = reactive([
  { name: '灌区概览', path: '/preview', ueEvent: 'menu_kuangshan', active: false },
  { name: '态势感知', path: '/situation', ueEvent: 'menu_anquan', active: false },
  { name: '调水决策', path: '/water', ueEvent: 'menu_yingji', active: false },
  { name: '防汛决策', path: '/flood', ueEvent: 'menu_zdh', active: false }
])

const navbarBtnHandle = (item: any) => {
  for (const menuItem of menuList) {
    if (menuItem.path === route.path) {
      menuItem.active = false
      ue.emit('menu', false, menuItem.name)
      break
    }
  }
  item.active = true
  ue.emit('menu', true, item.name)
  router.push(item.path)
}

const weatherInfo = reactive({
  min: 0,
  max: 0,
  text: '',
  icon: ''
})
usePolling(async () => {
  const result: any = await service.xfqs.queryStationWeather({})
  const detail = (result?.predict?.detail || []) as Record<string, any>[]
  const tempchart = (result?.tempchart || []) as Record<string, any>[]
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
  weatherInfo.min = todayMin ?? 0
  weatherInfo.max = todayMax ?? todayMin ?? 0
  weatherInfo.text = isWeatherMissing(result?.real?.weather?.info) ? '—' : String(result.real.weather.info)
  weatherInfo.icon = getPhotoUrlByInfo(result?.real?.weather?.info)
})

const weekMap = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
const serverDateTime = ref<any>({
  date: dayjs().format('YYYY-MM-DD'),
  week: weekMap[dayjs().day()],
  time: dayjs().format('HH:mm:ss')
})
useInterval(() => {
  serverDateTime.value.date = dayjs().format('YYYY.MM.DD')
  serverDateTime.value.time = dayjs().format('HH:mm:ss')
}, 1000)

const isPageScreenInit = ref(false)
provide('isPageScreenInit', isPageScreenInit)
</script>

<style lang="scss" scoped>
.layout {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-size: 26px;
  background: #010815 url("./assets/background.jpeg") no-repeat center center;
  background-size: 100% 100%;
  box-sizing: border-box;
  padding: 0 65px;

  // &::before {
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   z-index: 1;
  //   display: block;
  //   width: 100%;
  //   height: 100%;
  //   background: url("./assets/background-mask.jpeg") no-repeat center center;
  //   background-size: 100% 100%;
  //   content: "";
  // }

  .layout-left__border {
    position: absolute;
    top: 0;
    left: 0;
    width: 70px;
    height: 100%;
    background: url('./assets/left-border.png') no-repeat;
    background-size: 100% 100%;

  }

  .layout-right__border {
    position: absolute;
    top: 0;
    right: 0;
    width: 70px;
    height: 100%;
    background: url('./assets/right-border.png') no-repeat;
    background-size: 100% 100%;
  }
}

.layout-header {
  position: relative;
  z-index: 2;
  flex: 0 0 181px;
  width: 100%;
  height: 181px;

  &::after {
    position: absolute;
    top: 36px;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    background: url("./assets/header.png") no-repeat top center;
    background-size: 100% 100%;
    content: "";
  }

  // .layout-header__title {
  //   position: relative;
  //   top: 15%;
  //   transform: translateY(-50%);
  //   width: 100%;
  //   font-size: 96px;
  //   font-family: PangMenZhengDao, sans-serif;
  //   text-align: center;
  //   letter-spacing: 30px;
  //   text-shadow: 0 4px 4px rgb(0 0 0 / 0.3);
  // }

  .layout-header__date {
    position: absolute;
    top: 64px;
    left: 220px;
    font-family: PangMenZhengDao, sans-serif;

    span {
      position: relative;
      margin-right: 40px;
      font-size: 30px;
      background-image: linear-gradient(to bottom, #fff 17%, #ACDDFF 86%);
      background-clip: text;
      -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 1px 3px rgb(5 12 25 / 0.6));

      &:not(:last-child)::after {
        position: absolute;
        top: 50%;
        right: -20px;
        transform: translateY(-50%);
        display: block;
        width: 2px;
        height: 100%;
        background: rgb(205 233 251 / 0.3);
        border-radius: 50%;
        content: "";
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .layout-header__weather {
    position: absolute;
    top: 64px;
    right: 220px;
    display: flex;
    align-items: center;
    font-size: 30px;
    font-family: PangMenZhengDao, sans-serif;
    background-image: linear-gradient(to bottom, #fff 17%, #ACDDFF 86%);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 1px 3px rgb(5 12 25 / 0.6));

    img {
      position: relative;
      margin-right: 43px;
      border-right: 2px solid rgb(205 233 251 / 0.3);
      padding-right: 27px;
    }
  }
}

.layout-container {
  position: relative;
  z-index: 1;
  flex: 1;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.layout-footer {
  position: absolute;
  bottom: 0;
  left: 65px;
  right: 65px;
  display: grid;
  grid-template-columns: repeat(4, auto);
  justify-content: center;
  column-gap: 160px;
  z-index: 2;
  flex: 0 0 134px;
  width: auto;
  height: 134px;

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 84px;
    background: url("./assets/footer.png") no-repeat;
    background-size: 100% 100%;
    content: "";
  }
}

.navbar-menu {
  position: relative;
  width: 382.17px;
  height: 106.78px;
  line-height: 106.78px;
  background: url('./assets/navbar/nav.png') no-repeat center center;
  background-size: 100% 100%;
  cursor: pointer;
  transition: all 0.3s;
  font-family: PangMenZhengDao, sans-serif;
  font-size: 58px;
  color: #8DBFEE;
  text-align: center;
  letter-spacing: 5px;
  z-index: 5;
  margin-top: -60px;

  &.navbar-menu__active,
  &:hover {
    background: url('./assets/navbar/nav-active.png') no-repeat center center;
    color: #DBEEFF;
  }
}

</style>
