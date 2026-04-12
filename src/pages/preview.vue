<template>
  <PageScreen>
    <template #left>
      <PreviewPageLeftCard1 class="mb-[75px]" />
      <PreviewPageLeftCard2 />
    </template>

    <template #middle>
      <ToolsSide class="absolute -left-[150px] bottom-[230px]" />
    </template>
    <template #right>
      <PreviewPageRightCard1 />
    </template>
  </PageScreen>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
</style>
