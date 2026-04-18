<template>
  <PageScreen>
    <template #left>
      <FloodRehearsalPageLeftCard1 class="mb-[76px]" />
      <FloodRehearsalPageLeftCard2 />
    </template>

    <template #middle>
      <NavSide v-model="navList" class="absolute -left-[100px] top-[30px]" />
    </template>

    <template #right>
      <FloodRehearsalPageRightCard1 class="mb-[61px]" />
    </template>
  </PageScreen>
</template>

<script setup lang="ts">
const navList = ref<Record<string, any>[]>([
  { name: '预报', path: '/flood' },
  { name: '预警', path: '/flood/advance' },
  { name: '预演', path: '/flood/rehearsal' },
  { name: '预案', path: '/flood/plan' }
])
</script>

<style lang="scss" scoped>
</style>
