<template>
  <div class="video" :class="`video--${props.ratio}`">
    <VideoPlayHls v-if="usePlusType === 'hls'" class="video__inner" :src="props.src" :controls="props.controls" :muted="props.muted" :loop="props.loop" />
    <VideoPlayFlv v-else-if="usePlusType === 'flv'" class="video__inner" :src="props.src" :controls="props.controls" :muted="props.muted" :loop="props.loop" />
    <video v-else-if="props.src" class="video__inner" :src="props.src" :controls="props.controls" :muted="props.muted" :loop="props.loop" autoplay />
    <div v-else class="video__error">
      <span>{{ props.emptyText }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>

const props = withDefaults(defineProps<{
  src: string
  controls: boolean
  muted: boolean
  loop: boolean
  ratio: string,
  // ratio: '16x9' | '4x3',
  emptyText: string
}>(), {
  src: '',
  controls: true,
  muted: true,
  loop: false,
  ratio: '',
  emptyText: '视频地址为空'
})

const usePlusType = computed(() => {
  let plusValue = ''
  if (props.src.includes('.m3u8')) {
    plusValue = 'hls'
  } else if (props.src.includes('.flv')) {
    plusValue = 'flv'
  }
  return plusValue
})
</script>

<style lang="scss" scope>
.video {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;

  &--16x9 {
    padding-bottom: 56.25%;
  }

  &--4x3 {
    padding-bottom: 75%;
  }

  &__inner {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    display: block;
    width: 100%;
    height: 100%;
  }

  &__error {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: #fff;
    font-size: 18px;
    background-color: #363636;
  }
}

</style>
