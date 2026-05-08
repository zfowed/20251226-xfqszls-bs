<template>
  <PageScreen>
    <template #left>
      <FloodIndexPageLeftCard1 class="mb-[50px]" />
      <FloodIndexPageLeftCard2 />
    </template>

    <template #middle>
      <div class="middle-container">
        <NavSide v-model="navList" class="middle-nav absolute -left-[100px] top-[30px]" />
        <FloodIndexPageMiddleCard1 class="middle-card absolute bottom-[200px] left-1/2 -translate-x-1/2" />
      </div>
    </template>

    <template #right>
      <FloodIndexPageRightCard1 class="mb-[50px]" />
      <FloodIndexPageRightCard2 />
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
.middle-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.middle-nav {
  z-index: 10;
}

.middle-card {
  z-index: 5;
}
</style>
