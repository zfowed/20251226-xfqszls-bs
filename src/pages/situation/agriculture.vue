<template>
  <PageScreen>
    <template #left>
      <AgriculturePageLeftCard11 />
      <AgriculturePageLeftCard12 />
    </template>

    <template #middle>
      <NavSide v-model="navList" class="absolute -left-[100px] top-[30px]" />
    </template>
    <template #right>
      <AgriculturePageRightCard1 class="mb-[40px]" />
      <AgriculturePageRightCard2 class="mb-[40px]" />
      <AgriculturePageRightCard3 />
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
