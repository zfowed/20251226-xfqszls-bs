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
          :index="true"
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
          <template #status="scope">
            <span class="status-pill">{{ scope.row.status }}</span>
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
type RehearsalPlanRow = {
  planName: string
  forecastRange: string
  rainNum: string
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

const dataList = ref<RehearsalPlanRow[]>([
  {
    planName: '2026-04-21 供水时间最少调度方案',
    forecastRange: '4天',
    rainNum: '9.97',
    baseTime: '2026-04-21 12:00',
    forecastTime: '2026-04-21 12:00',
    status: '进行中'
  },
  {
    planName: '2026-04-22 供水时间最少调度方案',
    forecastRange: '3天',
    rainNum: '3.36',
    baseTime: '2026-04-22 12:00',
    forecastTime: '2026-04-22 12:00',
    status: '进行中'
  },
  {
    planName: '2026-04-23 供水时间最少调度方案',
    forecastRange: '3天',
    rainNum: '3.18',
    baseTime: '2026-04-23 12:00',
    forecastTime: '2026-04-23 12:00',
    status: '进行中'
  },
  {
    planName: '2026-04-24 供水时间最少调度方案',
    forecastRange: '3天',
    rainNum: '3.46',
    baseTime: '2026-04-24 12:00',
    forecastTime: '2026-04-24 12:00',
    status: '进行中'
  },
  {
    planName: '2026-04-25 供水时间最少调度方案',
    forecastRange: '3天',
    rainNum: '3.46',
    baseTime: '2026-04-25 12:00',
    forecastTime: '2026-04-25 12:00',
    status: '进行中'
  }
])
</script>

<style lang="scss" scoped>
.page-container {
  padding: 12px 80px 24px;
  box-sizing: border-box;
}

.toolbar {
  display: flex;
  align-items: center;
  margin-bottom: 14px;
}

.history-btn {
  box-sizing: border-box;
  min-width: 152px;
  height: 56px;
  padding: 0 16px;
  border: 2px solid #06a5ff;
  border-radius: 0;
  color: #d8f0ff;
  font-family: JiangChengHeiTi, 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
  font-size: 30px;
  font-weight: 500;
  line-height: 1;
  cursor: pointer;
  background: linear-gradient(180deg, rgb(100 211 255 / 0.28), rgb(0 101 179 / 0.35));
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

.status-pill {
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 152px;
  height: 56px;
  border: 2px solid #06a5ff;
  color: #d8f0ff;
  font-family: JiangChengHeiTi, 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
  font-size: 28px;
  font-weight: 500;
  line-height: 1;
  background: linear-gradient(180deg, rgb(100 211 255 / 0.28), rgb(0 101 179 / 0.35));
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

.rehearsal-table {
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

  /* 设计稿第三行为选中态 */
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
