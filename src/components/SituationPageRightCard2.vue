<template>
  <PageCard title="工程巡检" bg-class="right">
    <div class="page-container">
      <div class="h-[640px]">
        <PageTable :thead-col="theadCol" :data-list="dataList" :limit-scroll="6">
          <template #code="scope">
            <span class="text-[#fff]">{{ scope.row.code }}</span>
          </template>
          <template #type="scope">
            <span class="text-[#fff]">{{ scope.row.type }}</span>
          </template>
          <template #status="scope">
            <span class="text-[#fff]">{{ scope.row.status }}</span>
          </template>
        </PageTable>
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">

const theadCol = ref([
  {
    key: 'name',
    name: '闸门'
  },
  {
    key: 'code',
    name: '桩号',
    width: '220'
  },
  {
    key: 'type',
    name: '类型',
    width: '150'
  },
  {
    key: 'status',
    name: '状态',
    width: '100'
  }
])
const dataList = ref<{[key:string]: any}[]>([])
usePolling(async () => {
  const resultList = []
  for (let i = 0; i < 20; i++) {
    resultList.push({
      name: `龚湾节制闸127${i + 1}`,
      code: `ZMN-${1000 + i}`,
      type: i % 2 === 0 ? '节制闸' : '节制闸',
      status: i % 2 === 0 ? '开' : '关'
    })
  }
  dataList.value = resultList
})

</script>

<style lang="scss" scoped>
.page-container {
  padding: 35px 32px 32px;
}

</style>
