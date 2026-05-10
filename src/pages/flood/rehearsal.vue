<template>
  <PageScreen>
    <template #left>
      <div class="middle-container">
        <NavSide v-model="navList" class="middle-nav absolute -left-[100px] top-[30px]" />
      </div>
    </template>
    <template #middle>
      <div class="middle-container">
        <FloodRehearsalPageMiddleCard1 class="middle-card absolute bottom-[220px] left-1/2 -translate-x-1/2" />
      </div>
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
