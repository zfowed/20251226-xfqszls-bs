<template>
  <PageCard title="灌区信息" bg-class="left">
    <div class="page-container">
      <div class="header-title">
        灌区概述
      </div>
      <div class="details-text">
        宜都市幸福渠灌区位于湖北省宜昌市宜都市，建成于1959年，设计灌溉面积8.12万亩，农作物主要以种植水稻、玉米、油料等为主，灌溉主水源为熊渡水库（中型），是一座以灌溉为主，兼有防洪、发电等综合效益的自流型中型灌区。灌区现有骨干干支渠7条，总长为74.21km（其中，干渠46.15km、支渠28.06km），各类渠系建筑物430余处。
      </div>
      <div class="h-[245px] mb-[45px]">
        <Swiper
          :modules="[Autoplay, Pagination]"
          :loop="true"
          :slides-per-view="1.9"
          :space-between="10"
          :autoplay="{ delay: 3000 }"
          :centered-slides="true"
          :pagination="{ clickable: true }"
          class="swiper-section"
        >
          <SwiperSlide v-for="item in swiperDataList" :key="item.id">
            <img :src="item.image" alt="">
          </SwiperSlide>
        </Swiper>
      </div>
      <div class="average-water">
        <div class="average-water__header">
          <div class="average-water__title">
            平均年来水量
          </div>
          <div class="text-center">
            <ZfTweenNumber :value="completeRate" class="average-water__value" />
            <span class="average-water__unit">m³/s</span>
          </div>
        </div>
        <div class="average-water__content">
          <div
            v-for="item in dataList"
            :key="item.title"
            class="flex flex-col justify-center"
          >
            <div class="average-water__label">
              {{ item.title }}
            </div>
            <div>
              <ZfTweenNumber :value="item.value" class="average-water__value" />
              <span class="average-water__unit">{{ item.unit }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
// import { SeededRandom } from 'zf-utilz'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper'
// @ts-ignore: Swiper CSS has no type declarations
import 'swiper/css'
// @ts-ignore: Swiper pagination CSS has no type declarations
import 'swiper/css/pagination'

const getPhotoUrl = (icon: string) => {
  return new URL(`../assets/global/images/preview/${icon}.png`, import.meta.url).href
}
const swiperDataList = ref([
  { id: 1, image: getPhotoUrl('swiper-image1') },
  { id: 2, image: getPhotoUrl('swiper-image1') },
  { id: 3, image: getPhotoUrl('swiper-image1') },
  { id: 4, image: getPhotoUrl('swiper-image1') },
  { id: 5, image: getPhotoUrl('swiper-image1') }
])

const completeRate = ref(3282.5)
const dataList = ref<Record<string, any>[]>([
  {
    title: '聂家河镇',
    value: '113.9',
    unit: 'm³/s'
  },
  {
    title: '姚家店乡',
    value: '785.2',
    unit: 'm³/s'
  },
  {
    title: '枝城镇',
    value: '749.6',
    unit: 'm³/s'
  },
  {
    title: '陆城街道',
    value: '633',
    unit: 'm³/s'
  }
])

// const getSupplyDetail = (result: Record<string, any>) => {
//   return result?.data || result?.detail || result || {}
// }

// const toWanM3 = (value: unknown) => {
//   const numberValue = Number(value)
//   return Number.isFinite(numberValue) ? Number((numberValue / 10000).toFixed(2)) : 0
// }

// usePolling(async () => {
//   // const result: any = await service.xfqs.getGongshuiInfo({})
//   // const detail = getSupplyDetail(result)
//   // const tableData = Array.isArray(detail.tableData)
//   //   ? detail.tableData
//   //   : Array.isArray(detail.list)
//   //     ? detail.list
//   //     : []

//   // dataList.value = tableData.slice(0, 4).map((item: Record<string, any>) => ({
//   //   title: item.waterUserName || item.name || '',
//   //   value: toWanM3(item.yrW ?? item.yrSupplyW),
//   //   unit: 'm³/s'
//   // }))
//   completeRate.value = Number(detail.yrTotalW) || 0
// })
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

.swiper-section {
  width: 100%;
  height: 100%;

  :deep(.swiper-pagination) {
    bottom: 0;

    .swiper-pagination-bullet {
      margin: 0 8px;
      width: 14px;
      height: 14px;
      background: #84a8b4;
      box-shadow: 0 0 4px #98eeff;
    }

    .swiper-pagination-bullet-active {
      background: #fff;
    }
  }

  /* 中间一张：正常矩形 */
  // :deep(.swiper-slide-active img) {
  //   clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  // }

  /* 左侧一张：左侧外扩、右侧内收的梯形 */
  :deep(.swiper-slide-prev img) {
    clip-path: polygon(9% 23%, 100% 0, 100% 100%, 10% 82%);
  }

  // /* 右侧一张：与左侧对称的梯形 */
  :deep(.swiper-slide-next img) {
    clip-path: polygon(0 0, 86% 21%, 86% 82%, 0 100%);
  }
}

.average-water {
  position: relative;
  height: 320.96px;
  width: 100%;
  box-sizing: border-box;
  padding: 30px 35px;
  background: url("../assets/global/images/preview/water-total-bg.png") no-repeat;
  background-size: 100% 100%;

  .average-water__header {
    position: absolute;
    top: 68%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .average-water__content {
    display: grid;
    height: 100%;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 380px;
  }

  .average-water__title {
    font-size: 28px;
    font-family: DINAlternateBold, sans-serif;
  }

  .average-water__label {
    position: relative;
    font-family: PIngFangSC, sans-serif;
    font-size: 30px;
    text-shadow: 0 0 5px #56ebff;

    &::after {
      position: absolute;
      top: 27px;
      left: 0;
      content: "";
      background: url("../assets/global/images/preview/water-total-title-mask.png")
        no-repeat;
      background-size: 100% 100%;
      width: 133px;
      height: 9px;
    }
  }

  .average-water__value {
    color: #50fffc;
    font-size: 28px;
    font-weight: bold;
    font-family: Quantico, sans-serif;
    margin-right: 4px;
  }

  .average-water__unit {
    color: #beeeff;
    font-size: 20px;
    font-family: PingFangSC, sans-serif;
  }
}
</style>
