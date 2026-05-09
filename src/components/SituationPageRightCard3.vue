<template>
  <PageCard title="工程监控" bg-class="right">
    <div class="monitor-video-card">
      <div class="monitor-video-card__header">
        <ElSelect
          v-model="selectedVideoId"
          class="monitor-video-card__select my-[20px]"
          popper-class="monitor-video-card__select-popper"
          placeholder="请选择视频站"
          @change="handleVideoChange"
        >
          <ElOption
            v-for="item in playList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </ElSelect>
      </div>

      <div class="monitor-video-card__video-shell">
        <VideoPlay
          :src="monitorUrl"
          :controls="true"
          :muted="true"
          :loop="false"
          ratio=""
          empty-text="正在加载中"
          class="monitor-video-card__video"
        />
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
type VideoItem = {
  id: string
  name: string
  stcd?: string
}

const currentPlayMonitorId = ref<string>('')
const selectedVideoId = ref<string>('video-station-1')
const monitorUrl = ref<string>('')
const playList = ref<VideoItem[]>([
  { id: 'video-station-1', name: '视频站01' },
  { id: 'video-station-2', name: '视频站02' },
  { id: 'video-station-3', name: '视频站03' }
])

const currentVideoItem = computed(() => {
  return playList.value.find(item => item.id === selectedVideoId.value) || playList.value[0]
})

onMounted(async () => {
  const videoResult: any[] = await service.xfqs.getVideoStationList({})

  if (videoResult?.length) {
    playList.value = videoResult.slice(0, 3).map((item: any, index: number) => ({
      id: item.stcd || `video-station-${index + 1}`,
      stcd: item.stcd,
      name: item.stnm || `视频站0${index + 1}`
    }))
    selectedVideoId.value = playList.value[0].id
    await updateCurrentVideoUrl(playList.value[0])
  }
})

async function handleVideoChange () {
  if (!currentVideoItem.value) return
  await updateCurrentVideoUrl(currentVideoItem.value)
}

async function updateCurrentVideoUrl (item: VideoItem) {
  if (!item?.stcd) {
    monitorUrl.value = ''
    return
  }

  currentPlayMonitorId.value = item.stcd
  const result: any = await service.xfqs.getVideoUrl({ stcd: item.stcd })
  monitorUrl.value = result || ''
}
</script>

<style lang="scss" scoped>
.monitor-video-card {
  padding: 10px 12px 14px;
}

.monitor-video-card__header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 14px;
}

.monitor-video-card__select {
  width: 378px;
}

.monitor-video-card__video-shell {
  height: 404px;
  padding: 6px;
  background: linear-gradient(180deg, rgb(143 245 255 / 0.96) 0%, rgb(109 208 245 / 0.86) 100%);
  box-shadow:
    0 0 0 1px rgb(152 238 255 / 0.35),
    0 0 22px rgb(104 216 255 / 0.14);
}

.monitor-video-card__video {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: rgb(6 22 36 / 0.72);
}

:deep(.monitor-video-card__video .video__inner) {
  object-fit: cover;
}

:deep(.monitor-video-card__video .video__error) {
  color: rgb(234 246 255 / 0.86);
  font-size: 18px;
  background: linear-gradient(180deg, rgb(16 65 110 / 0.82) 0%, rgb(8 36 69 / 0.78) 100%);
}

:deep(.monitor-video-card__select .el-select__wrapper) {
  min-height: 40px;
  padding: 0 16px;
  background: linear-gradient(180deg, rgb(20 74 122 / 0.72) 0%, rgb(7 42 83 / 0.76) 100%);
  border-radius: 0;
  box-shadow:
    inset 0 0 0 1px rgb(106 197 255 / 0.36),
    inset 0 0 16px rgb(72 182 255 / 0.14),
    0 0 0 1px rgb(79 164 219 / 0.56);
}

:deep(.monitor-video-card__select .el-select__wrapper.is-focused) {
  box-shadow:
    inset 0 0 0 1px rgb(116 219 255 / 0.5),
    inset 0 0 20px rgb(87 198 255 / 0.18),
    0 0 0 1px rgb(106 197 255 / 0.72);
}

:deep(.monitor-video-card__select .el-select__selection) {
  min-height: 40px;
}

:deep(.monitor-video-card__select .el-select__placeholder),
:deep(.monitor-video-card__select .el-select__selected-item),
:deep(.monitor-video-card__select .el-select__input-text) {
  color: #dff5ff;
  font-size: 18px;
  font-family: PingFangSC, sans-serif;
  font-weight: 600;
}

:deep(.monitor-video-card__select .el-select__placeholder) {
  color: rgb(223 245 255 / 0.7);
}

:deep(.monitor-video-card__select .el-select__caret) {
  color: #86eaff;
  font-size: 18px;
  font-weight: 700;
}

:global(.monitor-video-card__select-popper.el-popper) {
  background: linear-gradient(180deg, rgb(11 43 82 / 0.96) 0%, rgb(6 28 56 / 0.96) 100%);
  border: 1px solid rgb(96 192 255 / 0.32);
  border-radius: 0;
  box-shadow: 0 10px 24px rgb(3 14 30 / 0.42);
}

:global(.monitor-video-card__select-popper .el-popper__arrow) {
  display: none;
}

:global(.monitor-video-card__select-popper .el-select-dropdown__item) {
  height: 36px;
  padding: 0 16px;
  color: rgb(223 245 255 / 0.88);
  font-size: 16px;
  font-family: PingFangSC, sans-serif;
  line-height: 36px;
}

:global(.monitor-video-card__select-popper .el-select-dropdown__item.is-hovering),
:global(.monitor-video-card__select-popper .el-select-dropdown__item.is-selected) {
  background: rgb(71 154 217 / 0.24);
  color: #eefbff;
}
</style>
