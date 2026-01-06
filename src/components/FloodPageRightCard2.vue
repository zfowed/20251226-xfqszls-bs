<template>
  <PageCard title="防汛物资" bg-class="right">
    <div class="page-container">
      <div class="px-[14px]">
        <div class="h-[425px]">
          <PageTable
            :thead-col="theadCol"
            :data-list="dataList"
            :index="true"
            :limit-scroll="4"
          >
            <template #index="scope">
              <div class="table-index">
                {{ scope.index }}
              </div>
            </template>
            <template #number="scope">
              <ZfTweenNumber :value="scope.row.number" />
            </template>
          </PageTable>
        </div>
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
const theadCol = ref([
  {
    key: 'materialName',
    name: '物资名称'
  },
  {
    key: 'number',
    name: '数量'
  },
  {
    key: 'orgName',
    name: '所属部门'
  }
])
const dataList = ref<{ [key: string]: any }[]>([])
usePolling(async () => {
  const result: any = await service.xfqs.queryMaterialList({
    pageNum: 1,
    pageSize: 1000
  })

  dataList.value = result
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
  background: url("@/components/PageTable/assets/index-bg.png") no-repeat;
  background-size: 100% 100%;
}
</style>
