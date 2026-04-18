<template>
  <PageCard title="水库调度" bg-class="right">
    <div class="page-container">
      <div class="h-[414px] flex">
        <VideoPlay
          :src="monitorUrl"
          :controls="true"
          :muted="true"
          :loop="false"
          ratio="16:9"
          empty-text="正在加载中"
          class="flex-1 mr-[16px]"
        />
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">

const currentPlayMonitorId = ref<string>('')
const monitorUrl = ref<string>('')
const playList = ref<any[]>([])

onMounted(async () => {
  const videoResult: any = await service.xfqs.getVideoStationList({})
  playList.value = videoResult

  if (playList.value.length > 0) {
    const channelUrl: any = await service.xfqs.getVideoUrl({ stcd: playList.value[0].stcd })
    currentPlayMonitorId.value = playList.value[0].stcd
    monitorUrl.value = channelUrl
  }
})

</script>

<style lang="scss" scoped>
.page-container {
  padding: 35px 32px;
}

.monitor-section {
  flex: 0 0 378px;
  color: #81E6FF;
  font-size: 30px;
  font-family: "PingFang SC", sans-serif;
  overflow: auto;

  .monitor-item {
    padding-bottom: 13px;
    margin-bottom: 20px;
    border-bottom: 2px dotted rgb(217 231 255 / 0.2);
    cursor: pointer;

    &:hover,
    &.active {
      color: #fff;
    }

    &:last-child {
      margin-bottom: 0;
      border-bottom: none;
    }
  }
}
</style>
