<template>
  <PageCard title="预演方案" bg-class="middle">
    <div class="page-container">
      <div class="toolbar">
        <button class="history-btn" type="button">
          历史预演
        </button>
      </div>
      <ElTable :data="dataList" class="files-table" height="470px">
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
        <ElTableColumn prop="status" label="状态" width="130" align="center">
          <template #default="scope">
            <span class="status-tag">{{ scope.row.status }}</span>
          </template>
        </ElTableColumn>
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
type RehearsalPlanItem = {
  planName: string
  forecastRange: string
  totalRainfall: string
  baseTime: string
  forecastTime: string
  status: string
}

const dataList = ref<RehearsalPlanItem[]>([
  {
    planName: '2026-04-21 洪水时冒悬少见预方案',
    forecastRange: '4天',
    totalRainfall: '9.97 m',
    baseTime: '2026-04-21 12:00',
    forecastTime: '2026-04-21 12:00',
    status: '进行中'
  },
  {
    planName: '2026-04-22 洪水时冒悬少见预方案',
    forecastRange: '3天',
    totalRainfall: '4.36 m',
    baseTime: '2026-04-22 12:00',
    forecastTime: '2026-04-22 12:00',
    status: '进行中'
  },
  {
    planName: '2026-04-23 洪水时冒悬少见预方案',
    forecastRange: '3天',
    totalRainfall: '3.18 m',
    baseTime: '2026-04-23 12:00',
    forecastTime: '2026-04-23 12:00',
    status: '进行中'
  },
  {
    planName: '2026-04-24 洪水时冒悬少见预方案',
    forecastRange: '3天',
    totalRainfall: '3.46 m',
    baseTime: '2026-04-24 12:00',
    forecastTime: '2026-04-24 12:00',
    status: '进行中'
  },
  {
    planName: '2026-04-25 洪水时冒悬少见预方案',
    forecastRange: '3天',
    totalRainfall: '3.46 m',
    baseTime: '2026-04-25 12:00',
    forecastTime: '2026-04-25 12:00',
    status: '进行中'
  }
])
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
