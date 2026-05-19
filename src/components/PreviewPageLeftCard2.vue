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
          <span>幸福渠灌区</span>
          <!-- <span class="header-title__tag">西干果</span> -->
        </div>
        <div class="table-wrap">
          <PageTable
            class="rehearsal-table"
            :thead-col="currentType === 'ecology' ? theadCol2 : theadCol"
            :data-list="dataList"
            :index="true"
            :limit-scroll="7"
          >
            <template #index="scope">
              <div class="table-index">
                {{ scope.index }}
              </div>
            </template>
            <template #area="scope">
              <span class="area-num">
                <ZfTweenNumber :value="Number(scope.row.area)" />
              </span>
              <span class="area-unit">亩</span>
            </template>
          </PageTable>
        </div>
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
// import { SeededRandom } from 'zf-utilz'

const currentType = ref<string>('agriculture')
const btnsList = reactive([
  { label: '农业灌溉供水', value: 'agriculture', active: true }
  // { label: '城镇生活供水', value: 'town', active: false },
  // { label: '生态环境供水', value: 'ecology', active: false }
])
const clickOperationHandle = (item: Record<string, any>) => {
  btnsList.forEach(btnsItem => {
    btnsItem.active = false
  })
  item.active = true
  currentType.value = item.value
  tablePolling.trigger()
}

const theadCol = ref([
  {
    key: 'name',
    name: '行政村名称'
  },
  {
    key: 'area',
    name: '有效灌溉面积',
    align: 'center'
  }
])

const theadCol2 = ref([
  {
    key: 'stw',
    name: '生态水量（m³）'
  },
  {
    key: 'time',
    name: '日期'
  }
])
const dataList = ref<{[key:string]: any}[]>([])

const tablePolling = usePolling(async () => {
  // const resultList = []
  // for (let i = 0; i < 20; i++) {
  //   resultList.push({
  //     name: `灌区${i + 1}`,
  //     effective: `${SeededRandom.randomNumber(4, 20)}`,
  //     actual: `${SeededRandom.randomNumber(4, 20)}`
  //   })
  // }
  let result: any = []
  if (currentType.value === 'agriculture') {
    result = await service.xfqs.findWaterUserList({})
  } else if (currentType.value === 'ecology') {
    result = await service.xfqs.getFactoryRealData({})
  } else if (currentType.value === 'town') {
    result = []
  }

  dataList.value = result.list || []
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
  color: #fff;
  font-family: JiangChengHeiTi, 'Alibaba PuHuiTi 2.0', sans-serif;
  font-size: 36px;
  font-weight: 600;
  line-height: 59.61px;
  background: url('@/components/PageTable/assets/index-bg.png') no-repeat;
  background-size: 100% 100%;
}

.table-wrap {
  height: 520px;
}

.area-num {
  font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
  font-size: 30px;
}

.area-unit {
  margin-left: 6px;
  color: #beeeff;
  font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
  font-size: 24px;
}

.rehearsal-table {
  height: 100%;

  :deep(.table-header__tr) {
    font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
    font-size: 30px;
    font-weight: 500;
  }

  :deep(.table-body__th) {
    font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
    font-size: 30px;
  }

  :deep(.table-body__tr:nth-child(3)) {
    color: #fff;
    background: linear-gradient(0deg, rgb(0 132 255 / 0.52), rgb(30 83 132 / 0.52));
  }

  :deep(.table-body__tr:nth-child(3) .table-body__th) {
    color: #fff;
  }

  :deep(.table-body__tr:nth-child(3) .area-unit) {
    color: #fff;
  }

  :deep(.table-body__tr:nth-child(3):hover) {
    color: #fff;
    background: linear-gradient(0deg, rgb(0 132 255 / 0.52), rgb(30 83 132 / 0.52));
  }
}
</style>
