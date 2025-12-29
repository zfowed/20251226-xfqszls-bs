<template>
  <video ref="videoRef" :controls="props.controls" :muted="props.muted" :loop="props.loop" autoplay />
</template>

<script lang="ts" setup>
import Hls from 'hls.js'

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

const loading = ref(false)
const videoRef = ref<HTMLMediaElement | null>(null)
const hls = ref<Hls | null>(null)

function handleVideoPlay () {
  const src = props.src
  const videoEl = videoRef.value
  if (!src || !videoEl) return

  handleVideoDestroy()

  if (Hls.isMSESupported()) {
    loading.value = true
    hls.value = new Hls({
      enableWorker: true
      // workerPath: './assets/lib/hls.worker.js'
    })
    hls.value.loadSource(src)
    hls.value.attachMedia(videoEl as any)
    hls.value.on(Hls.Events.MEDIA_ATTACHED, function () {
      videoRef.value?.play()
      loading.value = false
    })
    hls.value.on(Hls.Events.ERROR, function (event: any, data: any) {
      console.log('hls error:', event, data)
      loading.value = false
    })
  }
}

function handleVideoDestroy () {
  hls.value?.destroy()
  hls.value = null
}

watch(() => props.src, () => {
  handleVideoPlay()
})

onMounted(handleVideoPlay)
onBeforeUnmount(handleVideoDestroy)
</script>
