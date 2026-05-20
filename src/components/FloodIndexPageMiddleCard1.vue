<template>
  <PageCard title="预报方案" bg-class="middle">
    <div class="page-container">
      <div class="table-wrap">
        <PageTable
          class="forecast-table"
          :thead-col="theadCol"
          :data-list="dataList"
          :limit-scroll="5"
          :index="true"
          @row-click="openForecastDetail"
        >
          <template #index="scope">
            <div class="table-index">
              {{ scope.index }}
            </div>
          </template>
          <template #totalRainfall="scope">
            <span class="rain-num">{{ scope.row.rainNum }}</span>
            <span class="rain-unit">m</span>
          </template>
          <template #action>
            <button class="action-view" type="button">
              <span class="action-view__icon" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <path
                    d="M18 10c-6 0-10 5.2-10 8s4 8 10 8 10-5.2 10-8-4-8-10-8Z"
                    stroke="#81E6FF"
                    stroke-width="1.8"
                  />
                  <circle cx="18" cy="18" r="3.2" stroke="#81E6FF" stroke-width="1.8" />
                </svg>
              </span>
              查看
            </button>
          </template>
        </PageTable>
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
type ForecastPlanRow = {
  id: string
  planName: string
  forecastRange: string
  rainNum: string
  baseTime: string
  forecastTime: string
}

const emit = defineEmits(['forecast-plan-select'])

const theadCol = ref([
  { key: 'planName', name: '方案名称' },
  { key: 'forecastRange', name: '预见期', width: 200, align: 'center' },
  { key: 'totalRainfall', name: '累计降雨', width: 220, align: 'center' },
  { key: 'baseTime', name: '依据时间', width: 300, align: 'center' },
  { key: 'forecastTime', name: '预报时间', width: 300, align: 'center' },
  { key: 'action', name: '操作', width: 200, align: 'center' }
])

const dataList = ref<ForecastPlanRow[]>([])

const formatDateTime = (value: unknown) => {
  return value ? String(value).slice(0, 16) : '-'
}

const formatForecastRange = (value: unknown) => {
  const numberValue = Number(value)
  return Number.isFinite(numberValue) ? `${numberValue}小时` : '-'
}

const formatRainNum = (value: unknown) => {
  const numberValue = Number(value)
  return Number.isFinite(numberValue) ? String(numberValue) : '0'
}

const openForecastDetail = (row: ForecastPlanRow) => {
  console.log(row, 'row')
  if (!row.id) return
  emit('forecast-plan-select', row.id)
}

usePolling(async () => {
  const result: any = await service.xfqs.hsybForecastccFindPage({
    start: 1,
    limit: 1000
  })
  console.log('预报方案列表:', result)

  const list = Array.isArray(result?.list) ? result.list : []
  dataList.value = list.map((item: Record<string, any>) => ({
    id: item.id || '',
    planName: item.name || '-',
    forecastRange: formatForecastRange(item.fdays),
    rainNum: formatRainNum(item.zdrp),
    baseTime: formatDateTime(item.pymdh),
    forecastTime: formatDateTime(item.fymdh)
  }))
})
</script>

<style lang="scss" scoped>
.page-container {
  padding: 12px 80px 24px;
  box-sizing: border-box;
}

.table-wrap {
  height: 520px;
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
  background: url('@/components/PageTable/assets/index-bg.png') no-repeat center;
  background-size: 100% 100%;
}

.rain-num {
  font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
  font-size: 30px;
}

.rain-unit {
  margin-left: 6px;
  color: #beeeff;
  font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
  font-size: 24px;
}

.action-view {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  padding: 0;
  color: #81e6ff;
  font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
  font-size: 30px;
  line-height: 1;
  cursor: pointer;
  background: transparent;
}

.action-view__icon {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
}

.forecast-table {
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

  :deep(.table-body__tr:nth-child(3) .rain-unit) {
    color: #fff;
  }

  :deep(.table-body__tr:nth-child(3) .action-view) {
    color: #fff;
  }

  :deep(.table-body__tr:nth-child(3) .action-view__icon svg path),
  :deep(.table-body__tr:nth-child(3) .action-view__icon svg circle) {
    stroke: #fff;
  }

  :deep(.table-body__tr:nth-child(3):hover) {
    color: #fff;
    background: linear-gradient(0deg, rgb(0 132 255 / 0.52), rgb(30 83 132 / 0.52));
  }
}
</style>
