<template>
  <PageCard title="预案调度令" bg-class="right">
    <div class="page-container">
      <div v-for="value in dataList" :key="value.id">
        <div class="mb-[35px] flex items-center">
          <img src="@/assets/global/images/plan-icon.png" class="mr-[30px]">
          <span>{{ value.time }}</span>
        </div>
        <div class="flex">
          <div v-for="planItem in value.details" :key="planItem" class="plan-item">
            <img src="@/assets/global/images/plan-photo.png">
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
    time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    details: ['1', '2', '3']
  }]
})
</script>

<style lang="scss" scoped>
.page-container {
  padding: 30px 40px;
  overflow: auto;
  height: 424px;
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

.plan-item {
  background: #1FC6FF;
  margin-right: 20px;
  padding: 11px 11px 5px;

  &:last-child {
    margin-right: 0;
  }
}

</style>
