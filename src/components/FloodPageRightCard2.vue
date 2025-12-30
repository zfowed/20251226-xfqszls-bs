<template>
  <PageCard title="防汛物资" bg-class="right">
    <div class="page-container">
      <div class="px-[14px]">
        <div class="h-[425px]">
          <PageTable :thead-col="theadCol" :data-list="dataList" :index="true" :limit-scroll="4">
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

const theadCol = ref([
  {
    key: 'name',
    name: '物资名称'
  },
  {
    key: 'count',
    name: '数量'
  },
  {
    key: 'position',
    name: '所属部门'
  }
])
const dataList = ref<{[key:string]: any}[]>([])
usePolling(async () => {
  dataList.value = [
    { name: '救生衣', count: SeededRandom.randomNumber(10, 200), position: '后勤保障部' },
    { name: '救生圈', count: SeededRandom.randomNumber(10, 200), position: '后勤保障部' },
    { name: '绳索', count: SeededRandom.randomNumber(10, 200), position: '后勤保障部' },
    { name: '水泵', count: SeededRandom.randomNumber(10, 200), position: '设备维护部' },
    { name: '沙袋', count: SeededRandom.randomNumber(10, 200), position: '工程管理部' }
  ]
})

</script>

<style lang="scss" scoped>
.page-container {
  padding: 36px 16px;
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
