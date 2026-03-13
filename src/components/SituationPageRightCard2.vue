<template>
  <PageCard title="水闸状态" bg-class="right">
    <div class="page-container">
      <div class="h-[455px]">
        <PageTable :thead-col="theadCol" :data-list="dataList" :limit-scroll="6">
          <template #code="scope">
            <span class="text-[#fff]">{{ scope.row.code }}</span>
          </template>
          <template #type="scope">
            <span class="text-[#fff]">{{ scope.row.type }}</span>
          </template>
          <template #status="scope">
            <span class="text-[#fff]" v-if="scope.row.status === 'offline'">离线</span>
            <span class="text-[#65eb2b]" v-else-if="scope.row.status === 'on'">开</span>
            <span class="text-[#ff0a0a]" v-else-if="scope.row.status === 'off'">关</span>
          </template>
        </PageTable>
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
const theadCol = ref([
  {
    key: 'stnm',
    name: '闸门'
  },
  {
    key: 'pipleNo',
    name: '桩号',
    width: '150'
  },
  {
    key: 'channelName',
    name: '所属渠道',
    width: '220'
  },
  {
    key: 'status',
    name: '状态',
    width: '100'
  }
])
const dataList = ref<{ [key: string]: any }[]>([])
usePolling(async () => {
  const result: any = await service.xfqs.getGatePageList({
    start: 1,
    limit: 1000,
    sttp: 'DD'
  })
  for (const element of result.list) {
    if (!element.gtophgt) {
      element.status = 'offline'
    } else if (element.gtophgt >= 0.1) {
      element.status = 'on'
    } else if (element.gtophgt < 0.1) {
      element.status = 'off'
    }
  }
  dataList.value = result.list
})
</script>

<style lang="scss" scoped>
.page-container {
  padding: 35px 32px 32px;
}
</style>
