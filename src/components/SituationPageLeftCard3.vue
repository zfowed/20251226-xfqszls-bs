<template>
  <PageCard title="水库监测" bg-class="left">
    <div class="page-container">
      <div class="h-[455px]">
        <PageTable :thead-col="theadCol" :data-list="dataList" :limit-scroll="5">
          <template #name="{ row }">
            <div class="flex flex-col leading-[39.5px]">
              <span>{{ row.nameMain }}</span>
              <span class="text-[24px] text-[#BEEEFF]">{{ row.nameSub }}</span>
            </div>
          </template>

          <template #date="{ row }">
            <div class="flex flex-col items-center leading-[39.5px]">
              <span>{{ row.date }}</span>
              <span class="text-[24px] text-[#BEEEFF]">{{ row.time }}</span>
            </div>
          </template>

          <template #header-opening="{ column }">
            <div class="flex flex-col items-center leading-[39.5px]">
              <span>{{ column.name }}</span>
              <span class="text-[#BEEEFF] text-[20px]">(mm)</span>
            </div>
          </template>

          <template #header-waterBefore="{ column }">
            <div class="flex flex-col items-center leading-[39.5px]">
              <span>{{ column.name }}</span>
              <span class="text-[#BEEEFF] text-[20px]">(m)</span>
            </div>
          </template>

          <template #header-waterAfter="{ column }">
            <div class="flex flex-col items-center leading-[39.5px]">
              <span>{{ column.name }}</span>
              <span class="text-[#BEEEFF] text-[20px]">(m)</span>
            </div>
          </template>

          <template #header-size="{ column }">
            <div class="flex flex-col items-center leading-[39.5px]">
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
import { SeededRandom } from 'zf-utilz'

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
    key: 'opening',
    name: '开度',
    align: 'center'
  },
  {
    key: 'waterBefore',
    name: '闸前水位',
    align: 'center'
  },
  {
    key: 'waterAfter',
    name: '闸后水位',
    align: 'center'
  },
  {
    key: 'size',
    name: '流量',
    align: 'center'
  }
])
const dataList = ref<{[key:string]: any}[]>([])

usePolling(async () => {
  const resultList = []
  for (let i = 0; i < 15; i++) {
    resultList.push({
      nameMain: `水库${i + 1}`,
      nameSub: `编号${1000 + i + 1}`,
      date: dayjs().format('MM.DD'),
      time: dayjs().format('HH:mm'),
      opening: SeededRandom.randomNumber(10, 100),
      waterBefore: SeededRandom.randomNumber(5, 20),
      waterAfter: SeededRandom.randomNumber(3, 15),
      size: SeededRandom.randomNumber(10, 100)
    })
  }
  dataList.value = resultList
})
</script>

<style lang="scss" scoped>
.page-container {
  padding: 45px 40px;
}
</style>
