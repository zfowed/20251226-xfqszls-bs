<template>
  <PageScreen>
    <template #left>
      <SituationPageLeftCard1 class="mb-[62px]" />
      <SituationPageLeftCard2 class="mb-[62px]" />
      <SituationPageLeftCard3 />
    </template>

    <template #middle>
      <NavSide v-model="navList" class="absolute -left-[100px] top-[30px]" />
    </template>
    <template #right>
      <SituationPageRightCard11 class="mb-[40px]" />
      <SituationPageRightCard22 class="mb-[40px]" />
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
