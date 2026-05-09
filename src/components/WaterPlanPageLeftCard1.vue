<template>
  <PageCard title="安全管理责任人" bg-class="left">
    <div class="page-container">
      <div v-for="item in dataList" :key="item.id" class="user-mb-30">
        <div class="header-title">
          <img
            src="@/assets/global/images/card-title-icon.png"
            class="w-[30px] h-[32px] mr-[9px]"
          >
          <span>{{ item.workName }}</span>
        </div>
        <div class="flex items-center">
          <img src="@/assets/global/images/flood/safe-user-icon.png">
          <div class="user-aside">
            <div class="user-aside__title">
              {{ item.userName }}
            </div>
            <div class="mb-[4px]">
              {{ item.positionName }}
            </div>
            <div>单位：{{ item.deptName }}</div>
          </div>
        </div>
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
const dataList = ref<Record<string, any>[]>([])

usePolling(async () => {
  const result: any = await service.xfqs.queryMaterialManagerList({
    pageNum: 1,
    pageSize: 1000
  })

  dataList.value = result
})
</script>

<style lang="scss" scoped>
.page-container {
  padding: 30px 40px;
  overflow: auto;
  height: 564px;
}

.header-title {
  position: relative;
  display: flex;
  align-items: center;
  font-size: 34px;
  color: #fff;
  margin-bottom: 36px;
  font-family: DINMedium, sans-serif;
}

.user-aside {
  flex: 1;
  padding: 27px;
  background: #215f9d;
  font-size: 28px;
  color: #81e6ff;

  &__title {
    font-size: 28px;
    color: #c6f3ff;
    margin-bottom: 8px;
    font-family: DINAlternateBold, sans-serif;
  }
}

.user-mb-30 {
  margin-bottom: 30px;

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
