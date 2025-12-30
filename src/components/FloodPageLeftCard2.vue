<template>
  <PageCard title="安全管理责任人" bg-class="left">
    <div class="page-container">
      <div v-for="item in dataList" :key="item.id" class="user-mb-30">
        <div class="header-title">
          <img src="@/assets/global/images/card-title-icon.png" class="w-[30px] h-[32px] mr-[9px]">
          <span>{{ item.title }}</span>
        </div>
        <div class="flex items-center">
          <img src="@/assets/global/images/flood/safe-user-icon.png">
          <div class="user-aside">
            <div class="user-aside__title">
              {{ item.name }}
            </div>
            <div class="mb-[4px]">
              {{ item.position }}
            </div>
            <div>单位：{{ item.unit }}</div>
          </div>
        </div>
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
const dataList = ref<Record<string, any>[]>([])

usePolling(async () => {
  dataList.value = [
    {
      id: 1,
      title: '技术负责人',
      name: '杨启林',
      position: '党委委员、副局长',
      unit: '湖北省吴岭水库管理局'
    }, {
      id: 2,
      title: '管理单位责任人',
      name: '向华军',
      position: '党委副书记、纪委书记',
      unit: '湖北省吴岭水库管理局'
    }
  ]
})

</script>

<style lang="scss" scoped>
.page-container {
  padding: 30px 40px;
}

.header-title {
  position: relative;
  display: flex;
  align-items: center;
  font-size: 34px;
  color: #FFF;
  margin-bottom: 36px;
  font-family: DINMedium, sans-serif;
}

.user-aside {
  flex: 1;
  padding: 27px;
  background: #215F9D;
  font-size: 28px;
  color: #81E6FF;

  &__title {
    font-size: 28px;
    color: #C6F3FF;
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
