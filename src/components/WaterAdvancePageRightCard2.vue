<template>
  <PageCard title="预警监测" bg-class="right">
    <div class="page-container">
      <div class="grid grid-cols-2 gap-col-[29px] gap-row-[59px] mb-[40px] h-[538px] overflow-auto">
        <div class="h-[209px]" v-for="item in playList" :key="item.stcd">
          <VideoPlay
            :src="item.channelUrl"
            :controls="true"
            :muted="true"
            :loop="false"
            ratio="16:9"
            empty-text="正在加载中"
            class="flex-1 mr-[16px]"
          />
          <div class="monitor-label">
            {{ item.stnm }}
          </div>
        </div>
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">

const playList = ref<any[]>([])

onMounted(async () => {
  const videoResult: any = await service.xfqs.getVideoStationList({})
  playList.value = videoResult

  if (playList.value.length > 0) {

    // for (const element of playList.value) {
    //   element.channelUrl = await service.xfqs.getVideoUrl({ stcd: element.stcd })
    // }
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

.monitor-label {
  height: 44px;
  background: rgb(75 90 91 / 0.81);
  padding: 0 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
