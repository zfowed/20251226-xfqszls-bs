<template>
  <PageCard title="预报方案" bg-class="middle">
    <div class="page-container">
      <ElTable
        ref="tableRef"
        :data="dataList"
        class="files-table"
        row-key="id"
        height="470px"
      >
        <ElTableColumn label="" width="72" align="center">
          <template #default="scope">
            <div class="table-index">
              {{ scope.$index + 1 }}
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="planName" label="方案名称" min-width="540" />
        <ElTableColumn prop="forecastRange" label="预见期" width="120" align="center" />
        <ElTableColumn prop="totalRainfall" label="累计降雨" width="150" align="center" />
        <ElTableColumn prop="baseTime" label="依据时间" width="220" align="center" />
        <ElTableColumn prop="forecastTime" label="预报时间" width="220" align="center" />
        <ElTableColumn label="操作" width="120" align="center">
          <template #default>
            <button class="action-view" type="button">
              查看
            </button>
          </template>
        </ElTableColumn>
      </ElTable>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
type ForecastPlanItem = {
  id: number
  planName: string
  forecastRange: string
  totalRainfall: string
  baseTime: string
  forecastTime: string
}

const tableRef = ref<any>()

const dataList = ref<ForecastPlanItem[]>([
  {
    id: 1,
    planName: '2026-04-21 供水时间最少调度方案',
    forecastRange: '4天',
    totalRainfall: '9.87 m',
    baseTime: '2026-04-21 12:00',
    forecastTime: '自动预报'
  },
  {
    id: 2,
    planName: '2026-04-22 供水时间最少调度方案',
    forecastRange: '3天',
    totalRainfall: '3.36 m',
    baseTime: '2026-04-22 12:00',
    forecastTime: '自动预报'
  },
  {
    id: 3,
    planName: '2026-04-23 供水时间最少调度方案',
    forecastRange: '3天',
    totalRainfall: '3.18 m',
    baseTime: '2026-04-23 12:00',
    forecastTime: '自动预报'
  },
  {
    id: 4,
    planName: '2026-04-24 供水时间最少调度方案',
    forecastRange: '3天',
    totalRainfall: '3.46 m',
    baseTime: '2026-04-24 12:00',
    forecastTime: '自动预报'
  },
  {
    id: 5,
    planName: '2026-04-25 供水时间最少调度方案',
    forecastRange: '3天',
    totalRainfall: '3.46 m',
    baseTime: '2026-04-25 12:00',
    forecastTime: '自动预报'
  }
])

onMounted(() => {
  nextTick(() => {
    const defaultRow = dataList.value.find((r) => r.id === 3)
    if (defaultRow) {
      tableRef.value?.setCurrentRow(defaultRow)
    }
  })
})
</script>

<style lang="scss" scoped>
.page-container {
  padding: 20px 140px 0;
  box-sizing: border-box;
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
        color: #81e6ff;
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

    .el-table__row:hover > td.el-table__cell {
      background: linear-gradient(180deg, rgb(30 83 132 / 0.52), rgb(0 132 255 / 0.52));
      color: #fff;
    }

    .el-table__body tr.current-row > td.el-table__cell {
      background: linear-gradient(180deg, rgb(30 83 132 / 0.85), rgb(0 132 255 / 0.65)) !important;
      color: #fff !important;
      box-shadow: inset 0 0 0 1px rgb(100 200 255 / 0.45);
    }
  }

  :deep(.cell) {
    height: 52px;
    line-height: 52px;
    padding: 0 8px;
    box-sizing: border-box;
  }
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
