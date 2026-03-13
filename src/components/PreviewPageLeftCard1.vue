<template>
  <PageCard title="灌区信息" bg-class="left">
    <div class="page-container">
      <div class="header-title">
        灌区概述
      </div>
      <div class="details-text">
        熊渡水库位于宜都市聂家河镇境内、长江二级支流渔洋河中下游，系渔洋河流域梯级开发的龙头水库。水库总库容9552万m³，大坝为常态混凝土单曲拱坝，最大坝高74m，属Ⅲ等中型水库，主要建筑物级别为3级。
      </div>
      <div class="h-[245px] mb-[65px]">
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
            <span class="average-water__unit">万m3</span>
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

const completeRate = ref(0)
const dataList = reactive([
  { title: '钱塘江', value: 0, unit: '万m3' },
  { title: '石河镇', value: 0, unit: '万m3' },
  { title: '雁门口', value: 0, unit: '万m3' },
  { title: '九真镇', value: 0, unit: '万m3' }
])

usePolling(async () => {
  dataList[0].value = 113.9
  dataList[1].value = 785.2
  dataList[2].value = 749.6
  dataList[3].value = 633
  completeRate.value = 3282.5

  // completeRate.value = dataList.reduce((sum, item) => sum + item.value, 0)
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
