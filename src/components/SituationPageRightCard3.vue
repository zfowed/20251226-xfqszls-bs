<template>
  <PageCard title="工程监控" bg-class="right">
    <div class="page-container">
      <div class="h-[488px]">
        <VideoPlay
          :src="monitorUrl"
          :controls="true"
          :muted="true"
          :loop="false"
          ratio="16:9"
          empty-text="正在加载中"
        />
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">

const monitorUrl = ref<string>('')
usePolling(async () => {
  const videoResult: any = await service.xfqs.getVideoStationList({})
  console.log(videoResult)

  monitorUrl.value = 'https://media.w3.org/2010/05/sintel/trailer.mp4'
})

</script>

<style lang="scss" scoped>
.page-container {
  padding: 35px 32px 46px;
}

</style>
