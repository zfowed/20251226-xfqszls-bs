<template>
  <PageScreen>
    <template #left>
      <!-- <WaterIndexPageLeftCard1 class="mb-[76px]" />
      <WaterRehearsalPageLeftCard2 /> -->
      <NavSide v-model="navList" />
    </template>

    <template #middle>
      <WaterRehearsalPageMiddleCard1 class="middle-card absolute bottom-[220px] left-1/2 -translate-x-1/2" />
    </template>

    <template #right>
      <!-- <WaterRehearsalPageRightCard1 class="mb-[61px]" />
      <WaterRehearsalPageRightCard2 class="mb-[61px]" />
      <WaterRehearsalPageRightCard3 /> -->
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
