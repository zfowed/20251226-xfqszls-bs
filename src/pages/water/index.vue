<template>
  <PageScreen>
    <template #left>
      <WaterIndexPageLeftCard11 class="mb-[76px]" />
      <WaterIndexPageLeftCard12 class="mb-[76px]" />
      <!-- <WaterIndexPageLeftCard3 /> -->
    </template>

    <template #middle>
      <NavSide v-model="navList" class="absolute -left-[100px] top-[30px]" />
    </template>

    <template #right>
      <WaterIndexPageRightCard1 class="mb-[61px]" />
      <!-- <WaterIndexPageRightCard2 class="mb-[61px]" /> -->
      <!-- <WaterIndexPageRightCard3 /> -->
    </template>
  </PageScreen>
</template>

<script setup lang="ts">
const navList = ref<Record<string, any>[]>([
  { name: '预报', path: '/water' },
  { name: '预警', path: '/water/advance' },
  { name: '预演', path: '/water/rehearsal' },
  { name: '预案', path: '/water/plan' },
  { name: '执行', path: '/water/execute' }
])
</script>
