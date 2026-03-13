<template>
  <div id="flvVideoId" ref="flvVideoRef" />
</template>

<script lang="ts" setup>
import Player from 'xgplayer'
import flvPlugin from 'xgplayer-flv'
import 'xgplayer/dist/index.min.css'

const props = withDefaults(defineProps<{
  src: string
  controls: boolean
  muted: boolean
  loop: boolean
}>(), {
  src: '',
  controls: true,
  muted: true,
  loop: false
})

const flvPlayer = ref<any>(null)

function handleVideoPlay () {
  const src = props.src
  if (!src) return
  if (flvPlugin.isSupported()) {
    flvPlayer.value = new Player({
      id: 'flvVideoId',
      isLive: true,
      autoplay: true,
      autoplayMuted: true, // autoplay要加上autoplayMuted才会自动播放
      muted: true,
      plugins: [flvPlugin],
      url: props.src,
      height: '100%',
      width: '100%'
    })
  }
}

function handleVideoDestroy () {
  flvPlayer.value?.destroy()
  flvPlayer.value = null
}

watch(() => props.src, () => {
  handleVideoPlay()
})

onMounted(handleVideoPlay)
onBeforeUnmount(handleVideoDestroy)
</script>
