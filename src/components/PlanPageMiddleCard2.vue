<template>
  <PageCard title="方案对比" bg-class="middle">
    <div class="page-container">
      <div class="toolbar">
        <button class="history-btn" type="button">
          方案对比
        </button>
        <div class="date">
          <ElDatePicker
            v-model="selectedDate"
            type="date"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            :clearable="false"
            :editable="false"
            popper-class="plan-date-picker-popper"
          />
        </div>
      </div>
      <ElTable
        :data="planList"
        :row-class-name="getRowClassName"
        class="files-table"
        height="470px"
      >
        <ElTableColumn label="" width="72" align="center">
          <template #default="scope">
            <div class="table-index">
              {{ scope.$index + 1 }}
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="planName" label="方案名称" min-width="320" />
        <ElTableColumn prop="irrigationRule" label="灌溉规则" width="180" align="center" />
        <ElTableColumn prop="irrigationArea" label="灌溉面积" width="180" align="center" />
        <ElTableColumn prop="waterTotal" label="配水总量" width="180" align="center" />
        <ElTableColumn prop="startTime" label="起始时间" width="220" align="center" />
        <ElTableColumn prop="endTime" label="结束时间" width="220" align="center" />
        <ElTableColumn prop="status" label="状态" width="160" align="center">
          <template #default="scope">
            <span class="status-tag">{{ scope.row.status }}</span>
          </template>
        </ElTableColumn>
      </ElTable>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
type PlanCompareItem = {
  planName: string
  irrigationRule: string
  irrigationArea: string
  waterTotal: string
  startTime: string
  endTime: string
  status: string
}

const selectedDate = ref('2026-04-24')

const planList = ref<PlanCompareItem[]>([
  {
    planName: '2026-04-21 供水时间最少调度方案',
    irrigationRule: '',
    irrigationArea: '',
    waterTotal: '',
    startTime: '2026-04-21 12:00',
    endTime: '2026-04-21 12:00',
    status: '进行中'
  },
  {
    planName: '2026-04-22 供水时间最少调度方案',
    irrigationRule: '',
    irrigationArea: '',
    waterTotal: '',
    startTime: '2026-04-22 12:00',
    endTime: '2026-04-22 12:00',
    status: '进行中'
  },
  {
    planName: '2026-04-23 供水时间最少调度方案',
    irrigationRule: '',
    irrigationArea: '',
    waterTotal: '',
    startTime: '2026-04-23 12:00',
    endTime: '2026-04-23 12:00',
    status: '进行中'
  },
  {
    planName: '2026-04-24 供水时间最少调度方案',
    irrigationRule: '',
    irrigationArea: '',
    waterTotal: '',
    startTime: '2026-04-24 12:00',
    endTime: '2026-04-24 12:00',
    status: '进行中'
  },
  {
    planName: '2026-04-25 供水时间最少调度方案',
    irrigationRule: '',
    irrigationArea: '',
    waterTotal: '',
    startTime: '2026-04-25 12:00',
    endTime: '2026-04-25 12:00',
    status: '进行中'
  }
])

const getRowClassName = ({ rowIndex }: { rowIndex: number }) => {
  return rowIndex === 2 ? 'is-active-row' : ''
}
</script>

<style lang="scss" scoped>
.page-container {
  padding: 6px 28px 0;
  box-sizing: border-box;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 16px;
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

.date {
  width: 335px;
  height: 50px;
  margin-bottom: 12px;

  :deep(.el-date-editor.el-input),
  :deep(.el-date-editor.el-input__wrapper) {
    width: 100%;
    height: 100%;
  }

  :deep(.el-input__wrapper) {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0 48px 0 14px;
    border: 1px solid #26b6ff;
    border-radius: 0;
    background: rgb(7 62 87 / 0.45);
    box-shadow: inset 0 0 18px rgb(31 163 220 / 0.16);
    box-sizing: border-box;
  }

  :deep(.el-input__wrapper)::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 22px;
    width: 12px;
    height: 12px;
    border-right: 2px solid #fff;
    border-bottom: 2px solid #fff;
    transform: translateY(-70%) rotate(45deg);
    pointer-events: none;
  }

  :deep(.el-input__inner) {
    height: 48px;
    color: #fff;
    font-size: 24px;
    line-height: 48px;
    font-family: Quantico, DINAlternateBold, sans-serif;
  }

  :deep(.el-input__prefix) {
    display: none;
  }

  :deep(.el-input__suffix) {
    display: none;
  }

  :deep(.el-input__suffix-inner) {
    display: flex;
    align-items: center;
  }

  :deep(.el-input__suffix .el-icon) {
    width: 18px;
    height: 18px;
    color: #fff;
    transform: rotate(90deg);
  }
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
        height: 44px;
        background: rgb(19 96 160 / 0.55);
        border-bottom: none;
        color: #fff;
        font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
        font-size: 17px;
        font-weight: 500;
      }
    }

    .el-table__body {
      border-spacing: 0 2px;
    }

    .el-table__body-wrapper {
      margin-top: 2px;

      td.el-table__cell {
        height: 52px;
        background: rgb(19 79 135 / 0.25);
        color: #81e6ff;
        font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
        font-size: 18px;
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

    .el-table__row.is-active-row>td.el-table__cell,
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
  border: 1px solid #2daefb;
  color: #fff;
  font-size: 18px;
  line-height: 28px;
  background: linear-gradient(180deg, rgb(29 120 180 / 0.7), rgb(17 74 121 / 0.7));
}
</style>
