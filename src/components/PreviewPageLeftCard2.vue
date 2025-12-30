<template>
  <PageCard title="服务对象" bg-class="left">
    <div class="page-container">
      <div class="grid grid-cols-3 gap-[39px] mb-[40px]">
        <div class="operation-btns" :class="{ active: btnsItem.active }" v-for="btnsItem in btnsList" :key="btnsItem.value" @click="clickOperationHandle(btnsItem)">
          {{ btnsItem.label }}
        </div>
      </div>
      <div class="px-[14px]">
        <div class="header-title">
          <img src="@/assets/global/images/card-title-icon.png" class="w-[30px] h-[32px] mr-[9px]">
          <span>灌区概述</span>
          <span class="header-title__tag">西干果</span>
        </div>
        <div class="h-[640px]">
          <PageTable :thead-col="theadCol" :data-list="dataList" :index="true" :limit-scroll="5">
            <template #index="scope">
              <div class="table-index">
                {{ scope.index }}
              </div>
            </template>
            <template #effective="scope">
              <ZfTweenNumber :value="scope.row.effective" />
              <span class="text-[24px] text-[#BEEEFF] ml-[14px]">万亩</span>
            </template>
            <template #actual="scope">
              <ZfTweenNumber :value="scope.row.actual" />
              <span class="text-[24px] text-[#BEEEFF] ml-[14px]">万亩</span>
            </template>
          </PageTable>
        </div>
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
import { SeededRandom } from 'zf-utilz'

const btnsList = reactive([
  { label: '农业灌溉供水', value: 'agriculture', active: true },
  { label: '城镇生活供水', value: 'town', active: false },
  { label: '生态环境供水', value: 'ecology', active: false }
])
const clickOperationHandle = (item: Record<string, any>) => {
  btnsList.forEach(btnsItem => {
    btnsItem.active = false
  })
  item.active = true
  tablePolling.trigger()
}

const theadCol = ref([
  {
    key: 'name',
    name: '灌区名称'
  },
  {
    key: 'effective',
    name: '有效灌溉面积'
  },
  {
    key: 'actual',
    name: '实灌面积'
  }
])
const dataList = ref<{[key:string]: any}[]>([])

const tablePolling = usePolling(async () => {
  const resultList = []
  for (let i = 0; i < 20; i++) {
    resultList.push({
      name: `灌区${i + 1}`,
      effective: `${SeededRandom.randomNumber(4, 20)}`,
      actual: `${SeededRandom.randomNumber(4, 20)}`
    })
  }
  dataList.value = resultList
})

</script>

<style lang="scss" scoped>
.page-container {
  padding: 36px 16px;
}

.header-title {
  position: relative;
  display: flex;
  align-items: center;
  font-size: 34px;
  color: #FFF;
  margin-bottom: 36px;
  font-family: DINMedium, sans-serif;

  .header-title__tag {
    position: relative;
    color: #A3C9D5;
    font-size: 34px;
    margin-left: 20px;
    padding-left: 20px;

    &::before {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      content: "";
      border-left: 2px solid transparent;
      border-image: linear-gradient(180deg, rgb(217 217 217 / 0), #89D6FF, rgb(217 217 217 / 0)) 1;
      height: 30px;
    }
  }
}

.operation-btns {
  height: 83px;
  line-height: 83px;
  text-align: center;
  font-family: DINMedium, sans-serif;
  font-size: 30px;
  background: url('@/assets/global/images/preview/btn-operation.png') no-repeat;
  background-size: 100% 100%;
  transition: all 0.3s;
  cursor: pointer;

  &.active {
    background: url('@/assets/global/images/preview/btn-operation-active.png') no-repeat;
    background-size: 100% 100%;
  }
}

.table-index {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 49.68px;
  height: 59.61px;
  line-height: 59.61px;
  color: #fff;
  font-size: 40px;
  font-weight: bold;
  background: url('@/components/PageTable/assets/index-bg.png') no-repeat;
  background-size: 100% 100%;
}
</style>
