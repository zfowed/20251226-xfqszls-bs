<template>
  <PageCard title="预案调度令" bg-class="right">
    <div class="page-container">
      <section v-for="item in dispatchList" :key="item.id" class="dispatch-block">
        <div class="dispatch-time">
          <img src="@/assets/global/images/plan-icon.png" class="time-icon">
          <span>{{ item.time }}</span>
        </div>
        <div class="dispatch-files">
          <div v-for="file in item.details" :key="file" class="dispatch-file">
            <img src="@/assets/global/images/plan-photo.png" alt="调度令">
          </div>
        </div>
      </section>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { usePolling } from 'zf-dbs'
import { ref } from 'vue'

interface DispatchItem {
  id: string
  time: string
  details: string[]
}

const dispatchList = ref<DispatchItem[]>([])

usePolling(async () => {
  dispatchList.value = [
    {
      id: 'dispatch-order-1',
      time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      details: ['order-1', 'order-2', 'order-3']
    }
  ]
})
</script>

<style lang="scss" scoped>
.page-container {
  height: 424px;
  padding: 30px 40px;
  overflow: auto;
  box-sizing: border-box;
}

.dispatch-block {
  &:not(:last-child) {
    margin-bottom: 30px;
  }
}

.dispatch-time {
  display: flex;
  align-items: center;
  margin-bottom: 35px;
  color: #fff;
  font-size: 30px;
  line-height: 1;
  font-family: DINMedium, sans-serif;
}

.time-icon {
  margin-right: 30px;
}

.dispatch-files {
  display: flex;
  gap: 20px;
}

.dispatch-file {
  padding: 11px 11px 5px;
  background: #1fc6ff;
}
</style>
