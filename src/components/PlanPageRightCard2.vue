<template>
  <PageCard title="应急响应等级" bg-class="right">
    <div class="page-container">
      <div class="btns-list">
        <div class="btns-item" v-for="btn in btnsList" :key="btn.name" :class="{ 'active': currentTypeValue === btn.value }" @click="currentTypeValue = btn.value">
          {{ btn.name }}
        </div>
      </div>
      <div v-for="item in dataList" :key="item.id" class="user-mb-30">
        <div class="flex items-center">
          <div class="user-aside">
            <div class="header-title">
              <img
                src="@/assets/global/images/card-title-icon.png"
                class="w-[30px] h-[32px] mr-[9px]"
              >
              <span>{{ item.workName }}</span>
            </div>
            <div class="mb-[10px] pl-[50px]" v-for="textItem in item.details" :key="textItem">
              {{ textItem }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">

const currentTypeValue = ref('1')
const btnsList = reactive([
  { name: 'I 级', value: '1' },
  { name: 'I I 级', value: '2' },
  { name: 'III级', value: '3' }
])

const dataList = ref<Record<string, any>[]>([])
usePolling(async () => {
  dataList.value = [{
    workName: '管理单位负责人',
    details: ['未来24小时降雨量', '未来24小时降雨量', '未来24小时降雨量']
  }, {
    workName: '应急响应措施',
    details: ['未来24小时降雨量', '未来24小时降雨量', '未来24小时降雨量']
  }]
})
</script>

<style lang="scss" scoped>
.page-container {
  padding: 30px 40px;
  overflow: auto;
  height: 664px;
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
  background: rgb(52 98 143 / 0.6);
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

.btns-list {
  display: flex;
  margin-bottom: 30px;

  .btns-item {
    display: flex;
    flex: 1;
    height: 106px;
    background: url("@/assets/global/images/plan-warning-normal.png") no-repeat center;
    background-size: 100% 100%;
    color: #58D5FF;
    font-size: 36px;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    padding-left: 40px;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }

    &.active {
      background: url("@/assets/global/images/plan-warning-active.png") no-repeat center;
      background-size: 100% 100%;
      color: #FFCA38;
    }
  }
}
</style>
