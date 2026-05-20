<template>
  <PageCard title="预演方案" bg-class="middle">
    <div class="page-container">
      <div class="toolbar">
        <button class="history-btn" type="button">
          历史预演
        </button>
      </div>
      <div class="table-wrap">
        <PageTable
          class="rehearsal-table"
          :thead-col="theadCol"
          :data-list="dataList"
          :limit-scroll="5"
          :index="true"
        >
          <template #index="scope">
            <div class="table-index">
              {{ scope.index }}
            </div>
          </template>
          <template #status="scope">
            <span class="status-tag">{{ scope.row.status }}</span>
          </template>
          <template #action>
            <button class="action-view" type="button">
              查看
            </button>
          </template>
        </PageTable>
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
type RehearsalPlanItem = {
  planName: string
  forecastRange: string
  totalRainfall: string
  baseTime: string
  forecastTime: string
  status: string
}

const theadCol = ref([
  { key: 'planName', name: '方案名称' },
  { key: 'forecastRange', name: '预见期', width: 200, align: 'center' },
  { key: 'totalRainfall', name: '累计降雨', width: 220, align: 'center' },
  { key: 'baseTime', name: '依据时间', width: 300, align: 'center' },
  { key: 'forecastTime', name: '预热时间', width: 300, align: 'center' },
  { key: 'status', name: '状态', width: 200, align: 'center' },
  { key: 'action', name: '操作', width: 200, align: 'center' }
])

const dataList = ref<RehearsalPlanItem[]>([
])

const getOptionConfigResultList = (result: Record<string, any>) => {
  if (Array.isArray(result)) return result
  if (Array.isArray(result?.list)) return result.list
  if (Array.isArray(result?.data)) return result.data
  if (Array.isArray(result?.detail)) return result.detail
  if (Array.isArray(result?.detail?.list)) return result.detail.list
  return []
}

const statusMap: Record<string, string> = {
  9: '进行中'
}

const formatRehearsalPlan = (item: Record<string, any>, index: number): RehearsalPlanItem => {
  return {
    planName: item.planName || item.name || item.optionName || item.configName || item.title || `预演方案${index + 1}`,
    forecastRange: item.forecastRange || item.forecastPeriod || item.period || item.days || '--',
    totalRainfall: item.totalRainfall || item.rainfall || item.drp || item.pptn || '--',
    baseTime: item.baseTime || item.tm || item.createTime || item.updateTime || '--',
    forecastTime: item.forecastTime || item.rehearsalTime || item.updateTime || item.createTime || '--',
    status: statusMap[String(item.status)] || '--'
  }
}

usePolling(async () => {
  const result: any = await service.xfqs.getOptionConfigList({
    searchName: ''
  })
  dataList.value = getOptionConfigResultList(result).map(formatRehearsalPlan)
})
</script>

<style lang="scss" scoped>
.page-container {
  padding: 20px 140px 0;
  box-sizing: border-box;
}

.toolbar {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.history-btn {
  min-width: 152px;
  height: 56px;
  padding: 0 14px;
  border: 1px solid #7dc8f5;
  border-radius: 4px;
  margin-bottom: 12px;
  color: #dff4ff;
  font-size: 20px;
  line-height: 32px;
  background: linear-gradient(180deg, rgb(24 91 139 / 0.52), rgb(16 60 94 / 0.52));
}

.table-index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  line-height: 34px;
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  background: url('@/components/PageTable/assets/index-bg.png') no-repeat;
  background-size: 100% 100%;
}

.table-wrap {
  height: 520px;
}

.rehearsal-table {
  height: 100%;

  :deep(.table-header__tr) {
    font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
    font-size: 20px;
    font-weight: 500;
  }

  :deep(.table-body__th) {
    font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
    font-size: 19px;
  }

  :deep(.table-body__tr:nth-child(3)) {
    color: #fff;
    background: linear-gradient(180deg, rgb(30 83 132 / 0.52), rgb(0 132 255 / 0.52));
  }

  :deep(.table-body__tr:nth-child(3) .table-body__th),
  :deep(.table-body__tr:nth-child(3) .action-view) {
    color: #fff;
  }
}

:deep(.el-table) {
  background-color: transparent;
}

.files-table {
  :deep(.el-table__inner-wrapper) {
    &::before {
      display: none;
    }

    tr {
      background: transparent;
    }

    .el-table__header-wrapper {
      th.el-table__cell {
        background: rgb(19 96 160 / 0.55);
        border-bottom: none;
        color: #fff;
        font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
        font-size: 20px;
        font-weight: 500;
      }
    }

    .el-table__body {
      border-spacing: 0 2px;
    }

    .el-table__body-wrapper {
      margin-top: 2px;

      td.el-table__cell {
        background: rgb(19 79 135 / 0.25);
        color: #81E6FF;
        font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
        font-size: 19px;
        border: 1px solid #527191;
        box-sizing: border-box;

        &:not(:last-child) {
          border-right: none;
        }

        &:not(:first-child) {
          border-left: none;
        }
      }
    }

    .el-table__row:hover>td.el-table__cell {
      background: linear-gradient(180deg, rgb(30 83 132 / 0.52), rgb(0 132 255 / 0.52));
      color: #fff;
    }
  }

  :deep(.cell) {
    height: 52px;
    line-height: 52px;
    padding: 0 8px;
    box-sizing: border-box;
  }
}

.status-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 72px;
  height: 30px;
  padding: 0 12px;
  border: 1px solid #5ea8d1;
  color: #fff;
  font-size: 18px;
  line-height: 28px;
  background: linear-gradient(180deg, rgb(29 120 180 / 0.7), rgb(17 74 121 / 0.7));
}

.action-view {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: none;
  padding: 0;
  color: #8ce8ff;
  font-size: 18px;
  line-height: 1;
  background: transparent;

  &::before {
    content: '';
    width: 12px;
    height: 8px;
    border: 1px solid #8ce8ff;
    border-radius: 10px / 8px;
    box-sizing: border-box;
  }
}
</style>
