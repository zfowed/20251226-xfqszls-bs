<template>
  <PageScreen>
    <template #left>
      <!-- <WaterPlanPageLeftCard1 class="mb-[76px]" />
      <WaterPlanPageLeftCard2 class="mb-[76px]" /> -->
      <NavSide v-model="navList" />
    </template>

    <template #middle>
      <!-- <NavSide v-model="navList" class="absolute -left-[100px] top-[30px]" /> -->
      <PlanPageMiddleCard2 class="middle-card absolute bottom-[220px] left-1/2 -translate-x-1/2" />
    </template>

    <template #right>
      <!-- <WaterPlanPageRightCard1 class="mb-[61px]" />
      <WaterPlanPageRightCard2 class="mb-[61px]" />
      <WaterPlanPageRightCard3 /> -->
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
