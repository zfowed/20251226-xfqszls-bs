<template>
  <PageCard title="险情处置巡查情况" bg-class="right">
    <div class="page-container">
      <div v-for="item in dataList" :key="item.id" class="user-mb-30">
        <div class="flex items-center">
          <img src="@/assets/global/images/flood/safe-user-icon.png">
          <div class="user-aside">
            <div class="mb-[10px]">
              <span class="text-[#81e6ff]">巡查地点：</span>
              <span>{{ item.address }}</span>
            </div>
            <div class="mb-[10px]">
              <span class="text-[#81e6ff]">开始时间：</span>
              <span>{{ item.time }}</span>
            </div>
            <div class="flex justify-between">
              <div>
                <span class="text-[#81e6ff]">巡查时长：</span>
                <span>{{ item.duration }}</span>
              </div>
              <div>
                <span class="text-[#81e6ff]">巡查里程：</span>
                <span>{{ item.mileage }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
const dataList = ref<Record<string, any>[]>([])

usePolling(async () => {
  dataList.value = [{
    address: '东西渠道水库01',
    time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    duration: '0.5h',
    mileage: '0.6km'
  }, {
    address: '东西渠道水库01',
    time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    duration: '0.5h',
    mileage: '0.6km'
  }, {
    address: '东西渠道水库01',
    time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    duration: '0.5h',
    mileage: '0.6km'
  }]
})
</script>

<style lang="scss" scoped>
.page-container {
  padding: 30px 40px;
  overflow: auto;
  height: 734px;
}

.header-title {
  position: relative;
  display: flex;
  align-items: center;
  font-size: 34px;
  color: #fff;
  margin-bottom: 36px;
  font-family: DINMedium, sans-serif;
}

.user-aside {
  flex: 1;
  padding: 27px;
  background: rgb(52 98 143 / 0.6);
  font-size: 28px;

  // color: #81e6ff;

  &__title {
    font-size: 28px;
    color: #c6f3ff;
    margin-bottom: 8px;
    font-family: DINAlternateBold, sans-serif;
  }
}

.user-mb-30 {
  margin-bottom: 11px;

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
