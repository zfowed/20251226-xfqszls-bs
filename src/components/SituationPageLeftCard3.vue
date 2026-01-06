<template>
  <PageCard title="水库监测" bg-class="left">
    <div class="page-container">
      <div class="h-[507px]">
        <PageTable :thead-col="theadCol" :data-list="dataList" :limit-scroll="5">
          <template #name="{ row }">
            <div class="flex flex-col leading-[45.5px]">
              <span>{{ row.stnm }}</span>
              <span class="text-[24px] text-[#BEEEFF]">{{ row.stcd }}</span>
            </div>
          </template>

          <template #date="{ row }">
            <div class="flex flex-col items-center leading-[45.5px]">
              <span>{{ row.tm ? dayjs(row.tm).format('MM.DD') : '' }}</span>
              <span class="text-[24px] text-[#BEEEFF]">{{ row.tm ? dayjs(row.tm).format('HH:mm') : '' }}</span>
            </div>
          </template>

          <template #header-gtophgt="{ column }">
            <div class="flex flex-col items-center leading-[45.5px]">
              <span>{{ column.name }}</span>
              <span class="text-[#BEEEFF] text-[20px]">(mm)</span>
            </div>
          </template>

          <template #header-inz="{ column }">
            <div class="flex flex-col items-center leading-[45.5px]">
              <span>{{ column.name }}</span>
              <span class="text-[#BEEEFF] text-[20px]">(m)</span>
            </div>
          </template>

          <template #header-otz="{ column }">
            <div class="flex flex-col items-center leading-[45.5px]">
              <span>{{ column.name }}</span>
              <span class="text-[#BEEEFF] text-[20px]">(m)</span>
            </div>
          </template>

          <template #header-sq="{ column }">
            <div class="flex flex-col items-center leading-[45.5px]">
              <span>{{ column.name }}</span>
              <span class="text-[#BEEEFF] text-[20px]">(m³/s)</span>
            </div>
          </template>
        </PageTable>
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

const theadCol = ref([
  {
    key: 'name',
    name: '名称',
    width: 130
  },
  {
    key: 'date',
    name: '时间',
    width: 100,
    align: 'center'
  },
  {
    key: 'gtophgt',
    name: '开度',
    align: 'center'
  },
  {
    key: 'inz',
    name: '闸前水位',
    align: 'center'
  },
  {
    key: 'otz',
    name: '闸后水位',
    align: 'center'
  },
  {
    key: 'sq',
    name: '流量',
    align: 'center'
  }
])
const dataList = ref<{ [key: string]: any }[]>([])

usePolling(async () => {
  const result: any = await service.xfqs.getGatePageList({
    start: 1,
    limit: 1000,
    sttp: 'DD'
  })
  dataList.value = result.list
})
</script>

<style lang="scss" scoped>
.page-container {
  padding: 45px 40px;
}
</style>
