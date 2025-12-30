<template>
  <PageCard title="预案调令" bg-class="right">
    <div class="page-container">
      <div class="flex items-center mb-[30px]">
        <div class="mr-[25px]">
          {{ todayTime }}
        </div>
        <div class="flex items-center">
          <div class="triangle-right1 mr-[15px]" />
          <div class="triangle-right2 mr-[15px]" />
          <div class="triangle-right3" />
        </div>
      </div>

      <div>
        <Swiper
          :modules="[Autoplay]"
          :loop="true"
          :slides-per-view="1.9"
          :space-between="30"
          :autoplay="{ delay: 3000 }"
          :centered-slides="true"
          class="swiper-section"
        >
          <SwiperSlide v-for="item in swiperDataList" :key="item.id">
            <img :src="item.image" class="swiper-img">
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper'
// @ts-ignore: Swiper CSS has no type declarations
import 'swiper/css'

const getPhotoUrl = (icon: string) => {
  return new URL(`../assets/global/images/preview/${icon}.png`, import.meta.url).href
}

const todayTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
const swiperDataList = ref([
  { id: 1, image: getPhotoUrl('swiper-image1') },
  { id: 2, image: getPhotoUrl('swiper-image1') },
  { id: 3, image: getPhotoUrl('swiper-image1') },
  { id: 4, image: getPhotoUrl('swiper-image1') },
  { id: 5, image: getPhotoUrl('swiper-image1') }
])
</script>

<style lang="scss" scoped>
.page-container {
  padding: 45px 35px;
}

.triangle-right1 {
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 13px solid #1FC6FF;
}

.triangle-right2 {
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 13px solid rgb(31 198 255 / 0.72);
}

.triangle-right3 {
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 13px solid rgb(31 198 255 / 0.32);
}

.swiper-section {
  width: 100%;
  height: 100%;

  /* Swiper 图片大小控制 */
  :deep(.swiper-img) {
    height: 420px;
    max-width: 100%;
    max-height: 100%;
    display: block;
    margin: 0 auto;
  }

  :deep(.swiper-wrapper) {
    /* 中间被激活的 slide 放大并置于最上层 */
    .swiper-slide-active {
      transform: scale(1.18) ;
    }

    /* 两侧 slide 稍微缩小，产生层次感 */
    .swiper-slide-prev,
    .swiper-slide-next {
      transform: scale(0.82) ;
    }
  }
}

</style>
