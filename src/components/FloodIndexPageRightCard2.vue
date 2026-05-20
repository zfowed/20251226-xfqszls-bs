<template>
  <PageCard title="预报数据" bg-class="right">
    <div class="page-container">
      <div class="forecast-table-wrap">
        <PageTable
          class="forecast-table"
          :thead-col="theadCol"
          :data-list="dataList"
          :limit-scroll="5"
        />
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
type ForecastItem = {
  tm?: string
  z?: number | string | null
  q?: number | string | null
}

type ForecastTableRow = {
  time: string
  inflow: string
  damLevel: string
}

const theadCol = ref([
  { key: 'time', name: '时间', width: 260, align: 'center' },
  { key: 'inflow', name: '入库流量', align: 'center' },
  { key: 'damLevel', name: '坝上水位', align: 'center' }
])

const dataList = ref<ForecastTableRow[]>([])

const formatTime = (value: unknown) => {
  return value ? String(value).slice(5, 16) : '-'
}

const formatNumber = (value: unknown) => {
  const numberValue = Number(value)
  return Number.isFinite(numberValue) ? String(Number(numberValue.toFixed(3))) : '-'
}

const updateForecastTable = (list: ForecastItem[]) => {
  dataList.value = list.map(item => ({
    time: formatTime(item.tm),
    inflow: formatNumber(item.q),
    damLevel: formatNumber(item.z)
  }))
}

const getForecastDetailById = async (id: string) => {
  if (!id) return
  const result: any = await service.xfqs.hsybForecastccFindById({ id })
  console.log(result, 'result')
  const list = result?.hsybForecastccDdfafExtList?.[0]?.hsybForecastcExtList?.[0]?.hsybForecastList || []
  updateForecastTable(list)
}

defineExpose({
  getForecastDetailById
})
</script>

<style lang="scss" scoped>
.page-container {
  padding: 20px 32px 28px;
  box-sizing: border-box;
}

.forecast-table-wrap {
  height: 480px;
}

.forecast-table {
  height: 100%;

  :deep(.table-header__tr) {
    font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
    font-size: 28px;
    font-weight: 500;
  }

  :deep(.table-body__th) {
    font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
    font-size: 28px;
  }
}
</style>
