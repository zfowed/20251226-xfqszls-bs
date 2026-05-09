<template>
  <PageScreen>
    <template #left>
      <!-- <IndustryPageLeftCard1 class="mb-[62px]" />
      <IndustryPageLeftCard2 /> -->
      <IndustryPageLeftCard11 class="mb-[62px]" />
      <IndustryPageLeftCard12 />
    </template>

    <template #middle>
      <NavSide v-model="navList" class="absolute -left-[100px] top-[30px]" />
    </template>
    <template #right>
      <SituationPageRightCard1 class="mb-[40px]" />
      <!-- <IndustryPageRightCard2 class="mb-[40px]" /> -->
      <SituationPageRightCard3 />
    </template>
  </PageScreen>
</template>

<script setup lang="ts">
const navList = ref<Record<string, any>[]>([
  { name: '雨水情', path: '/situation' },
  { name: '农情', path: '/situation/agriculture' },
  { name: '工情', path: '/situation/industry' }
])
</script>

<style lang="scss" scoped>
</style>
